"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { sectionCards } from "@/lib/site-data"
import {
  Search,
  Bug,
  Server,
  Cloud,
  Wrench,
  Brain,
  Shield,
  ArrowRight,
  Zap,
  Copy,
  Moon,
  Tag,
  Rocket,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-6 w-6" />,
  bug: <Bug className="h-6 w-6" />,
  server: <Server className="h-6 w-6" />,
  cloud: <Cloud className="h-6 w-6" />,
  wrench: <Wrench className="h-6 w-6" />,
  brain: <Brain className="h-6 w-6" />,
}

const features = [
  {
    icon: <Search className="h-5 w-5" />,
    title: "Quick Search",
    description: "Find any payload or technique instantly",
  },
  {
    icon: <Copy className="h-5 w-5" />,
    title: "Copy Button",
    description: "One-click copy for all payloads",
  },
  {
    icon: <Moon className="h-5 w-5" />,
    title: "Dark Mode",
    description: "Easy on the eyes for long sessions",
  },
  {
    icon: <Tag className="h-5 w-5" />,
    title: "Tags",
    description: "Organized by technology and type",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Loading",
    description: "Lightweight and blazing fast",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />

      <main className="lg:pl-64">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-pulse">
              <Rocket className="h-4 w-4" />
              <span>adce626</span>
            </div>
            
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary shadow-lg shadow-primary/10">
              <Shield className="h-12 w-12" />
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl text-balance">
              VULNEX
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              Web Hacking Playbook — A comprehensive platform for security researchers and bug hunters. Ready-to-use payloads, exploitation techniques, practical tools, and quick checklists.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-lg shadow-black/5">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search payloads, techniques, tools..."
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="hidden rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground sm:block">
                  /
                </kbd>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">7</span>
                <span className="text-sm text-muted-foreground">Sections</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">24</span>
                <span className="text-sm text-muted-foreground">Topics</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">1370</span>
                <span className="text-sm text-muted-foreground">Commands</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground">Explore Sections</h2>
            <p className="mt-2 text-muted-foreground">
              Choose a category to start exploring
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectionCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                
                <div
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                    card.color === "primary" && "bg-primary/10 text-primary",
                    card.color === "destructive" && "bg-destructive/10 text-destructive",
                    card.color === "accent" && "bg-accent/10 text-accent"
                  )}
                >
                  {iconMap[card.icon]}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {card.itemCount} topics
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground">Built for Speed</h2>
              <p className="mt-2 text-muted-foreground">
                Designed for quick access during testing
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-foreground">Start Exploring</h2>
            <p className="mt-2 text-muted-foreground">
              Jump into the Tech-Specific section to see the Microsoft IIS guide
            </p>
            <Link
              href="/tech-specific/iis"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Server className="h-4 w-4" />
              View IIS Hacking Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">VULNEX</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/adce626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="font-medium">X</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary">@adce626</span>
                </a>
                <a
                  href="https://github.com/adce626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary">/adce626</span>
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                For authorized security testing only. Use responsibly.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
