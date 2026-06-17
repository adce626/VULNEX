"use client"

import { useState, useMemo, useCallback } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, Home, Copy, Check, Key, AlertTriangle, Shield, Clock, Terminal, Info, ArrowRight, Skull } from "lucide-react"
import { cn } from "@/lib/utils"

const claimDescriptions: Record<string, string> = {
  iss: "Issuer — identifies the principal that issued the JWT",
  sub: "Subject — identifies the principal that is the subject of the JWT",
  aud: "Audience — identifies the recipients that the JWT is intended for",
  exp: "Expiration Time — token expires after this timestamp",
  nbf: "Not Before — token is not valid before this timestamp",
  iat: "Issued At — timestamp when the token was issued",
  jti: "JWT ID — unique identifier for the token",
  typ: "Type — media type of the token (usually JWT)",
  azp: "Authorized Party — the party to which the token was issued",
  scope: "Scope — permissions granted by the token",
  roles: "Roles — user roles assigned to the token",
  permissions: "Permissions — specific permissions granted",
  client_id: "Client ID — identifies the OAuth client",
  nonce: "Nonce — replay protection value",
  email: "Email — user email address",
  name: "Name — user display name",
  preferred_username: "Preferred Username — user's preferred username",
  given_name: "Given Name — user's first name",
  family_name: "Family Name — user's last name",
}

function b64urlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + (4 - (str.length % 4)) % 4, "=")
    return atob(base64)
  } catch { return "" }
}

function formatJSON(str: string): string {
  try { return JSON.stringify(JSON.parse(str), null, 2) } catch { return str }
}

function getAlgorithm(header: any): string { return header?.alg || "unknown" }
function getKid(header: any): string | null { return header?.kid || null }
function getJKU(header: any): string | null { return header?.jku || null }
function getJWK(header: any): any | null { return header?.jwk || null }
function getX5u(header: any): string | null { return header?.x5u || null }
function getTyp(header: any): string | null { return header?.typ || null }

function parseTime(ts: number): { date: string; relative: string } {
  const d = new Date(ts * 1000)
  const now = Date.now()
  const diff = d.getTime() - now
  const absDays = Math.abs(diff) / 86400000
  let relative: string
  if (diff < 0) relative = absDays < 1 ? `${Math.round(-diff / 3600000)}h ago` : `${Math.round(absDays)}d ago`
  else relative = absDays < 1 ? `in ${Math.round(diff / 3600000)}h` : `in ${Math.round(absDays)}d`
  return { date: d.toLocaleString(), relative }
}

function algVerdict(alg: string): { text: string; color: string } {
  const lower = alg.toLowerCase()
  if (lower === "none") return { text: "CRITICAL — alg=none allows forged tokens", color: "text-red-400" }
  if (lower === "hs1") return { text: "WEAK — HS1 is trivially breakable", color: "text-orange-400" }
  if (lower.startsWith("hs") && !lower.endsWith("256") && !lower.endsWith("384") && !lower.endsWith("512")) return { text: "Weak HMAC algorithm", color: "text-orange-400" }
  if (lower.startsWith("rs") || lower.startsWith("es") || lower.startsWith("ps")) return { text: "Asymmetric — verify with public key", color: "text-yellow-400" }
  if (lower === "hs256") return { text: "Standard HMAC-SHA256", color: "text-green-400" }
  if (lower === "hs384") return { text: "Strong HMAC-SHA384", color: "text-green-400" }
  if (lower === "hs512") return { text: "Strong HMAC-SHA512", color: "text-green-400" }
  return { text: "Unknown algorithm — review carefully", color: "text-muted-foreground" }
}

function kidIsDangerous(kid: string): boolean {
  return /['";\s=#&?/\\<>]/.test(kid)
}

function computeScore(issues: { severity: string }[]): number {
  let score = 100
  for (const i of issues) {
    if (i.severity === "critical") score -= 40
    else if (i.severity === "high") score -= 25
    else if (i.severity === "medium") score -= 15
    else if (i.severity === "info") score -= 5
  }
  return Math.max(0, score)
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-400"
  if (score >= 50) return "text-amber-400"
  return "text-red-400"
}

function scoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-500"
  if (score >= 50) return "bg-amber-500"
  return "bg-red-500"
}

