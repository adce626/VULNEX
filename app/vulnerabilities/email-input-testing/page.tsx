"use client"

import { useState } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import { CommandList } from "@/components/command-list"
import { PageIntro } from "@/components/page-intro"
import { emailInputCategories, emailInputTools, lastUpdated, pageDescription } from "@/lib/email-input-testing-data"
import {
  Mail,
  Terminal,
  ChevronRight,
  Home,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PageTitle } from "@/components/page-title"
import { DomainInput } from "@/components/domain-input"

export default function EmailInputTestingPage() {
  const [activeCategory, setActiveCategory] = useState("introduction")
  const [domain, setDomain] = useState("")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const totalCommands = emailInputCategories.reduce((acc, cat) => acc + cat.commands.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Email Input Testing" />
      <MainSidebar />
      <main className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/vulnerabilities" className="hover:text-foreground">Web Vulnerabilities</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Email Input Testing</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-cyan-500/10 via-background to-blue-500/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
              <Mail className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">Email Input Testing</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Complete methodology for testing email input fields — from RFC822 validation to XSS, SSRF, header injection, SQLi, command injection, and business logic abuse.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-500">{emailInputCategories.length} Categories</span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">{totalCommands} Commands</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">Copy Ready</span>
            </div>
          </div>
        </div>

        <PageIntro title="Email Input Testing" description={pageDescription} lastUpdated={lastUpdated} />

        <DomainInput domain={domain} setDomain={setDomain} />

        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {emailInputCategories.map((cat) => {
                const sectionId = cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                return (
                  <button key={cat.category} onClick={() => scrollToSection(sectionId)}
                    className={cn("flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                      activeCategory === sectionId ? "bg-cyan-500 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    {cat.category.split(" —")[0]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {emailInputCategories.map((category, idx) => {
            const sectionId = category.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            return (
              <section key={idx} id={sectionId} className="scroll-mt-20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500"><Terminal className="h-5 w-5" /></div>
                  <div>
                    <span className="text-xs font-medium text-cyan-500">{idx === 0 ? "Intro" : `Phase ${idx}`}</span>
                    <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                  </div>
                </div>
                <CommandList commands={category.commands} pageTitle="Email Input Testing" pageSize={15} domain={domain} />
              </section>
            )
          })}

          <section className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500"><ExternalLink className="h-5 w-5" /></div>
              <div>
                <span className="text-xs font-medium text-cyan-500">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {emailInputTools.map((tool) => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-500"><ExternalLink className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground group-hover:text-cyan-500">{tool.name}</div>
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
