"use client"
import { PageTitle } from "@/components/page-title"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import { CommandList } from "@/components/command-list"
import { getToolById } from "@/lib/tools-data"
import { Badge } from "@/components/ui/badge"
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

export default function ToolPage() {
  const tool = getToolById("trufflehog")
  if (!tool) return null

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="TruffleHog — Secret Scanner" />
      <MainSidebar />

      <main className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/tools" className="hover:text-foreground">
                {tool.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{tool.name}</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
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

        <div className="mx-auto max-w-5xl space-y-12 p-6">
          <section id="installation" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {tool.installation.title}
                </h2>
              </div>
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
              {tool.installation.code && (
                <div className="relative rounded-xl overflow-hidden border border-border/50 bg-background">
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border/50">
                    <div className="size-3 rounded-full bg-red-500/50" />
                    <div className="size-3 rounded-full bg-yellow-500/50" />
                    <div className="size-3 rounded-full bg-green-500/50" />
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-foreground/90 leading-relaxed whitespace-pre">
                      {tool.installation.code}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </section>

          <section id="usage" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {tool.usage.title}
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{tool.usage.description}</p>
            {tool.usage.code && (
              <div className="relative rounded-xl overflow-hidden border border-border/50 bg-background">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border/50">
                  <div className="size-3 rounded-full bg-red-500/50" />
                  <div className="size-3 rounded-full bg-yellow-500/50" />
                  <div className="size-3 rounded-full bg-green-500/50" />
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-foreground/90 leading-relaxed whitespace-pre">
                    {tool.usage.code}
                  </code>
                </pre>
              </div>
            )}
          </section>

          <section id="commands" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Command className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Command Reference
                </h2>
              </div>
            </div>
            <CommandList commands={tool.commands} pageTitle="TruffleHog" pageSize={15} />
          </section>

          <section id="when" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  When to Use
                </h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tool.whenToUse.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="notes" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Notes & Tips
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              {tool.notes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-foreground">{note}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="errors" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Common Errors & Solutions
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {tool.commonErrors.map((err, idx) => (
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
            <p className="text-sm text-muted-foreground">
              This guide is for ethical use and authorized penetration testing only
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
