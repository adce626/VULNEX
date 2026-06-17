"use client"

import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { interactiveTools } from "@/lib/interactive-data"
import { Code, Key, Fingerprint, Shield, Network, ChevronRight, Home, Sparkles } from "lucide-react"

const toolIcons: Record<string, React.ReactNode> = {
  Code: <Code className="h-6 w-6 text-white" />,
  Key: <Key className="h-6 w-6 text-white" />,
  Fingerprint: <Fingerprint className="h-6 w-6 text-white" />,
  Shield: <Shield className="h-6 w-6 text-white" />,
  Network: <Network className="h-6 w-6 text-white" />,
}

export default function InteractivePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Interactive Tools" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">Interactive Tools</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
          <div className="relative px-6 py-14 text-center lg:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg" style={{ boxShadow: "0 10px 40px rgba(0,255,65,0.15)" }}>
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-clip-text text-4xl font-black text-transparent lg:text-5xl font-['Orbitron',monospace] tracking-wider">
              Interactive Tools
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Client-side security testing utilities — no backend, no API calls. Run entirely in your browser.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {interactiveTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-[1px] shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="relative flex flex-col gap-4 rounded-xl bg-card p-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} shadow-md`}>
                    {toolIcons[tool.icon] || <Sparkles className="h-6 w-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
