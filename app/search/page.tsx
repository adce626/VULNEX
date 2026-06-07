"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { SearchBar } from "@/components/search-bar"
import { navigation } from "@/lib/site-data"
import { toolsData } from "@/lib/tools-data"
import { searchCommands } from "@/lib/search-index"
import { Home, ChevronRight, ArrowRight, Terminal, BookOpen, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

const typeColors: Record<string, string> = {
  vulnerability: "bg-rose-500/10 text-rose-500",
  recon: "bg-blue-500/10 text-blue-500",
  tool: "bg-emerald-500/10 text-emerald-500",
  payload: "bg-amber-500/10 text-amber-500",
  command: "bg-purple-500/10 text-purple-500",
}

const typeIcons: Record<string, React.ReactNode> = {
  vulnerability: <BookOpen className="h-4 w-4" />,
  recon: <BookOpen className="h-4 w-4" />,
  tool: <Wrench className="h-4 w-4" />,
  payload: <BookOpen className="h-4 w-4" />,
  command: <Terminal className="h-4 w-4" />,
}

const filters = [
  { id: "all", label: "All" },
  { id: "command", label: "Commands" },
  { id: "tool", label: "Tools" },
  { id: "topic", label: "Topics" },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [activeFilter, setActiveFilter] = useState("all")

  const allResults = useMemo(() => {
    if (!query.trim()) return []

    const q = query.toLowerCase()
    const matches: { title: string; href: string; section: string; type: string; command?: string }[] = []

    for (const section of navigation) {
      if (section.items) {
        for (const item of section.items) {
          if (item.title.toLowerCase().includes(q) || section.title.toLowerCase().includes(q)) {
            matches.push({ title: item.title, href: item.href, section: section.title, type: "topic" })
          }
        }
      }
    }

    for (const tool of toolsData) {
      if (tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.tags.some((t) => t.toLowerCase().includes(q))) {
        matches.push({ title: tool.name, href: `/tools/${tool.id}`, section: tool.category, type: "tool" })
      }
    }

    const cmdResults = searchCommands(query)
    for (const cmd of cmdResults) {
      matches.push({ title: cmd.title, href: cmd.href, section: cmd.section, type: "command", command: cmd.text })
    }

    return matches.slice(0, 50)
  }, [query])

  const results = activeFilter === "all" ? allResults : allResults.filter((r) => r.type === activeFilter)

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Search" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Search</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-8">
          <SearchBar allResults={allResults} placeholder="Search payloads, techniques, tools..." autoFocus />

          {query && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">{results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;</p>
                <div className="flex gap-1">
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        activeFilter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {results.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <p className="text-muted-foreground">No {activeFilter === "all" ? "" : activeFilter} results found</p>
                  <Link href="/all" className="text-sm text-primary hover:underline">Browse all sections →</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((result, idx) => (
                    <Link
                      key={`${result.href}-${idx}`}
                      href={result.href}
                      className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", typeColors[result.type] || "bg-muted text-muted-foreground")}>
                          {typeIcons[result.type] || <BookOpen className="h-4 w-4" />}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">{result.title}</h3>
                          <p className="text-xs text-muted-foreground">{result.section}</p>
                          {result.command && <p className="mt-1 text-xs text-muted-foreground/60 font-mono truncate">{result.command}</p>}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  )
}
