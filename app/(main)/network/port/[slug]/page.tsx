"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState, useCallback, useMemo } from "react"
import { networkPorts, categoryMeta, type Severity } from "@/lib/network-data"
import { PORT_NAME_MAP } from "@/lib/port-names"
import { ChevronRight, Copy, Check, Shield, ExternalLink, Terminal, Skull, Server, Globe } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  "remote-access": <Skull className="h-3.5 w-3.5" />,
  database: <Server className="h-3.5 w-3.5" />,
  web: <Globe className="h-3.5 w-3.5" />,
  "file-transfer": <ExternalLink className="h-3.5 w-3.5" />,
  mail: <Terminal className="h-3.5 w-3.5" />,
  "network-services": <Globe className="h-3.5 w-3.5" />,
  other: <Terminal className="h-3.5 w-3.5" />,
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])

  return (
    <button onClick={handleCopy} className={`network-copy-btn ${copied ? "copied" : ""}`}>
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CommandBlock({ cmd, note }: { cmd: string; note?: string }) {
  const displayCmd = cmd.replace(/<[^>]+>/g, (m) => `[${m.slice(1, -1)}]`)

  return (
    <div className="mb-3">
      <div className="flex items-start gap-2">
        <code className="network-command-block flex-1">{displayCmd}</code>
        <CopyButton text={cmd} />
      </div>
      {note && <p className="mt-1 text-xs" style={{ color: "var(--network-text-muted)" }}>{note}</p>}
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="network-card mb-6 p-6">
      <h3 className="mb-4 text-sm font-semibold tracking-wider" style={{ color: "var(--network-primary)" }}>{title}</h3>
      {children}
    </div>
  )
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return <span className={`severity-badge ${severity}`}>{severity}</span>
}

const commandPrefixes = [
  "nmap", "masscan", "rustscan", "naabu", "hydra", "medusa", "ncrack", "hashcat",
  "curl", "wget", "whatweb", "gobuster", "ffuf", "wpscan", "joomscan", "nikto",
  "sqlmap", "testssl", "sslscan", "sslyze", "openssl", "wafw00f", "wfuzz",
  "smbclient", "smbmap", "crackmapexec", "impacket-", "secretsdump",
  "msfconsole", "use ", "set ", "run", "search ", "show ",
  "msfvenom", "searchsploit", "ssh", "telnet",
  "nc ", "ncat ", "socat", "netcat", "ftp", "tftp", "finger",
  "python", "python3", "bash", "powershell",
  "cat ", "echo ", "git clone", "ssh-keygen", "redis-cli", "chmod", "chown", "./",
  "showmount", "mount ", "exportfs", "export ", "ldapsearch", "enum4linux", "rpcclient",
  "snmpwalk", "snmpget", "snmpset", "snmpenum", "onesixtyone", "ike-scan",
  "EXEC ", "CREATE ", "SELECT ", "INSERT ", "USE ", "DROP ", "ALTER ", "GRANT ", "REVOKE ",
  "import ", "server.", "for ", "while ", "do", "then", "done", "else", "fi", "case ", "esac",
  "docker", "kubectl", "sqlcmd", "osql", "mysql ", "psql ", "sqsh",
  "xfreerdp", "rdesktop", "vncviewer", "adb", "dnsrecon", "dnsenum",
  "theharvester", "sublist3r", "amass", "wireshark", "tshark", "tcpdump",
  "iwconfig", "airmon-ng", "airodump-ng", "aireplay-ng", "aircrack-ng",
  "iwlist", "mdk4", "reaver", "bully", "pixiewps", "bettercap", "hostapd", "dnsmasq",
  "john ", "proxychains", "chisel", "ligolo",
  "helo", "ehlo", "mail from:", "rcpt to:", "data", "Subject:", "QUIT",
  "sudo", "apt", "apt-get", "yum", "dnf", "brew", "pip", "pip3", "gem", "npm",
  "crowbar", "legba", "droopescan", "cmsmap", "rpcinfo", "rusers", "nbtscan",
  "rexec", "responder", "ettercap", "arpspoof", "cameradar", "ffmpeg", "ffplay", "vlc",
  "sendEmail", "swaks", "smod", "finger-user-enum", "ldapmodify", "ldapdomaindump",
  "windapsearch", "tscon", "query ", "reg ", "net ", "#!",
  "gpresult", "runas", "wmic", "mmc", "certutil",
]

function isCommand(text: string): boolean {
  const trimmed = text.trim()
  return commandPrefixes.some((prefix) => trimmed.startsWith(prefix))
}

function DescriptionText({ text }: { text: string }) {
  return (
    <p className="mb-2 text-xs leading-relaxed last:mb-0" style={{ color: "var(--network-text-secondary)" }}>
      {text}
    </p>
  )
}

export default function PortPage() {
  const params = useParams()
  const slug = params.slug as string

  const port = networkPorts.find((p) => p.slug === slug)

  if (!port) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{ background: "var(--network-bg)" }}>
        <h1 className="text-2xl font-bold" style={{ color: "var(--network-primary)" }}>Port Not Found</h1>
        <p style={{ color: "var(--network-text-muted)" }}>The requested port does not exist in the database.</p>
        <Link href="/network" className="text-sm transition-colors" style={{ color: "var(--network-primary)" }}>
          &larr; Back to Port Index
        </Link>
      </div>
    )
  }

  const severityCounts = { critical: 0, high: 0, medium: 0, low: 0 }
  port.vulnerabilities.forEach((v) => severityCounts[v.severity]++)

  const getMaxSeverity = (): Severity => {
    if (severityCounts.critical > 0) return "critical"
    if (severityCounts.high > 0) return "high"
    if (severityCounts.medium > 0) return "medium"
    return "low"
  }

  const combinedRelatedPorts = useMemo(() => {
    const fromRelated = port.relatedPorts.filter((rp) => rp !== port.port)
    const fromFamily = port.serviceFamily
      ? networkPorts
          .filter((p) => p.slug !== port.slug && p.serviceFamily === port.serviceFamily)
          .map((p) => p.port)
      : []
    return [...new Set([...fromFamily, ...fromRelated])]
  }, [port])

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
          <Link href="/network" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            &larr; Ports
          </Link>
          <span className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>{port.port}</span>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b px-6 py-10" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-3 text-xs" style={{ color: "var(--network-text-muted)" }}>
            <Link href="/network" className="transition-colors hover:text-white">Ports</Link>
            <ChevronRight className="h-3 w-3" />
            <span style={{ color: "var(--network-text)" }}>{port.port} {port.service}</span>
          </div>
          <div className="flex items-start gap-6">
            <div className="text-7xl font-bold font-mono tracking-tight sm:text-8xl" style={{ color: "var(--network-primary)" }}>
              {port.port}
            </div>
            <div className="pt-2">
              <h1 className="text-3xl font-bold sm:text-4xl">{port.service}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm" style={{ color: "var(--network-text-secondary)" }}>
                <span className="uppercase text-xs tracking-wider">{port.protocol}</span>
                <span className="flex items-center gap-1">
                  <span className={`difficulty-dot ${port.difficulty}`} />
                  {port.difficulty.charAt(0).toUpperCase() + port.difficulty.slice(1)}
                </span>
                <span className={`category-badge ${port.category}`}>
                  {categoryIcons[port.category]} {categoryMeta[port.category]?.label}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--network-text-secondary)" }}>
                <span>{port.vulnerabilities.length} CVEs</span>
                <span style={{ color: "var(--network-text-muted)" }}>|</span>
                {severityCounts.critical > 0 && <span style={{ color: "var(--severity-critical)" }}>{severityCounts.critical} Critical</span>}
                {severityCounts.high > 0 && <span style={{ color: "var(--severity-high)" }}>{severityCounts.high} High</span>}
                {severityCounts.medium > 0 && <span style={{ color: "var(--severity-medium)" }}>{severityCounts.medium} Medium</span>}
                {severityCounts.low > 0 && <span style={{ color: "var(--severity-low)" }}>{severityCounts.low} Low</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Protocol Basics */}
        <SectionCard title="PROTOCOL BASICS">
          <p className="text-sm leading-relaxed" style={{ color: "var(--network-text-secondary)" }}>{port.protocolBasics}</p>
        </SectionCard>

        {/* Discovery */}
        <SectionCard title="DISCOVERY">
          <p className="mb-4 text-xs" style={{ color: "var(--network-text-muted)" }}>Find hosts with this port open</p>
          {port.discovery.map((item, i) => (
            <CommandBlock key={i} cmd={item.command} note={item.note} />
          ))}
        </SectionCard>

        {/* Basic Enumeration */}
        <SectionCard title="BASIC ENUMERATION">
          <p className="mb-4 text-xs" style={{ color: "var(--network-text-muted)" }}>Initial fingerprinting and service information gathering</p>
          {port.basicEnumeration.map((item, i) => (
            <CommandBlock key={i} cmd={item.command} note={item.note} />
          ))}
        </SectionCard>

        {/* Advanced Enumeration */}
        <SectionCard title="ADVANCED ENUMERATION">
          <p className="mb-4 text-xs" style={{ color: "var(--network-text-muted)" }}>Deeper enumeration for specific service details</p>
          {port.advancedEnumeration.map((item, i) => (
            <CommandBlock key={i} cmd={item.command} note={item.note} />
          ))}
        </SectionCard>

        {/* Common Misconfigs */}
        <SectionCard title="COMMON MISCONFIGURATIONS">
          <div className="space-y-3">
            {port.commonMisconfigs.map((m, i) => (
              <div key={i} className="rounded-lg border p-3" style={{ borderColor: "var(--network-border)" }}>
                <h4 className="mb-1 text-sm font-semibold">{m.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{m.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Default Credentials */}
        {port.defaultCredentials && port.defaultCredentials.length > 0 && (
          <SectionCard title="DEFAULT CREDENTIALS">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left" style={{ borderColor: "var(--network-border)", color: "var(--network-text-muted)" }}>
                    <th className="pb-2 pr-4 font-medium">Username</th>
                    <th className="pb-2 pr-4 font-medium">Password</th>
                    <th className="pb-2 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {port.defaultCredentials.map((dc, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: "var(--network-border)" }}>
                      <td className="py-2 pr-4 font-mono">{dc.username}</td>
                      <td className="py-2 pr-4 font-mono">{dc.password || "(empty)"}</td>
                      <td className="py-2" style={{ color: "var(--network-text-muted)" }}>{dc.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        )}

        {/* Vulnerabilities */}
        <SectionCard title="VULNERABILITIES">
          <div className="space-y-3">
            {port.vulnerabilities.map((v, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: "var(--network-border)" }}>
                <span className={`severity-dot ${v.severity} mt-1`} />
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <SeverityBadge severity={v.severity} />
                    {v.cve && (
                      <span className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>
                        {v.cve}
                      </span>
                    )}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold">{v.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{v.description}</p>
                  {v.sourceUrl && (
                    <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
                      View on NVD <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {v.exploitNote && (
                    <div className="mt-2 rounded-lg border p-2.5 text-xs leading-relaxed" style={{ background: "oklch(0.6 0.22 25 / 0.08)", borderColor: "oklch(0.6 0.22 25 / 0.2)", color: "var(--network-text-secondary)" }}>
                      <span className="mb-0.5 block font-semibold" style={{ color: "var(--severity-critical)" }}>EXPLOITATION NOTE</span>
                      {v.exploitNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Client Commands Reference */}
        {port.clientCommands && port.clientCommands.length > 0 && (
          <SectionCard title="CLIENT COMMANDS">
            <p className="mb-4 text-xs" style={{ color: "var(--network-text-muted)" }}>Common commands for interacting with this service</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left" style={{ borderColor: "var(--network-border)", color: "var(--network-text-muted)" }}>
                    <th className="pb-2 pr-4 font-medium font-mono">Command</th>
                    <th className="pb-2 pr-4 font-medium">Description</th>
                    <th className="pb-2 font-medium">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {port.clientCommands.map((c, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: "var(--network-border)" }}>
                      <td className="py-2 pr-4 font-mono" style={{ color: "var(--network-primary)" }}>{c.cmd}</td>
                      <td className="py-2 pr-4" style={{ color: "var(--network-text-secondary)" }}>{c.description}</td>
                      <td className="py-2 font-mono" style={{ color: "var(--network-text-muted)" }}>{c.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        )}

        {/* Exploitation */}
        <SectionCard title="EXPLOITATION">
          {port.quickWin && (
            <div className="mb-4 rounded-lg border p-3" style={{ background: "oklch(0.05 0.01 200)", borderColor: "oklch(0.2 0.05 200)" }}>
              <p className="mb-1 text-xs font-semibold" style={{ color: "oklch(0.75 0.15 200)" }}>QUICK WIN</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-secondary)" }}>{port.quickWin}</p>
            </div>
          )}
          <div className="space-y-8">
            {port.exploitation.map((ex, i) => (
              <div key={i}>
                <h4 className="mb-3 text-sm font-semibold">{ex.title}</h4>
                {ex.exploitNote && (
                  <div className="mb-3 rounded-lg border p-3" style={{ background: "oklch(0.08 0.04 30)", borderColor: "oklch(0.3 0.1 30)" }}>
                    <p className="text-xs leading-relaxed" style={{ color: "oklch(0.75 0.12 30)" }}>{ex.exploitNote}</p>
                  </div>
                )}
                {ex.steps.map((step, j) => {
                  if (isCommand(step)) {
                    return <CommandBlock key={j} cmd={step} />
                  }
                  return <DescriptionText key={j} text={step} />
                })}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Post Exploitation */}
        {port.postExploitation && port.postExploitation.length > 0 && (
          <SectionCard title="POST-EXPLOITATION">
            <div className="space-y-3">
              {port.postExploitation.map((pe, i) => (
                <div key={i}>
                  <h4 className="mb-1 text-sm font-semibold">{pe.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{pe.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Hardening */}
        <SectionCard title="HARDENING">
          <div className="hardening-panel p-4">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" style={{ color: "oklch(0.7 0.15 200)" }} />
              <span className="text-xs font-semibold tracking-wider" style={{ color: "oklch(0.7 0.15 200)" }}>DEFENSIVE MEASURES</span>
            </div>
            <div className="space-y-3">
              {port.hardening.map((h, i) => (
                <div key={i}>
                  <h4 className="mb-1 text-sm font-semibold">{h.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Practice Labs */}
        {port.practiceLab && port.practiceLab.length > 0 && (
          <SectionCard title="PRACTICE LABS">
            <div className="flex flex-wrap gap-2">
              {port.practiceLab.map((lab, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium" style={{ borderColor: "var(--network-border)" }}>
                  <span className="font-semibold" style={{ color: lab.platform === "HTB" ? "oklch(0.7 0.2 160)" : "oklch(0.7 0.2 220)" }}>
                    {lab.platform}
                  </span>
                  {lab.name}
                </span>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Related Ports */}
        <SectionCard title="RELATED PORTS">
          <div className="flex flex-wrap gap-2">
            {combinedRelatedPorts.map((rp) => {
              const related = networkPorts.find((p) => p.port === rp)
              const name = related ? related.service : (PORT_NAME_MAP[rp] || "Unknown")
              return related ? (
                <Link
                  key={rp}
                  href={`/network/port/${related.slug}`}
                  className="network-card inline-flex items-center gap-2 px-3 py-2 text-xs"
                >
                  <span className="font-mono font-bold" style={{ color: "var(--network-primary)" }}>{rp}</span>
                  <span style={{ color: "var(--network-text-muted)" }}>{name}</span>
                </Link>
              ) : (
                <span key={rp} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs" style={{ borderColor: "var(--network-border)", color: "var(--network-text-muted)" }}>
                  <span className="font-mono">{rp}</span>
                  <span>{name}</span>
                </span>
              )
            })}
          </div>
        </SectionCard>

        {/* Footer */}
        <footer className="border-t pt-8 text-center" style={{ borderColor: "var(--network-border)" }}>
          <div className="mx-auto mb-4 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
          <Link href="/network" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
            <Terminal className="h-3 w-3" /> Back to Port Index
          </Link>
        </footer>
      </div>
    </div>
  )
}
