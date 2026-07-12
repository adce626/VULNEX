"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { payloadCategories } from "@/lib/payloads-data"
import {
  Home,
  ChevronRight,
  ChevronLeft,
  Search,
  Copy,
  Check,
  Siren,
  Bug,
  Shield,
  Target,
  Terminal,
  Zap,
  Globe,
  Lock,
  Database,
  Code,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 25

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
  lock: <Lock className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
}

const tagStyles: Record<string, { chip: string; badge: string }> = {
  Script: { chip: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20", badge: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
  Event: { chip: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20", badge: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
  SVG: { chip: "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20", badge: "bg-purple-500/15 text-purple-300 border-purple-500/25" },
  Payload: { chip: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  Obfuscation: { chip: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20", badge: "bg-rose-500/15 text-rose-300 border-rose-500/25" },
  SSRF: { chip: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20", badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
  Localhost: { chip: "bg-sky-500/10 text-sky-400 border-sky-500/20 hover:bg-sky-500/20", badge: "bg-sky-500/15 text-sky-300 border-sky-500/25" },
  RCE: { chip: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20", badge: "bg-red-500/15 text-red-300 border-red-500/25" },
  Header: { chip: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20", badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25" },
  SQLi: { chip: "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20", badge: "bg-orange-500/15 text-orange-300 border-orange-500/25" },
  Template: { chip: "bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20", badge: "bg-teal-500/15 text-teal-300 border-teal-500/25" },
  Metadata: { chip: "bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20", badge: "bg-violet-500/15 text-violet-300 border-violet-500/25" },
}

function getTagStyle(tag: string): string {
  const key = Object.keys(tagStyles).find(k => tag.toLowerCase().includes(k.toLowerCase()))
  return key ? tagStyles[key].badge : "bg-muted/50 text-muted-foreground border-border/50"
}

function getTagChipStyle(tag: string): string {
  const key = Object.keys(tagStyles).find(k => tag.toLowerCase().includes(k.toLowerCase()))
  return key ? tagStyles[key].chip : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"
}

export default function PayloadCategoryPage() {
  const params = useParams()
  const category = useMemo(() => payloadCategories.find(c => c.id === params.slug), [params.slug])

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [copiedPayload, setCopiedPayload] = useState<string | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const allTags = useMemo(() => {
    if (!category) return []
    const seen = new Set<string>()
    const tags: { tag: string; count: number }[] = []
    for (const item of category.items) {
      for (const t of item.tags) {
        if (!seen.has(t)) {
          seen.add(t)
          tags.push({ tag: t, count: 0 })
        }
      }
    }
    for (const item of category.items) {
      for (const t of item.tags) {
        const found = tags.find(x => x.tag === t)
        if (found) found.count++
      }
    }
    return tags.sort((a, b) => b.count - a.count)
  }, [category])

  const filteredItems = useMemo(() => {
    if (!category) return []
    let items = category.items
    const q = searchQuery.toLowerCase()
    if (q) {
      items = items.filter(
        item => item.name.toLowerCase().includes(q) ||
               item.payload.toLowerCase().includes(q) ||
               item.description.toLowerCase().includes(q) ||
               item.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (activeTags.length > 0) {
      items = items.filter(item => activeTags.some(t => item.tags.includes(t)))
    }
    return items
  }, [category, searchQuery, activeTags])

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE)
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredItems.slice(start, start + PAGE_SIZE)
  }, [filteredItems, page])

  const toggleTag = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
    setPage(1)
  }

  const copyPayload = async (payload: string) => {
    await navigator.clipboard.writeText(payload)
    setCopiedPayload(payload)
    setTimeout(() => setCopiedPayload(null), 2000)
  }

  const copyAllPayloads = async () => {
    const text = filteredItems.map(i => i.payload).join("\n")
    await navigator.clipboard.writeText(text)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <MainSidebar />
        <main id="main-content" className="lg:pl-64">
          <div className="flex flex-col items-center justify-center py-24">
            <Siren className="h-16 w-16 text-muted-foreground/50" />
            <h1 className="mt-4 text-2xl font-bold text-foreground">Category not found</h1>
            <p className="mt-2 text-muted-foreground">This payload category does not exist.</p>
            <Link href="/payloads" className="mt-6 text-sm text-primary hover:underline">Back to Payloads</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title={category.name.endsWith("Payloads") ? category.name : `${category.name} Payloads`} />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground max-sm:hidden">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/payloads" className="hover:text-foreground">Payloads</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{category.name}</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {iconMap[category.icon] || <Bug className="h-8 w-8" />}
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">{category.name}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {category.items.length} ready-to-use payloads
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {category.items.length} Payloads
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${category.name}...`}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="hidden sm:inline">{filteredItems.length} of {category.items.length}</span>
              <button
                onClick={copyAllPayloads}
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-all"
              >
                {copiedAll ? <><Check className="h-3.5 w-3.5" /> Copied All!</> : <><Copy className="h-3.5 w-3.5" /> Copy All</>}
              </button>
            </div>
          </div>

          {allTags.length > 1 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {activeTags.length > 0 && (
                <button
                  onClick={() => { setActiveTags([]); setPage(1) }}
                  className="inline-flex items-center gap-1 rounded-full border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" /> Clear
                </button>
              )}
              {allTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                    activeTags.includes(tag)
                      ? "ring-2 ring-primary/40 " + getTagChipStyle(tag)
                      : getTagChipStyle(tag)
                  )}
                >
                  {tag}
                  <span className="opacity-60">({count})</span>
                </button>
              ))}
            </div>
          )}

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No payloads found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try a different search term or clear filters</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {paginatedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-200 hover:border-border"
                  >
                    <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn("inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium cursor-pointer hover:opacity-80 transition-opacity", getTagStyle(tag))}
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mx-5 mb-4 rounded-xl border border-border/50 bg-[#0a0a0f] overflow-hidden">
                      <div className="flex items-center justify-between border-b border-border/50 bg-card/50 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Payload</span>
                        </div>
                        <button
                          onClick={() => copyPayload(item.payload)}
                          className="flex items-center gap-2 rounded-lg border border-border/50 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-all"
                        >
                          {copiedPayload === item.payload ? (
                            <><Check className="h-3.5 w-3.5" /> Copied!</>
                          ) : (
                            <><Copy className="h-3.5 w-3.5" /> Copy</>
                          )}
                        </button>
                      </div>
                      <pre className="overflow-x-auto px-4 py-3 text-sm font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap break-all">
                        {item.payload}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-4 py-2 text-sm transition-colors",
                      page === 1
                        ? "border-border/30 opacity-40 cursor-not-allowed text-muted-foreground"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum: number
                      if (totalPages <= 7) {
                        pageNum = i + 1
                      } else if (page <= 4) {
                        pageNum = i + 1
                      } else if (page >= totalPages - 3) {
                        pageNum = totalPages - 6 + i
                      } else {
                        pageNum = page - 3 + i
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors",
                            page === pageNum
                              ? "bg-primary/15 text-primary border border-primary/30"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                          )}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-4 py-2 text-sm transition-colors",
                      page === totalPages
                        ? "border-border/30 opacity-40 cursor-not-allowed text-muted-foreground"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                    )}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}

          <footer className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">For authorized security testing only. Use responsibly.</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
