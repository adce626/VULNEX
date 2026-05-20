"use client"
import { PageTitle } from "@/components/page-title"

import { useState } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import { CommandList } from "@/components/command-list"
import { ffufCategories, ffufTools } from "@/lib/ffuf-data"
import {
  Target,
  Terminal,
  ChevronRight,
  Home,
  ExternalLink,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function FfufPage() {
  const [activeCategory, setActiveCategory] = useState("installation")
  const [domain, setDomain] = useState("")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const totalCommands = ffufCategories.reduce((acc, cat) => acc + cat.commands.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="FFUF Techniques" />
      <MainSidebar />
      <main className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/methods" className="hover:text-foreground">Methods</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">FFUF Techniques</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-violet-500/10 via-background to-purple-500/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
              <Target className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">FFUF Techniques</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Master FFUF for directory bruteforcing, parameter fuzzing, subdomain discovery, and more.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500">{ffufCategories.length} Categories</span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">{totalCommands} Commands</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">Copy Ready</span>
            </div>
            <div className="mt-6 mx-auto max-w-md">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter target domain (e.g., example.com)"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Commands will automatically replace <code className="rounded bg-muted px-1 font-mono">example.com</code> with your target domain</p>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              <span className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
                <Target className="h-4 w-4" /> Phases
              </span>
              {ffufCategories.map((cat) => {
                const sectionId = cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                return (
                  <button key={cat.category} onClick={() => scrollToSection(sectionId)}
                    className={cn("flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                      activeCategory === sectionId ? "bg-violet-500 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    {cat.category}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {ffufCategories.map((category, idx) => {
            const sectionId = category.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            return (
              <section key={idx} id={sectionId} className="scroll-mt-20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500"><Terminal className="h-5 w-5" /></div>
                  <div>
                    <span className="text-xs font-medium text-violet-500">Phase {idx + 1}</span>
                    <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                  </div>
                </div>
                <CommandList commands={category.commands} pageTitle="FFUF Techniques" pageSize={15} domain={domain} />
              </section>
            )
          })}

          <section className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500"><ExternalLink className="h-5 w-5" /></div>
              <div>
                <span className="text-xs font-medium text-violet-500">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {ffufTools.map((tool) => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-500"><ExternalLink className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground group-hover:text-violet-500">{tool.name}</div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <footer className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">For authorized security testing only. Use responsibly.</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
