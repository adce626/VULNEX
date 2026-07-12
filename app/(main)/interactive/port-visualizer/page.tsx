"use client"

import { useState, useMemo } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, Home, Network, Search, X } from "lucide-react"
import { commonPorts, categoryColors, categoryBadgeColors } from "@/lib/interactive-data"

const categories = ["Web", "Database", "Mail", "File Transfer", "Remote Access", "Network", "Other"] as const

export default function PortVisualizerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPort, setSelectedPort] = useState<number | null>(null)

  const filteredPorts = useMemo(() => {
    return commonPorts.filter(p => {
      const matchesSearch = !searchTerm || p.service.toLowerCase().includes(searchTerm.toLowerCase()) || p.port.toString().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const selectedPortData = useMemo(() => {
    if (selectedPort === null) return null
    return commonPorts.find(p => p.port === selectedPort) || null
  }, [selectedPort])

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Port Visualizer — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">Port Visualizer</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-400 shadow-md">
                <Network className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Port Visualizer</h1>
                <p className="mt-1 text-muted-foreground">Browse and search common network ports with service details and categories</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-6 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by port, service, or description..."
                className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-primary/20 text-primary border-primary/50 shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{filteredPorts.length} of {commonPorts.length} ports</span>
            <span className="text-border">|</span>
            <span>Click a port card for details</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredPorts.map(p => (
              <button
                key={p.port}
                onClick={() => setSelectedPort(selectedPort === p.port ? null : p.port)}
                className={`group relative overflow-hidden rounded-lg border p-3 text-left transition-all hover:scale-[1.04] hover:shadow-lg ${
                  selectedPort === p.port
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border/60 bg-card hover:border-primary/40"
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${categoryColors[p.category]}`} />
                <div className="mt-1">
                  <span className="font-mono text-lg font-bold text-foreground">{p.port}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="truncate text-xs font-medium text-muted-foreground">{p.service}</span>
                  </div>
                  <span className={`inline-block mt-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${categoryBadgeColors[p.category]}`}>
                    {p.protocol}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredPorts.length === 0 && (
            <div className="rounded-xl border border-border/50 bg-card p-10 text-center">
              <Network className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">No ports match your search</p>
            </div>
          )}

          {selectedPortData && (
            <div className="rounded-xl border border-border/50 bg-card p-6 animate-fade-up">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${categoryColors[selectedPortData.category]}`}>
                    <span className="font-mono text-2xl font-bold text-white">{selectedPortData.port}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedPortData.service}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`rounded px-2 py-0.5 text-xs font-medium ${categoryBadgeColors[selectedPortData.category]}`}>{selectedPortData.category}</span>
                      <span className="text-xs font-mono text-muted-foreground">{selectedPortData.protocol}</span>
                      <span className="text-xs text-muted-foreground">Port {selectedPortData.port}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedPort(null)} className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{selectedPortData.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-lg border border-border bg-muted px-3 py-1 font-mono text-xs text-foreground">{selectedPortData.port}/{selectedPortData.protocol}</span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  Used for {selectedPortData.category.toLowerCase()} services
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
