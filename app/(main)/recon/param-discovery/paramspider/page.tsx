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
  Link2,
} from "lucide-react"
import Link from "next/link"

export default function ParamSpiderPage() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="ParamSpider — Param Discovery" />
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
              <span className="text-foreground">ParamSpider</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">ParamSpider</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Passive parameter extraction from Wayback Machine and Common Crawl
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Parameter Discovery</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">Python</span>
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
                  { text: "git clone https://github.com/devanshbatham/ParamSpider.git", desc: "Clone from GitHub" },
                  { text: "cd ParamSpider && pip install -r requirements.txt", desc: "Install requirements" },
                  { text: "python3 paramspider -h", desc: "Verify installation" },
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
                { code: "python3 paramspider -d site.com", desc: "Extract URLs from Wayback Machine" },
                { code: "python3 paramspider -d site.com -p \"FUZZ=value\"", desc: "Save results with placeholder" },
                { code: "python3 paramspider -d site.com -l 2", desc: "Search with depth level 2" },
                { code: "python3 paramspider -d site.com | grep xss > xss.txt", desc: "Filter results by vulnerability type" },
                { code: "python3 paramspider -d site.com -o output.txt", desc: "Save to custom output file" },
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
                { cmd: "-d", desc: "Target domain" },
                { cmd: "-p", desc: "Output pattern with FUZZ placeholder" },
                { cmd: "-l", desc: "Search depth (levels)" },
                { cmd: "-o", desc: "Output file" },
                { cmd: "-s", desc: "Search Google instead of Wayback Machine" },
                { cmd: "-b", desc: "Search engine (baidu, bing, ...)" },
                { cmd: "-a", desc: "Add all subdomains" },
                { cmd: "-q", desc: "Quiet mode" },
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
              <h2 className="text-2xl font-bold text-foreground">When to Use ParamSpider?</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "When starting a penetration test on a new scope",
                "To discover hidden parameters without direct interaction",
                "To collect as many URLs with parameters as possible",
                "When you want quick results from archived data",
                "As a first step before using Arjun or ffuf",
                "To analyze URL parameter change history",
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
                "Works passively — does not interact directly with the target",
                "Uses Wayback Machine and Common Crawl as data sources",
                "Great for gathering initial data before deep scanning",
                "Results may contain expired URLs",
                "Can be combined with Arjun for best results",
                "Supports Google search as additional source (-s option)",
                "Very fast compared to interactive tools like Arjun",
                "Does not work on domains without archived data",
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
                { error: "No results found", solution: "No archived data exists for this domain. Try other sources like Google" },
                { error: "Rate limiting from Wayback Machine", solution: "Add delay between requests or reduce search depth" },
                { error: "ModuleNotFoundError", solution: "Make sure requirements.txt is installed: pip install -r requirements.txt" },
                { error: "SSL Certificate errors", solution: "Add --no-check-certificate or update the requests library" },
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


