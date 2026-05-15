"use client"

import { useState } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import { wpscanCategories, wpscanTools } from "@/lib/wpscan-data"
import {
  Globe,
  Terminal,
  ChevronRight,
  Home,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { UsageGuide } from "@/components/usage-guide"
import { getToolById } from "@/lib/tools-data"

export default function WPScanPage() {
  const [activeCategory, setActiveCategory] = useState("installation--setup")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const totalCommands = wpscanCategories.reduce(
    (acc, cat) => acc + cat.commands.length,
    0
  )

  return (
    <div className="min-h-screen bg-background">
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
              <Link href="/tools" className="hover:text-foreground">
                Tools & Methods
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">WPScan</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-500/10 via-background to-indigo-500/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <Globe className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              WPScan — WordPress Vulnerability Scanner
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              WordPress security scanner for vulnerability detection and enumeration
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500">
                {wpscanCategories.length} Categories
              </span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                {totalCommands} Commands
              </span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                Copy Ready
              </span>
              <UsageGuide guide={getToolById('wpscan')!} />
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {wpscanCategories.map((cat) => {
                const sectionId = cat.category
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                return (
                  <button
                    key={cat.category}
                    onClick={() => scrollToSection(sectionId)}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      activeCategory === sectionId
                        ? "bg-blue-500 text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat.category.split(" &")[0]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {wpscanCategories.map((category, idx) => {
            const sectionId = category.category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
            return (
              <section key={idx} id={sectionId} className="scroll-mt-20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-blue-500">
                      Phase {idx + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.category}
                    </h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.commands.map((cmd, cmdIdx) => (
                    <CommandCard
                      key={cmdIdx}
                      command={cmd.command}
                      description={cmd.description}
                      index={cmdIdx + 1}
                    />
                  ))}
                </div>
              </section>
            )
          })}

          {/* Tools & Resources */}
          <section className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-blue-500">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Tools & Resources
                </h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {wpscanTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground group-hover:text-blue-500">
                      {tool.name}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Footer */}
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
