"use client"

import Link from "next/link"
import { wirelessModules, categoryMeta, type WirelessCategory } from "@/lib/wireless-data"
import { Wifi, Terminal, ChevronRight, Shield, Signal, Radio } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  wep: <Signal className="h-3.5 w-3.5" />,
  "wpa-personal": <Shield className="h-3.5 w-3.5" />,
  wps: <Radio className="h-3.5 w-3.5" />,
  "evil-twin": <Wifi className="h-3.5 w-3.5" />,
  wpa3: <Shield className="h-3.5 w-3.5" />,
  deauth: <Radio className="h-3.5 w-3.5" />,
  enterprise: <Terminal className="h-3.5 w-3.5" />,
}

const difficultyColors: Record<string, string> = {
  easy: "oklch(0.6 0.15 145)",
  medium: "oklch(0.7 0.15 85)",
  hard: "oklch(0.65 0.2 25)",
}

const toolsList = [
  { name: "aircrack-ng", url: "https://www.aircrack-ng.org", desc: "Complete suite for WEP/WPA-PSK cracking, deauth, and monitor mode" },
  { name: "hcxdumptool / hcxtools", url: "https://github.com/ZerBea/hcxdumptool", desc: "Capture PMKID and convert handshake captures to hashcat format" },
  { name: "hashcat", url: "https://hashcat.net", desc: "GPU-accelerated password cracking for WPA PMKID (mode 22000)" },
  { name: "reaver / bully", url: "https://github.com/t6x/reaver-wps-fork-t6x", desc: "WPS PIN brute force and Pixie Dust attack tools" },
  { name: "airgeddon", url: "https://github.com/v1s1t0r1sh3r3/airgeddon", desc: "Multi-purpose wireless attacks — Evil Twin, WPS, WPA, and more" },
  { name: "wifite2", url: "https://github.com/kimocoder/wifite2", desc: "Automated wireless audit tool — WEP, WPA, WPS, and PMKID attacks" },
  { name: "hostapd-wpe", url: "https://github.com/OpenSecurityResearch/hostapd-wpe", desc: "Rogue AP for Enterprise WPA2-EAP credential harvesting" },
  { name: "kismet", url: "https://www.kismetwireless.net", desc: "Wireless network detector, sniffer, and intrusion detection system" },
  { name: "bettercap", url: "https://www.bettercap.org", desc: "Swiss army knife for Wi-Fi, Bluetooth, and Ethernet attacks" },
]

export default function WirelessPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b px-6" style={{ background: "var(--network-bg)", borderColor: "var(--network-border)" }}>
        <Link href="/network" className="flex items-center gap-2 text-sm font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>
          <Terminal className="h-4 w-4" /> NETWORK
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/network" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            &larr; Home
          </Link>
          <Link href="/network/ports" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Ports
          </Link>
          <Link href="/network/payloads" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Payloads
          </Link>
          <span style={{ color: "var(--network-text)" }}>Wireless</span>
          <Link href="/network/resources" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Resources
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b px-6 py-16 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--network-primary-glow)", border: "1px solid var(--network-primary-dim)" }}>
          <Wifi className="h-7 w-7" style={{ color: "var(--network-primary)" }} />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>
          WIRELESS ATTACK MODULES
        </h1>
        <p className="mx-auto max-w-xl text-sm" style={{ color: "var(--network-text-muted)" }}>
          Comprehensive wireless pentesting methodology covering WEP, WPA/WPA2-PSK, WPS, Evil Twin, WPA3, deauthentication, and enterprise attacks. Unlike network service attacks covered in the Ports section, wireless attacks require physical proximity to the target's radio range (typically 30-100 meters depending on hardware and environment) — these cannot be executed remotely over the internet.
        </p>
      </section>

      {/* Attack modules grid */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>ATTACK MODULES</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wirelessModules.map((mod) => (
              <Link
                key={mod.slug}
                href={`/network/wireless/${mod.slug}`}
                className="network-card group flex flex-col p-5 transition-all hover:-translate-y-0.5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider"
                    style={{ background: "var(--network-primary-glow)", color: "var(--network-primary)" }}
                  >
                    {categoryIcons[mod.category]} {categoryMeta[mod.category].label}
                  </span>
                  <span className="font-mono text-[10px] font-bold" style={{ color: difficultyColors[mod.difficulty] }}>
                    {mod.difficulty.toUpperCase()}
                  </span>
                </div>
                <h3 className="mb-2 text-sm font-bold tracking-wide" style={{ color: "var(--network-text)" }}>
                  {mod.title}
                </h3>
                <p className="mb-4 flex-1 text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>
                  {mod.overview.slice(0, 160)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px]" style={{ color: "var(--network-text-muted)" }}>
                    {mod.attackSteps.length} steps &middot; {mod.tools.length} tools
                  </span>
                  <span className="flex items-center gap-1 text-xs opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--network-primary)" }}>
                    Explore <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-t px-6 py-12" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>RECOMMENDED TOOLS</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolsList.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="network-card group p-4 transition-all hover:-translate-y-0.5"
              >
                <h3 className="mb-1 text-sm font-bold" style={{ color: "var(--network-primary)" }}>{tool.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-6 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
        <Link href="/network" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
          &larr; Back to Network Home
        </Link>
      </footer>
    </div>
  )
}
