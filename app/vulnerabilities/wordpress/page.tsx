"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandList } from "@/components/command-list"
import { PageIntro } from "@/components/page-intro"
import {
  wordpressCategories,
  lastUpdated,
  pageDescription,
} from "@/lib/wordpress-data"
import {
  Globe,
  Terminal,
  ChevronRight,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { PageTitle } from "@/components/page-title"

export default function WordPressPage() {
  const [activeCategory, setActiveCategory] = useState("understanding-wordpress-architecture")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="WordPress Security" />
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
              <span className="text-foreground">WordPress</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-red-500/10 via-background to-orange-500/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <Globe className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Mastering WordPress
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Comprehensive guide to WordPress bug hunting, from architecture understanding to advanced exploitation techniques.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500">
                30+ Techniques
              </span>
              <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-500">
                11 Dork Categories
              </span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                Copy Ready
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-6">
          <PageIntro title="WordPress Security" description={pageDescription} lastUpdated={lastUpdated} />
        </div>


        {/* Category Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {wordpressCategories.map((cat) => {
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
          {wordpressCategories.map((category, idx) => {
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
                      {category.category.includes("Google Dorks")
                        ? "Dork"
                        : category.category.includes("Essential Tools")
                        ? "Tool"
                        : category.category.includes("Exposed")
                        ? "Exposed"
                        : category.category.includes("Exploiting")
                        ? "Exploit"
                        : category.category.includes("Abusing")
                        ? "DoS"
                        : category.category.includes("Username")
                        ? "Enum"
                        : category.category.includes("Admin Panel")
                        ? "Brute"
                        : category.category.includes("Unsecured")
                        ? "Setup"
                        : category.category.includes("WordPress Installation")
                        ? "Install"
                        : category.category.includes("WordPress SSRF")
                        ? "SSRF"
                        : category.category.includes("Directory Listing")
                        ? "Dir"
                        : category.category.includes("Prevention")
                        ? "Defense"
                        : "Phase"}
                      {" "}
                      {idx}
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.category}
                    </h2>
                  </div>
                </div>
                <CommandList commands={category.commands} pageTitle="WordPress" pageSize={15} />
              </section>
            )
          })}

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
