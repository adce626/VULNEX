'use client'

import { useState } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { CommandList } from "@/components/command-list"
import { Badge } from "@/components/ui/badge"
import type { ToolGuide } from "@/lib/tools-data"
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
  Copy,
} from "lucide-react"

interface ToolDetailLayoutProps {
  tool: ToolGuide
  pageTitle: string
  breadcrumbCategory: string
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="code-terminal group">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: 'oklch(0.6 0.2 25 / 0.7)' }} />
        <div className="terminal-dot" style={{ background: 'oklch(0.65 0.15 80 / 0.7)' }} />
        <div className="terminal-dot" style={{ background: 'oklch(0.65 0.2 160 / 0.7)' }} />
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={copy} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}

export function ToolDetailLayout({ tool, pageTitle, breadcrumbCategory }: ToolDetailLayoutProps) {
  const sectionLabels: Record<string, string> = {
    installation: tool.installation.title,
    usage: tool.usage.title,
    commands: "Command Reference",
    when: "When to Use",
    notes: "Notes & Tips",
    errors: "Common Errors & Solutions",
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title={pageTitle} />
      <MainSidebar />

      <main className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={tool.category === "Recon & OSINT" ? "/recon" : tool.category === "Web Vulnerabilities" ? "/vulnerabilities" : tool.category === "Cloud & Assets" ? "/cloud" : tool.category === "Advanced Topics" ? "/advanced" : "/methods"}
                className="hover:text-foreground"
              >
                {breadcrumbCategory}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{tool.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              {tool.name}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              {tool.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">{tool.category}</Badge>
              <Badge variant="outline">{tool.commands.length} commands</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-background/50 text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: floating section nav */}
        <div className="hidden lg:block fixed left-[17rem] top-32 z-10 max-w-[10rem]">
          <nav className="space-y-1 border-l border-border pl-3">
            {Object.entries(sectionLabels).map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block text-xs text-muted-foreground hover:text-foreground transition-colors leading-relaxed"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl space-y-14 p-6 lg:ml-[12rem] xl:ml-[14rem]">
          {/* Installation */}
          <section id="installation" className="section-anchor">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{tool.installation.title}</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                {tool.installation.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
              {tool.installation.code && <CodeBlock code={tool.installation.code} />}
            </div>
          </section>

          <div className="section-divider" />

          {/* Usage */}
          <section id="usage" className="section-anchor">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{tool.usage.title}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{tool.usage.description}</p>
            {tool.usage.code && <CodeBlock code={tool.usage.code} />}
          </section>

          <div className="section-divider" />

          {/* Commands */}
          <section id="commands" className="section-anchor">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Command className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Command Reference</h2>
            </div>
            <CommandList commands={tool.commands} pageTitle={tool.name} pageSize={15} />
          </section>

          <div className="section-divider" />

          {/* When to Use */}
          <section id="when" className="section-anchor">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">When to Use</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tool.whenToUse.map((item, idx) => (
                <div key={idx} className="card-lift flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="section-divider" />

          {/* Notes */}
          <section id="notes" className="section-anchor">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Notes & Tips</h2>
            </div>
            <div className="space-y-3">
              {tool.notes.map((note, idx) => (
                <div key={idx} className="card-lift flex items-start gap-3 rounded-xl border border-border/50 bg-card p-4">
                  <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-foreground text-sm">{note}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="section-divider" />

          {/* Errors */}
          <section id="errors" className="section-anchor">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Common Errors & Solutions</h2>
            </div>
            <div className="space-y-4">
              {tool.commonErrors.map((err, idx) => (
                <div key={idx} className="card-lift rounded-xl border border-border/50 overflow-hidden">
                  <div className="p-4 bg-destructive/5 border-b border-destructive/20">
                    <div className="flex items-center gap-2 text-destructive font-medium">
                      <AlertTriangle className="size-4 shrink-0" />
                      <span className="text-sm">{err.error}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/5">
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{err.solution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-border pt-8 text-center mt-20">
            <p className="text-sm text-muted-foreground">
              For authorized security testing only. Use responsibly.
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
