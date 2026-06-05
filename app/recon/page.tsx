"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Breadcrumb } from "@/components/breadcrumb"
import { HeroSection } from "@/components/hero-section"
import { Search, ArrowRight, Globe, Database, Variable, Github } from "lucide-react"
import { cn } from "@/lib/utils"

const reconItems = [
  {
    title: "Google Dorks",
    description: "Advanced Google search operators for finding vulnerabilities",
    href: "/recon/google-dorks",
    available: true,
    commandCount: "50+",
  },
  {
    title: "Shodan Dorks",
    description: "Shodan queries for discovering exposed services",
    href: "/recon/shodan-dorks",
    available: true,
    commandCount: "40+",
  },
  {
    title: "Param Discovery",
    description: "Hidden parameter discovery techniques",
    href: "/recon/param-discovery",
    available: true,
    commandCount: "30+",
  },
  {
    title: "GitHub Recon",
    description: "GitHub dorks, TruffleHog, GitGraber, and .git directory hunting",
    href: "/recon/github-recon",
    available: true,
    commandCount: "50+",
  },
]

export default function ReconPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Recon &amp; OSINT" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        <Breadcrumb items={[{ label: "Recon" }]} />
        <HeroSection icon={<Search className="h-8 w-8" />} title="Reconnaissance" description="Information gathering and reconnaissance techniques" />

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-4">
            {reconItems.map((item) => (
              <div
                key={item.href}
                className={cn(
                  "group relative overflow-hidden rounded-xl border p-6 transition-all",
                  item.available
                    ? "border-border bg-card hover:border-primary/50 hover:shadow-lg"
                    : "border-border/50 bg-card/50 cursor-not-allowed"
                )}
              >
                {item.available ? (
                  <Link href={item.href} className="absolute inset-0 z-10" />
                ) : null}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        item.available
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.title === "Google Dorks" ? (
                        <Globe className="h-6 w-6" />
                      ) : item.title === "Shodan Dorks" ? (
                        <Database className="h-6 w-6" />
                      ) : item.title === "Param Discovery" ? (
                        <Variable className="h-6 w-6" />
                      ) : (
                        <Github className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-lg font-semibold",
                          item.available ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.commandCount && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {item.commandCount} commands
                      </span>
                    )}
                    {item.available ? (
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    ) : (
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


