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
      { title: "403 Bypass", href: "/vulnerabilities/403-bypass" },
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
    title: "Tools & Methods",
    icon: "wrench",
    href: "/tools",
    items: [
      { title: "FFUF Techniques", href: "/tools/ffuf", tag: "New" },
      { title: "Gospider Methods", href: "/tools/gospider", tag: "New" },
      { title: "CeWL Wordlists", href: "/tools/cewl", tag: "New" },
    ],
  },
  {
    title: "WAF Bypass & PoCs",
    icon: "shield",
    href: "/waf-bypass",
    items: [
      { title: "IDOR & 403 Bypass", href: "/waf-bypass/idor", tag: "New" },
      { title: "WAF Bypass with SQLMap", href: "/waf-bypass/sqlmap", tag: "New" },
    ],
  },
  {
    title: "Advanced Topics",
    icon: "brain",
    href: "/advanced",
    items: [
      { title: "LLM Injection", href: "/advanced/llm-injection", tag: "New" },
      { title: "Blind XSS Advanced", href: "/advanced/blind-xss", tag: "New" },
    ],
  },
]

export const sectionCards = [
  {
    title: "Recon",
    description: "Information gathering and reconnaissance techniques",
    icon: "search",
    href: "/recon",
    itemCount: 3,
    color: "primary",
  },
  {
    title: "Web Vulnerabilities",
    description: "Common web security vulnerabilities and exploitation",
    icon: "bug",
    href: "/vulnerabilities",
    itemCount: 7,
    color: "destructive",
  },
  {
    title: "Tech-Specific",
    description: "Target-specific technologies and frameworks",
    icon: "server",
    href: "/tech-specific",
    itemCount: 5,
    color: "accent",
  },
  {
    title: "Cloud & Assets",
    description: "Cloud infrastructure and asset takeover techniques",
    icon: "cloud",
    href: "/cloud",
    itemCount: 2,
    color: "primary",
  },
  {
    title: "Tools & Methods",
    description: "Essential tools and methodologies",
    icon: "wrench",
    href: "/tools",
    itemCount: 3,
    color: "accent",
  },
  {
    title: "WAF Bypass & PoCs",
    description: "WAF bypass techniques, IDOR & 403 bypass, and SQLMap WAF evasion",
    icon: "shield",
    href: "/waf-bypass",
    itemCount: 2,
    color: "destructive",
  },
  {
    title: "Advanced Topics",
    description: "Cutting-edge techniques and research",
    icon: "brain",
    href: "/advanced",
    itemCount: 2,
    color: "primary",
  },
]