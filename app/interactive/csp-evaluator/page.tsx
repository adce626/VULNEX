"use client"

import { useState, useMemo } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, Home, Shield, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { parseCSP, evaluateCSP } from "@/lib/interactive-data"

const severityIcons: Record<string, React.ReactNode> = {
  high: <AlertTriangle className="h-4 w-4 shrink-0" />,
  medium: <AlertCircle className="h-4 w-4 shrink-0" />,
  info: <Info className="h-4 w-4 shrink-0" />,
}

const severityColors: Record<string, string> = {
  high: "border-red-500/30 bg-red-500/10 text-red-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-300",
}

const presetPolicies = [
  { name: "Strict", value: "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'" },
  { name: "Basic", value: "default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'" },
  { name: "Permissive", value: "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'" },
  { name: "Google", value: "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://www.google-analytics.com" },
]

export default function CspEvaluatorPage() {
  const [input, setInput] = useState("")

  const directives = useMemo(() => parseCSP(input), [input])
  const warnings = useMemo(() => evaluateCSP(directives), [directives])

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="CSP Evaluator — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">CSP Evaluator</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-400 shadow-md">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">CSP Evaluator</h1>
                <p className="mt-1 text-muted-foreground">Parse and analyze Content Security Policy headers for security weaknesses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground">CSP Header</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'"
              rows={4}
              className="mt-1 w-full rounded-xl border border-border bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-y"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {presetPolicies.map(p => (
              <button
                key={p.name}
                onClick={() => setInput(p.value)}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>

          {input && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Directives ({directives.length})</h2>
                {directives.length === 0 && (
                  <p className="text-sm text-muted-foreground">No valid directives found. CSP header format: directive source1 source2; directive source3</p>
                )}
                {directives.map((d, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-card p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">{d.name}</span>
                    </div>
                    <p className="mt-2 break-all font-mono text-xs text-muted-foreground">{d.value || "(no sources)"}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Issues ({warnings.length})</h2>
                {warnings.length === 0 && (
                  <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                    <Shield className="h-5 w-5 shrink-0 text-green-400" />
                    <p className="text-sm text-green-300">No critical issues found. Review recommended best practices.</p>
                  </div>
                )}
                {warnings.map((w, i) => (
                  <div key={i} className={`flex items-start gap-3 rounded-xl border p-4 ${severityColors[w.severity]}`}>
                    <span className="mt-0.5">{severityIcons[w.severity]}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-xs font-medium">{w.directive}</span>
                        <span className="text-xs uppercase opacity-70">{w.severity}</span>
                      </div>
                      <p className="mt-1 text-sm">{w.message}</p>
                    </div>
                  </div>
                ))}

                <details className="rounded-xl border border-border/50 bg-card">
                  <summary className="cursor-pointer px-5 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">What to check</summary>
                  <div className="border-t border-border/50 px-5 py-4 space-y-2 text-sm text-muted-foreground">
                    <p>✅ Set <code className="rounded bg-muted px-1 font-mono text-xs">default-src 'self'</code> as baseline</p>
                    <p>✅ Avoid <code className="rounded bg-muted px-1 font-mono text-xs">unsafe-inline</code> in script-src — use nonces or hashes</p>
                    <p>✅ Set <code className="rounded bg-muted px-1 font-mono text-xs">object-src 'none'</code> and <code className="rounded bg-muted px-1 font-mono text-xs">base-uri 'self'</code></p>
                    <p>✅ Add <code className="rounded bg-muted px-1 font-mono text-xs">frame-ancestors 'self'</code> for clickjacking protection</p>
                    <p>✅ Use HTTPS sources, avoid wildcards (<code className="rounded bg-muted px-1 font-mono text-xs">*</code>)</p>
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
