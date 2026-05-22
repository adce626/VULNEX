"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import { CommandList } from "@/components/command-list"
import { PageIntro } from "@/components/page-intro"
import {
  s3BucketCategories,
  s3BucketTools,
  lastUpdated,
  pageDescription,
} from "@/lib/s3-bucket-data"
import {
  HardDrive,
  Terminal,
  ChevronRight,
  Home,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { PageTitle } from "@/components/page-title"

export default function S3BucketsPage() {
  const [activeCategory, setActiveCategory] = useState("understanding-aws-s3-buckets")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="S3 Bucket Testing" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/cloud" className="hover:text-foreground">
                Cloud & Assets
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">S3 Buckets</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-accent/10 via-background to-primary/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZGF0PSJNIDYwIDAgTCBMMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGV4dD0idyIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <HardDrive className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              AWS S3 Buckets
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              AWS S3 bucket reconnaissance, enumeration, and misconfiguration testing techniques.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                16 Categories
              </span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                40+ Commands
              </span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                Copy Ready
              </span>
            </div>
          </div>
        </div>

        <PageIntro title="S3 Bucket Testing" description={pageDescription} lastUpdated={lastUpdated} />


        {/* Category Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {s3BucketCategories.map((cat) => {
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
                    {cat.category.split(/[:]/)[0]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {s3BucketCategories.map((category, idx) => {
            const sectionId = category.category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
            return (
              <section key={idx} id={sectionId} className="scroll-mt-20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-accent">
                      Phase {idx + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.category}
                    </h2>
                  </div>
                </div>
                <CommandList commands={category.commands} pageTitle="S3 Buckets" pageSize={15} />
              </section>
            )
          })}

          {/* Tools & Resources */}
          <section className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Tools & Resources
                </h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {s3BucketTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground group-hover:text-accent">
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


