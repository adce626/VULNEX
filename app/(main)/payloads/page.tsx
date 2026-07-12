"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { payloadCategories } from "@/lib/payloads-data"
import { Breadcrumb } from "@/components/breadcrumb"
import { HeroSection } from "@/components/hero-section"
import { ChevronRight, Siren, Shield, Target, Code, FileJson, Database, Zap, Terminal, Bug, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  "file-json": <FileJson className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
}

const bgColors = [
  "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  "from-rose-500/20 to-rose-500/5 border-rose-500/30",
  "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
]

export default function PayloadsPage() {
  const [filter, setFilter] = useState("")

  const filtered = useMemo(() => {
    if (!filter.trim()) return payloadCategories
    const q = filter.toLowerCase()
    return payloadCategories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.items.some((i) => i.name.toLowerCase().includes(q) || i.payload.toLowerCase().includes(q))
    )
  }, [filter])

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Payloads Library" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <Breadcrumb items={[{ label: "Payloads" }]} />
        <HeroSection icon={<Siren className="h-8 w-8" />} title="Payloads Library" description="Curated payload collection for web security testing. Select a category to browse payloads." />

        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Search */}
          <div className="mb-10">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter payloads by name, category, or technique..."
                className="w-full rounded-xl border border-border bg-card pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              {filter && (
                <button onClick={() => setFilter("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {filter && (
              <p className="text-xs text-muted-foreground mt-2">{filtered.length} categories match &quot;{filter}&quot;</p>
            )}
          </div>

          {/* Categories Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">No categories match your filter</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((cat, idx) => {
                const gradient = bgColors[idx % bgColors.length]
                return (
                  <Link
                    key={cat.id}
                    href={`/payloads/${cat.id}`}
                    className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300", gradient)} />
                    <div className="relative">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {iconMap[cat.icon] || <Bug className="h-5 w-5" />}
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{cat.items.length} payloads</p>
                      <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Browse <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
