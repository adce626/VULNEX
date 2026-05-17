"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandList } from "@/components/command-list"
import { PageIntro } from "@/components/page-intro"
import {
  sqlInjectionCategories,
  sqlInjectionTools,
  lastUpdated,
  pageDescription,
} from "@/lib/sql-injection-data"
import {
  Database,
  Terminal,
  ChevronRight,
  Home,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { PageTitle } from "@/components/page-title"

export default function SQLInjectionPage() {
  const [activeCategory, setActiveCategory] = useState("introduction")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="SQL Injection" />
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
              <Link href="/vulnerabilities" className="hover:text-foreground">
                Web Vulnerabilities
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">SQL Injection</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-red-500/10 via-background to-orange-500/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <Database className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              SQL Injection Guide
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Master SQL Injection recon and exploitation with step-by-step methodology, time-based payloads, and automated testing tools.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500">
                30+ Techniques
              </span>
              <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-500">
                5+ DBMS Covered
              </span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                Copy Ready
              </span>
            </div>
          </div>
        </div>

        {/* Page Intro */}
        <div className="mx-auto max-w-5xl px-6 pt-6">
          <PageIntro
            title="SQL Injection Guide"
            description={pageDescription}
            lastUpdated={lastUpdated}
          />
        </div>


        {/* Category Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {sqlInjectionCategories.map((cat) => {
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
                        ? "bg-red-500 text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat.category.split(":")[0]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {sqlInjectionCategories.map((category, idx) => {
            const sectionId = category.category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
            return (
              <section key={idx} id={sectionId} className="scroll-mt-20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-red-500">
                      {category.category.includes("Step")
                        ? "Step"
                        : category.category.includes("Automated")
                        ? "Tool"
                        : category.category.includes("Time-Based")
                        ? "DB"
                        : category.category.includes("Header")
                        ? "Header"
                        : category.category.includes("Confirm")
                        ? "Test"
                        : category.category.includes("XOR")
                        ? "XOR"
                        : category.category.includes("Google Dorks")
                        ? "Dork"
                        : category.category.includes("Error-Based")
                        ? "Error"
                        : category.category.includes("Exposed")
                        ? "Dump"
                        : category.category.includes("Resources")
                        ? "Video"
                        : category.category.includes("Tips")
                        ? "Tip"
                        : "Phase"}
                      {" "}
                      {idx}
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.category}
                    </h2>
                  </div>
                </div>
                <CommandList
                  commands={category.commands}
                  pageTitle="SQL Injection"
                  pageSize={15}
                />
              </section>
            )
          })}

          {/* Tools & Resources */}
          <section className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Tools & Resources
                </h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {sqlInjectionTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground group-hover:text-red-500">
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
