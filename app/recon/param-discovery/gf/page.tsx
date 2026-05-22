"use client"

import { PageTitle } from "@/components/page-title"
import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import {
  Home,
  ChevronRight,
  Download,
  Terminal,
  Command,
  Clock,
  FileText,
  AlertTriangle,
  Check,
} from "lucide-react"
import Link from "next/link"

export default function GFPage() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="GF — Param Discovery" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/recon" className="hover:text-foreground">Recon</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/recon/param-discovery" className="hover:text-foreground">Param Discovery</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">gf</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">gf</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              URL pattern matching tool by Tomnomnom for vulnerability filtering
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">URL Filtering</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">Go</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-12 p-6">
          <section id="installation">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Installation</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                {[
                  { text: "go install github.com/tomnomnom/gf@latest", desc: "Install via Go" },
                  { text: "echo 'xss: <script>alert(1)</script>' >> ~/.gf/patterns/xss", desc: "Add custom XSS pattern" },
                  { text: "gf -h", desc: "Verify installation" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">{idx + 1}</span>
                    <code className="font-mono text-sm bg-muted/50 px-2 py-0.5 rounded">{step.text}</code>
                    <span className="text-sm">{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="usage">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Basic Usage</h2>
            </div>
            <div className="space-y-4">
              {[
                { code: "cat all_urls.txt | gf xss > xss.txt", desc: "Filter URLs vulnerable to XSS" },
                { code: "cat all_urls.txt | gf ssrf > ssrf.txt", desc: "Filter URLs vulnerable to SSRF" },
                { code: "cat all_urls.txt | gf redirect > redirect.txt", desc: "Filter URLs vulnerable to Open Redirect" },
                { code: "cat all_urls.txt | gf sql > sql.txt", desc: "Filter URLs vulnerable to SQL Injection" },
                { code: "cat all_urls.txt | gf sqli,idor > vulns.txt", desc: "Filter with multiple vulnerability patterns" },
              ].map((item, idx) => (
                <div key={idx} className="bg-muted/50 border border-border/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2">{item.desc}</div>
                  <pre className="bg-background rounded p-3 overflow-x-auto"><code className="text-sm font-mono">{item.code}</code></pre>
                </div>
              ))}
            </div>
          </section>

          <section id="commands">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Command className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Key Options</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { cmd: "gf <pattern>", desc: "Filter URLs by specific pattern" },
                { cmd: "-list", desc: "List all saved patterns" },
                { cmd: "-save <name>", desc: "Save a new pattern" },
                { cmd: "-rm <name>", desc: "Remove a saved pattern" },
                { cmd: "-only", desc: "Show only matching results" },
                { cmd: "-no-color", desc: "Disable colors in output" },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="font-mono text-sm text-primary mb-1">{item.cmd}</div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="nlp_patterns">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Built-in Patterns</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { pattern: "xss", desc: "Detect input points prone to XSS" },
                { pattern: "ssrf", desc: "Detect input points prone to SSRF" },
                { pattern: "sqli", desc: "Detect input points prone to SQL Injection" },
                { pattern: "idor", desc: "Detect potential IDOR points" },
                { pattern: "redirect", desc: "Detect Open Redirect" },
                { pattern: "rce", desc: "Detect Remote Code Execution" },
                { pattern: "lfi", desc: "Detect Local File Inclusion" },
                { pattern: "ssti", desc: "Detect Server-Side Template Injection" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                  <div>
                    <span className="font-mono text-sm text-foreground font-semibold">{item.pattern}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="when">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">When to Use gf?</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "When you have a large URL file from multiple tools",
                "To quickly filter results by vulnerability type",
                "During post-recon phase",
                "To split URLs by vulnerability type for parallel testing",
                "When working on bug bounty or CTF",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="notes">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Notes & Tips</h2>
            </div>
            <div className="space-y-3">
              {[
                "Created by Tomnomnom (also author of gospider and httpx)",
                "Very fast since it's written in Go",
                "Supports custom patterns via ~/.gf/patterns/",
                "Can be combined with httpx to filter by response status",
                "Supports reading URLs from stdin (piping)",
                "Displays results with different colors per pattern",
                "Can create custom patterns for any vulnerability",
                "Supports JSON output with jq",
              ].map((note, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</div>
                  <span className="text-foreground">{note}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="errors">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Common Errors & Solutions</h2>
            </div>
            <div className="space-y-4">
              {[
                { error: "no matching patterns", solution: "Add a custom pattern with -save or run gf -list to see available patterns" },
                { error: "command not found", solution: "Make sure ~/go/bin is in your PATH or reinstall" },
                { error: "empty output", solution: "There may be no matching URLs — try different patterns" },
                { error: "invalid pattern name", solution: "Use gf -list to check available pattern names" },
              ].map((err, idx) => (
                <div key={idx} className="rounded-xl border border-border/50 overflow-hidden">
                  <div className="p-4 bg-destructive/5 border-b border-destructive/20">
                    <div className="flex items-center gap-2 text-destructive font-medium">
                      <AlertTriangle className="size-4" />
                      {err.error}
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/5">
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{err.solution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">This guide is for ethical use and authorized penetration testing only</p>
          </footer>
        </div>
      </main>
    </div>
  )
}


