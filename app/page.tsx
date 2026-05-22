"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { sectionCards, navigation } from "@/lib/site-data"
import { toolsData } from "@/lib/tools-data"
import { SITE_STATS } from "@/lib/stats"
import {
  Search,
  Bug,
  Server,
  Cloud,
  Wrench,
  Brain,
  Shield,
  Puzzle,
  ArrowRight,
  Globe,
  Zap,
  Target,
  Database,
  Code,
  FolderSearch,
  Network,
  Key,
  ChevronRight,
  Sparkles,
  Copy,
  Tag,
  Moon,
  Terminal,
  Siren,
} from "lucide-react"
import { RecentlyViewed } from "@/components/recently-viewed"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-6 w-6" />,
  bug: <Bug className="h-6 w-6" />,
  server: <Server className="h-6 w-6" />,
  cloud: <Cloud className="h-6 w-6" />,
  wrench: <Wrench className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  brain: <Brain className="h-6 w-6" />,
  puzzle: <Puzzle className="h-6 w-6" />,
  terminal: <Terminal className="h-6 w-6" />,
  siren: <Siren className="h-6 w-6" />,
}

const toolIconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  "folder-search": <FolderSearch className="h-5 w-5" />,
  network: <Network className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  key: <Key className="h-5 w-5" />,
}

const quickTags = [
  { label: "Google Dorks", href: "/recon/google-dorks" },
  { label: "SQLi Bypass", href: "/vulnerabilities/sql-injection" },
  { label: "SSRF", href: "/vulnerabilities?tag=ssrf" },
  { label: "Subdomain Enum", href: "/recon?tag=subdomain" },
]

const featuredToolIds = ["nuclei", "dalfox", "katana", "hashcat"]
const featuredTools = featuredToolIds.map(id => toolsData.find(t => t.id === id)).filter(Boolean) as typeof toolsData

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="VULNEX — Web Hacking Playbook" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

          <div className="relative mx-auto max-w-4xl px-6 py-16 text-center lg:py-24">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium tracking-wider text-primary shadow-[0_0_12px_oklch(0.72_0.19_165/0.4)] backdrop-blur-sm animate-pulse-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_oklch(0.72_0.19_165/0.8)]" />
              adce626
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              VULNEX
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              The ultimate hacking playbook for security researchers and bug hunters. Payloads, techniques, and tools at your fingertips.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 max-w-xl">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-lg shadow-black/5">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search payloads, techniques, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search payloads, techniques, tools"
                />
                <kbd className="hidden rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground sm:block">
                  K
                </kbd>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {quickTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <Zap className="h-3 w-3" />
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
{[
                { value: String(sectionCards.length), label: "Sections" },
                { value: String(navigation.reduce((acc, s) => acc + (s.items?.length || 0), 0)), label: "Topics" },
                { value: SITE_STATS.commandCount + "+", label: "Commands" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2">
                  {i > 0 && <div className="h-4 w-px bg-border hidden sm:block" />}
                  <span className="text-xl font-bold text-primary sm:text-2xl">{stat.value}</span>
                  <span className="text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explore Sections */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Explore Sections</h2>
              <p className="mt-1 text-muted-foreground">
                Choose a category to dive in
              </p>
            </div>
            <Link
              href="/all"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectionCards.slice(0, 6).map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

                <div
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                    card.color === "primary" && "bg-primary/10 text-primary",
                    card.color === "destructive" && "bg-destructive/10 text-destructive",
                    card.color === "accent" && "bg-accent/10 text-accent"
                  )}
                >
                  {iconMap[card.icon]}
                </div>

                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {card.itemCount} topics
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Tools Section */}
        <div className="mx-auto max-w-6xl px-6 py-16 border-t border-border">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Featured Tools</h2>
              </div>
              <p className="text-muted-foreground">Essential tools with interactive usage guides</p>
            </div>
            <Link
              href="/tools"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              View all tools <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool, idx) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {toolIconMap[tool.icon] || <Sparkles className="size-5" />}
                  </div>
                  
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">{tool.commands.length} commands</span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <RecentlyViewed />

        {/* Features Grid */}
        <div className="border-t border-border bg-card/30">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              {[
                { icon: <Search className="h-6 w-6" />, title: "Quick Search", desc: "Find instantly" },
                { icon: <Copy className="h-6 w-6" />, title: "One-Click Copy", desc: "Copy payloads" },
                { icon: <Zap className="h-6 w-6" />, title: "Blazing Fast", desc: "Instant load" },
                { icon: <Tag className="h-6 w-6" />, title: "Tagged", desc: "Organized" },
                { icon: <Moon className="h-6 w-6" />, title: "Dark Mode", desc: "Easy on eyes" },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center gap-3 rounded-xl border border-border/50 bg-background p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/5 p-10 text-center lg:p-16">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-foreground">Ready to Start?</h2>
                <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                  Jump into the most popular payloads
                </p>
                <Link
                  href="/tech-specific/iis"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                  Browse Payloads <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">VULNEX</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/adce626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="font-medium">X</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary">@adce626</span>
                </a>
                <a
                  href="https://github.com/adce626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary">/adce626</span>
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                For authorized security testing only. Use responsibly.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}



