"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import {
  reconCommands,
  subdomainCommands,
  scanningCommands,
  fuzzingCommands,
  shortnameCommands,
  iisVersions,
  fileExtensions,
} from "@/lib/iis-commands"
import {
  Search,
  Globe,
  Target,
  Crosshair,
  FileSearch,
  Shield,
  AlertTriangle,
  FileCode,
  Terminal,
  ChevronRight,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { PageTitle } from "@/components/page-title"

const phases = [
  { id: "recon", title: "Reconnaissance", icon: Search },
  { id: "subdomain", title: "Subdomain Enumeration", icon: Globe },
  { id: "scanning", title: "Targeted Scanning", icon: Target },
  { id: "fuzzing", title: "Advanced Fuzzing", icon: Crosshair },
  { id: "shortname", title: "Shortname Exploitation", icon: FileSearch },
  { id: "versions", title: "Version Vulnerabilities", icon: Shield },
]

export default function IISHackingGuide() {
  const [activePhase, setActivePhase] = useState("recon")

  const scrollToSection = (id: string) => {
    setActivePhase(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="IIS Hacking Guide" />
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
              <Link href="/tech-specific" className="hover:text-foreground">
                Tech-Specific
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Microsoft IIS</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Microsoft IIS Hacking Guide
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Comprehensive commands and techniques for IIS server penetration testing
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                6 Phases
              </span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                80+ Commands
              </span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                Copy Ready
              </span>
            </div>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => scrollToSection(phase.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activePhase === phase.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <phase.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{phase.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {/* Phase 1: Recon */}
          <section id="recon" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 1</span>
                <h2 className="text-2xl font-bold text-foreground">Reconnaissance & Discovery</h2>
              </div>
            </div>
            <div className="space-y-6">
              {reconCommands.map((category, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    {category.category}
                  </h3>
                  <div className="grid gap-3">
                    {category.commands.map((cmd, cmdIdx) => (
                      <CommandCard
                        key={cmdIdx}
                        command={cmd.command}
                        description={cmd.description}
                        index={cmdIdx + 1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Phase 2: Subdomain */}
          <section id="subdomain" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 2</span>
                <h2 className="text-2xl font-bold text-foreground">Subdomain Enumeration</h2>
              </div>
            </div>
            <div className="space-y-6">
              {subdomainCommands.map((category, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    {category.category}
                  </h3>
                  <div className="grid gap-3">
                    {category.commands.map((cmd, cmdIdx) => (
                      <CommandCard
                        key={cmdIdx}
                        command={cmd.command}
                        description={cmd.description}
                        index={cmdIdx + 1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Phase 3: Scanning */}
          <section id="scanning" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 3</span>
                <h2 className="text-2xl font-bold text-foreground">Targeted Scanning</h2>
              </div>
            </div>
            <div className="space-y-6">
              {scanningCommands.map((category, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    {category.category}
                  </h3>
                  <div className="grid gap-3">
                    {category.commands.map((cmd, cmdIdx) => (
                      <CommandCard
                        key={cmdIdx}
                        command={cmd.command}
                        description={cmd.description}
                        index={cmdIdx + 1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Phase 4: Fuzzing */}
          <section id="fuzzing" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Crosshair className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 4</span>
                <h2 className="text-2xl font-bold text-foreground">Advanced Fuzzing</h2>
              </div>
            </div>
            <div className="space-y-6">
              {fuzzingCommands.map((category, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    {category.category}
                  </h3>
                  <div className="grid gap-3">
                    {category.commands.map((cmd, cmdIdx) => (
                      <CommandCard
                        key={cmdIdx}
                        command={cmd.command}
                        description={cmd.description}
                        index={cmdIdx + 1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Phase 5: Shortname */}
          <section id="shortname" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileSearch className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 5</span>
                <h2 className="text-2xl font-bold text-foreground">Shortname Exploitation</h2>
              </div>
            </div>
            <div className="space-y-6">
              {shortnameCommands.map((category, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    {category.category}
                  </h3>
                  <div className="grid gap-3">
                    {category.commands.map((cmd, cmdIdx) => (
                      <CommandCard
                        key={cmdIdx}
                        command={cmd.command}
                        description={cmd.description}
                        index={cmdIdx + 1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Phase 6: Version-Specific */}
          <section id="versions" className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 6</span>
                <h2 className="text-2xl font-bold text-foreground">Version-Specific Vulnerabilities</h2>
              </div>
            </div>
            <div className="grid gap-6">
              {iisVersions.map((version, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-xl border p-6",
                    version.severity === "critical" && "border-red-500/50 bg-red-500/5",
                    version.severity === "high" && "border-orange-500/50 bg-orange-500/5",
                    version.severity === "medium" && "border-yellow-500/50 bg-yellow-500/5",
                    version.severity === "low" && "border-green-500/50 bg-green-500/5"
                  )}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{version.version}</h3>
                      <p className="text-sm text-muted-foreground">{version.era}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        version.severity === "critical" && "bg-red-500/20 text-red-400",
                        version.severity === "high" && "bg-orange-500/20 text-orange-400",
                        version.severity === "medium" && "bg-yellow-500/20 text-yellow-400",
                        version.severity === "low" && "bg-green-500/20 text-green-400"
                      )}
                    >
                      {version.severity === "critical" && "Critical"}
                      {version.severity === "high" && "High"}
                      {version.severity === "medium" && "Medium"}
                      {version.severity === "low" && "Low"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <AlertTriangle className="h-4 w-4" />
                      Weaknesses
                    </h4>
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {version.weaknesses.map((weakness, wIdx) => (
                        <li key={wIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-card p-3">
                    <span className="text-xs font-medium text-primary">Test Focus: </span>
                    <span className="text-sm text-foreground">{version.testFocus}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* File Extensions Reference */}
          <section className="scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FileCode className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Reference</span>
                <h2 className="text-2xl font-bold text-foreground">Important File Extensions</h2>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {fileExtensions.map((ext, idx) => (
                  <div key={idx} className="rounded-lg bg-background p-3">
                    <code className="text-sm font-bold text-primary">{ext.ext}</code>
                    <p className="mt-1 text-xs text-muted-foreground">{ext.desc}</p>
                  </div>
                ))}
              </div>
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
