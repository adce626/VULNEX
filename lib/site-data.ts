export interface NavSection {
  title: string
  icon: string
  href: string
  items?: { title: string; href: string; tag?: string }[]
}

import { toolsData } from "./tools-data"

export const navigation: NavSection[] = [
  {
    title: "Recon",
    icon: "search",
    href: "/recon",
    items: [
      { title: "Google Dorks", href: "/recon/google-dorks" },
      { title: "Shodan Dorks", href: "/recon/shodan-dorks" },
      { title: "Param Discovery", href: "/recon/param-discovery" },
      { title: "GitHub Recon", href: "/recon/github-recon" },
    ],
  },
  {
    title: "Toolkit",
    icon: "wrench",
    href: "/toolkit",
    items: [
      { title: "Recon Toolkit", href: "/toolkit", tag: "New" },
    ],
  },
  {
    title: "Web Vulnerabilities",
    icon: "bug",
    href: "/vulnerabilities",
    items: [
      { title: "SQL Injection", href: "/vulnerabilities/sql-injection" },
      { title: "WordPress", href: "/vulnerabilities/wordpress" },
      { title: "Open Redirect", href: "/vulnerabilities/open-redirect" },
      { title: "CRLF Injection", href: "/vulnerabilities/crlf-injection" },
      { title: "Dependency Confusion", href: "/vulnerabilities/dependency-confusion" },
      { title: "Host Header Injection", href: "/vulnerabilities/host-header-injection" },
      { title: "SSRF Testing & Exploitation", href: "/vulnerabilities/ssrf" },
      { title: "Email Input Testing", href: "/vulnerabilities/email-input-testing" },
      { title: "Cache Deception", href: "/vulnerabilities/cache-deception", tag: "New" },
      { title: "JSON Privilege Escalation", href: "/vulnerabilities/json-privilege-escalation" },
    ],
  },
  {
    title: "Tech-Specific",
    icon: "server",
    href: "/tech-specific",
    items: [
      { title: "Microsoft IIS", href: "/tech-specific/iis" },
      { title: "Next.js", href: "/tech-specific/nextjs" },
      { title: "Swagger XSS", href: "/tech-specific/swagger" },
      { title: "API Fuzzing", href: "/tech-specific/api-fuzzing" },
      { title: "Spring Boot", href: "/tech-specific/spring-boot" },
    ],
  },
  {
    title: "Cloud & Assets",
    icon: "cloud",
    href: "/cloud",
    items: [
      { title: "Google API Keys", href: "/cloud/google-api-keys" },
      { title: "S3 Buckets", href: "/cloud/s3-buckets" },
    ],
  },
  {
    title: "Methods",
    icon: "wrench",
    href: "/methods",
    items: [
      { title: "FFUF Techniques", href: "/methods/ffuf" },
      { title: "Nuclei Templates", href: "/methods/nuclei-templates" },
      { title: "Rapid Bug Discovery", href: "/methods/rapid-bug-discovery" },
    ],
  },
  {
    title: "WAF Bypass & PoCs",
    icon: "shield",
    href: "/waf-bypass",
    items: [
      { title: "IDOR & 403 Bypass", href: "/waf-bypass/idor" },
      { title: "WAF Bypass with SQLMap", href: "/waf-bypass/sqlmap" },
      { title: "403 Bypass", href: "/vulnerabilities/403-bypass" },
    ],
  },
  {
    title: "Advanced Topics",
    icon: "brain",
    href: "/advanced",
    items: [
      { title: "LLM Injection", href: "/advanced/llm-injection" },
      { title: "Blind XSS Advanced", href: "/advanced/blind-xss" },
      { title: "Auth & Session Vulns", href: "/auth-session" },
      { title: "Registration Vulns", href: "/advanced/registration-vulns" },
      { title: "Blind XSS via PasteJacking", href: "/advanced/blind-xss-pastejacking" },
      { title: "Rate Limit Bypass", href: "/advanced/rate-limit-bypass" },
    ],
  },

  {
    title: "Browser Extensions",
    icon: "puzzle",
    href: "/browser-extensions",
    items: [
      { title: "Full Collection", href: "/browser-extensions" },
    ],
  },
  {
    title: "Tools",
    icon: "terminal",
    href: "/tools",
    items: [
      { title: "All Tools", href: "/tools" },
    ],
  },
  {
    title: "Interactive Tools",
    icon: "wand",
    href: "/interactive",
    items: [
      { title: "All Interactive Tools", href: "/interactive" },
      { title: "Universal Encoder", href: "/interactive/encoder" },
      { title: "JWT Debugger", href: "/interactive/jwt-debugger" },
      { title: "Hash Detector", href: "/interactive/hash-detector" },
      { title: "Port Visualizer", href: "/interactive/port-visualizer" },
    ],
  },
  {
    title: "Payloads",
    icon: "siren",
    href: "/payloads",
    items: [
      { title: "Payload Library", href: "/payloads" },
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
    title: "Toolkit",
    description: "Interactive all-in-one recon command generator with domain auto-replacement",
    icon: "wrench",
    href: "/toolkit",
    itemCount: 1,
    color: "primary",
  },
  {
    title: "Web Vulnerabilities",
    description: "XSS, SQLi, SSRF, IDOR, and other common web security flaws",
    icon: "bug",
    href: "/vulnerabilities",
    itemCount: 9,
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
    itemCount: 3,
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
    itemCount: toolsData.length,
    color: "primary",
  },
  {
    title: "Interactive Tools",
    description: "Client-side security testing utilities — Universal Encoder, JWT Debugger, Hash Detector, CSP Evaluator, and Port Visualizer",
    icon: "wand",
    href: "/interactive",
    itemCount: 5,
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
