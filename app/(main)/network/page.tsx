"use client"

import Link from "next/link"
import { networkPorts } from "@/lib/network-data"
import { Network, Terminal, ChevronRight, Shield, ArrowRight } from "lucide-react"

const toolsList = [
  { name: "Nmap", url: "https://nmap.org", desc: "Industry standard network discovery and security scanning tool" },
  { name: "Masscan", url: "https://github.com/robertdavidgraham/masscan", desc: "Fastest port scanner — scans entire internet in minutes" },
  { name: "RustScan", url: "https://github.com/RustScan/RustScan", desc: "Modern Nmap wrapper that scans all ports in 3 seconds" },
  { name: "Naabu", url: "https://github.com/projectdiscovery/naabu", desc: "Fast port scanner from ProjectDiscovery with CDN detection" },
]

const methodologySteps = [
  { label: "Discovery", description: "Find live hosts and open ports" },
  { label: "Scan", description: "Identify service versions and OS" },
  { label: "Enumerate", description: "Extract details about each service" },
  { label: "Exploit", description: "Leverage vulnerabilities for access" },
]

export default function NetworkPage() {
  const totalCves = networkPorts.reduce((acc, p) => acc + p.vulnerabilities.length, 0)

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
          <Link href="/network/resources" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Resources
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-b px-6 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="radar-line absolute left-1/2 h-full w-3/5 -translate-x-1/2" style={{
            background: "linear-gradient(180deg, transparent 0%, var(--network-primary-glow) 50%, transparent 100%)",
            animation: "radar-sweep 5s ease-in-out infinite",
            opacity: 0.3,
          }} />
        </div>
        <div className="relative">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--network-primary-glow)", border: "1px solid var(--network-primary-dim)" }}>
            <Network className="h-8 w-8" style={{ color: "var(--network-primary)" }} />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-wider sm:text-5xl lg:text-6xl" style={{ color: "var(--network-primary)" }}>
            NETWORK PENTESTING LAB
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg" style={{ color: "var(--network-text-secondary)" }}>
            From reconnaissance to full exploitation. A structured guide to network service attacks — port by port, technique by technique.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div>
              <div className="text-2xl font-bold font-mono" style={{ color: "var(--network-primary)" }}>{networkPorts.length}</div>
              <div className="text-xs tracking-wider" style={{ color: "var(--network-text-muted)" }}>PORTS</div>
            </div>
            <div className="w-px" style={{ background: "var(--network-border)" }} />
            <div>
              <div className="text-2xl font-bold font-mono" style={{ color: "var(--network-primary)" }}>120+</div>
              <div className="text-xs tracking-wider" style={{ color: "var(--network-text-muted)" }}>COMMANDS</div>
            </div>
            <div className="w-px" style={{ background: "var(--network-border)" }} />
            <div>
              <div className="text-2xl font-bold font-mono" style={{ color: "var(--network-primary)" }}>{totalCves}+</div>
              <div className="text-xs tracking-wider" style={{ color: "var(--network-text-muted)" }}>CVES</div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-b px-6 py-12" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-sm font-semibold tracking-widest" style={{ color: "var(--network-primary)" }}>METHODOLOGY</h2>
            <p className="mt-2 text-xl font-bold">The Attack Lifecycle</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {methodologySteps.map((step, i) => (
              <div key={step.label} className="network-card p-5 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--network-primary-glow)", border: "1px solid var(--network-primary-dim)" }}>
                  <span className="text-sm font-bold font-mono" style={{ color: "var(--network-primary)" }}>{i + 1}</span>
                </div>
                <h3 className="mb-1 text-sm font-bold">{step.label}</h3>
                <p className="text-xs" style={{ color: "var(--network-text-muted)" }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-b px-6 py-12" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-sm font-semibold tracking-widest" style={{ color: "var(--network-primary)" }}>RECOMMENDED TOOLS</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {toolsList.map((tool) => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" className="network-card flex flex-col items-center p-5 text-center">
                <Terminal className="mb-3 h-6 w-6" style={{ color: "var(--network-primary)" }} />
                <h3 className="mb-1 text-sm font-bold">{tool.name}</h3>
                <p className="text-xs" style={{ color: "var(--network-text-muted)" }}>{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ports */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-sm font-semibold tracking-widest" style={{ color: "var(--network-primary)" }}>PORT GUIDE</h2>
              <p className="text-sm" style={{ color: "var(--network-text-muted)" }}>Featured protocols — select a port to explore the full attack workflow</p>
            </div>
            <Link href="/network/ports" className="network-card flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors" style={{ color: "var(--network-primary)" }}>
              View All {networkPorts.length} Ports <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {networkPorts.slice(0, 6).map((p) => (
              <Link key={p.slug} href={`/network/port/${p.slug}`} className="network-card group flex flex-col p-5">
                <span className="mb-1 font-mono text-2xl font-bold tracking-tight" style={{ color: "var(--network-primary)" }}>
                  {p.port}
                </span>
                <span className="mb-3 text-sm font-medium">{p.service}</span>
                <div className="mt-auto flex items-center gap-3 text-xs" style={{ color: "var(--network-text-muted)" }}>
                  <span className="flex items-center gap-1">
                    <span className={`difficulty-dot ${p.difficulty}`} />
                    {p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}
                  </span>
                  <span>{p.vulnerabilities.length} CVE</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--network-primary)" }}>
                  Explore <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-6 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
        <p className="mb-4 text-xs" style={{ color: "var(--network-text-muted)" }}>For authorized security testing only. Use responsibly.</p>
        <Link href="/" className="inline-flex items-center gap-1 text-xs transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
          <Shield className="h-3 w-3" /> Back to VULNEX Home
        </Link>
      </footer>
    </div>
  )
}
