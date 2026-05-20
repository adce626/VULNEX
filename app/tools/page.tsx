"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { toolsData, getAllCategories } from "@/lib/tools-data"
import type { ToolGuide } from "@/lib/tools-data"
import { cn } from "@/lib/utils"
import { Home, ChevronRight, Search, Terminal, ArrowRight, Box, Layers, Wrench, Globe, Shield, Zap, Database, Code, Network, Key, Filter, Cloud, FolderSearch, Target } from "lucide-react"

const categoryConfig: Record<string, { icon: typeof Box; gradient: string; border: string; label: string }> = {
  "Recon & OSINT": {
    icon: Search,
    gradient: "from-blue-600/30 via-blue-500/10 to-transparent",
    border: "border-blue-500/40",
    label: "Reconnaissance & Information Gathering",
  },
  "Web Vulnerabilities": {
    icon: Zap,
    gradient: "from-red-600/30 via-red-500/10 to-transparent",
    border: "border-red-500/40",
    label: "Web Vulnerability Assessment",
  },
  "Methods": {
    icon: Wrench,
    gradient: "from-violet-600/30 via-violet-500/10 to-transparent",
    border: "border-violet-500/40",
    label: "Security Testing Methods",
  },
  "Cloud & Assets": {
    icon: Cloud,
    gradient: "from-cyan-600/30 via-cyan-500/10 to-transparent",
    border: "border-cyan-500/40",
    label: "Cloud Security & Asset Discovery",
  },
  "Advanced Topics": {
    icon: Layers,
    gradient: "from-amber-600/30 via-amber-500/10 to-transparent",
    border: "border-amber-500/40",
    label: "Advanced Security Topics",
  },
}

const toolIconMap: Record<string, typeof Box> = {
  search: Search,
  globe: Globe,
  zap: Zap,
  target: Target,
  database: Database,
  code: Code,
  shield: Shield,
  "folder-search": FolderSearch,
  network: Network,
  key: Key,
  filter: Filter,
  cloud: Cloud,
}

const categoryColor: Record<string, string> = {
  "Recon & OSINT": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Web Vulnerabilities": "bg-red-500/15 text-red-400 border-red-500/30",
  "Methods": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Cloud & Assets": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  "Advanced Topics": "bg-amber-500/15 text-amber-400 border-amber-500/30",
}

