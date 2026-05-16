export interface RegistrationVulnCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "Registration system vulnerability testing including mass assignment, duplicate accounts, and OTP bypass."

export const registrationVulnCategories: RegistrationVulnCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "The signup flow is the 'front door' where user input first hits the database and authentication layer — making it a goldmine for bugs: logic flaws, critical vulnerabilities, and account takeovers.", description: "This guide covers 23+ registration vulnerability types with step-by-step reproduction steps." },
    ],
  },
  {
    category: "1. Duplicate Registration / Account Overwrite",
    commands: [
      { command: "Create account A (victim@gmail.com) → Log out → Re-register same email with different password → Login with new password", description: "#1 If login succeeds with the new password, the old account is overwritten — full takeover" },
      { command: "If abc@gmail.com exists → Register Abc@gmail.com or aBc@gmail.com", description: "#2 Case sensitivity bypass — backend checks exact match but DB stores case-insensitive" },
    ],
  },
  {
    category: "2. Denial of Service via Large Input",
    commands: [
      { command: 'python -c "print(\'A\'*20000)" → Paste into password field → Submit', description: "#1 Excessively long strings force server to allocate immense resources — may cause 500 error or crash" },
      { command: "Monitor response time. If request hangs and returns 500 Internal Server Error, server struggled to process the input.", description: "Indicates lack of input length validation on the server side" },
    ],
  },
  {
    category: "3. Lack of Rate Limiting (Mass Registration)",
    commands: [
      { command: "Fill signup → Intercept in Burp → Send to Intruder → Mark email as payload position → Set Numbers 1-1000 → Start", description: "#1 If hundreds of consecutive requests return 200 OK without CAPTCHA or blocks, rate limiting is missing" },
      { command: "Mass account registration can flood the database, send spam, and enable ban evasion.", description: "Critical for abuse prevention" },
    ],
  },
  {
    category: "4. Stored XSS in Registration Fields",
    commands: [
      { command: "\"><img src=x onerror=alert(1)>", description: "#1 Classic XSS payload for Username / Name fields" },
      { command: "<svg/onload=confirm(1)>", description: "#2 SVG-based XSS payload" },
      { command: "\"><svg/onload=confirm(1)>\"@x.y", description: "#3 Email field XSS — payload before @ symbol" },
      { command: "Try case variation (<ScRiPt>), different event handlers (onmouseover, onsubmit), or encoded payloads", description: "Bypass techniques if basic tags are blocked" },
    ],
  },
  {
    category: "5. Insufficient Email Verification — Response Manipulation",
    commands: [
      { command: "Intercept JSON response after signup → Look for \"is_verified\": false, \"status\": \"pending\" → Change to true/success → Forward", description: "#1 Response manipulation — client-side verification bypass" },
      { command: "Intercept 403/302 response → Change status to 200 OK → Remove Location header", description: "#2 Status code manipulation to bypass verification gates" },
      { command: "Register without verifying → Try force-browsing: /user/dashboard, /account/settings, /onboarding/step2", description: "#3 Direct/forced browsing — pages might only be hidden, not protected server-side" },
    ],
  },
  {
    category: "5b. Email Verification Swap (Stale Token)",
    commands: [
      { command: "Sign up with attacker@mail.com → Receive verification link (DON'T open) → Change email to victim@mail.com → Open original link for attacker@mail.com", description: "#1 If victim@mail.com becomes verified using the old token, email swap bypass exists" },
      { command: "Token is tied to user ID, not email address — stale token verifies the new email.", description: "Critical — pre-account takeover via token reuse" },
    ],
  },
  {
    category: "6. Weak Registration Implementation",
    commands: [
      { command: "Try registering with disposable email: @mailinator.com, @tempmail.com, @10minutemail.com", description: "#1 Block known temporary email providers to prevent abuse and ban evasion" },
      { command: "Replace https:// with http:// on the signup page URL", description: "#2 Registration over HTTP sends password in plaintext — vulnerable to MITM" },
    ],
  },
  {
    category: "7. Weak Password Policy",
    commands: [
      { command: "Try: 123456, password, qwerty, admin", description: "#1 Easily guessable passwords should be rejected" },
      { command: "Try password = username", description: "#2 Username as password — common lazy pattern" },
      { command: "Try password = email address", description: "#3 Email as password — should be blocked" },
      { command: "Check security questions set during signup — are they easily guessable?", description: "#4 Weak security questions undermine future password reset flows" },
    ],
  },
  {
    category: "8. Path Overwrite (Route Collision)",
    commands: [
      { command: "If profiles are at target.com/{username} → Register: login, admin, signup, api, dashboard", description: "#1 Modern apps — register matching endpoint names" },
      { command: "Register: index.php, login.php, signup.php, admin.aspx", description: "#2 Legacy apps — register matching file names" },
      { command: "Navigate to target.com/login.php → If your profile loads instead of the login page, route collision succeeds.", description: "Attacker controls a system-route URL" },
    ],
  },
  {
    category: "9. Server-Side Validation Bypass",
    commands: [
      { command: "Intercept signup request → Modify: empty username/email, short password, invalid email (test@test, a@b), special chars", description: "#1 If registration succeeds despite breaking frontend rules, server lacks proper validation" },
      { command: "Bypassed validation can lead to: malformed accounts, stored XSS, broken workflows, injection vulnerabilities.", description: "Never trust client-side validation alone" },
    ],
  },
  {
    category: "10. Hidden / Legacy Registration Endpoints",
    commands: [
      { command: "Crawl for: /api/v1/register, /auth/create, /user/create, /legacy/signup, /mobile/register", description: "#1 Discover hidden signup endpoints that may skip validations" },
      { command: "Compare validation between endpoints — legacy ones often skip email verification, rate limiting, or password rules.", description: "Easy target for abuse" },
    ],
  },
  {
    category: "11. HTTP Parameter Pollution (HPP)",
    commands: [
      { command: "Intercept signup → email=victim@gmail.com&email=attacker@gmail.com", description: "#1 Duplicate parameters — server may pick the wrong value" },
      { command: "Can lead to: Account takeover, bypassed validation, corrupted user records.", description: "Dangerous when backend handles duplicates inconsistently" },
    ],
  },
  {
    category: "12. Weak / Predictable Verification Links",
    commands: [
      { command: "Register → Inspect verification link → Look for: Base64 email, short tokens, incrementing IDs", description: "#1 Predictable tokens allow brute-forcing verification links" },
      { command: "If tokens are guessable, attackers can verify accounts they don't own.", description: "Hijack the verification flow entirely" },
    ],
  },
  {
    category: "13. Punycode / IDN Homograph Bypass",
    commands: [
      { command: "admin@example.com vs аdmin@example.com (Cyrillic 'а') — they look identical but are different strings", description: "#1 Unicode homograph attack — register with lookalike characters" },
      { command: "If app normalizes both to same value, use Unicode version to takeover legitimate account.", description: "0-click account takeover — see: infosecwriteups.com/punycode-idn-attacks" },
    ],
  },
  {
    category: "14. OTP Brute-Force During Signup",
    commands: [
      { command: "Start signup → Intercept OTP verification → Send rapid sequential guesses → Try changing IPs", description: "#1 If OTP attempts aren't rate-limited or locked out, they can be brute-forced" },
      { command: "Attacker can verify any email/phone without owning it — breaks the trust model entirely.", description: "Critical — implement strict OTP rate limiting" },
    ],
  },
  {
    category: "15. Weak/Reusable Session Tokens During Signup",
    commands: [
      { command: "Start signup → Capture session cookie → Complete verification → Compare session ID before/after", description: "#1 If session doesn't rotate, it's vulnerable to session fixation" },
      { command: "Try registering multiple accounts without refreshing token → Reuse same token across accounts/devices", description: "#2 Weak tokens enable hijacking of freshly created accounts" },
    ],
  },
  {
    category: "15b. Null Byte Injection (%00)",
    commands: [
      { command: "Register: attacker@mail.com%00victim@mail.com or username%00.jpg", description: "#1 Null byte causes truncation — validation sees one value, storage gets another" },
      { command: "If backend truncates at null byte, you can override account attributes or bypass checks.", description: "Legacy systems are especially vulnerable" },
    ],
  },
  {
    category: "16. Missing Email Confirmation Enforcement",
    commands: [
      { command: "Register with random email → Skip confirmation → Try logging in directly → Try profile update or password reset", description: "#1 If app treats account as fully active without verification, it's vulnerable" },
      { command: "Attackers can register with any email and impersonate other users.", description: "Enforce email verification before granting access" },
    ],
  },
  {
    category: "17. Session Fixation During Signup & Verification",
    commands: [
      { command: "Start signup → Save session ID → Complete signup + verification → Compare session ID before/after", description: "#1 If session ID stays the same, platform is vulnerable to fixation" },
      { command: "Attackers can force victims into attacker-controlled sessions and takeover newly created accounts.", description: "Session ID must rotate after signup and verification" },
    ],
  },
  {
    category: "18. Cache Control Issues",
    commands: [
      { command: "Complete signup/verification → Use browser back button → Inspect cached pages for OTP, tokens, verification status", description: "#1 Cached sensitive data on shared devices is a privacy risk" },
      { command: "Signup/verification pages must set: Cache-Control: no-store, no-cache, Pragma: no-cache", description: "Prevent sensitive data exposure via cached pages" },
    ],
  },
  {
    category: "19. Cross-Account IDOR After Signup",
    commands: [
      { command: "Create accounts A and B → While both in onboarding, capture API calls → Replace IDs/emails from A with B", description: "#1 If one account can modify or view another's onboarding data, IDOR exists" },
      { command: "Onboarding endpoints often lack strict access control — test early in the flow.", description: "IDOR during registration can leak PII or allow account manipulation" },
    ],
  },
  {
    category: "20. Mass Assignment in JSON Registration",
    commands: [
      { command: "Intercept JSON signup request → Add unexpected fields: role, is_admin, is_verified, organization_id", description: "#1 Mass assignment — add extra fields to manipulate server-side logic" },
      { command: "Change parameter casing or shape (role vs Role, user[role]) to bypass server filters", description: "#2 Parameter tampering via alternate casing or nested objects" },
      { command: "Full guide: infosecwriteups.com/mass-assignment-registration-flows", description: "Detailed article covering all JSON signup manipulation techniques" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "A signup flow carries many hidden risks: duplicate accounts, missing rate limits, weak passwords, broken verification. Tightening registration early makes the entire app more secure.", description: "Check all 20+ categories during: Web app pentests, Bug bounty hunting, Secure code reviews" },
    ],
  },
]

export const registrationVulnTools = [
  { name: "Burp Suite", url: "https://portswigger.net/burp", description: "Intercept, modify, replay registration requests for testing" },
  { name: "Punycode/IDN Attack Reference", url: "https://infosecwriteups.com/the-most-underrated-0-click-account-takeover-using-punycode-idn-attacks-c0afdb74a3dc", description: "Full walkthrough of Punycode homograph account takeover" },
  { name: "Mass Assignment Guide", url: "https://infosecwriteups.com/uncovering-invisible-privileges-the-ultimate-guide-to-mass-assignment-in-registration-flows-9ecd5ff40512", description: "Comprehensive JSON registration manipulation techniques" },
]
