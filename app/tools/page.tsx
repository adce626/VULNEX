"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { Wrench, ArrowRight, Home, ChevronRight, Search, Globe, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const toolItems = [
  {
    title: "FFUF Techniques",
    description: "Advanced fuzzing techniques with FFUF",
    href: "/tools/ffuf",
    available: true,
    commandCount: "40+",
  },
  {
    title: "Gospider Methods",
    description: "Web crawling and content discovery with Gospider",
    href: "/tools/gospider",
    available: true,
    commandCount: "25+",
  },
  {
    title: "CeWL Wordlists",
    description: "Custom wordlist generation with CeWL",
    href: "/tools/cewl",
    available: true,
    commandCount: "20+",
  },
]

export default function ToolsPage() {
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
              <span className="text-foreground">Tools & Methods</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-border bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Wrench className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Tools & Methods</h1>
            <p className="mt-2 text-muted-foreground">
              Essential tools and methodologies for security testing
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-4">
            {toolItems.map((item) => (
              <div
                key={item.href}
                className={cn(
                  "group relative overflow-hidden rounded-xl border p-6 transition-all",
                  item.available
                    ? "border-border bg-card hover:border-accent/50 hover:shadow-lg"
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
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.title === "FFUF Techniques" ? (
                        <Search className="h-6 w-6" />
                      ) : item.title === "Gospider Methods" ? (
                        <Globe className="h-6 w-6" />
                      ) : (
                        <FileText className="h-6 w-6" />
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
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                        {item.commandCount} commands
                      </span>
                    )}
                    {item.available ? (
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
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