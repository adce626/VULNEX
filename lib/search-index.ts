import { payloadCategories } from "./payloads-data"
import { encodingFormats } from "./encoding-formats-data"

export interface SearchEntry {
  text: string
  title: string
  href: string
  section: string
}

// Content pages
import { sqlInjectionCategories } from "./sql-injection-data"
import { ssrfCategories } from "./ssrf-data"
import { openRedirectCategories } from "./open-redirect-data"
import { wordpressCategories } from "./wordpress-data"
import { emailInputCategories } from "./email-input-testing-data"
import { hostHeaderInjectionCategories } from "./host-header-injection-data"
import { crlfCategories } from "./crlf-data"
import { dependencyConfusionCategories } from "./dependency-confusion-data"
import { cacheDeceptionCategories } from "./cache-deception-data"
import { bypass403Categories } from "./403-bypass-data"
import { swaggerXSSCategories } from "./swagger-xss-data"
import { springBootCategories } from "./spring-boot-data"
import { s3BucketCategories } from "./s3-bucket-data"
import { registrationVulnCategories } from "./registration-vulns-data"
import { rateLimitCategories } from "./rate-limit-bypass-data"
// Tool pages
import { ffufCategories } from "./ffuf-data"
import { nucleiCategories } from "./nuclei-data"
import { burpsuiteCategories } from "./burpsuite-data"
import { nmapCategories } from "./nmap-data"
import { sqlmapCategories } from "./sqlmap-data"
import { xsstrikeCategories } from "./xsstrike-data"
import { subfinderCategories } from "./subfinder-data"
import { amassCategories } from "./amass-data"
import { httpxCategories } from "./httpx-data"
import { cloudfoxCategories } from "./cloudfox-data"
import { jwtToolCategories } from "./jwt_tool-data"
import { arjunCategories } from "./arjun-data"
import { paramSpiderCategories } from "./paramspider-data"
import { x8Categories } from "./x8-data"
import { gfCategories } from "./gf-data"
import { gospiderCategories } from "./gospider-data"
import { cewlCategories } from "./cewl-data"
import { gobusterCategories } from "./gobuster-data"
import { hydraCategories } from "./hydra-data"
import { whatwebCategories } from "./whatweb-data"
import { wpscanCategories } from "./wpscan-data"
import { dirsearchCategories } from "./dirsearch-data"
import { johnCategories } from "./john-data"
import { searchsploitCategories } from "./searchsploit-data"
import { nucleiTemplateCategories } from "./nuclei-templates-data"
import { fastXSSCategories } from "./fast-xss-data"
// Network pentesting ports
import { networkPorts } from "./network-data"
import { wirelessModules } from "./wireless-data"
// Step pattern pages
import { wafSteps } from "./waf-data"
import { paymentSteps } from "./waf-payment-data"
import { wafSQLMapSteps } from "./waf-sqlmap-data"
import { idorSteps } from "./waf-idors-data"
import { apiFuzzingSteps } from "./api-fuzzing-data"
import { nextjsSteps } from "./nextjs-data"
// Recon pages
import { shodanDorksCategories } from "./shodan-dorks-data"
import { githubReconCategories } from "./github-recon-data"
import { paramDiscoveryCategories } from "./param-discovery-data"
// Advanced pages
import { llmInjectionCategories } from "./llm-injection-data"
import { authSessionCategories } from "./auth-session-data"
import { pasteJackingCategories } from "./blind-xss-pastejacking-data"
import { googleAPIKeysCategories } from "./google-api-keys-data"
// Special files
import { reconCommands, subdomainCommands, scanningCommands, fuzzingCommands, shortnameCommands } from "./iis-commands"
import { blindXSSSteps } from "./blind-xss-commands"
// New tool guides for search indexing
import { kiterunnerGuide } from "./guides/kiterunner"
import { niktoGuide } from "./guides/nikto"
import { theHarvesterGuide } from "./guides/theharvester"
import { metasploitGuide } from "./guides/metasploit"
import { dnsreconGuide } from "./guides/dnsrecon"
import { sherlockGuide } from "./guides/sherlock"

