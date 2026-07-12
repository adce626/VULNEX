"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState, useCallback } from "react"
import { wirelessModules, categoryMeta, type WirelessModule, type Severity } from "@/lib/wireless-data"
import { ChevronRight, Copy, Check, Terminal, Wifi, Shield, Radio, Signal } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  wep: <Signal className="h-3.5 w-3.5" />,
  "wpa-personal": <Shield className="h-3.5 w-3.5" />,
  wps: <Radio className="h-3.5 w-3.5" />,
  "evil-twin": <Wifi className="h-3.5 w-3.5" />,
  wpa3: <Shield className="h-3.5 w-3.5" />,
  deauth: <Radio className="h-3.5 w-3.5" />,
  enterprise: <Terminal className="h-3.5 w-3.5" />,
}

const severityColors: Record<Severity, string> = {
  critical: "oklch(0.6 0.22 25)",
  high: "oklch(0.7 0.18 45)",
  medium: "oklch(0.75 0.15 85)",
  low: "oklch(0.6 0.05 200)",
}

const difficultyColors: Record<string, string> = {
  easy: "oklch(0.6 0.15 145)",
  medium: "oklch(0.7 0.15 85)",
  hard: "oklch(0.65 0.2 25)",
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

const commandPrefixes = [
  "airmon-ng", "airodump-ng", "aireplay-ng", "aircrack-ng",
  "hcxdumptool", "hcxpcapngtool", "hashcat", "cap2hccapx",
  "reaver", "bully", "wash", "macchanger",
  "hostapd", "dnsmasq", "airgeddon", "bettercap", "fluxion",
  "iptables", "mitmproxy", "responder", "nmap", "masscan",
  "mdk4", "tcpdump", "wireshark", "tshark",
  "Dragonforce", "python", "python3",
  "asleap", "impacket", "smbclient", "rpcclient",
  "hydra", "enum4linux", "nbtscan", "nmblookup",
  "rfkill", "iwconfig", "iwlist", "iw", "service",
  "rmmod", "modprobe", "pkill", "wlanconfig",
  "cap2hccapx", "airbase-ng", "packetforge-ng", "ifconfig",
  "git clone", "sudo", "cd /",
  "apt", "apt-get", "pip", "pip3", "wget", "curl", "chmod", "chown", "./", "#!",
]

function isCommand(text: string): boolean {
  const trimmed = text.trim()
  return commandPrefixes.some((prefix) => trimmed.startsWith(prefix))
}

function DescriptionText({ text }: { text: string }) {
  return (
    <p className="mb-2 text-xs leading-relaxed last:mb-0" style={{ color: "var(--network-text)" }}>
      {text}
    </p>
  )
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase"
      style={{ background: `${severityColors[severity]}20`, color: severityColors[severity], border: `1px solid ${severityColors[severity]}40` }}
    >
      {severity}
    </span>
  )
}

