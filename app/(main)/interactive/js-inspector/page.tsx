"use client"

import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, Home, Search, Upload, FileText, AlertTriangle, AlertCircle, Info, Shield, Check, Copy, Download, Bug, Eye, EyeOff, Terminal, Zap, Globe, Key, X, Slash, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { calculateRiskScore, type InspectorFinding, type FindingSeverity } from "@/lib/js-inspector-patterns"

const severityConfig: Record<FindingSeverity, { icon: React.ReactNode; color: string; bg: string; border: string; label: string }> = {
  critical: {
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    label: "Critical",
  },
  high: {
    icon: <Zap className="h-3.5 w-3.5" />,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    label: "High",
  },
  medium: {
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    label: "Medium",
  },
  info: {
    icon: <Info className="h-3.5 w-3.5" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    label: "Info",
  },
}

const categoryIcons: Record<string, React.ReactNode> = {
  "API Keys": <Key className="h-3.5 w-3.5" />,
  "Tokens": <Shield className="h-3.5 w-3.5" />,
  "Secrets": <Eye className="h-3.5 w-3.5" />,
  "Credentials": <Eye className="h-3.5 w-3.5" />,
  "API Routes": <Slash className="h-3.5 w-3.5" />,
  "Internal IPs": <Globe className="h-3.5 w-3.5" />,
  "Sensitive Functions": <Bug className="h-3.5 w-3.5" />,
  "WebSockets": <Terminal className="h-3.5 w-3.5" />,
  "Firebase": <Zap className="h-3.5 w-3.5" />,
  "Cloud": <Globe className="h-3.5 w-3.5" />,
  "URLs": <Globe className="h-3.5 w-3.5" />,
  "Contacts": <Eye className="h-3.5 w-3.5" />,
  "Source Maps": <FileText className="h-3.5 w-3.5" />,
  "Dependencies": <FileText className="h-3.5 w-3.5" />,
  "Storage": <Terminal className="h-3.5 w-3.5" />,
  "Network": <Globe className="h-3.5 w-3.5" />,
  "File Info": <FileText className="h-3.5 w-3.5" />,
  "Encoding": <FileText className="h-3.5 w-3.5" />,
  "Config": <Terminal className="h-3.5 w-3.5" />,
  "Service Workers": <Terminal className="h-3.5 w-3.5" />,
  "Messaging": <Terminal className="h-3.5 w-3.5" />,
  "Suspicious": <AlertTriangle className="h-3.5 w-3.5" />,
  "Obfuscation": <Eye className="h-3.5 w-3.5" />,
}

const SAMPLE_JS = `// Example JavaScript to analyze
const API_KEY = "AIzaSyD-8aBcDeFgHiJkLmNoPqRsTuVwXyZ01234567"
const token = "ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"

fetch("/api/v1/users", {
  headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dGVzdHNpZ25hdHVyZQ" }
})

const config = {
  apiKey: "AIzaSyB-8aBcDeFgHiJkLmNoPqRsTuVwXyZ01234567",
  authDomain: "my-project.firebaseapp.com",
  databaseURL: "https://my-project.firebaseio.com",
  projectId: "my-project-1234",
}

const password = "SuperSecret123!"
const secretKey = "sk-abc123def456ghi789jkl012"

fetch("https://admin.myapp.internal/api/debug?secret=mykey")

const badFn = new Function("return eval(code)")
element.innerHTML = userInput
document.write(html)

const ws = new WebSocket("wss://api.example.com/socket")
const io = io("https://staging.example.com", { transports: ["websocket"] })

const email = "admin@internal.company.com"
const host = "http://10.0.0.5:3000"
const dbUrl = "mongodb://admin:pass123@cluster0.mongodb.net:27017/mydb"
//# sourceMappingURL=app.min.js.map
`

