"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import {
  cewlCategories,
  cewlTools,
} from "@/lib/cewl-data"
import {
  Search,
  Globe,
  Terminal,
  ChevronRight,
  Home,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function CewlPage() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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
              <span className="text-foreground">CeWL</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXRoPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz48L3N2Zz4+')] opacity-50" />
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Globe className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              CeWL Wordlists
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Custom wordlist generator that crawls websites and extracts meaningful words for targeted brute-force attacks.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                7 Categories
              </span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                25+ Commands
              </span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                Copy Ready
              </span>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {cewlCategories.map((cat) => {
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
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat.category}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {cewlCategories.map((category, idx) => {
            const sectionId = category.category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
            return (
              <section key={idx} id={sectionId} className="scroll-mt-20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-primary">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Tools & Resources
                </h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {cewlTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground group-hover:text-primary">
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
