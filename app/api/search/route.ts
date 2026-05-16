import { NextResponse } from "next/server"

interface SearchEntry {
  text: string
  title: string
  href: string
  section: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (!query.trim()) {
    return NextResponse.json({ results: [] })
  }

  const q = query.toLowerCase()

  // Dynamic import data files for server-side search
  const modules = [
    { mod: () => import("@/lib/sql-injection-data"), url: "/vulnerabilities/sql-injection", title: "SQL Injection" },
    { mod: () => import("@/lib/ssrf-data"), url: "/vulnerabilities/ssrf", title: "SSRF" },
    { mod: () => import("@/lib/open-redirect-data"), url: "/vulnerabilities/open-redirect", title: "Open Redirect" },
    { mod: () => import("@/lib/wordpress-data"), url: "/vulnerabilities/wordpress", title: "WordPress" },
    { mod: () => import("@/lib/nuclei-data"), url: "/tools/nuclei", title: "Nuclei" },
    { mod: () => import("@/lib/nmap-data"), url: "/tools/nmap", title: "Nmap" },
    { mod: () => import("@/lib/spring-boot-data"), url: "/tech-specific/spring-boot", title: "Spring Boot" },
    { mod: () => import("@/lib/s3-bucket-data"), url: "/cloud/s3-buckets", title: "S3 Buckets" },
    { mod: () => import("@/lib/registration-vulns-data"), url: "/advanced/registration-vulns", title: "Registration Vulns" },
    { mod: () => import("@/lib/rate-limit-bypass-data"), url: "/advanced/rate-limit-bypass", title: "Rate Limit Bypass" },
  ]

  const results: SearchEntry[] = []

  for (const { mod, url, title } of modules) {
    try {
      const data = await mod()
      const categories = Object.values(data)[0] as { category: string; commands: { command: string; description: string }[] }[]

      if (!Array.isArray(categories)) continue

      for (const cat of categories) {
        for (const cmd of (cat.commands || [])) {
          if (
            cmd.command.toLowerCase().includes(q) ||
            cmd.description?.toLowerCase().includes(q)
          ) {
            results.push({
              text: cmd.command.length > 80 ? cmd.command.slice(0, 80) + "..." : cmd.command,
              title,
              href: url,
              section: cat.category,
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
