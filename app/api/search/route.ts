import { NextResponse } from "next/server"

interface SearchEntry {
  text: string
  title: string
  href: string
  section: string
}

const modules = [
  // Vulns
  { mod: () => import("@/lib/sql-injection-data"), prop: "sqlInjectionCategories", url: "/vulnerabilities/sql-injection", title: "SQL Injection" },
  { mod: () => import("@/lib/ssrf-data"), prop: "ssrfCategories", url: "/vulnerabilities/ssrf", title: "SSRF" },
  { mod: () => import("@/lib/open-redirect-data"), prop: "openRedirectCategories", url: "/vulnerabilities/open-redirect", title: "Open Redirect" },
  { mod: () => import("@/lib/wordpress-data"), prop: "wordpressCategories", url: "/vulnerabilities/wordpress", title: "WordPress" },
  { mod: () => import("@/lib/email-input-testing-data"), prop: "emailInputCategories", url: "/vulnerabilities/email-input-testing", title: "Email Input Testing" },
  { mod: () => import("@/lib/host-header-injection-data"), prop: "hostHeaderInjectionCategories", url: "/vulnerabilities/host-header-injection", title: "Host Header Injection" },
  { mod: () => import("@/lib/crlf-data"), prop: "crlfCategories", url: "/vulnerabilities/crlf-injection", title: "CRLF Injection" },
  { mod: () => import("@/lib/dependency-confusion-data"), prop: "dependencyConfusionCategories", url: "/vulnerabilities/dependency-confusion", title: "Dependency Confusion" },
  { mod: () => import("@/lib/403-bypass-data"), prop: "bypass403Categories", url: "/vulnerabilities/403-bypass", title: "403 Bypass" },
  // Tech-specific
  { mod: () => import("@/lib/swagger-xss-data"), prop: "swaggerXSSCategories", url: "/tech-specific/swagger", title: "Swagger XSS" },
  { mod: () => import("@/lib/spring-boot-data"), prop: "springBootCategories", url: "/tech-specific/spring-boot", title: "Spring Boot" },
  { mod: () => import("@/lib/nextjs-data"), prop: "nextjsSteps", url: "/tech-specific/nextjs", title: "Next.js" },
  { mod: () => import("@/lib/api-fuzzing-data"), prop: "apiFuzzingSteps", url: "/tech-specific/api-fuzzing", title: "API Fuzzing" },
  { mod: () => import("@/lib/iis-commands"), prop: "reconCommands", url: "/tech-specific/iis", title: "IIS Recon" },
  { mod: () => import("@/lib/iis-commands"), prop: "subdomainCommands", url: "/tech-specific/iis", title: "IIS Subdomain" },
  { mod: () => import("@/lib/iis-commands"), prop: "scanningCommands", url: "/tech-specific/iis", title: "IIS Scanning" },
  { mod: () => import("@/lib/iis-commands"), prop: "fuzzingCommands", url: "/tech-specific/iis", title: "IIS Fuzzing" },
  { mod: () => import("@/lib/iis-commands"), prop: "shortnameCommands", url: "/tech-specific/iis", title: "IIS Shortname" },
  // Cloud
  { mod: () => import("@/lib/s3-bucket-data"), prop: "s3BucketCategories", url: "/cloud/s3-buckets", title: "S3 Buckets" },
  { mod: () => import("@/lib/google-api-keys-data"), prop: "googleAPIKeysCategories", url: "/cloud/google-api-keys", title: "Google API Keys" },
  // Advanced
  { mod: () => import("@/lib/registration-vulns-data"), prop: "registrationVulnCategories", url: "/advanced/registration-vulns", title: "Registration Vulns" },
  { mod: () => import("@/lib/rate-limit-bypass-data"), prop: "rateLimitCategories", url: "/advanced/rate-limit-bypass", title: "Rate Limit Bypass" },
  { mod: () => import("@/lib/llm-injection-data"), prop: "llmInjectionCategories", url: "/advanced/llm-injection", title: "LLM Injection" },
  { mod: () => import("@/lib/auth-session-data"), prop: "authSessionCategories", url: "/auth-session", title: "Auth & Session" },
  { mod: () => import("@/lib/blind-xss-pastejacking-data"), prop: "pasteJackingCategories", url: "/advanced/blind-xss-pastejacking", title: "Blind XSS PasteJacking" },
  { mod: () => import("@/lib/blind-xss-commands"), prop: "blindXSSSteps", url: "/advanced/blind-xss", title: "Blind XSS" },
  // WAF
  { mod: () => import("@/lib/waf-data"), prop: "wafSteps", url: "/waf-bypass", title: "WAF Bypass" },
  { mod: () => import("@/lib/waf-payment-data"), prop: "paymentSteps", url: "/waf-bypass", title: "WAF Payment Bypass" },
  { mod: () => import("@/lib/waf-sqlmap-data"), prop: "wafSQLMapSteps", url: "/waf-bypass/sqlmap", title: "WAF SQLMap" },
  { mod: () => import("@/lib/waf-idors-data"), prop: "idorSteps", url: "/waf-bypass/idor", title: "IDOR & 403 Bypass" },
  // Recon
  { mod: () => import("@/lib/shodan-dorks-data"), prop: "shodanDorksCategories", url: "/recon/shodan-dorks", title: "Shodan Dorks" },
  { mod: () => import("@/lib/github-recon-data"), prop: "githubReconCategories", url: "/recon/github-recon", title: "GitHub Recon" },
  { mod: () => import("@/lib/param-discovery-data"), prop: "paramDiscoveryCategories", url: "/recon/param-discovery", title: "Param Discovery" },
  // Tools
  { mod: () => import("@/lib/ffuf-data"), prop: "ffufCategories", url: "/tools/ffuf", title: "FFUF" },
  { mod: () => import("@/lib/nuclei-data"), prop: "nucleiCategories", url: "/tools/nuclei", title: "Nuclei" },
  { mod: () => import("@/lib/burpsuite-data"), prop: "burpsuiteCategories", url: "/tools/burpsuite", title: "Burp Suite" },
  { mod: () => import("@/lib/nmap-data"), prop: "nmapCategories", url: "/tools/nmap", title: "Nmap" },
  { mod: () => import("@/lib/sqlmap-data"), prop: "sqlmapCategories", url: "/tools/sqlmap", title: "SQLMap" },
  { mod: () => import("@/lib/xsstrike-data"), prop: "xsstrikeCategories", url: "/tools/xsstrike", title: "XSStrike" },
  { mod: () => import("@/lib/subfinder-data"), prop: "subfinderCategories", url: "/tools/subfinder", title: "Subfinder" },
  { mod: () => import("@/lib/amass-data"), prop: "amassCategories", url: "/tools/amass", title: "Amass" },
  { mod: () => import("@/lib/httpx-data"), prop: "httpxCategories", url: "/tools/httpx", title: "HTTPx" },
  { mod: () => import("@/lib/cloudfox-data"), prop: "cloudfoxCategories", url: "/tools/cloudfox", title: "CloudFox" },
  { mod: () => import("@/lib/jwt_tool-data"), prop: "jwtToolCategories", url: "/tools/jwt_tool", title: "JWT Tool" },
  { mod: () => import("@/lib/arjun-data"), prop: "arjunCategories", url: "/tools/arjun", title: "Arjun" },
  { mod: () => import("@/lib/paramspider-data"), prop: "paramSpiderCategories", url: "/tools/paramspider", title: "ParamSpider" },
  { mod: () => import("@/lib/x8-data"), prop: "x8Categories", url: "/tools/x8", title: "X8" },
  { mod: () => import("@/lib/gf-data"), prop: "gfCategories", url: "/tools/gf", title: "GF" },
  { mod: () => import("@/lib/gospider-data"), prop: "gospiderCategories", url: "/tools/gospider", title: "Gospider" },
  { mod: () => import("@/lib/cewl-data"), prop: "cewlCategories", url: "/tools/cewl", title: "CeWL" },
  { mod: () => import("@/lib/gobuster-data"), prop: "gobusterCategories", url: "/tools/gobuster", title: "Gobuster" },
  { mod: () => import("@/lib/hydra-data"), prop: "hydraCategories", url: "/tools/hydra", title: "Hydra" },
  { mod: () => import("@/lib/whatweb-data"), prop: "whatwebCategories", url: "/tools/whatweb", title: "WhatWeb" },
  { mod: () => import("@/lib/wpscan-data"), prop: "wpscanCategories", url: "/tools/wpscan", title: "WPScan" },
  { mod: () => import("@/lib/dirsearch-data"), prop: "dirsearchCategories", url: "/tools/dirsearch", title: "Dirsearch" },
  { mod: () => import("@/lib/john-data"), prop: "johnCategories", url: "/tools/john", title: "John" },
  { mod: () => import("@/lib/searchsploit-data"), prop: "searchsploitCategories", url: "/tools/searchsploit", title: "Searchsploit" },
  { mod: () => import("@/lib/nuclei-templates-data"), prop: "nucleiTemplateCategories", url: "/tools/nuclei-templates", title: "Nuclei Templates" },
  { mod: () => import("@/lib/fast-xss-data"), prop: "fastXSSCategories", url: "/tools/fast-xss", title: "Fast XSS" },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (!query.trim()) {
    return NextResponse.json({ results: [] })
  }

  const q = query.toLowerCase()
  const results: SearchEntry[] = []

  for (const { mod, prop, url, title } of modules) {
    try {
      const data = await mod()
      const modData = (data as Record<string, unknown>)[prop]
      const items = Array.isArray(modData) ? modData : []

      for (const item of items) {
        const commands = (item as Record<string, unknown>).commands
        if (!Array.isArray(commands)) continue
        const sectionName = ((item as Record<string, unknown>).category || (item as Record<string, unknown>).title || "") as string

        for (const cmd of commands) {
          const cmdObj = cmd as { command?: string; description?: string }
          if (
            cmdObj.command?.toLowerCase().includes(q) ||
            cmdObj.description?.toLowerCase().includes(q)
          ) {
            results.push({
              text: cmdObj.command && cmdObj.command.length > 80
                ? cmdObj.command.slice(0, 80) + "..."
                : cmdObj.command || "",
              title,
              href: url,
              section: sectionName,
            })
            if (results.length >= 50) break
          }
        }
        if (results.length >= 50) break
      }
    } catch {
      // Skip modules that fail to import
    }
    if (results.length >= 50) break
  }

  return NextResponse.json({ results })
}