export default function JsInspectorPage() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [ignoredKeys, setIgnoredKeys] = useState<Set<string>>(new Set())
  const [findings, setFindings] = useState<InspectorFinding[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState({ percent: 0, phase: "" })
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadedFileRef = useRef<File | null>(null)

  const lastAnalyzedRef = useRef("")

  useEffect(() => {
    return () => workerRef.current?.terminate()
  }, [])

  const startAnalysis = useCallback(async (directInput?: string) => {
    const file = directInput ? null : uploadedFileRef.current
    const source = directInput ?? input
    if (!source.trim() && !file) return

    workerRef.current?.terminate()

    const worker = new Worker(new URL("../../../../lib/js-inspector.worker.ts", import.meta.url), { type: "module" })
    workerRef.current = worker
    setIsAnalyzing(true)
    setFindings([])
    setProgress({ percent: 0, phase: file ? `Reading ${(file.size / 1_000_000).toFixed(1)} MB file...` : "Starting..." })

    const track = source

    worker.onmessage = (e) => {
      const msg = e.data
      if (msg.type === "progress") {
        setProgress({ percent: msg.percent, phase: msg.phase })
      } else if (msg.type === "result") {
        setFindings(msg.findings)
        setIsAnalyzing(false)
        setProgress({ percent: 100, phase: "Complete" })
        lastAnalyzedRef.current = track
      } else if (msg.type === "error") {
        setIsAnalyzing(false)
      }
    }

    worker.onerror = () => {
      setIsAnalyzing(false)
    }

    if (file) {
      try {
        const buf = await file.arrayBuffer()
        if (!workerRef.current) return
        worker.postMessage({ buf }, [buf])
      } catch {
        setIsAnalyzing(false)
        setProgress({ percent: 0, phase: "Failed to read file" })
      }
    } else {
      worker.postMessage({ input: source })
    }
  }, [input])

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !isAnalyzing) {
        e.preventDefault()
        startAnalysis()
      }
    }
    ta.addEventListener("keydown", handler)
    return () => ta.removeEventListener("keydown", handler)
  }, [isAnalyzing, startAnalysis])

  const cancelAnalysis = useCallback(() => {
    workerRef.current?.terminate()
    workerRef.current = null
    setIsAnalyzing(false)
    setProgress({ percent: 0, phase: "Cancelled" })
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem("js-inspector-ignored")
      if (saved) setIgnoredKeys(new Set(JSON.parse(saved)))
    } catch { /* ignore */ }
  }, [])

  const toggleIgnore = (key: string) => {
    setIgnoredKeys(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      try { localStorage.setItem("js-inspector-ignored", JSON.stringify([...next])) } catch { /* ignore */ }
      return next
    })
  }

  const clearIgnored = () => {
    setIgnoredKeys(new Set())
    try { localStorage.removeItem("js-inspector-ignored") } catch { /* ignore */ }
  }

  const risk = useMemo(() => findings.length > 0 ? calculateRiskScore(findings) : null, [findings])

  const findKey = (f: InspectorFinding) => `${f.line}|${f.type}|${f.value}`

  const activeFindings = useMemo(() => findings.filter(f => !ignoredKeys.has(findKey(f))), [findings, ignoredKeys])

  const searchedFindings = useMemo(() => {
    const source = activeFindings
    if (!searchQuery.trim()) return source
    const q = searchQuery.toLowerCase()
    return source.filter(f =>
      f.type.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.value.toLowerCase().includes(q) ||
      f.context.toLowerCase().includes(q)
    )
  }, [findings, searchQuery])

  const lines = useMemo(() => input.split("\n"), [input])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    uploadedFileRef.current = file
    setUploadedFile({ name: file.name, size: file.size })

    const previewSize = Math.min(5000, file.size)
    const previewBlob = file.slice(0, previewSize)
    const preview = await previewBlob.text()
    setInput(preview + (file.size > previewSize ? `\n\n/* … truncated: ${file.name} (${(file.size / 1_000_000).toFixed(1)} MB) — click Analyze to process full file */` : ""))

    e.target.value = ""
  }

  const exportJson = () => {
    const groups: Record<string, { severity: FindingSeverity; items: { line: number; type: string; category: string; value: string }[] }> = {}
    for (const f of findings) {
      if (!groups[f.category]) groups[f.category] = { severity: f.severity, items: [] }
      groups[f.category].items.push({ line: f.line, type: f.type, category: f.category, value: f.value })
    }
    const sorted = Object.entries(groups).sort((a, b) => {
      const order = ["critical", "high", "medium", "info"]
      return order.indexOf(a[1].severity) - order.indexOf(b[1].severity)
    })
    const output = sorted.map(([category, { severity, items }]) => ({
      severity,
      category,
      count: items.length,
      findings: items.sort((x, y) => x.line - y.line),
    }))
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "js-inspector-results.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="JS Source Inspector — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">JS Source Inspector</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-pink-400 shadow-md">
                <Search className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">JS Source Inspector</h1>
                <p className="mt-1 text-muted-foreground">Extract API keys, tokens, secrets, routes, and sensitive data from JavaScript source code</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-6 space-y-6">
          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Source Code</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Upload className="h-3.5 w-3.5" /> Upload .js
                </button>
                <input ref={fileInputRef} type="file" accept=".js,.ts,.tsx,.jsx,.mjs,.cjs,.json,.html,.htm" onChange={handleFileUpload} className="hidden" />
                <button onClick={() => { setInput(SAMPLE_JS); startAnalysis(SAMPLE_JS) }} className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <RefreshCw className="h-3.5 w-3.5" /> Sample
                </button>
                {input && <button onClick={() => { workerRef.current?.terminate(); workerRef.current = null; uploadedFileRef.current = null; setUploadedFile(null); setInput(""); setSelectedLine(null); setSearchQuery(""); setFindings([]); setIsAnalyzing(false); setProgress({ percent: 0, phase: "" }); lastAnalyzedRef.current = "" }} className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-3.5 w-3.5" /> Clear
                </button>}
              </div>
            </div>
            <div className="relative">
              <textarea ref={textareaRef} value={input}
                onChange={e => { setInput(e.target.value); autoResize() }}
                placeholder={`Paste JavaScript code here...\n\nOr click "Upload .js" to select a file.`}
                className="w-full min-h-[300px] resize-y rounded-xl border border-border/50 bg-card p-5 font-mono text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="rounded bg-muted/80 px-2 py-0.5 text-[10px] text-muted-foreground font-mono">{lines.length} lines</span>
                {input && (
                  <button onClick={() => { navigator.clipboard.writeText(input); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    className="rounded bg-muted/80 p-1 text-muted-foreground hover:text-foreground transition-colors">
                    {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                  </button>
                )}
              </div>
            </div>

            {/* File info badge */}
            {uploadedFile && (
              <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="text-xs font-medium text-foreground truncate max-w-[200px]">{uploadedFile.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {(uploadedFile.size / 1_000_000).toFixed(1)} MB
                </span>
                <button onClick={() => { uploadedFileRef.current = null; setUploadedFile(null); setInput(input.replace(/\n\/\* … truncated:.*\*\/$/, "")) }}
                  className="ml-auto text-muted-foreground hover:text-red-400 transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Analyze Button Row */}
            {input && (
              <div className="flex justify-center">
                {!isAnalyzing ? (
                  <button onClick={() => startAnalysis()}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]">
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                    <Zap className="h-5 w-5" />
                    <span>{findings.length > 0 ? "Re-analyze" : "Analyze"}</span>
                    <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-mono text-white/70">Ctrl</kbd>
                    <kbd className="hidden sm:inline-flex items-center rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-mono text-white/70">↵</kbd>
                  </button>
                ) : (
                  <button onClick={cancelAnalysis}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98]">
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                    <X className="h-5 w-5" />
                    <span>Cancel</span>
                    <span className="text-[10px] text-white/60 font-mono">{progress.percent}%</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results Section */}
          {input.trim() ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              {isAnalyzing && (
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <div className="px-5 py-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-primary animate-spin" />
                        <span className="text-xs font-medium text-foreground">{progress.phase}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-muted-foreground">{progress.percent}%</span>
                        <button onClick={cancelAnalysis}
                          className="flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-[10px] font-medium text-red-400 hover:bg-red-500/20 transition-colors">
                          <X className="h-3 w-3" /> Cancel
                        </button>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500 transition-all duration-300"
                        style={{ width: `${progress.percent}%` }} />
                    </div>
                  </div>
                </div>
              )}

              {/* No Findings */}
              {!isAnalyzing && findings.length === 0 && progress.phase === "Complete" && (
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Shield className="h-10 w-10 text-emerald-400/50 mb-3" />
                    <h3 className="text-sm font-bold text-foreground mb-1">No sensitive data detected</h3>
                    <p className="text-xs text-muted-foreground/60 max-w-md">The analyzed code appears clean — no API keys, tokens, secrets, or suspicious patterns were found.</p>
                  </div>
                </div>
              )}

              {/* Stale results hint */}
              {!isAnalyzing && findings.length > 0 && input !== lastAnalyzedRef.current && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-2.5">
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="text-xs text-amber-300/80">Source code changed — click <strong>Re-analyze</strong> to update results</span>
                </div>
              )}

              {/* Detailed Findings */}
              {!isAnalyzing && findings.length > 0 && (
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <div className="flex items-center justify-between bg-gradient-to-r from-rose-500/5 to-transparent px-5 py-3 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-rose-400" />
                      <h3 className="text-sm font-bold text-foreground">Detailed Findings</h3>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{activeFindings.length}/{findings.length}</span>
                      {ignoredKeys.size > 0 && (
                        <button onClick={clearIgnored} className="flex items-center gap-1 rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                          <EyeOff className="h-3 w-3" /> {ignoredKeys.size} ignored — restore
                        </button>
                      )}
                      {risk && (
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold",
                          risk.level === "critical" ? "bg-red-500/20 text-red-400" :
                          risk.level === "high" ? "bg-orange-500/20 text-orange-400" :
                          risk.level === "medium" ? "bg-amber-500/20 text-amber-400" :
                          "bg-blue-500/20 text-blue-400"
                        )}>
                          Risk {risk.score}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={exportJson} className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-colors">
                        <Download className="h-3.5 w-3.5" /> Export JSON
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-b border-border/20 px-5 py-2">
                    <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Filter by type, category, value, or context..."
                      className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none" />
                    {searchQuery && (
                      <>
                        <span className="text-[10px] text-muted-foreground font-mono">{searchedFindings.length} of {activeFindings.length}</span>
                        <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground transition-colors">
                          <X className="h-3 w-3" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border/30 bg-muted/20">
                          <th className="text-left px-4 py-2.5 font-bold text-muted-foreground tracking-wider uppercase text-[10px] w-12">Line</th>
                          <th className="text-left px-4 py-2.5 font-bold text-muted-foreground tracking-wider uppercase text-[10px]">Type</th>
                          <th className="text-left px-4 py-2.5 font-bold text-muted-foreground tracking-wider uppercase text-[10px]">Category</th>
                          <th className="text-left px-4 py-2.5 font-bold text-muted-foreground tracking-wider uppercase text-[10px]">Value</th>
                          <th className="text-left px-4 py-2.5 font-bold text-muted-foreground tracking-wider uppercase text-[10px] hidden md:table-cell">Context</th>
                          <th className="text-left px-4 py-2.5 font-bold text-muted-foreground tracking-wider uppercase text-[10px] w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20">
                        {searchedFindings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-xs text-muted-foreground/50">
                              No findings match "{searchQuery}"
                            </td>
                          </tr>
                        ) : searchedFindings.map((f, idx) => {
                          const cfg = severityConfig[f.severity]
                          const leftBorderColor =
                            f.severity === "critical" ? "border-l-red-500" :
                            f.severity === "high" ? "border-l-orange-500" :
                            f.severity === "medium" ? "border-l-amber-500" :
                            "border-l-blue-500"
                          return (
                            <tr key={idx} className={cn("transition-colors", selectedLine === f.line ? "bg-muted/30" : "hover:bg-muted/10")}>
                              <td className={cn("px-4 py-3 border-l-[3px]", leftBorderColor)}>
                                <button onClick={() => setSelectedLine(selectedLine === f.line ? null : f.line)}
                                  className={cn("font-mono font-bold text-xs hover:underline", cfg.color)}>
                                  {f.line}
                                </button>
                              </td>
                              <td className="px-4 py-3">
                                <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold", cfg.bg, cfg.color)}>
                                  {cfg.icon}{f.type}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                  {categoryIcons[f.category] || null}
                                  {f.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 max-w-[280px]">
                                <code className="block break-all rounded bg-black/30 px-2 py-1 font-mono text-xs text-muted-foreground/90 border border-border/20">
                                  {f.value}
                                </code>
                              </td>
                              <td className="px-4 py-3 max-w-[300px] hidden md:table-cell">
                                <code className="block break-all font-mono text-[11px] text-muted-foreground/60">
                                  {f.context}
                                </code>
                              </td>
                              <td className="px-2 py-3">
                                <button onClick={() => toggleIgnore(findKey(f))}
                                  className="text-muted-foreground/30 hover:text-red-400 transition-colors"
                                  title="Ignore this finding">
                                  <EyeOff className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Source Code Viewer with highlighted lines */}
              {selectedLine !== null && (
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/5 to-transparent px-5 py-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <Eye className="h-3.5 w-3.5 text-amber-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Source Context — Line {selectedLine}</h3>
                    </div>
                    <button onClick={() => setSelectedLine(null)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <X className="h-3 w-3" /> Close
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed">
                    {lines.map((line, idx) => {
                      const lineNum = idx + 1
                      const isTarget = lineNum === selectedLine
                      const hasFindings = findings.some(f => f.line === lineNum)
                      return (
                        <div key={idx} className={cn("flex", isTarget ? "bg-amber-500/15 rounded" : hasFindings ? "bg-red-500/5" : "")}>
                          <span className={cn("select-none w-10 shrink-0 text-right pr-3 font-mono",
                            isTarget ? "text-amber-400 font-bold" : hasFindings ? "text-red-400" : "text-muted-foreground/40")}>
                            {lineNum}
                          </span>
                          <span className={cn("flex-1 whitespace-pre-wrap break-all", isTarget ? "text-foreground font-semibold" : "text-muted-foreground/80")}>
                            {line || " "}
                          </span>
                        </div>
                      )
                    })}
                  </pre>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
