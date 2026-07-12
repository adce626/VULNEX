"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { networkPorts, categoryMeta, type PortCategory } from "@/lib/network-data"
import { Network, Globe, ExternalLink, Terminal, ChevronRight, ChevronDown, Server, Shield, Search } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  "remote-access": <Shield className="h-3.5 w-3.5" />,
  database: <Server className="h-3.5 w-3.5" />,
  web: <Globe className="h-3.5 w-3.5" />,
  "file-transfer": <ExternalLink className="h-3.5 w-3.5" />,
  mail: <Terminal className="h-3.5 w-3.5" />,
  "network-services": <Network className="h-3.5 w-3.5" />,
  other: <Terminal className="h-3.5 w-3.5" />,
}

export default function PortsPage() {
  const [activeCategory, setActiveCategory] = useState<PortCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)
  const [familyOpen, setFamilyOpen] = useState(false)

  const familyCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    networkPorts.forEach((p) => {
      if (p.serviceFamily) {
        counts[p.serviceFamily] = (counts[p.serviceFamily] || 0) + 1
      }
    })
    return counts
  }, [])

  const serviceFamilies = useMemo(() => {
    return [...new Set(networkPorts.map((p) => p.serviceFamily).filter(Boolean) as string[])]
      .sort((a, b) => (familyCounts[b] || 0) - (familyCounts[a] || 0) || a.localeCompare(b))
  }, [familyCounts])

  const filteredPorts = useMemo(() => {
    let result = networkPorts
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory)
    }
    if (selectedFamily) {
      result = result.filter((p) => p.serviceFamily === selectedFamily)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((p) => {
        if (String(p.port).includes(q)) return true
        if (p.service.toLowerCase().includes(q)) return true
        if (p.serviceFamily && p.serviceFamily.toLowerCase().includes(q)) return true
        if (p.aliases && p.aliases.some((a) => a.toLowerCase().includes(q))) return true
        return false
      })
    }
    return result
  }, [activeCategory, selectedFamily, searchQuery])

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
          <span style={{ color: "var(--network-text)" }}>Ports</span>
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

      {/* Header */}
      <section className="border-b px-6 py-12 text-center" style={{ borderColor: "var(--network-border)" }}>
        <h1 className="mb-2 text-2xl font-bold tracking-wider sm:text-3xl" style={{ color: "var(--network-primary)" }}>
          ALL PORTS
        </h1>
        <p className="text-sm" style={{ color: "var(--network-text-muted)" }}>
          {networkPorts.length} protocols &middot; {networkPorts.reduce((acc, p) => acc + p.vulnerabilities.length, 0)} CVEs
        </p>
      </section>

      {/* Filter + Search */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Search + Service filter row */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            {/* Search */}
            <div className="flex flex-1 items-center gap-3 rounded-lg border px-4 py-2.5 sm:max-w-md" style={{ background: "var(--network-card-bg)", borderColor: "var(--network-primary-dim)" }}>
              <Search className="h-4 w-4 shrink-0" style={{ color: "var(--network-primary)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by port number or service (e.g. 22, ssh, ldap)..."
                className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-xs"
                style={{ color: "var(--network-text)", caretColor: "var(--network-primary)" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-xs transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
                  Clear
                </button>
              )}
            </div>

            {/* Service filter */}
            <div className="relative shrink-0">
              <button
                onClick={() => setFamilyOpen(!familyOpen)}
                className="flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-xs transition-all"
                style={{ background: "oklch(0.045 0.03 265)", borderColor: "var(--network-primary-dim)", color: "var(--network-text)" }}
              >
                <span className="text-[10px] font-bold tracking-widest" style={{color: "var(--network-text-muted)"}}>SERVICE</span>
                <span className="h-4 w-px" style={{background: "var(--network-primary-dim)"}} />
                <span style={selectedFamily ? {color: "var(--network-primary)"} : {color: "var(--network-text-muted)"}}>
                  {selectedFamily ? `${selectedFamily} (${familyCounts[selectedFamily]})` : "All"}
                </span>
                <ChevronDown
                  className="h-3 w-3 transition-transform"
                  style={{ color: "var(--network-primary)", transform: familyOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {familyOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setFamilyOpen(false)} />
                  <div
                    className="absolute right-0 top-full z-20 mt-1 w-48 overflow-y-auto rounded-lg border font-mono text-xs"
                    style={{ background: "oklch(0.045 0.03 265)", borderColor: "var(--network-border)" }}
                  >
                    <button
                      onClick={() => { setSelectedFamily(null); setFamilyOpen(false) }}
                      className="flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-white/5"
                      style={!selectedFamily ? { color: "var(--network-primary)" } : { color: "var(--network-text-muted)" }}
                    >
                      All ({networkPorts.length})
                      {!selectedFamily && <span style={{color: "var(--network-primary)"}}>&#10003;</span>}
                    </button>
                    <div className="mx-3 h-px" style={{ background: "var(--network-border)" }} />
                    {serviceFamilies.map((family) => (
                      <button
                        key={family}
                        onClick={() => { setSelectedFamily(selectedFamily === family ? null : family); setFamilyOpen(false) }}
                        className="flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-white/5"
                        style={{ color: "var(--network-text)" }}
                      >
                        <span>{family} <span style={{color: "var(--network-text-muted)"}}>({familyCounts[family]})</span></span>
                        {selectedFamily === family && <span style={{color: "var(--network-primary)"}}>&#10003;</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className="category-badge"
              style={activeCategory === "all" ? { background: "var(--network-primary-glow)", color: "var(--network-primary)", border: "1px solid var(--network-primary-dim)" } : {}}
            >
              All ({networkPorts.length})
            </button>
            {(Object.entries(categoryMeta) as [PortCategory, typeof categoryMeta[PortCategory]][]).map(([key, meta]) => {
              const count = networkPorts.filter((p) => p.category === key).length
              if (count === 0) return null
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`category-badge ${key}`}
                  style={activeCategory === key ? { background: "var(--network-primary-glow)", color: "var(--network-primary)", border: "1px solid var(--network-primary-dim)" } : {}}
                >
                  {categoryIcons[key]} {meta.label} ({count})
                </button>
              )
            })}
          </div>

          {/* Port grid */}
          {filteredPorts.length === 0 && (
            <div className="py-16 text-center text-sm" style={{ color: "var(--network-text-muted)" }}>
              No ports match your search criteria.
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {filteredPorts.map((p) => (
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
        <Link href="/network" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
          &larr; Back to Network Home
        </Link>
      </footer>
    </div>
  )
}