const toolTypeMap: Record<string, { label: string; color: string }> = {
  subfinder: { label: "Enumeration", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  amass: { label: "Enumeration", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  httpx: { label: "Probing", color: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
  nuclei: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  sqlmap: { label: "Exploitation", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  xsstrike: { label: "Exploitation", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  burpsuite: { label: "Platform", color: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  nmap: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  cloudfox: { label: "Cloud", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" },
  jwt_tool: { label: "Analysis", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  arjun: { label: "Discovery", color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30" },
  paramspider: { label: "Discovery", color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30" },
  x8: { label: "Fuzzing", color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  gf: { label: "Analysis", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  gobuster: { label: "Brute-Forcer", color: "bg-pink-500/15 text-pink-400 border-pink-500/30" },
  hydra: { label: "Brute-Forcer", color: "bg-pink-500/15 text-pink-400 border-pink-500/30" },
  whatweb: { label: "Fingerprinting", color: "bg-teal-500/15 text-teal-400 border-teal-500/30" },
  wpscan: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  dirsearch: { label: "Brute-Forcer", color: "bg-pink-500/15 text-pink-400 border-pink-500/30" },
  john: { label: "Cracking", color: "bg-red-500/15 text-red-400 border-red-500/30" },
  searchsploit: { label: "Research", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  dalfox: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  gau: { label: "Collection", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  katana: { label: "Crawler", color: "bg-green-500/15 text-green-400 border-green-500/30" },
  naabu: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  masscan: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  hashcat: { label: "Cracking", color: "bg-red-500/15 text-red-400 border-red-500/30" },
  trufflehog: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  ffuf: { label: "Fuzzing", color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  gospider: { label: "Crawler", color: "bg-green-500/15 text-green-400 border-green-500/30" },
  cewl: { label: "Wordlist", color: "bg-teal-500/15 text-teal-400 border-teal-500/30" },
  kiterunner: { label: "Discovery", color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30" },
  nikto: { label: "Scanner", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  theharvester: { label: "OSINT", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  metasploit: { label: "Framework", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  dnsrecon: { label: "Enumeration", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  sherlock: { label: "OSINT", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
}

const difficultyMap: Record<string, { level: string; bars: number; color: string }> = {
  subfinder: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  amass: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  httpx: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  nuclei: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  sqlmap: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  xsstrike: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  burpsuite: { level: "Advanced", bars: 3, color: "bg-red-500" },
  nmap: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  cloudfox: { level: "Advanced", bars: 3, color: "bg-red-500" },
  jwt_tool: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  arjun: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  paramspider: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  x8: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  gf: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  gobuster: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  hydra: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  whatweb: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  wpscan: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  dirsearch: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  john: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  searchsploit: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  dalfox: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  gau: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  katana: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  naabu: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  masscan: { level: "Advanced", bars: 3, color: "bg-red-500" },
  hashcat: { level: "Advanced", bars: 3, color: "bg-red-500" },
  trufflehog: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  ffuf: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  gospider: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  cewl: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  kiterunner: { level: "Intermediate", bars: 2, color: "bg-yellow-500" },
  nikto: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  theharvester: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  metasploit: { level: "Advanced", bars: 3, color: "bg-red-500" },
  dnsrecon: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
  sherlock: { level: "Beginner", bars: 1, color: "bg-emerald-500" },
}

const tagColorMap: Record<string, string> = {
  recon: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  scanning: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  scanner: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  enumeration: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  discovery: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  fuzzing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  bruteforce: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "brute-force": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  exploitation: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  password: "bg-red-500/10 text-red-400 border-red-500/20",
  network: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  web: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  cloud: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  osint: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  essential: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  automation: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  proxy: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  api: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  subdomains: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  passive: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  directory: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  dns: "bg-green-500/10 text-green-400 border-green-500/20",
  go: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  http: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  probing: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  crawling: "bg-green-500/10 text-green-400 border-green-500/20",
  spider: "bg-green-500/10 text-green-400 border-green-500/20",
  crawler: "bg-green-500/10 text-green-400 border-green-500/20",
  xss: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  sqli: "bg-red-500/10 text-red-400 border-red-500/20",
  injection: "bg-red-500/10 text-red-400 border-red-500/20",
  database: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  wordpress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  cms: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  jwt: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  auth: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  tokens: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  cracking: "bg-red-500/10 text-red-400 border-red-500/20",
  hash: "bg-red-500/10 text-red-400 border-red-500/20",
  gpu: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  secrets: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  credentials: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  git: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  leaks: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "port-scanner": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "internet-scale": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  projectdiscovery: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "vuln-scanner": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  templates: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  cve: "bg-red-500/10 text-red-400 border-red-500/20",
  urls: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  wayback: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  archives: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  filter: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  triage: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  patterns: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  fast: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  parameter: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  fingerprinting: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  technology: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  vulnerability: "bg-red-500/10 text-red-400 border-red-500/20",
  exploit: "bg-red-500/10 text-red-400 border-red-500/20",
  search: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "manual-testing": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  mapping: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  authentication: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  aws: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  azure: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  masscan: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

function getTagColor(tag: string): string {
  return tagColorMap[tag.toLowerCase()] || "bg-muted text-muted-foreground border-border"
}

export default function ToolsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => getAllCategories(), [])

  const filteredTools = useMemo(() => {
    let tools = toolsData
    if (selectedCategory) {
      tools = tools.filter((t) => t.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }
    return tools
  }, [selectedCategory, searchQuery])

  const grouped = useMemo(() => {
    const map: Record<string, ToolGuide[]> = {}
    for (const tool of filteredTools) {
      if (!map[tool.category]) map[tool.category] = []
      map[tool.category].push(tool)
    }
    return map
  }, [filteredTools])

  const toolCount = toolsData.length

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Security Tools" />
      <MainSidebar />

      <main className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Tools</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-primary/[0.01] to-transparent" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.02] to-transparent" />
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20 relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
                  <Terminal className="h-4 w-4" />
                  <span>{toolCount} Tools Available</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                  Security Tools
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Complete arsenal of security testing tools — from reconnaissance to exploitation, with practical guides and ready-to-use commands
                </p>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{toolCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Tools</div>
                </div>
                <div className="w-px bg-border self-stretch" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{categories.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Categories</div>
                </div>
                <div className="w-px bg-border self-stretch" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {toolsData.reduce((s, t) => s + t.commands.length, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Commands</div>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  !selectedCategory
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                <Layers className="h-4 w-4" />
                All Tools
              </button>
              {categories.map((cat) => {
                const cfg = categoryConfig[cat]
                const Icon = cfg?.icon || Wrench
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {cat}
                    <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                      {toolsData.filter((t) => t.category === cat).length}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="border-b border-border bg-card/30">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools by name, description, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mx-auto max-w-6xl px-6 py-10">
          {Object.entries(grouped).length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No tools found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or clear filters
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory(null) }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            Object.entries(grouped).map(([category, tools]) => {
              const cfg = categoryConfig[category]
              const CatIcon = cfg?.icon || Wrench
              return (
                <section key={category} className="mb-14 last:mb-0">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border",
                      categoryColor[category] || "border-border bg-muted text-muted-foreground"
                    )}>
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{category}</h2>
                      <p className="text-xs text-muted-foreground">{cfg?.label || ""}</p>
                    </div>
                    <span className="ml-auto rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {tools.length} {tools.length === 1 ? "tool" : "tools"}
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {tools.map((tool) => {
                      const typeInfo = toolTypeMap[tool.id]
                      const diffInfo = difficultyMap[tool.id]
                      const Icon = toolIconMap[tool.icon] || Wrench
                      const firstCommand = tool.commands[0]?.command || tool.usage.code?.split("\n")[0] || ""
                      return (
                        <Link
                          key={tool.id}
                          href={`/tools/${tool.id}`}
                          className={cn(
                            "group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300",
                            "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                          )}
                        >
                          {/* Top gradient line */}
                          <div className={cn(
                            "h-1 w-full bg-gradient-to-r opacity-60",
                            category.includes("Recon") ? "from-blue-500 to-blue-600" :
                            category.includes("Web") ? "from-red-500 to-red-600" :
                            category === "Methods" ? "from-violet-500 to-violet-600" :
                            category.includes("Cloud") ? "from-cyan-500 to-cyan-600" :
                            "from-amber-500 to-amber-600"
                          )} />

                          <div className="p-5">
                            {/* Top row: icon + type badge */}
                            <div className="flex items-start justify-between mb-4">
                              <div className={cn(
                                "flex h-11 w-11 items-center justify-center rounded-xl border",
                                categoryColor[tool.category] || "border-border bg-muted"
                              )}>
                                <Icon className="h-5 w-5" />
                              </div>
                              {typeInfo && (
                                <span className={cn(
                                  "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                                  typeInfo.color
                                )}>
                                  {typeInfo.label}
                                </span>
                              )}
                            </div>

                            {/* Name + description */}
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                              {tool.description}
                            </p>

                            {/* Tags */}
                            {tool.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {tool.tags.slice(0, 5).map((tag) => (
                                  <span
                                    key={tag}
                                    className={cn(
                                      "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium",
                                      getTagColor(tag)
                                    )}
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {tool.tags.length > 5 && (
                                  <span className="text-[10px] text-muted-foreground self-center">
                                    +{tool.tags.length - 5}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Install command preview */}
                            {firstCommand && (
                              <div className="mt-4 rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground truncate">
                                <span className="text-primary/70">$ </span>
                                {firstCommand.length > 55 ? firstCommand.slice(0, 55) + "..." : firstCommand}
                              </div>
                            )}

                            {/* Bottom row: difficulty + link */}
                            <div className="mt-4 flex items-center justify-between">
                              {diffInfo && (
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3].map((i) => (
                                      <div
                                        key={i}
                                        className={cn(
                                          "h-1.5 w-4 rounded-full transition-colors",
                                          i <= diffInfo.bars ? diffInfo.color : "bg-muted"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-muted-foreground">{diffInfo.level}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                <span>View Guide</span>
                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )
            })
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <Terminal className="h-4 w-4" />
                  <span>VULNEX Tools</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Comprehensive security testing toolkit for authorized assessments and CTF challenges.
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Categories</div>
                <ul className="space-y-1.5">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Stats</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>{toolCount} security tools</li>
                  <li>{categories.length} categories</li>
                  <li>{toolsData.reduce((s, t) => s + t.commands.length, 0)} commands</li>
                  <li>For authorized testing only</li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Usage</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All tools and techniques are intended for authorized security testing, CTF competitions, and educational purposes only.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
              VULNEX — Web Hacking Playbook
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
