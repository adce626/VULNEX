"use client"

import { useState, useCallback, useEffect } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import {
  payloadCategories, encoders,
  templates, obfuscationOptions, targets, wafLevels,
  type PayloadItem,
} from "@/lib/payload-forge-data"
import {
  Code2, Database, Braces, FolderOpen, Terminal, FileCode,
  ArrowLeftRight, ExternalLink, Sword, Copy, Check, Trash2,
  Shuffle, ChevronRight, Star,
  History, X, Settings2, Zap, Bookmark,
  Home, Wand2, AlertTriangle, Search, RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const categoryIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Braces: <Braces className="h-5 w-5" />,
  FolderOpen: <FolderOpen className="h-5 w-5" />,
  Terminal: <Terminal className="h-5 w-5" />,
  FileCode: <FileCode className="h-5 w-5" />,
  ArrowLeftRight: <ArrowLeftRight className="h-5 w-5" />,
  ExternalLink: <ExternalLink className="h-5 w-5" />,
}

const wafColors: Record<string, string> = {
  Low: "text-green-400 bg-green-500/10",
  Medium: "text-yellow-400 bg-yellow-500/10",
  Hard: "text-orange-400 bg-orange-500/10",
  Extreme: "text-red-400 bg-red-500/10",
}

function applyObfuscation(payload: string, options: string[]): string {
  let result = payload
  if (options.includes("random-comments")) {
    const comments = ["/**/", "/*!*/", "/*0000*/", "/**/"]
    const idx = Math.floor(Math.random() * comments.length)
    result = result.replace(/\(/g, "(" + comments[idx])
  }
  if (options.includes("case-randomize")) {
    result = result.split("").map(c =>
      Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()
    ).join("")
  }
  if (options.includes("zero-width")) {
    const zwc = "\u200B"
    const pos = Math.floor(Math.random() * result.length)
    result = result.slice(0, pos) + zwc + result.slice(pos)
  }
  if (options.includes("tab-insert")) {
    result = result.replace(/\s+/g, match => match + "\t")
  }
  return result
}

export default function PayloadForgePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("xss")
  const [selectedSub, setSelectedSub] = useState<string>("")
  const [selectedPayload, setSelectedPayload] = useState<PayloadItem | null>(null)
  const [currentPayload, setCurrentPayload] = useState("")
  const [encodingChain, setEncodingChain] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [history, setHistory] = useState<{ text: string; id?: string }[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState("")
  const [selectedTarget, setSelectedTarget] = useState<string>("")
  const [selectedWaf, setSelectedWaf] = useState<string>("Low")
  const [obfuscationOpts, setObfuscationOpts] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenu, setMobileMenu] = useState<"categories" | "options" | null>(null)
  useEffect(() => {
    const stored = localStorage.getItem("pf-favorites")
    if (stored) { try { setFavorites(JSON.parse(stored)) } catch {} }
    const storedHistory = localStorage.getItem("pf-history")
    if (storedHistory) { try { setHistory(JSON.parse(storedHistory)) } catch {} }
  }, [])
  useEffect(() => { localStorage.setItem("pf-favorites", JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem("pf-history", JSON.stringify(history)) }, [history])
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setShowTemplates(false); setShowHistory(false) }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { handleEncode() }
    }
    window.addEventListener("keydown", onKey)
    return () => { window.removeEventListener("resize", check); window.removeEventListener("keydown", onKey) }
  }, [handleEncode])
  const category = payloadCategories.find(c => c.id === selectedCategory)
  const subcategory = category?.subcategories.find(s => s.id === selectedSub)
  const levelOrder = ["Low", "Medium", "Hard", "Extreme"]
  const wafIndex = levelOrder.indexOf(selectedWaf)
  const filteredPayloads = subcategory?.payloads.filter(p => {
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.payload.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTarget = !selectedTarget ||
      (p.target && p.target.includes(selectedTarget))
    const matchesWaf = wafIndex <= levelOrder.indexOf(p.level)
    return matchesSearch && matchesTarget && matchesWaf
  }) ?? []

  const allPayloads = payloadCategories.flatMap(c =>
    c.subcategories.flatMap(s => s.payloads)
  )
  const favPayloads = allPayloads.filter(p => favorites.includes(p.id))

  const handleSelectPayload = useCallback((p: PayloadItem) => {
    setSelectedPayload(p)
    setCurrentPayload(p.payload)
    setHistory(prev => {
      const next = [{ text: p.payload, id: p.id }, ...prev.filter(h => h.text !== p.payload)]
      return next.slice(0, 15)
    })
  }, [])

  const handleEncode = useCallback(() => {
    if (!currentPayload) return
    if (!encodingChain.length && !obfuscationOpts.length) {
      if (selectedPayload) { setCurrentPayload(selectedPayload.payload); setToast("Reverted to original") }
      else setToast("No encoder selected")
      setTimeout(() => setToast(""), 2000)
      return
    }
    let result = currentPayload
    for (const id of encodingChain) {
      const enc = encoders.find(e => e.id === id)
      if (enc) result = enc.encode(result)
    }
    result = applyObfuscation(result, obfuscationOpts)
    setCurrentPayload(result)
    setToast("Encoding applied")
    setTimeout(() => setToast(""), 2000)
  }, [currentPayload, encodingChain, obfuscationOpts, selectedPayload])

  const handleCopy = useCallback(async () => {
    if (!currentPayload) return
    try {
      await navigator.clipboard.writeText(currentPayload)
      setCopied(true)
      setToast("Copied to clipboard")
      setTimeout(() => { setCopied(false); setToast("") }, 2000)
    } catch {
      setToast("Failed to copy")
      setTimeout(() => setToast(""), 2000)
    }
  }, [currentPayload])

  const handleRandomize = useCallback(() => {
    const all = payloadCategories.flatMap(c =>
      c.subcategories.flatMap(s => s.payloads)
    )
    const p = all[Math.floor(Math.random() * all.length)]
    for (const cat of payloadCategories) {
      for (const sub of cat.subcategories) {
        if (sub.payloads.some(pp => pp.id === p.id)) {
          setSelectedCategory(cat.id)
          setSelectedSub(sub.id)
          handleSelectPayload(p)
          return
        }
      }
    }
  }, [handleSelectPayload])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }, [])

  const toggleObfuscation = useCallback((id: string) => {
    setObfuscationOpts(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    )
  }, [])

  const toggleEncoder = useCallback((id: string) => {
    setEncodingChain(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PageTitle title="Payload Forge" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-white/5 bg-black/40">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-cyan-400 hover:underline">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-cyan-400 hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-cyan-300">Payload Forge</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#0a0a0a] via-[#0f0022] to-[#0a0a0a]">
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-fuchsia-500/5 blur-[120px]" />
          <div className="relative px-6 py-14 text-center lg:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 shadow-lg" style={{ boxShadow: "0 10px 40px rgba(0,245,255,0.15)" }}>
              <Sword className="h-10 w-10 text-cyan-400" />
            </div>
            <h1 className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-4xl font-black text-transparent lg:text-5xl tracking-wider">
              Payload Forge
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
              <span className="text-cyan-400/60">Engineer.</span>{" "}
              <span className="text-fuchsia-400/60">Encode.</span>{" "}
              <span className="text-cyan-400/60">Exploit.</span>
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={handleRandomize} className="group relative overflow-hidden rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]">
                <span className="relative z-10 flex items-center gap-2">
                  <Shuffle className="h-4 w-4" />
                  Generate Random Payload
                </span>
              </button>
              <button onClick={() => setShowTemplates(true)} className="group relative overflow-hidden rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-6 py-3 text-sm font-semibold text-fuchsia-300 transition-all hover:bg-fuchsia-500/20 hover:shadow-[0_0_30px_rgba(192,38,211,0.15)]">
                <span className="relative z-10 flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  Load Template
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/5 bg-black/20 px-6 py-3">
          {payloadCategories.map(cat => (
            <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setSelectedSub(cat.subcategories[0]?.id ?? "") }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all whitespace-nowrap border",
                selectedCategory === cat.id
                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.1)]"
                  : "border-white/5 text-white/40 hover:border-white/10 hover:text-white/70"
              )}
            >
              {categoryIcons[cat.icon]}
              {cat.name}
            </button>
          ))}
        </div>

        {isMobile && (
          <div className="flex gap-2 border-b border-white/5 bg-black/20 px-6 py-2">
            <button onClick={() => setMobileMenu(mobileMenu === "categories" ? null : "categories")}
              className={cn("flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition-all",
                mobileMenu === "categories" ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-white/5 text-white/40")}
            >
              <Code2 className="h-3 w-3" /> Categories
            </button>
            <button onClick={() => setMobileMenu(mobileMenu === "options" ? null : "options")}
              className={cn("flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition-all",
                mobileMenu === "options" ? "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-300" : "border-white/5 text-white/40")}
            >
              <Settings2 className="h-3 w-3" /> Options
            </button>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          <div className="flex gap-6">
            {(!isMobile || mobileMenu === "categories") && (
              <div className={cn("shrink-0", isMobile ? "w-full" : "w-[260px]")}>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                    <h3 className="text-sm font-semibold text-white/60">Categories</h3>
                    {isMobile && (
                      <button onClick={() => setMobileMenu(null)} className="text-white/30 hover:text-white/60">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="border-b border-white/5 px-3 py-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />
                      <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search payloads..." className="w-full rounded-lg border border-white/5 bg-black/40 py-1.5 pl-8 pr-3 text-xs text-white/60 placeholder:text-white/20 outline-none focus:border-cyan-500/30 transition-colors" />
                    </div>
                  </div>
                  <div className="p-2">
                    {category?.subcategories.map(sub => (
                      <div key={sub.id}>
                        <button onClick={() => setSelectedSub(selectedSub === sub.id ? "" : sub.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-all",
                            selectedSub === sub.id
                              ? "bg-cyan-500/10 text-cyan-300"
                              : "text-white/40 hover:bg-white/5 hover:text-white/70"
                          )}
                        >
                          <ChevronRight className={cn("h-3 w-3 transition-transform", selectedSub === sub.id && "rotate-90")} />
                          {sub.name}
                        </button>
                        {selectedSub === sub.id && (
                          <div className="ml-4 space-y-0.5 border-l border-white/5 pl-2">
                            {filteredPayloads.map(p => (
                              <button key={p.id} onClick={() => handleSelectPayload(p)}
                                className={cn(
                                  "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-all",
                                  selectedPayload?.id === p.id
                                    ? "bg-cyan-500/10 text-cyan-300"
                                    : "text-white/30 hover:bg-white/5 hover:text-white/60"
                                )}
                              >
                                <span className="flex-1 truncate">{p.name}</span>
                                <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium", wafColors[p.level])}>{p.level}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-cyan-400" />
                      <h2 className="text-sm font-semibold text-white/80">Payload Studio</h2>
                      {selectedPayload && (
                        <button onClick={() => toggleFavorite(selectedPayload.id)}
                          className={cn("transition-colors", favorites.includes(selectedPayload.id) ? "text-yellow-400" : "text-white/20 hover:text-yellow-400")}
                        >
                          <Star className="h-3.5 w-3.5" fill={favorites.includes(selectedPayload.id) ? "currentColor" : "none"} />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowHistory(true)} className="rounded-lg border border-white/5 px-3 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
                        <History className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={handleRandomize} className="rounded-lg border border-white/5 px-3 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
                        <Shuffle className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => setCurrentPayload("")} className="rounded-lg border border-white/5 px-3 py-1.5 text-xs text-white/40 hover:text-red-400 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-all">
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <textarea value={currentPayload} onChange={e => setCurrentPayload(e.target.value)}
                      placeholder="Select a payload or type your own..."
                      className="min-h-[200px] w-full resize-y rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-sm text-white/80 placeholder:text-white/10 outline-none transition-all focus:border-cyan-500/30 focus:shadow-[0_0_30px_rgba(0,245,255,0.05)]"
                      spellCheck={false}
                    />
                    {selectedPayload && (
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/30">
                        <span className="rounded-lg bg-white/5 px-2 py-1">{selectedPayload.name}</span>
                        <button onClick={() => setSelectedWaf(selectedPayload.level)}
                          className={cn("rounded-lg px-2 py-1 transition-all hover:scale-105", wafColors[selectedPayload.level])}
                        >
                          {selectedPayload.level}
                        </button>
                        {selectedPayload.target && selectedPayload.target.length > 0 && (
                          selectedPayload.target.map(t => (
                            <button key={t} onClick={() => setSelectedTarget(selectedTarget === t ? "" : t)}
                              className={cn(
                                "rounded-lg px-2 py-1 transition-all hover:scale-105",
                                selectedTarget === t
                                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                  : "bg-white/5 hover:bg-white/10"
                              )}
                            >
                              {t}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Wand2 className="h-4 w-4 text-fuchsia-400" />
                      <h2 className="text-sm font-semibold text-white/80">Encoding Engine</h2>
                    </div>
                    <button onClick={handleEncode}
                      className="flex items-center gap-1.5 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium text-fuchsia-300 hover:bg-fuchsia-500/20 transition-all"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      Apply Encoding Chain
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                        {encoders.map(enc => (
                        <button key={enc.id} onClick={() => toggleEncoder(enc.id)}
                          className={cn(
                            "rounded-xl border px-3 py-2 text-xs font-medium transition-all",
                            encodingChain.includes(enc.id)
                              ? "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 shadow-[0_0_15px_rgba(192,38,211,0.1)]"
                              : "border-white/5 text-white/30 hover:border-white/10 hover:text-white/50"
                          )}
                        >
                          {enc.name}
                        </button>
                      ))}
                    </div>
                    {encodingChain.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-white/5 bg-black/30 p-3">
                        <span className="text-xs text-white/30">Chain:</span>
                        {encodingChain.map(id => {
                          const enc = encoders.find(e => e.id === id)
                          return (
                            <span key={id} className="flex items-center gap-1 rounded-lg bg-fuchsia-500/10 px-3 py-1.5 text-xs font-medium text-fuchsia-300">
                              {enc?.name ?? id}
                              <button onClick={() => toggleEncoder(id)} className="text-fuchsia-300/40 hover:text-red-400 transition-colors ml-0.5">
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          )
                        })}
                        <button onClick={() => setEncodingChain([])} className="text-xs text-white/20 hover:text-red-400 transition-colors ml-1">
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(!isMobile || mobileMenu === "options") && (
              <div className={cn("shrink-0", isMobile ? "w-full" : "w-[240px]")}>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                      <h3 className="text-sm font-semibold text-white/60">Options</h3>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setSelectedTarget(""); setSelectedWaf("Low"); setObfuscationOpts([]); setEncodingChain([]) }} className="rounded-lg border border-white/5 p-1.5 text-white/30 hover:text-cyan-400 hover:border-cyan-500/30 transition-all" title="Clear all filters">
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                        {isMobile && (
                          <button onClick={() => setMobileMenu(null)} className="text-white/30 hover:text-white/60">
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4 p-4">
                      <div>
                        <label className="text-xs text-white/30">Target</label>
                        <select value={selectedTarget} onChange={e => setSelectedTarget(e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-white/5 bg-black/40 px-3 py-2 text-xs text-white/60 outline-none focus:border-cyan-500/30"
                        >
                          <option value="">Any</option>
                          {targets.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/30">WAF Bypass Level</label>
                        <select value={selectedWaf} onChange={e => setSelectedWaf(e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-white/5 bg-black/40 px-3 py-2 text-xs text-white/60 outline-none focus:border-cyan-500/30"
                        >
                          {wafLevels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/30">Obfuscation</label>
                        <div className="mt-1.5 space-y-1.5">
                          {obfuscationOptions.map(opt => (
                            <button key={opt.id} onClick={() => toggleObfuscation(opt.id)}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-xs transition-all",
                                obfuscationOpts.includes(opt.id)
                                  ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                  : "border-white/5 text-white/30 hover:border-white/10"
                              )}
                            >
                              <div className={cn("h-3 w-3 rounded border", obfuscationOpts.includes(opt.id) ? "border-cyan-400 bg-cyan-500" : "border-white/20")}>
                                {obfuscationOpts.includes(opt.id) && <Check className="h-3 w-3 text-black" />}
                              </div>
                              {opt.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                    <div className="border-b border-white/5 px-4 py-3">
                      <h3 className="text-sm font-semibold text-white/60">Favorites</h3>
                    </div>
                    <div className="p-2">
                      {favPayloads.length === 0 ? (
                        <p className="px-3 py-4 text-center text-xs text-white/20">No favorites yet</p>
                      ) : (
                        favPayloads.map(p => (
                          <button key={p.id} onClick={() => handleSelectPayload(p)}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-white/40 hover:bg-white/5 hover:text-white/70 transition-all"
                          >
                            <Star className="h-3 w-3 shrink-0 text-yellow-400" fill="currentColor" />
                            <span className="truncate">{p.name}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-cyan-500/30 bg-cyan-500/20 px-5 py-3 text-sm text-cyan-300 shadow-[0_0_30px_rgba(0,245,255,0.15)] backdrop-blur-xl">
            {toast}
          </div>
        )}
        <div className="border-t border-white/5 bg-black/40 px-6 py-4 text-center">
          <p className="flex items-center justify-center gap-2 text-xs text-yellow-500/60">
            <AlertTriangle className="h-3 w-3" />
            This tool is for educational and authorized security testing only. Any misuse is the sole responsibility of the user.
          </p>
        </div>
      </main>

      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowTemplates(false)}>
          <div className="mx-4 max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="text-lg font-bold text-white/80">Templates</h2>
              <button onClick={() => setShowTemplates(false)} className="rounded-lg border border-white/5 p-2 text-white/30 hover:text-white/60 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-2 p-4">
              {templates.map(t => (
                <button key={t.id} onClick={() => { setCurrentPayload(t.payload); setShowTemplates(false) }}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 p-4 text-left transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10">
                    <Bookmark className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white/70 group-hover:text-cyan-300 transition-colors">{t.name}</h4>
                    <p className="mt-0.5 text-xs text-white/30 truncate">{t.description}</p>
                    <p className="mt-1 font-mono text-[10px] text-white/20 truncate">{t.payload.slice(0, 80)}{t.payload.length > 80 ? "..." : ""}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowHistory(false)}>
          <div className="mx-4 max-h-[60vh] w-full max-w-lg overflow-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="text-lg font-bold text-white/80">
                <History className="mr-2 inline h-4 w-4 text-cyan-400" />
                History (Last 15)
              </h2>
              <button onClick={() => setShowHistory(false)} className="rounded-lg border border-white/5 p-2 text-white/30 hover:text-white/60 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-2">
              {history.length === 0 ? (
                <p className="py-8 text-center text-sm text-white/20">No history yet</p>
              ) : (
                history.map((h, i) => (
                  <button key={i} onClick={() => {
                    setCurrentPayload(h.text); setShowHistory(false)
                    if (h.id) {
                      const found = allPayloads.find(p => p.id === h.id)
                      if (found) setSelectedPayload(found)
                    }
                  }}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/5 p-3 text-left transition-all hover:border-cyan-500/20 hover:bg-cyan-500/5"
                  >
                    <span className="text-xs text-white/20 w-5">{i + 1}</span>
                    <p className="flex-1 truncate font-mono text-xs text-white/40">{h.text.slice(0, 100)}{h.text.length > 100 ? "..." : ""}</p>
                    <Copy className="h-3 w-3 shrink-0 text-white/20" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
