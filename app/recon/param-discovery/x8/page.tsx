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

export default function X8Page() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="X8 — Param Discovery" />
      <MainSidebar />
      <main className="lg:pl-64">
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
              <span className="text-foreground">x8</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Phase 4</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">x8 — Very Fast Alternative to ffuf</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              A fast alternative to ffuf for parameter fuzzing — written in Rust
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Parameter Fuzzing</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">Rust</span>
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
              {[
                { code: "cargo install x8", desc: "Install x8 via Cargo (Rust)" },
                { code: "x8 -h", desc: "Verify installation" },
              ].map((step, idx) => (
                <div key={idx} className="bg-muted/50 border border-border/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2">#{idx + 1} {step.desc}</div>
                  <pre className="bg-background rounded p-3 overflow-x-auto"><code className="text-sm font-mono">{step.code}</code></pre>
                </div>
              ))}
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
                { code: 'x8 -u "https://site.com/endpoint?FUZZ=test" -w paramnames.txt', desc: "Basic parameter fuzzing with x8" },
                { code: 'x8 -u "https://site.com/api?param=FUZZ" -w values.txt --filter-status 200,403', desc: "Filter specific status codes" },
                { code: 'x8 -u "https://site.com/endpoint" -w params.txt -t 200 --threads 50', desc: "High-speed fuzzing with 50 threads" },
              ].map((item, idx) => (
                <div key={idx} className="bg-muted/50 border border-border/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2">#{idx + 1 + 2} {item.desc}</div>
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
                { cmd: "-u", desc: "Target URL (with FUZZ)" },
                { cmd: "-w", desc: "Wordlist file" },
                { cmd: "-t", desc: "Concurrent requests count" },
                { cmd: "--threads", desc: "Number of execution threads" },
                { cmd: "--filter-status", desc: "Filter by status codes" },
                { cmd: "-m", desc: "Request method (GET/POST)" },
                { cmd: "-j", desc: "JSON output" },
                { cmd: "-d", desc: "Add POST data" },
                { cmd: "-H", desc: "Add custom headers" },
                { cmd: "--help", desc: "Show help" },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="font-mono text-sm text-primary mb-1">{item.cmd}</div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="when">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">When to use x8?</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "When you need to scan parameters at high speed",
                "As a fast alternative to ffuf for parameter fuzzing",
                "To scan a large number of URLs in a short time",
                "When using it with Arjun for comprehensive coverage",
                "In high-performance computing with multiple threads",
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
              <h2 className="text-2xl font-bold text-foreground">Notes &amp; Tips</h2>
            </div>
            <div className="space-y-3">
              {[
                "10-100x faster than ffuf in some scenarios",
                "Supports automatic updates: x8 --self-update",
                "Supports multiple URLs via -l or stdin",
                "Compatible with standard wordlists used with ffuf",
                "Supports both GET and POST methods",
                "Consumes fewer resources as it's written in Go",
                "Can be combined with gf to filter results",
                "Suitable for quick scanning in the initial reconnaissance phase",
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
              <h2 className="text-2xl font-bold text-foreground">Common Errors &amp; Solutions</h2>
            </div>
            <div className="space-y-4">
              {[
                { error: "no response from the target", solution: "Make sure the server is running and the URL is correct" },
                { error: "rate limiting / 429 Too Many Requests", solution: "Reduce the number of threads or add --delay" },
                { error: "panic: runtime error", solution: "A processing error occurred — check the input and verify the URL" },
                { error: "wordlist file not found", solution: "Check the wordlist file path and use a full path if needed" },
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