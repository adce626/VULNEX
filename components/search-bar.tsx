"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronRight, Terminal, BookOpen, Wrench, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  title: string
  href: string
  section: string
  type: string
  command?: string
}

function fuzzyMatch(text: string, query: string): boolean {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++
  }
  return qi === q.length
}

const sections = [
  { id: "all", label: "All" },
  { id: "vulnerability", label: "Vulnerabilities" },
  { id: "recon", label: "Recon" },
  { id: "tool", label: "Tools" },
  { id: "payload", label: "Payloads" },
  { id: "command", label: "Commands" },
]

const sectionColors: Record<string, string> = {
  vulnerability: "bg-rose-500/10 text-rose-500",
  recon: "bg-blue-500/10 text-blue-500",
  tool: "bg-emerald-500/10 text-emerald-500",
  payload: "bg-amber-500/10 text-amber-500",
  command: "bg-purple-500/10 text-purple-500",
}

interface SearchBarProps {
  allResults: SearchResult[]
  placeholder?: string
  autoFocus?: boolean
  onFilterChange?: (section: string) => void
  activeFilter?: string
}

export function SearchBar({ allResults, placeholder = "Search...", autoFocus = false, onFilterChange, activeFilter = "all" }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const filtered = query.trim()
    ? allResults.filter((r) => fuzzyMatch(`${r.title} ${r.command || ""} ${r.section}`, query))
    : []

  const displayResults = activeFilter === "all"
    ? filtered
    : filtered.filter((r) => r.type === activeFilter)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && !inputRef.current?.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => { if (autoFocus) inputRef.current?.focus() }, [autoFocus])

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-md">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && displayResults.length > 0) {
              router.push(displayResults[0].href)
              setFocused(false)
              setQuery("")
            }
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Search"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
        <kbd className="hidden rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">K</kbd>
      </div>

      {onFilterChange && (
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onFilterChange(s.id)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors",
                activeFilter === s.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {focused && query.trim() && (
        <div ref={dropdownRef} className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-card shadow-xl max-h-80 overflow-y-auto">
          {displayResults.length === 0 ? (
            <div className="flex flex-col items-center gap-2 p-5 text-center">
              <Search className="h-6 w-6 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No results for &quot;{query}&quot;</p>
              <p className="text-xs text-muted-foreground/50">Try: XSS, SQLi, nuclei, dork, payload</p>
            </div>
          ) : (
            displayResults.slice(0, 10).map((result) => (
              <button
                key={`${result.href}-${result.command || result.title}`}
                onClick={() => {
                  router.push(result.href)
                  setFocused(false)
                  setQuery("")
                }}
                className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted border-b border-border last:border-0"
              >
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md", sectionColors[result.type] || "bg-muted text-muted-foreground")}>
                  {result.type === "tool" ? <Wrench className="h-3.5 w-3.5" /> : result.type === "command" ? <Terminal className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground truncate">{result.title}</div>
                  {result.command && <code className="text-xs text-muted-foreground block truncate">{result.command}</code>}
                  <span className="text-[10px] text-muted-foreground">{result.section}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
