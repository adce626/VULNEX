"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { navigation } from "@/lib/site-data"
import { toolsData } from "@/lib/tools-data"
import {
  Home,
  ChevronRight,
  Search,
  ArrowRight,
} from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const results = useMemo(() => {
    if (!query.trim()) return []

    const q = query.toLowerCase()
    const matches: { title: string; href: string; section: string; type: string }[] = []

    // Search navigation items
    for (const section of navigation) {
      if (section.items) {
        for (const item of section.items) {
          if (
            item.title.toLowerCase().includes(q) ||
            section.title.toLowerCase().includes(q)
          ) {
            matches.push({
              title: item.title,
              href: item.href,
              section: section.title,
              type: "topic",
            })
          }
        }
      }
    }

    // Search tools
    for (const tool of toolsData) {
      if (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        matches.push({
          title: tool.name,
          href: `/tools/${tool.id}`,
          section: tool.category,
          type: "tool",
        })
      }
    }

    return matches
  }, [query])

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <main className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Search</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {query ? `Results for "${query}"` : "Search"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {results.length === 0 && query && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-muted-foreground">No results found for "{query}"</p>
              <Link
                href="/all"
                className="text-sm text-primary hover:underline"
              >
                Browse all sections →
              </Link>
            </div>
          )}

          {results.length === 0 && !query && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-muted-foreground">Enter a search term to find content</p>
              <Link
                href="/all"
                className="text-sm text-primary hover:underline"
              >
                Browse all sections →
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              {results.map((result, idx) => (
                <Link
                  key={`${result.href}-${idx}`}
                  href={result.href}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                      {result.type === "tool" ? "T" : "P"}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{result.section}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
