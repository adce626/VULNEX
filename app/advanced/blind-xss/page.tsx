"use client"

import { useState } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import { CommandList } from "@/components/command-list"
import { PageTitle } from "@/components/page-title"
import { blindXSSSteps } from "@/lib/blind-xss-commands"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function BlindXSSPage() {
  const [expandedSteps, setExpandedSteps] = useState<string[]>(
    blindXSSSteps.map((s) => s.id)
  )

  const toggleStep = (id: string) => {
    setExpandedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const totalCommands = blindXSSSteps.reduce(
    (acc, step) => acc + step.commands.length,
    0
  )
  const totalTools = blindXSSSteps.reduce(
    (acc, step) => acc + (step.tools?.length || 0),
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Blind XSS Advanced" />
      <MainSidebar />

      <main className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-6">
            <Link
              href="/advanced"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Advanced Topics
            </Link>
          </div>
        </header>

        <div className="px-6 py-8">
          {/* Title Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Mastering Blind XSS
                </h1>
                <p className="text-muted-foreground">
                  Advanced techniques for stealthy cross-site scripting attacks
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {blindXSSSteps.length} Steps
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
              {blindXSSSteps.map((step, index) => (
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
            {blindXSSSteps.map((step, stepIndex) => (
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
                        <CommandList commands={step.commands} pageTitle="Blind XSS Advanced" pageSize={15} />
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

          {/* Conclusion */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              Conclusion
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Blind XSS isn&apos;t for the impatient, but it&apos;s one of the most
              rewarding vulnerabilities. Be everywhere: automate payloads in
              headers with Burp or a User-Agent switcher, scale with one-liners
              that crawl targets, and never underestimate hidden payloads in
              image EXIF data. Every technique here is a tool to ensure no input
              goes untested. Build a robust methodology, think creatively, and
              let the backend do the work for you.
            </p>
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