export default function WirelessModulePage() {
  const params = useParams()
  const mod = wirelessModules.find((m) => m.slug === params?.slug)

  if (!mod) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6" style={{ background: "var(--network-bg)" }}>
        <span className="font-mono text-6xl" style={{ color: "var(--network-primary)" }}>404</span>
        <p className="text-sm" style={{ color: "var(--network-text-muted)" }}>Wireless module not found.</p>
        <Link href="/network/wireless" className="text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
          &larr; Back to Wireless Modules
        </Link>
      </div>
    )
  }

  const relatedMods = wirelessModules.filter((m) => mod.relatedModules.includes(m.slug))

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b px-6" style={{ background: "var(--network-bg)", borderColor: "var(--network-border)" }}>
        <Link href="/network" className="flex items-center gap-2 text-sm font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>
          <Terminal className="h-4 w-4" /> NETWORK
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/network/wireless" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            &larr; Wireless
          </Link>
          <Link href="/network/ports" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Ports
          </Link>
          <Link href="/network/payloads" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Payloads
          </Link>
          <span style={{ color: "var(--network-text)" }}>{mod.title}</span>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b px-6 py-12" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className="flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-bold tracking-wider"
              style={{ background: "var(--network-primary-glow)", color: "var(--network-primary)" }}
            >
              {categoryIcons[mod.category]} {categoryMeta[mod.category].label}
            </span>
            <span className="font-mono text-[10px] font-bold" style={{ color: difficultyColors[mod.difficulty] }}>
              {mod.difficulty.toUpperCase()}
            </span>
          </div>
          <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--network-text)" }}>
            {mod.title}
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--network-text-muted)" }}>
            {mod.overview}
          </p>
          {mod.overviewNote && (
            <div className="mt-4 rounded-lg border p-4 text-xs leading-relaxed" style={{ background: "oklch(0.045 0.03 265)", borderColor: "var(--network-primary-dim)", color: "var(--network-text)", borderLeft: "3px solid var(--network-primary)" }}>
              {mod.overviewNote}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Requirements */}
        <section className="mb-12">
          <h2 className="mb-4 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>REQUIREMENTS</h2>
          <div className="space-y-2">
            {mod.requirements.map((req, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border px-4 py-2.5" style={{ background: "var(--network-card-bg)", borderColor: "var(--network-border)" }}>
                <span className="mt-0.5 shrink-0 font-mono text-[10px] font-bold" style={{ color: "var(--network-primary)" }}>{i + 1}</span>
                <span className="text-xs leading-relaxed" style={{ color: "var(--network-text)" }}>{req}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recon */}
        <section className="mb-12">
          <h2 className="mb-4 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>RECONNAISSANCE</h2>
          <div className="space-y-3">
            {mod.recon.map((r, i) => (
              <div key={i}>
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase" style={{ color: "var(--network-primary)" }}>{r.tool}</span>
                </div>
                <CommandBlock cmd={r.command} note={r.note} />
              </div>
            ))}
          </div>
        </section>

        {/* Attack Steps */}
        <section className="mb-12">
          <h2 className="mb-6 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>ATTACK STEPS</h2>
          <div className="space-y-8">
            {mod.attackSteps.map((step, si) => (
              <div key={si} className="rounded-lg border p-5" style={{ background: "var(--network-card-bg)", borderColor: "var(--network-border)" }}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold" style={{ background: "var(--network-primary-glow)", color: "var(--network-primary)" }}>
                    {si + 1}
                  </span>
                  <h3 className="text-sm font-bold" style={{ color: "var(--network-text)" }}>{step.title}</h3>
                </div>
                <div className="space-y-2">
                  {step.steps.map((s, j) => {
                    if (s.startsWith("Note:") || s.startsWith("Tool:")) {
                      return <DescriptionText key={j} text={s} />
                    }
                    return isCommand(s)
                      ? <CommandBlock key={j} cmd={s} />
                      : <DescriptionText key={j} text={s} />
                  })}
                </div>
                {step.tools && step.tools.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {step.tools.map((t) => (
                      <span key={t} className="rounded px-2 py-0.5 font-mono text-[10px]" style={{ background: "var(--network-primary-glow)", color: "var(--network-primary)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Vulnerabilities */}
        {mod.vulnerabilities && mod.vulnerabilities.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>VULNERABILITIES & CVEs</h2>
            <div className="space-y-3">
              {mod.vulnerabilities.map((vuln, i) => (
                <div key={i} className="rounded-lg border p-4" style={{ background: "var(--network-card-bg)", borderColor: "var(--network-border)" }}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <SeverityBadge severity={vuln.severity} />
                    {vuln.cve && (
                      <a
                        href={vuln.sourceUrl || `https://nvd.nist.gov/vuln/detail/${vuln.cve}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] transition-colors hover:text-white"
                        style={{ color: "var(--network-primary)" }}
                      >
                        {vuln.cve}
                      </a>
                    )}
                  </div>
                  <h3 className="mb-1 text-sm font-bold" style={{ color: "var(--network-text)" }}>{vuln.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{vuln.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools Used */}
        <section className="mb-12">
          <h2 className="mb-4 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>TOOLS</h2>
          <div className="flex flex-wrap gap-2">
            {mod.tools.map((t) => (
              <span key={t} className="rounded-lg border px-3 py-1.5 font-mono text-xs" style={{ borderColor: "var(--network-primary-dim)", color: "var(--network-primary)" }}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Hardening */}
        <section className="mb-12">
          <h2 className="mb-4 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>HARDENING</h2>
          <div className="space-y-3">
            {mod.hardening.map((h, i) => (
              <div key={i} className="rounded-lg border p-4" style={{ background: "var(--network-card-bg)", borderColor: "var(--network-border)" }}>
                <h3 className="mb-1 text-sm font-bold" style={{ color: "var(--network-text)" }}>{h.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{h.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Modules */}
        {relatedMods.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>RELATED MODULES</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedMods.map((rm) => (
                <Link
                  key={rm.slug}
                  href={`/network/wireless/${rm.slug}`}
                  className="network-card flex items-center justify-between p-4"
                >
                  <div>
                    <span className="text-xs font-bold" style={{ color: "var(--network-primary)" }}>{rm.title}</span>
                    <span className="ml-2 font-mono text-[10px]" style={{ color: difficultyColors[rm.difficulty] }}>
                      {rm.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--network-primary)" }} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-6 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
        <Link href="/network/wireless" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
          &larr; Back to Wireless Modules
        </Link>
      </footer>
    </div>
  )
}
