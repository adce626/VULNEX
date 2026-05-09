"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import { navigation } from "@/lib/site-data"
import { cn } from "@/lib/utils"
import {
  Search,
  Bug,
  Server,
  Cloud,
  Wrench,
  Brain,
  ChevronDown,
  ChevronRight,
  Shield,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-4 w-4" />,
  bug: <Bug className="h-4 w-4" />,
  server: <Server className="h-4 w-4" />,
  cloud: <Cloud className="h-4 w-4" />,
  wrench: <Wrench className="h-4 w-4" />,
  brain: <Brain className="h-4 w-4" />,
  shield: <Shield className="h-4 w-4" />,
}

const allPages = [
  { title: "Google Dorks", href: "/recon/google-dorks", keywords: "google,search,dork,recon" },
  { title: "Shodan Dorks", href: "/recon/shodan-dorks", keywords: "shodan,iot,recon,server" },
  { title: "Param Discovery", href: "/recon/param-discovery", keywords: "param,parameter,discovery,fuzz" },
  { title: "IDOR & 403 Bypass", href: "/vulnerabilities/idor", keywords: "idor,403,bypass,privilege" },
  { title: "SQL Injection", href: "/vulnerabilities/sql-injection", keywords: "sql,sqli,database,injection" },
  { title: "WordPress", href: "/vulnerabilities/wordpress", keywords: "wordpress,cms,wp" },
  { title: "Open Redirect", href: "/vulnerabilities/open-redirect", keywords: "redirect,open redirect,ssrf" },
  { title: "CRLF Injection", href: "/vulnerabilities/crlf-injection", keywords: "crlf,injection,http" },
  { title: "Dependency Confusion", href: "/vulnerabilities/dependency-confusion", keywords: "dependency,confusion,npm,pypi" },
  { title: "Host Header Injection", href: "/vulnerabilities/host-header-injection", keywords: "host header,injection,cache" },
  { title: "403 Bypass", href: "/vulnerabilities/403-bypass", keywords: "403,forbidden,bypass" },
  { title: "Microsoft IIS", href: "/tech-specific/iis", keywords: "iis,microsoft,windows,asp" },
  { title: "Next.js", href: "/tech-specific/nextjs", keywords: "nextjs,middleware,cve" },
  { title: "Swagger XSS", href: "/tech-specific/swagger", keywords: "swagger,openapi,xss" },
  { title: "API Fuzzing", href: "/tech-specific/api-fuzzing", keywords: "api,fuzzing,ffuf,rest" },
  { title: "Google API Keys", href: "/cloud/google-api-keys", keywords: "google,api key,cloud" },
  { title: "FFUF Techniques", href: "/tools/ffuf", keywords: "ffuf,fuzz,web fuzz" },
  { title: "Gospider Methods", href: "/tools/gospider", keywords: "gospider,crawl,spider" },
  { title: "CeWL Wordlists", href: "/tools/cewl", keywords: "cewl,wordlist,password" },
  { title: "LLM Injection", href: "/advanced/llm-injection", keywords: "llm,ai,prompt,gpt" },
  { title: "Blind XSS Advanced", href: "/advanced/blind-xss", keywords: "blind xss,bxss,xss" },
  { title: "WAF Bypass & PoCs", href: "/waf-bypass", keywords: "waf,bypass,poc,firewall,idor" },
]

export function MainSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([
  ])
  const [mobileOpen, setMobileOpen] = useState(false)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return allPages.filter(
      (page) =>
        page.title.toLowerCase().includes(query) ||
        page.keywords.includes(query)
    ).slice(0, 8)
  }, [searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(value.length > 0)
  }

  const handleFocus = () => {
    if (searchQuery.length > 0) {
      setShowResults(true)
    }
  }

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowResults(false)
    }
  }

  const handleResultClick = (href: string) => {
    router.push(href)
    setSearchQuery("")
    setShowResults(false)
    setMobileOpen(false)
  }

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <Link href="/" className="text-sm font-bold text-foreground">
            VULNEX
          </Link>
          <p className="text-xs text-muted-foreground">Web Hacking Playbook</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 relative">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground sm:block">
            /
          </kbd>
        </div>
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mx-4 mt-1 rounded-lg border border-border bg-card shadow-lg">
            {searchResults.map((result) => (
              <button
                key={result.href}
                onClick={() => handleResultClick(result.href)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-muted"
              >
                <span>{result.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
        
        {/* No Results */}
        {showResults && searchResults.length === 0 && searchQuery && (
          <div className="absolute left-0 right-0 top-full z-50 mx-4 mt-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
            No results for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {navigation.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(section.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                {iconMap[section.icon]}
                {section.title}
              </span>
              {section.items && (
                <span className="text-muted-foreground">
                  {expandedSections.includes(section.title) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              )}
            </button>
            {section.items && expandedSections.includes(section.title) && (
              <div className="mt-1 space-y-1 pl-4">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                      {item.title}
                    </span>
                    {item.tag && (
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-xs",
                          item.tag === "New"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.tag}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <p className="text-center text-xs text-muted-foreground">
          For ethical use only
        </p>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-card text-foreground shadow-lg lg:hidden"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed right-0 top-0 z-40 flex h-full w-64 flex-col bg-card transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 flex-col border-r border-border bg-card lg:flex">
        <SidebarContent />
      </aside>
    </>
  )
}