export interface SearchEntry {
  text: string
  title: string
  href: string
  section: string
}

// Lazy-load search index by importing key data files
import { sqlInjectionCategories } from "./sql-injection-data"
import { ssrfCategories } from "./ssrf-data"
import { openRedirectCategories } from "./open-redirect-data"
import { wpCategories } from "./wordpress-data"
import { nucleiCategories } from "./nuclei-data"
import { burpsuiteCategories } from "./burpsuite-data"
import { nmapCategories } from "./nmap-data"
import { springBootCategories } from "./spring-boot-data"
import { s3BucketsCategories } from "./s3-buckets-data"
import { emailInputCategories } from "./email-input-testing-data"
import { registrationVulnsCategories } from "./registration-vulns-data"
import { rateLimitCategories } from "./rate-limit-data"

type IndexedFile = {
  categories: { category: string; commands: { command: string; description: string }[] }[]
  url: string
  title: string
}

const indexedFiles: IndexedFile[] = [
  { categories: sqlInjectionCategories, url: "/vulnerabilities/sql-injection", title: "SQL Injection" },
  { categories: ssrfCategories, url: "/vulnerabilities/ssrf", title: "SSRF" },
  { categories: openRedirectCategories, url: "/vulnerabilities/open-redirect", title: "Open Redirect" },
  { categories: wpCategories, url: "/vulnerabilities/wordpress", title: "WordPress" },
  { categories: nucleiCategories, url: "/tools/nuclei", title: "Nuclei" },
  { categories: burpsuiteCategories, url: "/tools/burpsuite", title: "Burp Suite" },
  { categories: nmapCategories, url: "/tools/nmap", title: "Nmap" },
  { categories: springBootCategories, url: "/tech-specific/spring-boot", title: "Spring Boot" },
  { categories: s3BucketsCategories, url: "/cloud/s3-buckets", title: "S3 Buckets" },
  { categories: emailInputCategories, url: "/vulnerabilities/email-input-testing", title: "Email Input Testing" },
  { categories: registrationVulnsCategories, url: "/advanced/registration-vulns", title: "Registration Vulns" },
  { categories: rateLimitCategories, url: "/advanced/rate-limit-bypass", title: "Rate Limit Bypass" },
]

export function searchCommands(query: string): SearchEntry[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  const results: SearchEntry[] = []

  for (const file of indexedFiles) {
    for (const cat of file.categories) {
      for (const cmd of cat.commands) {
        if (
          cmd.command.toLowerCase().includes(q) ||
          cmd.description.toLowerCase().includes(q)
        ) {
          results.push({
            text: cmd.command.length > 80 ? cmd.command.slice(0, 80) + "..." : cmd.command,
            title: file.title,
            href: file.url,
            section: cat.category,
          })
          if (results.length >= 100) return results
        }
      }
    }
  }

  return results
}
