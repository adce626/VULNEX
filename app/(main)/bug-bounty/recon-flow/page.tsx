"use client"

import { useState } from "react"
import Link from "next/link"
import { PageTitle } from "@/components/page-title"
import { reconFlowChapters } from "@/lib/recon-flow-data"
import { Target, Copy, Check, Search, ChevronRight, ExternalLink } from "lucide-react"

const navLinks = [
  { href: "/", label: "Main Site", color: "var(--bb-primary)", dot: "var(--bb-primary)" },
  { href: "/Hope", label: "Full Guide", color: "var(--bb-gold)", dot: "var(--bb-gold)" },
  { href: "/bug-bounty", label: "Bug Bounty", color: "var(--bb-primary)", dot: "var(--bb-primary)" },
  { href: "/tools", label: "Tools", color: "var(--bb-orange)", dot: "var(--bb-orange)" },
  { href: "/bug-bounty/automation", label: "Automation", color: "var(--bb-amber)", dot: "var(--bb-amber)" },
  { href: "/bug-bounty/chaining", label: "Chaining", color: "oklch(0.7 0.14 65)", dot: "oklch(0.7 0.14 65)" },
  { href: "/bug-bounty/reporting", label: "Reporting", color: "oklch(0.55 0.22 25)", dot: "oklch(0.55 0.22 25)" },
  { href: "/bug-bounty/platforms", label: "Platforms", color: "oklch(0.65 0.18 50)", dot: "oklch(0.65 0.18 50)" },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200"
      style={{ background: "oklch(0.55 0.22 25 / 0.12)", color: "var(--bb-primary)" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.55 0.22 25 / 0.22)" }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "oklch(0.55 0.22 25 / 0.12)" }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CommandBlock({ cmd, desc }: { cmd: string; desc: string }) {
  return (
    <div className="group rounded-lg border transition-all duration-200" style={{
      background: "oklch(0.07 0.015 30 / 0.6)",
      borderColor: "var(--bb-border)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bb-primary)" }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bb-border)" }}
    >
      <div className="flex items-start gap-3 p-3">
        <span className="mt-0.5 shrink-0 font-mono text-xs" style={{ color: "oklch(0.45 0.15 25)" }}>$</span>
        <div className="min-w-0 flex-1">
          <code className="block overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm leading-relaxed" style={{ color: "var(--bb-text)" }}>
            {cmd}
          </code>
          <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>{desc}</p>
        </div>
        <CopyButton text={cmd} />
      </div>
    </div>
  )
}

export default function ReconFlowPage() {
  const [activeChapter, setActiveChapter] = useState(reconFlowChapters[0].id)

  const scrollToChapter = (id: string) => {
    setActiveChapter(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="bug-bounty-realm">
      <PageTitle title="Recon Flow — Bug Bounty Hunter's Guide" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-14 items-center border-b px-6" style={{ background: "var(--bb-bg)", borderColor: "var(--bb-border)" }}>
        <div className="flex items-center gap-6">
          <Link href="/bug-bounty" className="flex items-center gap-2 text-sm font-bold tracking-wider" style={{ color: "var(--bb-primary)" }}>
            <Target className="h-4 w-4" /> BUG BOUNTY
          </Link>
          <div className="h-5 w-px" style={{ background: "var(--bb-border)" }} />
          <div className="flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium tracking-wider transition-all duration-200"
                style={{ color: "var(--bb-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = link.color; e.currentTarget.style.background = `${link.color}12` }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--bb-text-muted)"; e.currentTarget.style.background = "transparent" }}
              >
                <span className="h-1.5 w-1.5 rounded-full transition-all duration-200" style={{ background: link.dot }} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b px-6 pt-16 pb-12 text-center" style={{ borderColor: "var(--bb-border)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, oklch(0.55 0.22 25 / 0.06) 0%, transparent 60%)" }} />
        <div className="relative mx-auto max-w-4xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--bb-primary-glow)", border: "1px solid var(--bb-primary)" }}>
            <Search className="h-8 w-8" style={{ color: "var(--bb-primary)" }} />
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--bb-text)" }}>
            Recon Flow
          </h1>
          <p className="mx-auto mb-6 max-w-2xl" style={{ color: "var(--bb-text-secondary)" }}>
            Subdomain enumeration, port scanning, technology fingerprinting, and endpoint discovery — the foundation of every bounty
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {reconFlowChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200"
                style={{
                  background: activeChapter === ch.id ? `${ch.color}18` : "var(--bb-card)",
                  color: ch.color,
                  border: `1px solid ${activeChapter === ch.id ? `${ch.color}40` : "var(--bb-border)"}`,
                }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: `${ch.color}22` }}>
                  {ch.number}
                </span>
                {ch.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Chapter Tabs */}
      <div className="sticky top-14 z-40 border-b" style={{ background: "oklch(0.075 0.015 30)", borderColor: "var(--bb-border)" }}>
        <div className="mx-auto flex max-w-6xl items-center gap-1 px-6 py-2 overflow-x-auto">
          {reconFlowChapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              className="relative flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wider transition-all duration-200"
              style={{
                color: activeChapter === ch.id ? ch.color : "var(--bb-text-muted)",
                background: activeChapter === ch.id ? `${ch.color}10` : "transparent",
              }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: activeChapter === ch.id ? `${ch.color}22` : "oklch(0.5 0.02 30 / 0.3)" }}>
                {ch.number}
              </span>
              {ch.title}
              {activeChapter === ch.id && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ background: ch.color }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {reconFlowChapters.map((chapter) => (
          <section key={chapter.id} id={chapter.id} className="mb-20 scroll-mt-28 last:mb-0">
            {/* Chapter Header */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold font-mono" style={{ background: `${chapter.color}18`, color: chapter.color, border: `1px solid ${chapter.color}30` }}>
                  {chapter.number}
                </span>
                <span className="text-xs font-semibold tracking-widest" style={{ color: chapter.color }}>
                  CHAPTER {chapter.number}
                </span>
              </div>
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl" style={{ color: "var(--bb-text)" }}>{chapter.title}</h2>
              <p className="text-sm font-medium tracking-wider" style={{ color: chapter.color }}>{chapter.subtitle}</p>
            </div>

            {/* Overview */}
            <div className="mb-10 rounded-xl border-l-[3px] p-4" style={{
              borderLeftColor: chapter.color,
              background: "oklch(0.08 0.01 30 / 0.5)",
              borderColor: "var(--bb-border)",
            }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>{chapter.overview}</p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {chapter.sections.map((section, si) => (
                <div key={si}>
                  <h3 className="mb-3 text-lg font-bold" style={{ color: "var(--bb-text)" }}>{section.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>{section.text}</p>

                  <div className="space-y-2.5">
                    {section.commands.map((cmd, ci) => (
                      <CommandBlock key={ci} cmd={cmd.cmd} desc={cmd.desc} />
                    ))}
                  </div>

                  {section.tips.length > 0 && (
                    <div className="mt-4 rounded-lg border p-4" style={{
                      borderColor: "oklch(0.72 0.16 75 / 0.25)",
                      background: "oklch(0.72 0.16 75 / 0.05)",
                    }}>
                      <p className="mb-2 text-xs font-bold tracking-widest" style={{ color: "var(--bb-gold)" }}>TIPS</p>
                      <ul className="space-y-1.5">
                        {section.tips.map((tip, ti) => (
                          <li key={ti} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>
                            <ChevronRight className="mt-0.5 h-3 w-3 shrink-0" style={{ color: "var(--bb-gold)" }} />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tools Used */}
            <div className="mt-10 rounded-xl border p-5" style={{ borderColor: "var(--bb-border)", background: "var(--bb-card)" }}>
              <p className="mb-4 text-xs font-bold tracking-widest" style={{ color: chapter.color }}>TOOLS IN THIS CHAPTER</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {chapter.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border p-3 transition-all duration-200"
                    style={{ borderColor: "var(--bb-border)", background: "var(--bb-surface)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = chapter.color; e.currentTarget.style.background = `${chapter.color}08` }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bb-border)"; e.currentTarget.style.background = "var(--bb-surface)" }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold" style={{ color: "var(--bb-text)" }}>{tool.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: chapter.color }} />
                    </div>
                    <p className="mb-2 text-xs leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>{tool.desc}</p>
                    {tool.install && (
                      <code className="block overflow-x-auto whitespace-nowrap rounded px-2 py-1 text-[10px] font-mono" style={{ background: "oklch(0 0 0 / 0.3)", color: "var(--bb-text-muted)" }}>
                        {tool.install}
                      </code>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 rounded-lg border p-4" style={{
              borderColor: `${chapter.color}25`,
              background: `${chapter.color}06`,
            }}>
              <div className="flex items-start gap-3">
                <span className="text-lg" style={{ color: chapter.color }}>&#9654;</span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>{chapter.summary}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: "var(--bb-border)" }}>
        <Link href="/bug-bounty" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white" style={{ color: "var(--bb-text-muted)" }}>
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          Back to Bug Bounty
        </Link>
      </footer>
    </div>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
