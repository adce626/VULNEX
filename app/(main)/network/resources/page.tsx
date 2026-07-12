"use client"

import Link from "next/link"
import { Terminal, ExternalLink, Shield, Database, BookOpen, Github, ChevronRight } from "lucide-react"

interface ResourceSection {
  title: string
  icon: React.ReactNode
  items: { name: string; url: string; description: string }[]
}

const resources: ResourceSection[] = [
  {
    title: "Internal Tool References",
    icon: <Terminal className="h-4 w-4" />,
    items: [
      { name: "airmon-ng Reference", url: "/network/resources/airmon-ng", description: "Complete airmon-ng guide — monitor mode management, usage examples, debugging, and troubleshooting from the aircrack-ng suite." },
      { name: "Nmap Reference", url: "/network/resources/nmap", description: "Complete nmap reference — scan types, NSE scripts by service, output formats, timing templates, firewall evasion techniques, and essential one-liners." },
    ],
  },
  {
    title: "Official References",
    icon: <Database className="h-4 w-4" />,
    items: [
      { name: "NVD — National Vulnerability Database", url: "https://nvd.nist.gov", description: "Official U.S. government repository of standards-based vulnerability management data with CVE references." },
      { name: "CISA KEV — Known Exploited Vulnerabilities", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", description: "Catalog of vulnerabilities that have been exploited in the wild, maintained by CISA." },
      { name: "MITRE ATT&CK", url: "https://attack.mitre.org", description: "Knowledge base of adversary tactics and techniques based on real-world observations." },
      { name: "OWASP", url: "https://owasp.org", description: "Open Web Application Security Project — community-driven resources for web application security." },
    ],
  },
  {
    title: "Comprehensive Collections",
    icon: <BookOpen className="h-4 w-4" />,
    items: [
      { name: "awesome-pentest", url: "https://github.com/enaqx/awesome-pentest", description: "Curated list of awesome penetration testing resources, tools, and references." },
      { name: "PayloadsAllTheThings", url: "https://github.com/swisskyrepo/PayloadsAllTheThings", description: "A list of useful payloads and bypass techniques for Web Application Security and Pentesting." },
      { name: "HackTricks", url: "https://book.hacktricks.xyz", description: "Hacking tricks and techniques with practical examples for penetration testers." },
    ],
  },
  {
    title: "Essential Network Tools",
    icon: <Terminal className="h-4 w-4" />,
    items: [
      { name: "Nmap", url: "https://nmap.org", description: "Industry standard network discovery and security scanning tool with powerful NSE scripting." },
      { name: "Masscan", url: "https://github.com/robertdavidgraham/masscan", description: "World's fastest port scanner — can scan the entire internet in under 5 minutes." },
      { name: "RustScan", url: "https://github.com/RustScan/RustScan", description: "Modern, fast port scanner that integrates with Nmap for detailed service scanning." },
      { name: "Naabu", url: "https://github.com/projectdiscovery/naabu", description: "Fast port scanner with CDN detection, service probing, and Zmap integration." },
      { name: "Impacket", url: "https://github.com/fortra/impacket", description: "Collection of Python classes for working with network protocols — includes secretsdump, psexec, and more." },
      { name: "CrackMapExec", url: "https://github.com/Porchetta-Industries/CrackMapExec", description: "Swiss army knife for pentesting Windows/AD environments with SMB, LDAP, WinRM, and more." },
      { name: "Responder", url: "https://github.com/lgandx/Responder", description: "NBT-NS, LLMNR, and MDNS poisoner for capturing NTLM hashes on local networks." },
    ],
  },
  {
    title: "Training Platforms",
    icon: <Shield className="h-4 w-4" />,
    items: [
      { name: "Hack The Box", url: "https://www.hackthebox.com", description: "Online cybersecurity training platform with realistic VMs for hands-on pentesting practice." },
      { name: "TryHackMe", url: "https://tryhackme.com", description: "Beginner-friendly cybersecurity training with guided rooms and hands-on labs." },
      { name: "PentesterLab", url: "https://pentesterlab.com", description: "Learn web security through practical exercises with progressive difficulty levels." },
    ],
  },
  {
    title: "Research & Learning",
    icon: <Github className="h-4 w-4" />,
    items: [
      { name: "Exploit-DB", url: "https://www.exploit-db.com", description: "Archive of public exploits and corresponding vulnerable software, maintained by Offensive Security." },
      { name: "Packet Storm", url: "https://packetstormsecurity.com", description: "Latest security news, vulnerabilities, exploits, and tools published daily." },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b px-6" style={{ background: "var(--network-bg)", borderColor: "var(--network-border)" }}>
        <Link href="/network" className="flex items-center gap-2 text-sm font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>
          <Terminal className="h-4 w-4" /> NETWORK
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            &larr; Main Site
          </Link>
          <Link href="/network/ports" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Ports
          </Link>
          <Link href="/network/payloads" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Payloads
          </Link>
          <Link href="/network/wireless" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Wireless
          </Link>
          <span style={{ color: "var(--network-text)" }}>Resources</span>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b px-6 py-16 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--network-primary-glow)", border: "1px solid var(--network-primary-dim)" }}>
          <BookOpen className="h-7 w-7" style={{ color: "var(--network-primary)" }} />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-wider sm:text-4xl" style={{ color: "var(--network-primary)" }}>
          RESOURCES & REFERENCES
        </h1>
        <p className="mx-auto max-w-xl text-sm" style={{ color: "var(--network-text-secondary)" }}>
          Curated external resources for network penetration testing and security research.
        </p>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="space-y-10">
          {resources.map((section) => (
            <div key={section.title}>
              <div className="mb-4 flex items-center gap-2">
                <span style={{ color: "var(--network-primary)" }}>{section.icon}</span>
                <h2 className="text-sm font-semibold tracking-wider" style={{ color: "var(--network-primary)" }}>{section.title}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => {
                  const isInternal = item.url.startsWith("/")
                  const linkClass = "network-card flex items-start gap-3 p-4"
                  const icon = isInternal
                    ? <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--network-primary)" }} />
                    : <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--network-primary)" }} />

                  if (isInternal) {
                    return (
                      <Link key={item.name} href={item.url} className={linkClass}>
                        {icon}
                        <div>
                          <h3 className="mb-1 text-sm font-semibold">{item.name}</h3>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{item.description}</p>
                        </div>
                      </Link>
                    )
                  }

                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {icon}
                      <div>
                        <h3 className="mb-1 text-sm font-semibold">{item.name}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{item.description}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t pt-8 text-center" style={{ borderColor: "var(--network-border)" }}>
          <div className="mx-auto mb-4 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
          <Link href="/network" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
            <Terminal className="h-3 w-3" /> Back to Port Index
          </Link>
        </footer>
      </div>
    </div>
  )
}