interface IndexItem {
  category?: string
  title?: string
  commands?: { command: string; description: string }[]
}

function extractEntries(
  data: IndexItem[],
  url: string,
  title: string,
  sectionKey: string
): { text: string; title: string; href: string; section: string }[] {
  const results: { text: string; title: string; href: string; section: string }[] = []
  if (!Array.isArray(data)) return results
  for (const item of data) {
    if (!item.commands) continue
    const sectionName = item.category || item.title || sectionKey
    for (const cmd of item.commands) {
      if (cmd.command) {
        results.push({
          text: cmd.command.length > 80 ? cmd.command.slice(0, 80) + "..." : cmd.command,
          title,
          href: url,
          section: sectionName,
        })
      }
    }
  }
  return results
}

let allEntries: SearchEntry[] | null = null

function getIndex(): SearchEntry[] {
  if (allEntries) return allEntries
  allEntries = [
    // Vulns
    ...extractEntries(sqlInjectionCategories as IndexItem[], "/vulnerabilities/sql-injection", "SQL Injection", ""),
    ...extractEntries(ssrfCategories as IndexItem[], "/vulnerabilities/ssrf", "SSRF", ""),
    ...extractEntries(openRedirectCategories as IndexItem[], "/vulnerabilities/open-redirect", "Open Redirect", ""),
    ...extractEntries(wordpressCategories as IndexItem[], "/vulnerabilities/wordpress", "WordPress", ""),
    ...extractEntries(emailInputCategories as IndexItem[], "/vulnerabilities/email-input-testing", "Email Input Testing", ""),
    ...extractEntries(hostHeaderInjectionCategories as IndexItem[], "/vulnerabilities/host-header-injection", "Host Header Injection", ""),
    ...extractEntries(crlfCategories as IndexItem[], "/vulnerabilities/crlf-injection", "CRLF Injection", ""),
    ...extractEntries(dependencyConfusionCategories as IndexItem[], "/vulnerabilities/dependency-confusion", "Dependency Confusion", ""),
    ...extractEntries(cacheDeceptionCategories as IndexItem[], "/vulnerabilities/cache-deception", "Cache Deception", ""),
    ...extractEntries(bypass403Categories as IndexItem[], "/vulnerabilities/403-bypass", "403 Bypass", ""),
    // Tech-specific
    ...extractEntries(swaggerXSSCategories as IndexItem[], "/tech-specific/swagger", "Swagger XSS", ""),
    ...extractEntries(springBootCategories as IndexItem[], "/tech-specific/spring-boot", "Spring Boot", ""),
    ...extractEntries(nextjsSteps as IndexItem[], "/tech-specific/nextjs", "Next.js", ""),
    ...extractEntries(apiFuzzingSteps as IndexItem[], "/tech-specific/api-fuzzing", "API Fuzzing", ""),
    // IIS
    ...extractEntries(reconCommands as IndexItem[], "/tech-specific/iis", "IIS Recon", ""),
    ...extractEntries(subdomainCommands as IndexItem[], "/tech-specific/iis", "IIS Subdomain", ""),
    ...extractEntries(scanningCommands as IndexItem[], "/tech-specific/iis", "IIS Scanning", ""),
    ...extractEntries(fuzzingCommands as IndexItem[], "/tech-specific/iis", "IIS Fuzzing", ""),
    ...extractEntries(shortnameCommands as IndexItem[], "/tech-specific/iis", "IIS Shortname", ""),
    // Cloud
    ...extractEntries(s3BucketCategories as IndexItem[], "/cloud/s3-buckets", "S3 Buckets", ""),
    ...extractEntries(googleAPIKeysCategories as IndexItem[], "/cloud/google-api-keys", "Google API Keys", ""),
    // Advanced
    ...extractEntries(registrationVulnCategories as IndexItem[], "/advanced/registration-vulns", "Registration Vulns", ""),
    ...extractEntries(rateLimitCategories as IndexItem[], "/advanced/rate-limit-bypass", "Rate Limit Bypass", ""),
    ...extractEntries(llmInjectionCategories as IndexItem[], "/advanced/llm-injection", "LLM Injection", ""),
    ...extractEntries(authSessionCategories as IndexItem[], "/auth-session", "Auth & Session", ""),
    ...extractEntries(pasteJackingCategories as IndexItem[], "/advanced/blind-xss-pastejacking", "Blind XSS PasteJacking", ""),
    ...extractEntries(blindXSSSteps as IndexItem[], "/advanced/blind-xss", "Blind XSS", ""),
    // WAF
    ...extractEntries(wafSteps as IndexItem[], "/waf-bypass", "WAF Bypass", ""),
    ...extractEntries(paymentSteps as IndexItem[], "/waf-bypass", "WAF Payment Bypass", ""),
    ...extractEntries(wafSQLMapSteps as IndexItem[], "/waf-bypass/sqlmap", "WAF SQLMap", ""),
    ...extractEntries(idorSteps as IndexItem[], "/waf-bypass/idor", "IDOR & 403 Bypass", ""),
    // Recon
    ...extractEntries(shodanDorksCategories as IndexItem[], "/recon/shodan-dorks", "Shodan Dorks", ""),
    ...extractEntries(githubReconCategories as IndexItem[], "/recon/github-recon", "GitHub Recon", ""),
    ...extractEntries(paramDiscoveryCategories as IndexItem[], "/recon/param-discovery", "Param Discovery", ""),
    // Tools
    ...extractEntries(ffufCategories as IndexItem[], "/methods/ffuf", "FFUF", ""),
    ...extractEntries(nucleiCategories as IndexItem[], "/tools/nuclei", "Nuclei", ""),
    ...extractEntries(burpsuiteCategories as IndexItem[], "/tools/burpsuite", "Burp Suite", ""),
    ...extractEntries(nmapCategories as IndexItem[], "/tools/nmap", "Nmap", ""),
    ...extractEntries(sqlmapCategories as IndexItem[], "/tools/sqlmap", "SQLMap", ""),
    ...extractEntries(xsstrikeCategories as IndexItem[], "/tools/xsstrike", "XSStrike", ""),
    ...extractEntries(subfinderCategories as IndexItem[], "/tools/subfinder", "Subfinder", ""),
    ...extractEntries(amassCategories as IndexItem[], "/tools/amass", "Amass", ""),
    ...extractEntries(httpxCategories as IndexItem[], "/tools/httpx", "HTTPx", ""),
    ...extractEntries(cloudfoxCategories as IndexItem[], "/tools/cloudfox", "CloudFox", ""),
    ...extractEntries(jwtToolCategories as IndexItem[], "/tools/jwt_tool", "JWT Tool", ""),
    ...extractEntries(arjunCategories as IndexItem[], "/tools/arjun", "Arjun", ""),
    ...extractEntries(paramSpiderCategories as IndexItem[], "/tools/paramspider", "ParamSpider", ""),
    ...extractEntries(x8Categories as IndexItem[], "/tools/x8", "X8", ""),
    ...extractEntries(gfCategories as IndexItem[], "/tools/gf", "GF", ""),
    ...extractEntries(gospiderCategories as IndexItem[], "/tools/gospider", "Gospider", ""),
    ...extractEntries(cewlCategories as IndexItem[], "/tools/cewl", "CeWL", ""),
    ...extractEntries(gobusterCategories as IndexItem[], "/tools/gobuster", "Gobuster", ""),
    ...extractEntries(hydraCategories as IndexItem[], "/tools/hydra", "Hydra", ""),
    ...extractEntries(whatwebCategories as IndexItem[], "/tools/whatweb", "WhatWeb", ""),
    ...extractEntries(wpscanCategories as IndexItem[], "/tools/wpscan", "WPScan", ""),
    ...extractEntries(dirsearchCategories as IndexItem[], "/tools/dirsearch", "Dirsearch", ""),
    ...extractEntries(johnCategories as IndexItem[], "/tools/john", "John", ""),
    ...extractEntries(searchsploitCategories as IndexItem[], "/tools/searchsploit", "Searchsploit", ""),
    ...extractEntries(nucleiTemplateCategories as IndexItem[], "/methods/nuclei-templates", "Nuclei Templates", ""),
    ...extractEntries(fastXSSCategories as IndexItem[], "/tools/fast-xss", "Fast XSS", ""),
    // New tools (guide-only, no data file)
    ...extractEntries(kiterunnerGuide.commands.map(c => ({ command: c.command, description: c.description })) as unknown as IndexItem[], "/tools/kiterunner", "KiteRunner", ""),
    ...extractEntries(niktoGuide.commands.map(c => ({ command: c.command, description: c.description })) as unknown as IndexItem[], "/tools/nikto", "Nikto", ""),
    ...extractEntries(theHarvesterGuide.commands.map(c => ({ command: c.command, description: c.description })) as unknown as IndexItem[], "/tools/theharvester", "theHarvester", ""),
    ...extractEntries(metasploitGuide.commands.map(c => ({ command: c.command, description: c.description })) as unknown as IndexItem[], "/tools/metasploit", "Metasploit", ""),
    ...extractEntries(dnsreconGuide.commands.map(c => ({ command: c.command, description: c.description })) as unknown as IndexItem[], "/tools/dnsrecon", "DNSRecon", ""),
    ...extractEntries(sherlockGuide.commands.map(c => ({ command: c.command, description: c.description })) as unknown as IndexItem[], "/tools/sherlock", "Sherlock", ""),
    // Payloads — name + description only for discoverability
    ...payloadCategories.flatMap(cat =>
      cat.items.slice(0, 30).map(item => ({
        text: `${item.name} — ${item.description}`,
        title: `${cat.name} Payloads`,
        href: `/payloads/${cat.id}`,
        section: "Payloads",
      }))
    ),
    // Encoding Formats
    ...encodingFormats.map(f => ({
      text: `${f.name}: ${f.description}. Security uses: ${f.securityUseCases.slice(0, 3).join(", ")}`,
      title: f.name,
      href: `/interactive/encoding-formats/${f.slug}`,
      section: "Encoding Formats",
    })),
    // Network payload generator
    { text: `Interactive payload generator: reverse shells, bind shells, web shells, Meterpreter. Languages: bash, python, powershell, netcat, php, perl, ruby, socat, node.js, go`, title: "Payload Generator", href: "/network/payloads", section: "Network Pentesting" },
    { text: `Listener setup: netcat, socat, Metasploit multi/handler, pwncat, python http server, updog`, title: "Listener Commands", href: "/network/payloads", section: "Network Pentesting" },
    { text: `MSFVenom payload builder: generate Meterpreter payloads for linux, windows, mac, android, php, asp, jsp, war`, title: "MSFVenom Builder", href: "/network/payloads", section: "Network Pentesting" },
    // Network ports
    ...networkPorts.flatMap(p => [
      { text: `${p.service} (port ${p.port}): ${p.protocolBasics.slice(0, 120)}`, title: `Port ${p.port} — ${p.service}`, href: `/network/port/${p.slug}`, section: "Network Pentesting" },
      ...p.basicEnumeration.slice(0, 3).map(e => ({ text: e.command.length > 80 ? e.command.slice(0, 80) + "..." : e.command, title: `${p.service} Enumeration`, href: `/network/port/${p.slug}`, section: "Network Pentesting" })),
      ...p.discovery.map(d => ({ text: d.command.length > 80 ? d.command.slice(0, 80) + "..." : d.command, title: `${p.service} Discovery`, href: `/network/port/${p.slug}`, section: "Network Pentesting" })),
    ]),
    // Network wireless
    ...wirelessModules.flatMap(m => [
      { text: `${m.title}: ${m.overview.slice(0, 120)}`, title: m.title, href: `/network/wireless/${m.slug}`, section: "Network Pentesting" },
      ...m.recon.slice(0, 2).map(r => ({ text: r.command.length > 80 ? r.command.slice(0, 80) + "..." : r.command, title: `${m.title} Recon`, href: `/network/wireless/${m.slug}`, section: "Network Pentesting" })),
    ]),
    // Network tool references
    { text: `airmon-ng: wireless monitor mode management — start, stop, check, check kill, usage examples, debugging, troubleshooting`, title: "airmon-ng Reference", href: "/network/resources/airmon-ng", section: "Network Pentesting" },
    { text: `Nmap scan types: TCP SYN (-sS), Connect (-sT), UDP (-sU), FIN (-sF), Xmas (-sX), Null (-sN), Ping Sweep (-sn), Idle (-sI), FTP Bounce (-sB). Complete scan type reference.`, title: "Nmap Scan Types", href: "/network/resources/nmap#scan-types", section: "Network Pentesting" },
    { text: `NSE scripts by service: SMB enumeration, HTTP discovery, SSL/TLS cipher check, DNS zone transfer, FTP anonymous, SMTP open relay, MySQL, MSSQL, SNMP, RDP, Redis, LDAP, Kerberos.`, title: "Nmap NSE by Service", href: "/network/resources/nmap#nse-by-service", section: "Network Pentesting" },
    { text: `Nmap NSE categories: default (-sC), safe, vuln, exploit, auth, brute, discovery, intrusive, version, broadcast, malware, dos.`, title: "Nmap NSE Categories", href: "/network/resources/nmap#nse-categories", section: "Network Pentesting" },
    { text: `Nmap output formats: normal (-oN), XML (-oX), grepable (-oG), all formats (-oA), append (--append-output).`, title: "Nmap Output Formats", href: "/network/resources/nmap#output-formats", section: "Network Pentesting" },
    { text: `Nmap timing templates: T0 Paranoid, T1 Sneaky, T2 Polite, T3 Normal, T4 Aggressive, T5 Insane.`, title: "Nmap Timing Templates", href: "/network/resources/nmap#timing-templates", section: "Network Pentesting" },
    { text: `Nmap firewall evasion: decoys (-D), source port, fragmention (-f), MTU, MAC spoofing, TTL, badsum, scan delay, proxies.`, title: "Nmap Firewall Evasion", href: "/network/resources/nmap#firewall-evasion", section: "Network Pentesting" },
    { text: `nmap -p- --min-rate 5000 -T4 <target> — quick full port scan. nmap -A <target> — service+OS detection. nmap --script vuln <target> — vulnerability scan.`, title: "Nmap One-Liners", href: "/network/resources/nmap#quick-one-liners", section: "Network Pentesting" },
  ]
  return allEntries
}

interface RankedEntry extends SearchEntry {
  priority: number
}

function getPriority(entry: SearchEntry, q: string): number {
  const titleLower = entry.title.toLowerCase()
  if (titleLower === q) return 0
  if (titleLower.includes(q)) return 1
  const textLower = entry.text.toLowerCase()
  if (textLower.includes(q)) return 2
  const sectionLower = entry.section.toLowerCase()
  if (sectionLower.includes(q)) return 3
  return 4
}

export function searchCommands(query: string): SearchEntry[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  const index = getIndex()
  const ranked: RankedEntry[] = []

  for (const entry of index) {
    if (
      entry.text.toLowerCase().includes(q) ||
      entry.title.toLowerCase().includes(q) ||
      entry.section.toLowerCase().includes(q)
    ) {
      ranked.push({ ...entry, priority: getPriority(entry, q) })
    }
  }

  ranked.sort((a, b) => a.priority - b.priority)
  return ranked.slice(0, 100)
}