interface SecurityIssue {
  severity: "critical" | "high" | "medium" | "info"
  icon: React.ElementType
  title: string
  description: string
}

export default function JwtDebuggerPage() {
  const [token, setToken] = useState("")
  const [copiedPart, setCopiedPart] = useState<string | null>(null)

  const parsed = useMemo(() => {
    const parts = token.trim().split(".")
    if (parts.length !== 3) return { error: "Invalid JWT format. Expected 3 dot-separated parts (header.payload.signature)", header: null, payload: null, signature: null, alg: "", kid: null, headerObj: null, payloadObj: null, verdict: null, issues: [], score: 100, hashcatMode: null, timeline: null, claims: [] }

    const headerRaw = b64urlDecode(parts[0])
    const payloadRaw = b64urlDecode(parts[1])
    const sigRaw = parts[2]
    if (!headerRaw || !payloadRaw) return { error: "Failed to decode JWT parts — invalid Base64 encoding", header: null, payload: null, signature: null, alg: "", kid: null, headerObj: null, payloadObj: null, verdict: null, issues: [], score: 100, hashcatMode: null, timeline: null, claims: [] }

    let headerObj: any, payloadObj: any
    try { headerObj = JSON.parse(headerRaw) } catch { headerObj = {} }
    try { payloadObj = JSON.parse(payloadRaw) } catch { payloadObj = {} }

    const header = formatJSON(headerRaw)
    const payload = formatJSON(payloadRaw)
    const alg = getAlgorithm(headerObj)
    const kid = getKid(headerObj)
    const jku = getJKU(headerObj)
    const jwk = getJWK(headerObj)
    const x5u = getX5u(headerObj)
    const typ = getTyp(headerObj)
    const verdict = algVerdict(alg)

    const issues: SecurityIssue[] = []

    // Critical checks
    if (alg.toLowerCase() === "none") { issues.push({ severity: "critical", icon: Skull, title: "alg=none Attack", description: "The algorithm is set to 'none'. An attacker can forge any JWT by removing the signature and setting alg to none." }) }
    if (jku) { issues.push({ severity: "high", icon: Skull, title: "JKU Header Present", description: `JKU (JWK Set URL): ${jku}. An attacker could host a malicious JWK set and point the JKU to it. Only use trusted HTTPS URLs.` }) }
    if (x5u) { issues.push({ severity: "high", icon: Skull, title: "X5U Header Present", description: `X5U (X.509 URL): ${x5u}. Similar to JKU — an attacker could point this to a malicious certificate.` }) }
    if (jwk) { issues.push({ severity: "high", icon: Skull, title: "JWK Header Present (Embedded Key)", description: "The token contains an embedded JWK. Unless you explicitly trust the embedded key, this is a high-risk vector — the issuer controls the key." }) }
    if (kid && kidIsDangerous(kid)) { issues.push({ severity: "high", icon: Skull, title: "Dangerous kid Value", description: `The kid contains special characters: "${kid}". This could be SQL injection, NoSQL injection, or path traversal. Always sanitize kid lookups.` }) }

    // Medium checks
    const isWeakHmac = alg.toLowerCase().startsWith("hs") && !["hs256", "hs384", "hs512"].includes(alg.toLowerCase())
    if (isWeakHmac) { issues.push({ severity: "medium", icon: AlertTriangle, title: "Weak HMAC Algorithm", description: `${alg} is a weak HMAC variant. Use HS256 or higher.` }) }

    // Claims analysis
    const claims: { name: string; description: string; value: any; severity?: "good" | "warn" | "info" }[] = []
    for (const key of Object.keys(payloadObj)) {
      const desc = claimDescriptions[key.toLowerCase()] || "Custom claim"
      const val = payloadObj[key]
      let sev: "good" | "warn" | "info" | undefined
      if (["iss", "sub", "aud", "exp", "iat", "nbf", "jti"].includes(key.toLowerCase())) sev = "good"
      else sev = "info"
      claims.push({ name: key, description: desc, value: val, severity: sev })
    }

    // Expiry check
    const timeline: { exp?: { date: string; relative: string; expired: boolean }; iat?: { date: string; relative: string }; nbf?: { date: string; relative: string; future: boolean } } = {}
    if (payloadObj.exp) {
      const t = parseTime(payloadObj.exp)
      const expired = new Date(payloadObj.exp * 1000).getTime() < Date.now()
      timeline.exp = { ...t, expired }
      if (expired) issues.push({ severity: "medium", icon: Clock, title: "Token Expired", description: `This token expired ${t.relative} (${t.date}). Expired tokens should be rejected.` })
      else issues.push({ severity: "info", icon: Info, title: "Token Valid", description: `Token expires ${t.relative} (${t.date}).` })
    } else { issues.push({ severity: "info", icon: Info, title: "No Expiration (exp)", description: "The token has no expiration claim. If it's stolen, it can be used indefinitely." }) }

    if (payloadObj.iat) {
      const t = parseTime(payloadObj.iat)
      timeline.iat = t
    } else { issues.push({ severity: "info", icon: Info, title: "No Issued At (iat)", description: "Without an iat claim, there's no record of when the token was created." }) }

    if (payloadObj.nbf) {
      const t = parseTime(payloadObj.nbf)
      const future = new Date(payloadObj.nbf * 1000).getTime() > Date.now()
      timeline.nbf = { ...t, future }
      if (future) issues.push({ severity: "info", icon: Clock, title: "Not Yet Valid (nbf)", description: `This token is not valid until ${t.date} (${t.relative}).` })
    }

    const score = computeScore(issues)
    let hashcatMode: string | null = null
    if (alg.toLowerCase() === "hs256") hashcatMode = "16500"
    else if (alg.toLowerCase() === "hs384") hashcatMode = "16600"
    else if (alg.toLowerCase() === "hs512") hashcatMode = "16700"

    return { error: null, header, payload, signature: sigRaw, alg, kid, jku, jwk, x5u, typ, headerObj, payloadObj, verdict, issues, score, hashcatMode, timeline, claims, parts }
  }, [token])

  const copyPart = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedPart(id)
    setTimeout(() => setCopiedPart(null), 2000)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="JWT Debugger — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">JWT Debugger</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-yellow-400 shadow-md">
                <Key className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">JWT Debugger</h1>
                <p className="mt-1 text-muted-foreground">Decode, inspect, and analyze JSON Web Tokens for security vulnerabilities</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-6 p-6">
          {/* Input */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">JWT Token</label>
            <textarea value={token} onChange={e => setToken(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              rows={3}
              className="mt-1 w-full rounded-xl border border-border bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-y"
            />
          </div>

          {parsed.error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{parsed.error}</p>
            </div>
          )}

          {parsed.header && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: Header + Payload */}
              <div className="lg:col-span-2 space-y-6">
                {/* Security Score */}
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-foreground">Security Score</h3>
                    </div>
                    <span className={cn("text-2xl font-bold", scoreColor(parsed.score))}>{parsed.score}/100</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full rounded-full transition-all duration-500", scoreBgColor(parsed.score))} style={{ width: `${parsed.score}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {parsed.score >= 80 ? "No critical issues detected" : parsed.score >= 50 ? "Several issues found — review the alerts below" : "Critical security vulnerabilities detected"}
                  </p>
                </div>

                {/* Security Issues */}
                {parsed.issues.filter(i => i.severity === "critical" || i.severity === "high").length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Security Alerts</h3>
                    {parsed.issues.filter(i => i.severity === "critical" || i.severity === "high").map((issue, idx) => {
                      const Icon = issue.icon
                      return (
                        <div key={idx} className={cn("flex items-start gap-3 rounded-xl border p-4", issue.severity === "critical" ? "border-red-500/30 bg-red-500/10" : "border-orange-500/30 bg-orange-500/10")}>
                          <Icon className={cn("h-5 w-5 shrink-0", issue.severity === "critical" ? "text-red-400" : "text-orange-400")} />
                          <div>
                            <p className={cn("text-sm font-medium", issue.severity === "critical" ? "text-red-300" : "text-orange-300")}>{issue.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{issue.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Header */}
                <div className="rounded-xl border border-border/50 bg-card">
                  <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
                    <h3 className="text-sm font-semibold text-foreground">Header</h3>
                    <button onClick={() => copyPart(parsed.header, "header")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {copiedPart === "header" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedPart === "header" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-sm text-foreground">{parsed.header}</pre>
                </div>

                {/* Payload */}
                <div className="rounded-xl border border-border/50 bg-card">
                  <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
                    <h3 className="text-sm font-semibold text-foreground">Payload</h3>
                    <div className="flex items-center gap-2">
                      <button onClick={() => copyPart(parsed.payload, "payload")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {copiedPart === "payload" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedPart === "payload" ? "Copied" : "Copy"}
                      </button>
                      <button onClick={() => copyPart(JSON.stringify(parsed.payloadObj, null, 2), "decoded")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors" title="Copy decoded JSON">
                        {copiedPart === "decoded" ? <Check className="h-3.5 w-3.5 text-primary" /> : <ArrowRight className="h-3.5 w-3.5" />}
                        {copiedPart === "decoded" ? "Copied" : "JSON"}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-sm text-foreground">{parsed.payload}</pre>
                </div>

                {/* Claims explorer */}
                {parsed.claims.length > 0 && (
                  <div className="rounded-xl border border-border/50 bg-card">
                    <div className="border-b border-border/50 px-5 py-3">
                      <h3 className="text-sm font-semibold text-foreground">Claims Explorer</h3>
                    </div>
                    <div className="divide-y divide-border/50">
                      {parsed.claims.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 px-5 py-3 text-sm">
                          <div className={cn("mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full", c.severity === "good" ? "bg-green-500" : "bg-blue-500")} />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-2">
                              <code className="font-mono text-sm font-medium text-foreground">{c.name}</code>
                              <span className="text-xs text-muted-foreground">— {c.description}</span>
                            </div>
                            <code className="mt-0.5 block break-all font-mono text-xs text-muted-foreground/80">{typeof c.value === "object" ? JSON.stringify(c.value) : String(c.value)}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {Object.keys(parsed.timeline || {}).length > 0 && (
                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"><Clock className="h-4 w-4" /> Timeline</h3>
                    <div className="space-y-3">
                      {parsed.timeline?.iat && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Issued (iat)</span>
                          <div className="text-right">
                            <span className="text-foreground">{parsed.timeline.iat.date}</span>
                            <span className="ml-2 text-xs text-muted-foreground">({parsed.timeline.iat.relative})</span>
                          </div>
                        </div>
                      )}
                      {parsed.timeline?.nbf && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Not Before (nbf)</span>
                          <div className="text-right">
                            <span className="text-foreground">{parsed.timeline.nbf.date}</span>
                            <span className={cn("ml-2 text-xs", parsed.timeline.nbf.future ? "text-orange-400" : "text-muted-foreground")}>({parsed.timeline.nbf.relative})</span>
                          </div>
                        </div>
                      )}
                      {parsed.timeline?.exp && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Expires (exp)</span>
                          <div className="text-right">
                            <span className={parsed.timeline.exp.expired ? "text-red-400" : "text-green-400"}>{parsed.timeline.exp.date}</span>
                            <span className={cn("ml-2 text-xs", parsed.timeline.exp.expired ? "text-red-400" : "text-green-400")}>({parsed.timeline.exp.relative})</span>
                          </div>
                        </div>
                      )}
                      {/* Visual bar */}
                      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                        <div className="absolute left-0 top-0 h-full rounded-full bg-green-500" style={{ width: "30%" }} />
                        <div className="absolute top-0 h-full rounded-full bg-amber-500" style={{ left: "30%", width: "20%" }} />
                        <div className="absolute top-0 h-full rounded-full bg-red-500" style={{ left: "50%", width: "50%" }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>iat</span>
                        <span>nbf</span>
                        <span>exp</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right sidebar */}
              <div className="space-y-4">
                {/* Algorithm */}
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Algorithm</h3>
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg border border-border bg-muted px-3 py-1 font-mono text-lg font-bold text-foreground">{parsed.alg}</span>
                  </div>
                  <p className={cn("mt-2 text-xs", parsed.verdict?.color || "text-muted-foreground")}>{parsed.verdict?.text}</p>
                  {parsed.typ && <p className="mt-1 text-xs text-muted-foreground">Type: <code className="font-mono">{parsed.typ}</code></p>}
                </div>

                {/* Medium/Info issues */}
                {parsed.issues.filter(i => i.severity === "medium" || i.severity === "info").length > 0 && (
                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground"><Info className="h-4 w-4" /> Findings</h3>
                    <div className="space-y-2">
                      {parsed.issues.filter(i => i.severity === "medium" || i.severity === "info").map((issue, idx) => {
                        const Icon = issue.icon
                        return (
                          <div key={idx} className="flex items-start gap-2">
                            <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", issue.severity === "medium" ? "text-orange-400" : "text-muted-foreground")} />
                            <div>
                              <p className="text-xs font-medium text-foreground">{issue.title}</p>
                              <p className="text-xs text-muted-foreground">{issue.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* kid */}
                {parsed.kid && (
                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <h3 className="mb-2 text-sm font-semibold text-foreground">Key ID (kid)</h3>
                    <code className="break-all rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">{parsed.kid}</code>
                    {kidIsDangerous(parsed.kid) && <p className="mt-2 text-xs text-red-400">Special chars detected — possible injection</p>}
                  </div>
                )}

                {/* jku */}
                {parsed.jku && (
                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <h3 className="mb-2 text-sm font-semibold text-foreground">JKU (JWK Set URL)</h3>
                    <code className="block break-all rounded bg-muted px-2 py-1 font-mono text-xs text-orange-400">{parsed.jku}</code>
                    <p className="mt-2 text-xs text-muted-foreground">Verify this URL is HTTPS and points to a trusted JWK set</p>
                  </div>
                )}

                {/* x5u */}
                {parsed.x5u && (
                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <h3 className="mb-2 text-sm font-semibold text-foreground">X5U (X.509 URL)</h3>
                    <code className="block break-all rounded bg-muted px-2 py-1 font-mono text-xs text-orange-400">{parsed.x5u}</code>
                  </div>
                )}

                {/* Signature */}
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <h3 className="mb-2 text-sm font-semibold text-foreground">Signature</h3>
                  <code className="block break-all rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">{parsed.signature?.substring(0, 48)}{(parsed.signature?.length || 0) > 48 ? "..." : ""}</code>
                  <p className="mt-2 text-xs text-muted-foreground">Signature verification requires the secret/public key</p>
                </div>

                {/* Hashcat command */}
                {parsed.hashcatMode && (
                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground"><Terminal className="h-4 w-4" /> Crack with hashcat</h3>
                    <code className="block break-all rounded bg-black/80 px-3 py-2 font-mono text-xs text-green-400">hashcat -m {parsed.hashcatMode} jwt.txt wordlist.txt</code>
                    <p className="mt-2 text-xs text-muted-foreground">Extract the full token to <code className="font-mono">jwt.txt</code> and run against a wordlist</p>
                  </div>
                )}

                {/* Common attacks */}
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <h3 className="mb-2 text-sm font-semibold text-foreground">Common Attacks</h3>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li>• <span className="text-red-400">alg=none</span> — set algorithm to none</li>
                    <li>• <span className="text-orange-400">RS→HS confusion</span> — use public key as HMAC secret</li>
                    <li>• <span className="text-orange-400">kid injection</span> — SQLi, path traversal in kid</li>
                    <li>• <span className="text-orange-400">JKU injection</span> — point JKU to attacker JWK set</li>
                    <li>• <span className="text-yellow-400">Weak HMAC secret</span> — crack with hashcat (mode 16500)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
