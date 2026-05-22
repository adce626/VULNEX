"use client"

import { useState } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import { apiFuzzingSteps } from "@/lib/api-fuzzing-data"
import {
  ChevronLeft,
  Eye,
  ExternalLink,
  Lightbulb,
  Wrench,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Target,
  Zap,
  Shield,
  AlertTriangle,
  Search,
  Globe,
  ArrowRight,
  Code,
  Fingerprint,
  Key,
  Server,
  Lock,
  Folder,
  FileJson,
  Layers,
  Network,
  Bug,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PageTitle } from "@/components/page-title"

export default function ApiFuzzingPage() {
  const [expandedSteps, setExpandedSteps] = useState<string[]>(
    apiFuzzingSteps.map((s) => s.id)
  )

  const toggleStep = (id: string) => {
    setExpandedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const totalCommands = apiFuzzingSteps.reduce(
    (acc, step) => acc + step.commands.length,
    0
  )
  const totalTools = apiFuzzingSteps.reduce(
    (acc, step) => acc + (step.tools?.length || 0),
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="API Fuzzing" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-6">
            <Link
              href="/tech-specific"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Tech-Specific
            </Link>
          </div>
        </header>

        <div className="px-6 py-8">
          {/* Title Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  API Fuzzing
                </h1>
                <p className="text-muted-foreground">
                  Automated security testing for discovering API vulnerabilities
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {apiFuzzingSteps.length} Steps
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  {totalCommands} Commands
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2">
                <Wrench className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {totalTools} Tools
                </span>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Table of Contents
              </h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {apiFuzzingSteps.map((step, index) => (
                <a
                  key={step.id}
                  href={`#${step.id}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <span className="truncate">{step.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {apiFuzzingSteps.map((step, stepIndex) => (
              <section
                key={step.id}
                id={step.id}
                className="rounded-xl border border-border bg-card overflow-hidden scroll-mt-20"
              >
                {/* Step Header */}
                <button
                  onClick={() => toggleStep(step.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                      {stepIndex + 1}
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {expandedSteps.includes(step.id) ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {/* Step Content */}
                {expandedSteps.includes(step.id) && (
                  <div className="border-t border-border p-6">
                    {/* Full Description */}
                    <p className="mb-6 text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Tools */}
                    {step.tools && step.tools.length > 0 && (
                      <div className="mb-6">
                        <div className="mb-3 flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-foreground">
                            Tools & Resources
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {step.tools.map((tool) => (
                            <a
                              key={tool.name}
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-start gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <ExternalLink className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-foreground group-hover:text-primary">
                                    {tool.name}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                  {tool.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Commands */}
                    {step.commands.length > 0 && (
                      <div className="mb-6">
                        <div className="mb-3 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-accent" />
                          <h3 className="font-semibold text-foreground">
                            Commands
                          </h3>
                        </div>
                        <div className="grid gap-3">
                          {step.commands.map((cmd, cmdIndex) => (
                            <CommandCard
                              key={cmdIndex}
                              command={cmd.command}
                              description={cmd.description}
                              index={cmdIndex + 1}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-primary">
                            Pro Tips
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {step.tips.map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Quick Reference */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Quick ffuf Flags Reference
              </h2>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                <Code className="h-4 w-4 text-primary" />
                <code className="text-sm text-foreground">-t 100</code>
                <span className="text-sm text-muted-foreground">threads</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                <Code className="h-4 w-4 text-primary" />
                <code className="text-sm text-foreground">-mc 200,403</code>
                <span className="text-sm text-muted-foreground">match codes</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                <Code className="h-4 w-4 text-primary" />
                <code className="text-sm text-foreground">-fs 1234</code>
                <span className="text-sm text-muted-foreground">filter size</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                <Code className="h-4 w-4 text-primary" />
                <code className="text-sm text-foreground">-o out.json</code>
                <span className="text-sm text-muted-foreground">output</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                <Code className="h-4 w-4 text-primary" />
                <code className="text-sm text-foreground">-x proxy</code>
                <span className="text-sm text-muted-foreground">proxy</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background p-3">
                <Code className="h-4 w-4 text-primary" />
                <code className="text-sm text-foreground">-mode clusterbomb</code>
                <span className="text-sm text-muted-foreground">multi-pos</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-center text-sm text-destructive">
              For educational and authorized testing purposes only. Always
              obtain proper authorization before testing.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}


