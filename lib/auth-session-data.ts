export interface AuthSessionCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const authSessionCategories: AuthSessionCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "A practical guide to testing common authentication and session-related vulnerabilities in modern web applications.", description: "Modern applications rely heavily on sessions, tokens and identity checks. When implemented incorrectly, attackers may bypass restrictions or fully take over accounts." },
    ],
  },
  {
    category: "1. Old Session Does Not Expire After Password Change",
    commands: [
      { command: "Create an account → Login from two browsers → Change password in Browser A → Refresh Browser B", description: "#1 Steps: If Browser B remains authenticated, the issue exists" },
      { command: "Impact: An attacker with a stolen session can maintain access even after the victim changes their password.", description: "Critical severity — session invalidation failure" },
    ],
  },
  {
    category: "2. Failure to Invalidate Session on Logout",
    commands: [
      { command: "Login → Copy session cookies (EditThisCookie / Cookie Editor) → Logout → Restore copied cookies → Refresh", description: "#1 Steps: If access is restored without login, session remains valid server-side" },
      { command: "Impact: Stolen cookies can be reused indefinitely.", description: "High severity — missing server-side invalidation" },
    ],
  },
  {
    category: "3. Browser Cache Weakness (Back Button)",
    commands: [
      { command: "Login → Visit sensitive pages (Profile, Billing, Settings) → Logout → Press browser Back button", description: "#1 Steps: If sensitive data is still visible, cache controls are missing" },
      { command: "Impact: Attackers on shared devices may access private user data.", description: "Medium severity — missing Cache-Control headers" },
      { command: "Cache-Control: no-store", description: "Header to prevent page caching" },
      { command: "Cache-Control: no-cache, Pragma: no-cache", description: "Additional cache prevention headers" },
    ],
  },
  {
    category: "4. Email Verification Bypass",
    commands: [
      { command: "Register with Email A (don't verify) → Change email to Email B → Verify Email B → Change back to Email A", description: "#1 Steps: If Email A becomes verified automatically, bypass exists" },
      { command: "Impact: Attackers may verify emails they do not own, leading to account abuse.", description: "Medium severity — verification logic flaw" },
    ],
  },
  {
    category: "5. Email Verification Swap Attack",
    commands: [
      { command: "Register with Email A → Receive verification link → Change email to Email B → Click old link", description: "#1 Steps: If Email B becomes verified, vulnerability exists" },
      { command: "Impact: Pre-account takeover, Domain verification bypass, Account abuse", description: "High severity — verification link tied to email, not user" },
    ],
  },
  {
    category: "6-7. Password Reset Token Issues",
    commands: [
      { command: "Request Reset Link 1 → Request Reset Link 2 → Use Link 1 (still works → persistence)", description: "#6 Old tokens remain valid after newer requests — token persistence" },
      { command: "Request reset → Change password → Revisit same reset link (still works → reuse)", description: "#7 Tokens should be single-use — token reuse" },
      { command: "Impact: Attackers can reuse leaked or older reset URLs for account takeover.", description: "High severity — reset token lifecycle failure" },
    ],
  },
  {
    category: "8. Missing Session Validation on Sensitive Endpoints",
    commands: [
      { command: "Login → Intercept profile update in Burp Suite → Logout → Replay intercepted request", description: "#1 Steps: If request still succeeds, endpoint doesn't validate session properly" },
      { command: "Impact: Attackers may perform actions after logout using captured requests.", description: "High severity — server trusts cookie existence without validation" },
    ],
  },
  {
    category: "9. Session Fixation",
    commands: [
      { command: "Visit login page → Record session ID → Login → Check if session ID changed", description: "#1 Steps: If session ID is unchanged, fixation exists" },
      { command: "Impact: Attackers can predefine session IDs and hijack accounts after victim logs in.", description: "High severity — session ID must rotate on login" },
    ],
  },
  {
    category: "10. Concurrent Session Limit Bypass",
    commands: [
      { command: "Login on Browser A → Login on Browser B → Check if Browser A is terminated", description: "#1 Test with manual browsers" },
      { command: "Use Burp Intruder with parallel login requests to bypass concurrent limits", description: "#2 Automated testing with Burp Intruder" },
      { command: "Impact: Attackers may remain hidden while victims actively use the account.", description: "Medium severity — missing session enforcement" },
    ],
  },
  {
    category: "11. Missing Session Rotation After Privilege Change",
    commands: [
      { command: "Login as normal user → Record session ID → Upgrade privileges → Check if session changed", description: "#1 Steps: If session ID stays the same, rotation is missing" },
      { command: "Impact: Attackers with stolen sessions inherit elevated privileges.", description: "High severity — privilege escalation via session reuse" },
    ],
  },
  {
    category: "12. Infinite Session Duration",
    commands: [
      { command: "Login → Save session cookie → Wait hours or days → Reuse same cookie", description: "#1 Steps: If still valid after extended period, session never expires" },
      { command: "Impact: Attackers may maintain long-term access without re-authentication.", description: "High severity — no absolute session timeout" },
    ],
  },
  {
    category: "13. Weak Remember-Me Token",
    commands: [
      { command: "Enable 'Remember Me' → Save token → Logout → Restore token", description: "#1 Steps: If login is restored, token is reusable static value" },
      { command: "Impact: Persistent unauthorized access if token is stolen.", description: "Medium severity — static remember-me tokens" },
    ],
  },
  {
    category: "14. JWT Misconfiguration",
    commands: [
      { command: "Login and capture JWT → Logout → Replay token using Burp Suite or Postman", description: "#1 Steps: If access still works, token revocation is missing" },
      { command: "Impact: JWTs become permanent access keys. No server-side blacklist or expiry check.", description: "Critical severity — no JWT invalidation mechanism" },
    ],
  },
  {
    category: "Common Testing Tools & Cookies",
    commands: [
      { command: "Burp Suite — https://portswigger.net/burp", description: "Intercept, modify, replay requests for session testing" },
      { command: "JWT.io — https://jwt.io", description: "Decode and debug JWT tokens" },
      { command: "EditThisCookie — Browser extension", description: "View, edit, delete cookies for session manipulation" },
      { command: "PHPSESSID | JSESSIONID | connect.sid | auth_token | remember_token | access_token | refresh_token", description: "Common sensitive cookies to inspect during testing" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "Weak session management is one of the most common causes of account takeover. Simple implementation mistakes can lead to persistent access, token abuse, session hijacking, privilege escalation, and full account compromise.", description: "Test these behaviors during: Web application pentesting, Bug bounty hunting, Secure code reviews" },
    ],
  },
]

export const authSessionTools = [
  { name: "Burp Suite", url: "https://portswigger.net/burp", description: "Industry-standard proxy for intercepting and testing session handling" },
  { name: "JWT.io", url: "https://jwt.io", description: "Online JWT decoder and debugger for token inspection" },
  { name: "EditThisCookie", url: "https://www.editthiscookie.com/", description: "Browser extension for managing and manipulating cookies" },
  { name: "PortSwigger — Session Management Research", url: "https://portswigger.net/web-security/authentication", description: "Comprehensive guide to authentication and session vulnerabilities" },
]
