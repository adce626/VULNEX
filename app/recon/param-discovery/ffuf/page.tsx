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
  FolderSearch,
} from "lucide-react"
import Link from "next/link"

export default function FFUFPage() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="FFUF — Param Discovery" />
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
              <span className="text-foreground">ffuf</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">ffuf</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Fast web fuzzer — discover directories, files, and parameters
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Web Fuzzer</span>
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
                  { text: "go install github.com/ffuf/ffuf/v2@latest", desc: "Install via Go" },
                  { text: "git clone https://github.com/ffuf/ffuf.git && cd ffuf && go build .", desc: "Clone and build from source" },
                  { text: "ffuf -h", desc: "Verify installation" },
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
                { code: "ffuf -u https://site.com/FUZZ -w /usr/share/wordlists/dirb/common.txt", desc: "Discover files and directories" },
                { code: 'ffuf -u "https://site.com/api?FUZZ=test" -w params.txt', desc: "Parameter fuzzing in URL" },
                { code: 'ffuf -u "https://site.com" -X POST -d "user=admin&pass=FUZZ" -w passwords.txt', desc: "Password fuzzing via POST" },
                { code: 'ffuf -w subdomains.txt -u "https://FUZZ.site.com"', desc: "Subdomain fuzzing" },
                { code: "ffuf -u https://site.com/FUZZ -w files.txt -e .php,.html,.js", desc: "Fuzzing with specific extensions" },
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
                { cmd: "-u", desc: "Target URL with FUZZ placeholder" },
                { cmd: "-w", desc: "Wordlist file" },
                { cmd: "-X", desc: "Request method (GET, POST, PUT...)" },
                { cmd: "-d", desc: "POST data" },
                { cmd: "-e", desc: "File extensions to append" },
                { cmd: "-mc", desc: "Filter by response status codes" },
                { cmd: "-fc", desc: "Exclude specific status codes" },
                { cmd: "-fs", desc: "Filter by response size" },
                { cmd: "-t", desc: "Number of concurrent threads" },
                { cmd: "-rate", desc: "Request rate per second" },
                { cmd: "-recursion", desc: "Recursive scanning" },
                { cmd: "-recursion-depth", desc: "Recursion depth" },
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
              <h2 className="text-2xl font-bold text-foreground">When to Use ffuf?</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Discover hidden web files and directories",
                "Parameter fuzzing",
                "Virtual host discovery",
                "Password brute forcing",
                "Discover hidden API endpoints",
                "Fast scanning compared to other tools",
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
                "One of the fastest web fuzzing tools — written in Go",
                "Supports recursive scanning for multi-level discovery",
                "Supports clusterbomb and pitchfork modes for multi-parameter",
                "Requires a good wordlist like SecLists",
                "Supports multiple output formats: HTML, JSON, CSV",
                "Can be used with Burp Suite via proxy",
                "Uses FUZZ placeholder to specify injection point",
                "Supports custom headers and cookies",
                "Suitable for both API fuzzing and web fuzzing",
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
                { error: "403 Forbidden or request blocking", solution: "Add a custom User-Agent with -H or reduce request rate" },
                { error: "Too many open files", solution: "Reduce threads with -t or increase system limit: ulimit -n 65535" },
                { error: "WAF detection / IP blocking", solution: "Use a proxy or reduce rate with the -rate flag" },
                { error: "wordlist parsing error", solution: "Ensure the file encoding is UTF-8 and there are no empty lines" },
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


