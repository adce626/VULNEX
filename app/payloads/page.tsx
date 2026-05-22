"use client"

import React from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { payloadCategories } from "@/lib/payloads-data"
import {
  Home,
  ChevronRight,
  Siren,
  Shield,
  Target,
  Code,
  FileJson,
  Database,
  Zap,
  Terminal,
  Bug,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  "file-json": <FileJson className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
}

const bgColors = [
  "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  "from-rose-500/20 to-rose-500/5 border-rose-500/30",
  "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
]

export default function PayloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Payloads Library" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Payloads</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Siren className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Payloads Library</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Curated payload collection for web security testing. Select a category to browse payloads.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {payloadCategories.length} Categories
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {payloadCategories.map((cat, idx) => {
              const gradient = bgColors[idx % bgColors.length]
              return (
                <Link
                  key={cat.id}
                  href={`/payloads/${cat.id}`}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

                  <div className="relative">
                    <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", gradient)}>
                      {iconMap[cat.icon] || <Bug className="h-5 w-5 text-foreground" />}
                    </div>

                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {cat.items.length} payloads
                    </p>

                    <div className="mt-3 rounded-lg bg-muted/30 px-2.5 py-1.5">
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        <span className="font-medium text-primary">{cat.items.length}</span> ready-to-use payloads
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Browse Payloads <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}



