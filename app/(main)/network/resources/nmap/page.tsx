"use client"

import Link from "next/link"
import { Terminal, BookOpen, ChevronRight, Copy, Check } from "lucide-react"
import { useState, useCallback } from "react"
import { nmapReferenceSections } from "@/lib/nmap-reference-data"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])

  return (
    <button onClick={handleCopy} className={`network-copy-btn ${copied ? "copied" : ""}`}>
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ cmd }: { cmd: string }) {
  return (
    <div className="mb-2 flex items-start gap-2">
      <code className="network-command-block flex-1 whitespace-pre-wrap break-all">{cmd}</code>
      <CopyButton text={cmd} />
    </div>
  )
}

export default function NmapReferencePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b px-6" style={{ background: "var(--network-bg)", borderColor: "var(--network-border)" }}>
        <Link href="/network" className="flex items-center gap-2 text-sm font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>
          <Terminal className="h-4 w-4" /> NETWORK
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            &larr; Main Site
          </Link>
          <Link href="/network/ports" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Ports
          </Link>
          <Link href="/network/payloads" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Payloads
          </Link>
          <Link href="/network/wireless" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Wireless
          </Link>
          <Link href="/network/resources" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Resources
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b px-6 py-14 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--network-primary-glow)", border: "1px solid var(--network-primary-dim)" }}>
          <Terminal className="h-7 w-7" style={{ color: "var(--network-primary)" }} />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-wider sm:text-4xl" style={{ color: "var(--network-primary)" }}>
          NMAP REFERENCE
        </h1>
        <p className="mx-auto max-w-xl text-sm" style={{ color: "var(--network-text-secondary)" }}>
          Complete reference for the industry-standard network scanner — scan types, NSE scripts, output formats, timing, evasion, and reusable one-liners.
        </p>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="space-y-10">
          {nmapReferenceSections.map((section) => (
            <div key={section.id} id={section.id}>
              <div className="mb-2 flex items-center gap-2">
                <Terminal className="h-4 w-4" style={{ color: "var(--network-primary)" }} />
                <h2 className="text-sm font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>{section.title}</h2>
              </div>
              <p className="mb-4 text-xs leading-relaxed" style={{ color: "var(--network-text-muted)" }}>{section.description}</p>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="network-card p-4">
                    <h3 className="mb-1 text-sm font-semibold">{item.name}</h3>
                    <p className="mb-2 text-xs leading-relaxed" style={{ color: "var(--network-text-secondary)" }}>{item.description}</p>
                    {item.command && <CodeBlock cmd={item.command} />}
                    {item.note && (
                      <p className="mt-1 text-xs" style={{ color: "var(--network-text-muted)" }}>
                        <span className="font-semibold" style={{ color: "var(--network-primary)" }}>Note: </span>
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t pt-8 text-center" style={{ borderColor: "var(--network-border)" }}>
          <div className="mx-auto mb-4 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
          <Link href="/network/resources" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
            <Terminal className="h-3 w-3" /> Back to Resources
          </Link>
        </footer>
      </div>
    </div>
  )
}
