"use client"

import { useState, useMemo, useCallback } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, Home, Fingerprint, AlertTriangle, ExternalLink, Hash, Shield, Terminal, Cpu, Gauge, Scan, Copy, Check, Zap, ArrowRight } from "lucide-react"
import { analyzeHash, lookupLinks, verifyHash } from "@/lib/hash-detector-data"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  "Fast Hash": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Password Hash": "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "Checksum": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  "KDF": "border-amber-500/30 bg-amber-500/10 text-amber-400",
}
const collisionColors: Record<string, string> = {
  High: "text-red-400 bg-red-500/10 border-red-500/30",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Low: "text-green-400 bg-green-500/10 border-green-500/30",
  None: "text-muted-foreground bg-muted/50 border-border",
}
const difficultyColors: Record<string, string> = {
  Easy: "text-green-400 bg-green-500/10 border-green-500/30",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Hard: "text-orange-400 bg-orange-500/10 border-orange-500/30",
  "Very Hard": "text-red-400 bg-red-500/10 border-red-500/30",
}
const typeColors: Record<string, string> = {
  hash: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  checksum: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  password_hash: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  kdf: "border-amber-500/30 bg-amber-500/10 text-amber-400",
}

function HashCard({ match, isTop, onExample }: { match: { name: string; length: number; type: string; confidence: number; pattern: string; category: string; collisionRisk: string; crackDifficulty: string; example?: string }; isTop: boolean; onExample: (h: string) => void }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(match.name).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }, [match.name])

  return (
    <div className={cn("rounded-xl border p-5 transition-all", isTop ? "border-primary/40 bg-primary/5" : "border-border/50 bg-card hover:border-primary/30")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">{match.name}</span>
            <span className={cn("rounded border px-2 py-0.5 text-xs font-medium", typeColors[match.type] || "border-gray-500/30 bg-gray-500/10 text-gray-400")}>{match.type}</span>
            {isTop && <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400"><Zap className="h-3 w-3" /> Most Likely</span>}
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Confidence</span>
              <span className={cn("font-medium", match.confidence >= 90 ? "text-green-400" : match.confidence >= 70 ? "text-amber-400" : "text-red-400")}>{match.confidence}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className={cn("h-full rounded-full transition-all duration-300", match.confidence >= 90 ? "bg-green-500" : match.confidence >= 70 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${match.confidence}%` }} />
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className={cn("inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium", categoryColors[match.category])}><Cpu className="h-3 w-3" /> {match.category}</span>
            <span className={cn("inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium", collisionColors[match.collisionRisk])}><Shield className="h-3 w-3" /> Collision: {match.collisionRisk}</span>
            <span className={cn("inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium", difficultyColors[match.crackDifficulty])}><Gauge className="h-3 w-3" /> Crack: {match.crackDifficulty}</span>
            <button onClick={handleCopy} className="inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
              {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />} {copied ? "Copied" : "Name"}
            </button>
            {match.example && (
              <button onClick={() => onExample(match.example!)} className="inline-flex items-center gap-1 rounded border border-primary/30 px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 transition-colors">
                <Zap className="h-3 w-3" /> Example
              </button>
            )}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-xs text-muted-foreground">Length</div>
          <div className="font-mono text-lg font-bold text-foreground">{match.length}</div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 font-mono text-xs text-muted-foreground break-all">
        <span className="text-primary">{match.pattern}</span>
      </div>
    </div>
  )
}

export default function HashDetectorPage() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [verifHash, setVerifHash] = useState("")
  const [verifPlain, setVerifPlain] = useState("")
  const [verifResults, setVerifResults] = useState<{ algorithm: string; matches: boolean; computed: string }[] | null>(null)
  const [verifLoading, setVerifLoading] = useState(false)

  const analysis = useMemo(() => analyzeHash(input), [input])

  const handleCopyHash = useCallback(() => {
    if (!input.trim()) return
    navigator.clipboard.writeText(input.trim()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }, [input])

  const handleExample = useCallback((h: string) => {
    setInput(h)
  }, [])

  const handleVerify = useCallback(async () => {
    if (!verifHash.trim() || !verifPlain.trim()) return
    setVerifLoading(true)
    try {
      const r = await verifyHash(verifHash, verifPlain)
      setVerifResults(r)
    } catch { setVerifResults([]) }
    setVerifLoading(false)
  }, [verifHash, verifPlain])

  const topMatch = analysis.matches.length > 0 ? analysis.matches[0] : null
  const hasMany = analysis.matches.length > 5
  const primaryMatches = hasMany ? analysis.matches.slice(0, 3) : analysis.matches
  const extraMatches = hasMany ? analysis.matches.slice(3) : []

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Hash Detector — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">Hash Detector</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-400 shadow-md">
                <Fingerprint className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Hash Detector</h1>
                <p className="mt-1 text-muted-foreground">Identify hash types by analyzing length, prefix, character patterns, and structure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-6 p-6">
          {/* Input */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Enter hash string</label>
            <div className="relative mt-1">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="e.g. 5d41402abc4b2a76b9719d911017c592"
                className="w-full rounded-xl border border-border bg-card px-5 py-4 pr-12 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={handleCopyHash}
                disabled={!input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30"
                title="Copy hash"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {input && analysis.matches.length === 0 && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-amber-300">No matching hash pattern found</p>
                <p className="mt-1 text-xs text-amber-400/70">
                  Length: {analysis.length} chars &middot; Charset: {analysis.charSet}
                  {analysis.prefix !== "None" && ` &middot; Prefix: ${analysis.prefix}`}
                </p>
              </div>
            </div>
          )}

          {analysis.matches.length > 0 && (
            <>
              {/* Best Guess Banner */}
              <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
                <Zap className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Best guess: <span className="text-primary">{analysis.bestGuess}</span></p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {analysis.bestGuess.includes("bcrypt") && "This appears to be a bcrypt password hash, commonly used in modern web applications."}
                    {analysis.bestGuess === "MD5" && "This is an MD5 hash — widely used but considered cryptographically broken. Suitable for checksums only."}
                    {analysis.bestGuess === "NTLM" && "This is an NTLM hash — used by Windows for authentication. Can be cracked relatively quickly."}
                    {analysis.bestGuess === "SHA1" && "This is a SHA1 hash — used in legacy systems and Git. Collision resistance is partially broken."}
                    {analysis.bestGuess === "SHA256" && "This is a SHA256 hash — a secure, widely used cryptographic hash from the SHA-2 family."}
                    {analysis.bestGuess === "SHA512" && "This is a SHA512 hash — a secure 512-bit hash from the SHA-2 family."}
                    {analysis.bestGuess === "Argon2id" && "This is an Argon2id hash — the recommended password hashing algorithm (winner of the PHC)."}
                    {analysis.bestGuess === "SHA256-Crypt" && "This is a SHA256-Crypt hash — a Unix/Linux password hash with the $5$ prefix."}
                    {analysis.bestGuess === "SHA512-Crypt" && "This is a SHA512-Crypt hash — a Unix/Linux password hash with the $6$ prefix."}
                    {!["bcrypt", "MD5", "NTLM", "SHA1", "SHA256", "SHA512", "Argon2id", "SHA256-Crypt", "SHA512-Crypt"].some(b => analysis.bestGuess.startsWith(b)) && "Based on the hash length, prefix, and character set analysis above."}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Hash className="h-3.5 w-3.5" /> Length</div>
                  <p className="mt-1 text-lg font-bold text-foreground">{analysis.length}</p>
                  <p className="text-xs text-muted-foreground">characters</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Scan className="h-3.5 w-3.5" /> Character Set</div>
                  <p className="mt-1 text-lg font-bold text-foreground">{analysis.charSet}</p>
                  <p className="text-xs text-muted-foreground">encoding type</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Terminal className="h-3.5 w-3.5" /> Prefix</div>
                  <p className="mt-1 break-all font-bold text-foreground">{analysis.prefix}</p>
                  <p className="text-xs text-muted-foreground">prefix detected</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Gauge className="h-3.5 w-3.5" /> Matches</div>
                  <p className="mt-1 text-lg font-bold text-foreground">{analysis.matches.length}</p>
                  <p className="text-xs text-muted-foreground">patterns matched</p>
                </div>
              </div>

              {/* Raw hash display */}
              {input.length > 32 && (
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <div className="text-xs text-muted-foreground mb-1">Raw hash</div>
                  <div className="overflow-x-auto font-mono text-sm text-foreground break-all">{input.trim()}</div>
                </div>
              )}

              {/* Possible matches */}
              <div>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Possible Matches ({analysis.matches.length})
                </h2>
                <div className="space-y-3">
                  {primaryMatches.map((m, i) => (
                    <HashCard key={i} match={m} isTop={i === 0} onExample={handleExample} />
                  ))}
                </div>

                {/* Extra matches grouped */}
                {extraMatches.length > 0 && (
                  <details className="mt-3 rounded-xl border border-border/50 bg-card">
                    <summary className="cursor-pointer px-5 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                      {extraMatches.length} more possible matches
                    </summary>
                    <div className="space-y-3 border-t border-border/50 px-5 py-4">
                      {extraMatches.map((m, i) => (
                        <HashCard key={i} match={m} isTop={false} onExample={handleExample} />
                      ))}
                    </div>
                  </details>
                )}
              </div>

              {/* Hash Lookup */}
              <div>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hash Lookup</h2>
                <div className="flex flex-wrap gap-2">
                  {lookupLinks.map(link => (
                    <a key={link.name} href={typeof link.url === "function" ? link.url(input.trim()) : link.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >{link.name} <ExternalLink className="h-3.5 w-3.5" /></a>
                  ))}
                </div>
              </div>

              {/* Hash Verification */}
              <div className="rounded-xl border border-border/50 bg-card">
                <div className="border-b border-border/50 px-5 py-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hash Verification</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Enter a hash and plaintext to verify if the plaintext produces the hash</p>
                </div>
                <div className="space-y-3 p-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Hash</label>
                      <input value={verifHash} onChange={e => setVerifHash(e.target.value)} placeholder="Paste hash here"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Plaintext</label>
                      <input value={verifPlain} onChange={e => setVerifPlain(e.target.value)} placeholder="Type plaintext to test"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <button onClick={handleVerify} disabled={verifLoading || !verifHash.trim() || !verifPlain.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
                  >{verifLoading ? "Verifying..." : "Verify"} <ArrowRight className="h-4 w-4" /></button>

                  {verifResults && (
                    <div className="space-y-2">
                      {verifResults.filter(r => r.matches).length > 0 ? (
                        verifResults.filter(r => r.matches).map(r => (
                          <div key={r.algorithm} className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
                            <Check className="h-5 w-5 shrink-0 text-green-400" />
                            <span className="text-sm font-medium text-green-300">{r.algorithm}: MATCH <span className="font-mono text-green-400/70">({r.computed})</span></span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                          <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
                          <span className="text-sm text-red-300">No match — the plaintext does not produce this hash with MD5, SHA1, SHA256, SHA384, or SHA512</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Supported types reference */}
          <details className="rounded-xl border border-border/50 bg-card">
            <summary className="cursor-pointer px-5 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Supported hash types (32 types)
            </summary>
            <div className="border-t border-border/50 px-5 py-4">
              <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3 lg:grid-cols-4">
                {[
                  ["MD4", "32 hex chars, fast hash"],
                  ["MD5", "32 hex chars, fast hash"],
                  ["SHA1", "40 hex chars"],
                  ["RIPEMD160", "40 hex chars"],
                  ["SHA224", "56 hex chars"],
                  ["SHA3-224", "56 hex chars"],
                  ["SHA256", "64 hex chars"],
                  ["SHA3-256", "64 hex chars"],
                  ["Blake2s-256", "64 hex chars"],
                  ["GOST R 34.11-94", "64 hex chars"],
                  ["SHA384", "96 hex chars"],
                  ["SHA3-384", "96 hex chars"],
                  ["SHA512", "128 hex chars"],
                  ["SHA3-512", "128 hex chars"],
                  ["Whirlpool", "128 hex chars"],
                  ["Blake2b-512", "128 hex chars"],
                  ["NTLM", "32 hex chars"],
                  ["LM Hash", "32 hex chars"],
                  ["HMAC-MD5 / SHA1 / SHA256", "32/40/64 hex"],
                  ["bcrypt ($2a$/$2b$/$2x$/$2y$)", "60 chars, prefix"],
                  ["SHA256-Crypt ($5$)", "prefix $5$"],
                  ["SHA512-Crypt ($6$)", "prefix $6$"],
                  ["Apache MD5 ($apr1$)", "prefix $apr1$"],
                  ["DES Crypt", "13 chars, _ prefix"],
                  ["Argon2id / i / d", "prefix $argon2$"],
                  ["scrypt", "prefix $7$ / SCRYPT:"],
                  ["PBKDF2", "prefix $pbkdf2$"],
                  ["MySQL 5", "41 chars, * prefix"],
                  ["MySQL < 4.1", "16 hex chars"],
                  ["CRC32", "8 hex chars"],
                  ["Adler32", "8 hex chars"],
                  ["NTLM (with username)", "32 hex + :user"],
                ].map(([name, desc]) => (
                  <div key={name as string} className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <span className="font-medium text-foreground">{name as string}</span>
                      <p className="text-xs text-muted-foreground">{desc as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </main>
    </div>
  )
}
