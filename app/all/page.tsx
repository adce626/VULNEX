"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { navigation, sectionCards } from "@/lib/site-data"
import {
  Home,
  ChevronRight,
  ArrowRight,
  Search,
  Bug,
  Server,
  Cloud,
  Wrench,
  Shield,
  Brain,
  Puzzle,
  Terminal,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-6 w-6" />,
  bug: <Bug className="h-6 w-6" />,
  server: <Server className="h-6 w-6" />,
  cloud: <Cloud className="h-6 w-6" />,
  wrench: <Wrench className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  brain: <Brain className="h-6 w-6" />,
  puzzle: <Puzzle className="h-6 w-6" />,
  terminal: <Terminal className="h-6 w-6" />,
}

const colorMap: Record<string, string> = {
  primary: "from-primary/20 to-primary/5 border-primary/30 text-primary",
  destructive: "from-destructive/20 to-destructive/5 border-destructive/30 text-destructive",
  accent: "from-accent/20 to-accent/5 border-accent/30 text-accent",
}

export default function AllSectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="All Sections" />
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
              <span className="text-foreground">All Sections</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <h1 className="text-3xl font-bold text-foreground">All Sections</h1>
            <p className="mt-2 text-muted-foreground">
              Browse every category and topic available in VULNEX
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
          {navigation.map((section) => {
            const card = sectionCards.find((c) => c.href === section.href)
            const colorClass = colorMap[card?.color || "primary"]
            return (
              <section key={section.title}>
                <Link
                  href={section.href}
                  className="group mb-4 flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", colorClass)}>
                    {iconMap[section.icon]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h2>
                      {card && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {card.itemCount} topics
                        </span>
                      )}
                    </div>
                    {card && (
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {card.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>

                {section.items && section.items.length > 0 && (
                  <div className="ml-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm transition-all hover:border-primary/30 hover:bg-card"
                      >
                        <span className="text-foreground">{item.title}</span>
                        <div className="flex items-center gap-2">
                          {item.tag && (
                            <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                              {item.tag}
                            </span>
                          )}
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            )
          })}

          {/* Summary Stats */}
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { value: sectionCards.length, label: "Sections" },
                { value: navigation.reduce((acc, s) => acc + (s.items?.length || 0), 0), label: "Topics" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              For authorized security testing only. Use responsibly.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
