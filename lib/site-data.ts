export interface NavSection {
  title: string
  icon: string
  href: string
  items?: { title: string; href: string; tag?: string }[]
}

export const navigation: NavSection[] = [
  {
    title: "Recon",
    icon: "search",
    href: "/recon",
    items: [
      { title: "Google Dorks", href: "/recon/google-dorks", tag: "New" },
      { title: "Shodan Dorks", href: "/recon/shodan-dorks", tag: "New" },
      { title: "Param Discovery", href: "/recon/param-discovery" },
      { title: "GitHub Recon", href: "/recon/github-recon", tag: "New" },
    ],
  },
  {
    title: "Web Vulnerabilities",
    icon: "bug",
    href: "/vulnerabilities",
    items: [
      { title: "SQL Injection", href: "/vulnerabilities/sql-injection", tag: "New" },
      { title: "WordPress", href: "/vulnerabilities/wordpress", tag: "New" },
      { title: "Open Redirect", href: "/vulnerabilities/open-redirect", tag: "New" },
      { title: "CRLF Injection", href: "/vulnerabilities/crlf-injection" },
      { title: "Dependency Confusion", href: "/vulnerabilities/dependency-confusion" },
      { title: "Host Header Injection", href: "/vulnerabilities/host-header-injection", tag: "New" },
      { title: "SSRF Testing & Exploitation", href: "/vulnerabilities/ssrf", tag: "New" },
      { title: "Email Input Testing", href: "/vulnerabilities/email-input-testing", tag: "New" },
    ],
  },
  {
    title: "Tech-Specific",
    icon: "server",
    href: "/tech-specific",
    items: [
      { title: "Microsoft IIS", href: "/tech-specific/iis", tag: "New" },
      { title: "Next.js", href: "/tech-specific/nextjs", tag: "New" },
      { title: "Swagger XSS", href: "/tech-specific/swagger", tag: "New" },
      { title: "API Fuzzing", href: "/tech-specific/api-fuzzing", tag: "New" },
      { title: "Spring Boot", href: "/tech-specific/spring-boot", tag: "New" },
    ],
  },
  {
    title: "Cloud & Assets",
    icon: "cloud",
    href: "/cloud",
    items: [
      { title: "Google API Keys", href: "/cloud/google-api-keys", tag: "New" },
      { title: "S3 Buckets", href: "/cloud/s3-buckets", tag: "New" },
    ],
  },
  {
    title: "Methods",
    icon: "wrench",
    href: "/methods",
    items: [
      { title: "FFUF Techniques", href: "/methods/ffuf", tag: "New" },
      { title: "Gospider Methods", href: "/methods/gospider", tag: "New" },
      { title: "CeWL Wordlists", href: "/methods/cewl", tag: "New" },
      { title: "Nuclei Templates", href: "/methods/nuclei-templates", tag: "New" },
    ],
  },
  {
    title: "WAF Bypass & PoCs",
    icon: "shield",
    href: "/waf-bypass",
    items: [
      { title: "IDOR & 403 Bypass", href: "/waf-bypass/idor", tag: "New" },
      { title: "WAF Bypass with SQLMap", href: "/waf-bypass/sqlmap", tag: "New" },
      { title: "403 Bypass", href: "/vulnerabilities/403-bypass", tag: "New" },
    ],
  },
  {
    title: "Advanced Topics",
    icon: "brain",
    href: "/advanced",
    items: [
      { title: "LLM Injection", href: "/advanced/llm-injection", tag: "New" },
      { title: "Blind XSS Advanced", href: "/advanced/blind-xss", tag: "New" },
      { title: "Auth & Session Vulns", href: "/auth-session", tag: "New" },
      { title: "Registration Vulns", href: "/advanced/registration-vulns", tag: "New" },
      { title: "Blind XSS via PasteJacking", href: "/advanced/blind-xss-pastejacking", tag: "New" },
      { title: "Rate Limit Bypass", href: "/advanced/rate-limit-bypass", tag: "New" },
    ],
  },
  {
    title: "Browser Extensions",
    icon: "puzzle",
    href: "/browser-extensions",
    items: [
      { title: "Full Collection", href: "/browser-extensions", tag: "New" },
    ],
  },
  {
    title: "Tools",
    icon: "terminal",
    href: "/tools",
    items: [
      { title: "All Tools", href: "/tools", tag: "New" },
    ],
  },
  {
    title: "Payloads",
    icon: "siren",
    href: "/payloads",
    items: [
      { title: "Payload Library", href: "/payloads", tag: "New" },
    ],
  },
]

export const sectionCards = [
  {
    title: "Recon & OSINT",
    description: "Information gathering, subdomain enumeration, and reconnaissance techniques",
    icon: "search",
    href: "/recon",
    itemCount: 4,
    color: "primary",
  },
  {
    title: "Web Vulnerabilities",
    description: "XSS, SQLi, SSRF, IDOR, and other common web security flaws",
    icon: "bug",
    href: "/vulnerabilities",
    itemCount: 8,
    color: "destructive",
  },
  {
    title: "Tech-Specific",
    description: "IIS, Apache, Nginx, WordPress, and framework-specific attacks",
    icon: "server",
    href: "/tech-specific",
    itemCount: 5,
    color: "accent",
  },
  {
    title: "Cloud & Assets",
    description: "AWS, Azure, GCP misconfigurations and cloud security testing",
    icon: "cloud",
    href: "/cloud",
    itemCount: 2,
    color: "primary",
  },
  {
    title: "Methods",
    description: "Step-by-step technique guides for security testing tools and methodologies",
    icon: "wrench",
    href: "/methods",
    itemCount: 4,
    color: "accent",
  },
  {
    title: "Advanced Topics",
    description: "Cutting-edge exploitation chains, AI injection, authentication flaws, and advanced security research",
    icon: "brain",
    href: "/advanced",
    itemCount: 6,
    color: "primary",
  },
  {
    title: "WAF Bypass & PoCs",
    description: "Techniques to bypass WAF restrictions, IDOR exploits, and proof-of-concept demonstrations",
    icon: "shield",
    href: "/waf-bypass",
    itemCount: 3,
    color: "destructive",
  },
  {
    title: "Browser Extensions",
    description: "Curated browser extensions for security testing, reconnaissance, and debugging",
    icon: "puzzle",
    href: "/browser-extensions",
    itemCount: 1,
    color: "accent",
  },
  {
    title: "Tools",
    description: "Complete security tool collection — from installation to advanced usage, with practical examples and expert tips",
    icon: "terminal",
    href: "/tools",
    itemCount: 104,
    color: "primary",
  },
  {
    title: "Payloads",
    description: "Curated payload collection for web security testing — XSS, SQLi, SSTI, LFI, and more",
    icon: "siren",
    href: "/payloads",
    itemCount: 1,
    color: "accent",
  },
]