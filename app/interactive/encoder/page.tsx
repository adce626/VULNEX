"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, Home, Copy, Check, Code, Wand2, Share, Trash, X, Info, Lock, Unlock, ArrowDown, ArrowUp, Minus, Plus } from "lucide-react"

type EncodeMode =
  | "b64-enc" | "b64-dec" | "b64url-enc" | "b64url-dec"
  | "url-enc" | "url-dec"
  | "url-double-enc" | "url-double-dec"
  | "html-enc" | "html-dec"
  | "html-hex-enc" | "html-hex-dec"
  | "html-dec-enc" | "html-dec-dec"
  | "hex-enc" | "hex-dec"
  | "hex-space-enc" | "hex-space-dec"
  | "unicode-enc" | "unicode-dec"
  | "js-unicode-enc" | "js-unicode-dec"
  | "codepoint-enc" | "codepoint-dec"
  | "utf8-bytes-enc" | "utf8-bytes-dec"
  | "binary-enc" | "binary-dec"
  | "octal-enc" | "octal-dec"
  | "b32-enc" | "b32-dec"
  | "b58-enc" | "b58-dec"
  | "b85-enc" | "b85-dec"
  | "morse-enc" | "morse-dec"
  | "rot13"
  | "caesar"
  | "reverse"
  | "lower" | "upper"

interface FormatOption { id: EncodeMode; label: string; desc?: string }

const encodeOptions: FormatOption[] = [
  { id: "b64-enc", label: "Base64", desc: "Standard Base64 encoding" },
  { id: "b64url-enc", label: "Base64URL", desc: "URL-safe Base64" },
  { id: "b32-enc", label: "Base32", desc: "RFC 4648 Base32" },
  { id: "b58-enc", label: "Base58", desc: "Bitcoin-style Base58" },
  { id: "b85-enc", label: "Base85", desc: "Adobe Ascii85" },
  { id: "url-enc", label: "URL", desc: "Percent-encoding for URLs" },
  { id: "url-double-enc", label: "Double URL", desc: "Double percent-encoding" },
  { id: "html-enc", label: "HTML Named", desc: "HTML named entities" },
  { id: "html-hex-enc", label: "HTML Hex", desc: "HTML hex entities &#xHH;" },
  { id: "html-dec-enc", label: "HTML Decimal", desc: "HTML decimal entities &#DDD;" },
  { id: "hex-enc", label: "Hex", desc: "Hex without spaces" },
  { id: "hex-space-enc", label: "Hex (spaces)", desc: "Hex with spaces" },
  { id: "unicode-enc", label: "Unicode \\u", desc: "Unicode escape sequences" },
  { id: "codepoint-enc", label: "Code Point", desc: "Unicode code points U+HHHH" },
  { id: "utf8-bytes-enc", label: "UTF-8 Bytes", desc: "UTF-8 byte sequences" },
  { id: "js-unicode-enc", label: "JS \\x", desc: "JS hex escapes" },
  { id: "binary-enc", label: "Binary", desc: "8-bit binary" },
  { id: "octal-enc", label: "Octal", desc: "Octal escapes" },
  { id: "morse-enc", label: "Morse", desc: "International Morse code" },
  { id: "rot13", label: "ROT13", desc: "Caesar shift 13" },
  { id: "caesar", label: "Caesar", desc: "Caesar cipher (selectable shift)" },
  { id: "reverse", label: "Reverse", desc: "Reverse string" },
  { id: "lower", label: "Lowercase", desc: "All lowercase" },
  { id: "upper", label: "Uppercase", desc: "All uppercase" },
]

const decodeOptions: FormatOption[] = [
  { id: "b64-dec", label: "Base64", desc: "Standard Base64 decoding" },
  { id: "b64url-dec", label: "Base64URL", desc: "URL-safe Base64" },
  { id: "b32-dec", label: "Base32", desc: "RFC 4648 Base32" },
  { id: "b58-dec", label: "Base58", desc: "Bitcoin-style Base58" },
  { id: "b85-dec", label: "Base85", desc: "Adobe Ascii85" },
  { id: "url-dec", label: "URL", desc: "Percent-encoding" },
  { id: "url-double-dec", label: "Double URL", desc: "Double percent-decoding" },
  { id: "html-dec", label: "HTML Named", desc: "HTML named entities" },
  { id: "html-hex-dec", label: "HTML Hex", desc: "HTML hex entities &#xHH;" },
  { id: "html-dec-dec", label: "HTML Decimal", desc: "HTML decimal entities &#DDD;" },
  { id: "hex-dec", label: "Hex", desc: "Hex (with or without spaces)" },
  { id: "unicode-dec", label: "Unicode \\u", desc: "Unicode escapes" },
  { id: "codepoint-dec", label: "Code Point", desc: "Unicode code points U+HHHH" },
  { id: "utf8-bytes-dec", label: "UTF-8 Bytes", desc: "UTF-8 byte sequences" },
  { id: "js-unicode-dec", label: "JS \\x", desc: "JS hex escapes" },
  { id: "binary-dec", label: "Binary", desc: "8-bit binary" },
  { id: "octal-dec", label: "Octal", desc: "Octal escapes" },
  { id: "morse-dec", label: "Morse", desc: "International Morse code" },
  { id: "rot13", label: "ROT13", desc: "Caesar shift 13" },
  { id: "caesar", label: "Caesar", desc: "Caesar cipher (selectable shift)" },
  { id: "reverse", label: "Reverse", desc: "Reverse string" },
]

const B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
const B58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

const MORSE_MAP: Record<string, string> = {
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....",
  "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.",
  "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
  "Y": "-.--", "Z": "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", ".": ".-.-.-", ",": "--..--",
  "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-",
  "_": "..--.-", '"': ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/",
}

const REV_MORSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]))

function tryDecodeHex(s: string): string {
  const clean = s.replace(/\s+/g, "")
  if (!/^[a-fA-F0-9]+$/.test(clean)) return ""
  const bytes = clean.match(/.{1,2}/g)
  if (!bytes) return ""
  return bytes.map(b => String.fromCharCode(parseInt(b, 16))).join("")
}

function base32Encode(s: string): string {
  let bits = ""
  for (let i = 0; i < s.length; i++) bits += s.charCodeAt(i).toString(2).padStart(8, "0")
  const pad = (5 - (bits.length % 5)) % 5
  bits += "0".repeat(pad)
  let r = ""
  for (let i = 0; i < bits.length; i += 5) r += B32_ALPHABET[parseInt(bits.slice(i, i + 5), 2)]
  return r + "=".repeat((8 - (r.length % 8)) % 8)
}

function base32Decode(s: string): string {
  s = s.replace(/=+$/, "").toUpperCase()
  let bits = ""
  for (const c of s) { const idx = B32_ALPHABET.indexOf(c); if (idx >= 0) bits += idx.toString(2).padStart(5, "0") }
  let r = ""
  for (let i = 0; i + 8 <= bits.length; i += 8) r += String.fromCharCode(parseInt(bits.slice(i, i + 8), 2))
  return r
}

function base58Encode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let num = 0n; for (const b of bytes) num = (num << 8n) + BigInt(b)
  if (num === 0n) return "1"
  let r = ""
  while (num > 0n) { r = B58_ALPHABET[Number(num % 58n)] + r; num /= 58n }
  for (const b of bytes) { if (b === 0) r = "1" + r; else break }
  return r
}

function base58Decode(s: string): string {
  let num = 0n; for (const c of s) { const idx = B58_ALPHABET.indexOf(c); if (idx >= 0) num = num * 58n + BigInt(idx) }
  let r = ""
  while (num > 0n) { r = String.fromCharCode(Number(num & 0xFFn)) + r; num >>= 8n }
  return r
}

function ascii85Encode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let r = "<~"
  for (let i = 0; i < bytes.length; i += 4) {
    const chunk = bytes.slice(i, i + 4); const pad = 4 - chunk.length
    while (chunk.length < 4) chunk.push(0)
    const val = ((chunk[0] << 24) | (chunk[1] << 16) | (chunk[2] << 8) | chunk[3]) >>> 0
    if (val === 0) { r += "z"; continue }
    let block = ""; let v = val
    for (let j = 0; j < 5; j++) { block = String.fromCharCode((v % 85) + 33) + block; v = Math.floor(v / 85) }
    r += pad > 0 ? block.slice(0, 5 - pad) : block
  }
  return r + "~>"
}

function ascii85Decode(s: string): string {
  s = s.replace(/<~|~>/g, "").replace(/\s+/g, "")
  let r = ""; let i = 0
  while (i < s.length) {
    if (s[i] === "z") { r += "\0\0\0\0"; i++; continue }
    const chunk = s.slice(i, i + 5); const pad = 5 - chunk.length
    let val = 0; for (const c of chunk) val = val * 85 + (c.charCodeAt(0) - 33)
    for (let j = 0; j < 4 - pad; j++) r += String.fromCharCode((val >> (24 - j * 8)) & 0xFF)
    i += chunk.length
  }
  return r
}

function apply(text: string, mode: EncodeMode, caesarShift: number): string {
  if (!text) return ""
  try {
    switch (mode) {
      case "b64-enc": return btoa(text)
      case "b64-dec": try { return atob(text) } catch { return "(invalid base64)" }
      case "b64url-enc": return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
      case "b64url-dec": try { return atob(text.replace(/-/g, "+").replace(/_/g, "/").padEnd(text.length + (4 - (text.length % 4)) % 4, "=")) } catch { return "(invalid base64url)" }
      case "url-enc": return encodeURIComponent(text)
      case "url-dec": try { return decodeURIComponent(text.replace(/\+/g, " ")) } catch { return "(invalid url encoding)" }
      case "url-double-enc": return encodeURIComponent(encodeURIComponent(text))
      case "url-double-dec": try { return decodeURIComponent(decodeURIComponent(text.replace(/\+/g, " "))) } catch { return "(invalid double url)" }
      case "html-enc": return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
      case "html-dec": return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9A-Fa-f]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "html-hex-enc": return text.split("").map(c => "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";").join("")
      case "html-hex-dec": return text.replace(/&#x([0-9A-Fa-f]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "html-dec-enc": return text.split("").map(c => "&#" + c.charCodeAt(0) + ";").join("")
      case "html-dec-dec": return text.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
      case "hex-enc": return text.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("")
      case "hex-dec": const hd = tryDecodeHex(text); return hd || "(invalid hex)"
      case "hex-space-enc": return text.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")
      case "hex-space-dec": const hsd = tryDecodeHex(text); return hsd || "(invalid hex)"
      case "unicode-enc": return text.split("").map(c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).join("")
      case "unicode-dec": return text.replace(/\\u([a-fA-F0-9]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "js-unicode-enc": return text.split("").map(c => "\\x" + c.charCodeAt(0).toString(16).padStart(2, "0")).join("")
      case "js-unicode-dec": return text.replace(/\\x([a-fA-F0-9]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "codepoint-enc": return text.split("").map(c => "U+" + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")).join(" ")
      case "codepoint-dec": return text.replace(/U\+([0-9A-Fa-f]+)/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "utf8-bytes-enc": { const enc = new TextEncoder(); return Array.from(enc.encode(text)).map(b => "\\x" + b.toString(16).padStart(2, "0")).join(" ") }
      case "utf8-bytes-dec": { const m = text.match(/\\x([0-9A-Fa-f]{2})/g); if (!m) return "(invalid utf-8 bytes)"; return new TextDecoder().decode(new Uint8Array(m.map(b => parseInt(b.slice(2), 16)))) }
      case "binary-enc": return text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
      case "binary-dec": try { return text.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("") } catch { return "(invalid binary)" }
      case "octal-enc": return text.split("").map(c => "\\" + c.charCodeAt(0).toString(8).padStart(3, "0")).join("")
      case "octal-dec": return text.replace(/\\(\d{3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)))
      case "b32-enc": return base32Encode(text)
      case "b32-dec": return base32Decode(text)
      case "b58-enc": return base58Encode(text)
      case "b58-dec": return base58Decode(text)
      case "b85-enc": return ascii85Encode(text)
      case "b85-dec": return ascii85Decode(text)
      case "morse-enc": return text.toUpperCase().split("").map(c => MORSE_MAP[c] || c).join(" ")
      case "morse-dec": return text.split(" ").map(s => REV_MORSE[s] || s).join("")
      case "rot13": return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c <= "Z" ? (c <= "M" ? 13 : -13) : (c <= "m" ? 13 : -13))))
      case "caesar": return text.replace(/[a-zA-Z]/g, c => { const base = c <= "Z" ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - base + caesarShift) % 26 + base) })
      case "reverse": return text.split("").reverse().join("")
      case "lower": return text.toLowerCase()
      case "upper": return text.toUpperCase()
    }
  } catch { return "" }
}

function autoDetectMode(input: string): { mode: EncodeMode; label: string } | null {
  if (!input) return null
  try { const d = atob(input); if (d.length > 3 && /^[\x20-\x7E\n\r]+$/.test(d)) return { mode: "b64-dec", label: "Base64" } } catch {}
  if (/%[0-9A-Fa-f]{2}/.test(input)) { try { const d = decodeURIComponent(input.replace(/\+/g, " ")); if (d !== input) return { mode: "url-dec", label: "URL Decode" } } catch {} }
  const hexClean = input.replace(/\s+/g, "")
  if (/^[a-fA-F0-9]+$/.test(hexClean) && hexClean.length % 2 === 0 && hexClean.length > 4) { const d = tryDecodeHex(input); if (d.length > 2 && /^[\x20-\x7E]+$/.test(d)) return { mode: "hex-dec", label: "Hex" } }
  if (/\\u[0-9A-Fa-f]{4}/.test(input)) return { mode: "unicode-dec", label: "Unicode \\u" }
  if (/&[a-z]+;/.test(input)) return { mode: "html-dec", label: "HTML" }
  if (/^[01\s]+$/.test(input) && input.replace(/\s+/g, "").length % 8 === 0) return { mode: "binary-dec", label: "Binary" }
  if (/\\x[0-9A-Fa-f]{2}/.test(input)) return { mode: "js-unicode-dec", label: "JS \\x" }
  if (/^<~/.test(input)) return { mode: "b85-dec", label: "Base85" }
  if (/^[A-Z2-7]+=*$/.test(input.replace(/\s/g, "")) && input.replace(/\s/g, "").length >= 8) return { mode: "b32-dec", label: "Base32" }
  if (/^[\.\- \/]+$/.test(input.trim())) return { mode: "morse-dec", label: "Morse" }
  return null
}

interface CharInfo { char: string; decimal: number; hex: string; unicode: string; binary: string; html: string; url: string }

function getCharInfo(text: string): CharInfo {
  const c = text[0] || ""; const cp = c.charCodeAt(0)
  return {
    char: c, decimal: cp, hex: "0x" + cp.toString(16).toUpperCase().padStart(2, "0"),
    unicode: "U+" + cp.toString(16).toUpperCase().padStart(4, "0"), binary: cp.toString(2).padStart(8, "0"),
    html: cp > 127 ? `&#${cp};` : c.replace(/&/, "&amp;").replace(/</, "&lt;").replace(/>/, "&gt;").replace(/"/, "&quot;"),
    url: encodeURIComponent(c),
  }
}

export default function EncoderPage() {
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("decode")
  const [input, setInput] = useState("")
  const [encodeFormat, setEncodeFormat] = useState<EncodeMode>("b64-enc")
  const [decodeFormat, setDecodeFormat] = useState<EncodeMode>("b64-dec")
  const [caesarShift, setCaesarShift] = useState(1)
  const [copied, setCopied] = useState(false)
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [sharedCopied, setSharedCopied] = useState(false)

  const currentFormat = activeTab === "encode" ? encodeFormat : decodeFormat
  const currentOptions = activeTab === "encode" ? encodeOptions : decodeOptions

  const output = useMemo(() => apply(input, currentFormat, caesarShift), [input, currentFormat, caesarShift])

  const detected = useMemo(() => {
    if (activeTab !== "decode") return null
    return autoDetectMode(input)
  }, [input, activeTab])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const i = params.get("input")
    if (i) setInput(decodeURIComponent(i))
  }, [])

  const chars: CharInfo[] = useMemo(() => {
    if (!selection || selection.start === selection.end || !inputRef.current) return []
    const text = input.substring(selection.start, selection.end)
    return text.split("").map(c => getCharInfo(c))
  }, [selection, input])

  const applyDetected = () => {
    if (detected) setDecodeFormat(detected.mode)
  }

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(null), 2000)
  }, [output])

  const shareUrl = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}?input=${encodeURIComponent(input)}`
    await navigator.clipboard.writeText(url)
    setSharedCopied(true)
    setTimeout(() => setSharedCopied(false), 2000)
  }, [input])

  const swapTab = () => {
    setActiveTab(prev => prev === "encode" ? "decode" : "encode")
    if (output && !output.startsWith("(")) setInput(output)
  }

  const isCaesar = currentFormat === "caesar"

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Universal Encoder — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">Universal Encoder</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-teal-400 shadow-md">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Universal Encoder</h1>
                <p className="text-xs text-muted-foreground">Base64 • Base32 • URL • HTML • Hex • Morse • Caesar • more</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-5 space-y-4">
          {/* Tab bar */}
          <div className="flex gap-2">
            <button onClick={() => setActiveTab("encode")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === "encode"
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10"
                  : "border-border/50 bg-card text-muted-foreground hover:border-cyan-500/30 hover:text-cyan-400"
              }`}
            >
              <Lock className="h-4 w-4" /> تشفير <span className="text-xs font-normal opacity-60 hidden sm:inline">Encode</span>
            </button>
            <button onClick={() => setActiveTab("decode")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === "decode"
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10"
                  : "border-border/50 bg-card text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400"
              }`}
            >
              <Unlock className="h-4 w-4" /> فك تشفير <span className="text-xs font-normal opacity-60 hidden sm:inline">Decode</span>
            </button>
          </div>

          {/* Main grid */}
          <div className="grid gap-4 lg:grid-cols-5">
            {/* LEFT: Input / Output */}
            <div className="lg:col-span-3 space-y-3">
              {/* Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {activeTab === "encode" ? "Plain Text" : "Encoded Text"}
                  </label>
                  <span className="text-[11px] text-muted-foreground">{input.length} chars</span>
                </div>
                <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onSelect={() => { const t = inputRef.current; if (t) setSelection({ start: t.selectionStart, end: t.selectionEnd }) }}
                  placeholder={activeTab === "encode" ? "Type your text here to encode..." : "Paste encoded text here to decode..."}
                  rows={6} className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 transition-colors resize-y"
                />
              </div>

              {/* Swap direction button */}
              <button onClick={swapTab} disabled={!output || output.startsWith("(")}
                className="mx-auto flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-1.5 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-30 transition-colors"
              >
                <ArrowDown className="h-3 w-3" />
                {activeTab === "encode" ? "Switch to Decode" : "Switch to Encode"}
                <ArrowUp className="h-3 w-3" />
              </button>

              {/* Output */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {activeTab === "encode" ? "Encoded Output" : "Decoded Output"}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">{output.length} chars</span>
                    <button onClick={copyOutput}
                      className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <textarea value={output} readOnly rows={5}
                  className={`w-full rounded-xl border p-4 font-mono text-sm resize-y ${
                    activeTab === "encode"
                      ? "border-cyan-500/20 bg-card text-foreground"
                      : "border-emerald-500/20 bg-card text-foreground"
                  }`}
                />
              </div>

              {/* Actions bar */}
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={shareUrl} title="Copy shareable link" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground transition-colors">
                  {sharedCopied ? <Check className="h-4 w-4 text-primary" /> : <Share className="h-4 w-4" />}
                </button>
                <button onClick={() => { setInput(""); setSelection(null) }} className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Trash className="h-3.5 w-3.5" /> Clear
                </button>
              </div>

              {/* Character Inspector */}
              {chars.length > 0 && (
                <div className="rounded-xl border border-border/50 bg-card p-3 animate-fade-up">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Char Inspector ({chars.length} chars)</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead><tr className="border-b border-border/40 text-muted-foreground">
                        <th className="px-2 py-1 text-left">Char</th><th className="px-2 py-1 text-left">Dec</th><th className="px-2 py-1 text-left">Hex</th>
                        <th className="px-2 py-1 text-left">Unicode</th><th className="px-2 py-1 text-left">Binary</th><th className="px-2 py-1 text-left">HTML</th><th className="px-2 py-1 text-left">URL</th>
                      </tr></thead>
                      <tbody>
                        {chars.map((c, i) => (
                          <tr key={i} className="border-b border-border/10 font-mono text-foreground">
                            <td className="px-2 py-1 text-base">{c.char === " " ? <span className="text-muted-foreground">·</span> : c.char}</td>
                            <td className="px-2 py-1">{c.decimal}</td>
                            <td className="px-2 py-1 text-primary">{c.hex}</td>
                            <td className="px-2 py-1">{c.unicode}</td>
                            <td className="px-2 py-1 text-[10px]">{c.binary}</td>
                            <td className="px-2 py-1 text-[10px]">{c.html}</td>
                            <td className="px-2 py-1 break-all max-w-[100px] text-[10px]">{c.url}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Format options */}
            <div className="lg:col-span-2 space-y-3">
              <div className={`rounded-xl border p-4 ${
                activeTab === "encode" ? "border-cyan-500/20 bg-card" : "border-emerald-500/20 bg-card"
              }`}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {activeTab === "encode" ? "Encoding Formats" : "Decoding Formats"}
                </h3>

                {/* Auto-detect banner (decode only) */}
                {activeTab === "decode" && detected && (
                  <div className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 mb-3">
                    <Wand2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    <p className="flex-1 text-xs text-cyan-300">
                      Detected: <span className="font-semibold">{detected.label}</span>
                    </p>
                    <button onClick={applyDetected} className="rounded bg-cyan-500/20 px-2 py-1 text-[10px] font-medium text-cyan-300 hover:bg-cyan-500/30 transition-colors">Apply</button>
                  </div>
                )}

                <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                  {currentOptions.map(opt => (
                    <button key={opt.id} onClick={() => {
                      if (activeTab === "encode") setEncodeFormat(opt.id); else setDecodeFormat(opt.id)
                    }}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all ${
                        currentFormat === opt.id
                          ? activeTab === "encode"
                            ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-sm"
                            : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-sm"
                          : "border-border/50 bg-muted/20 text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        currentFormat === opt.id
                          ? activeTab === "encode" ? "border-cyan-500 bg-cyan-500/20" : "border-emerald-500 bg-emerald-500/20"
                          : "border-border"
                      }`}>
                        {currentFormat === opt.id && <div className={`h-2.5 w-2.5 rounded-full ${activeTab === "encode" ? "bg-cyan-400" : "bg-emerald-400"}`} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-medium leading-tight">{opt.label}</span>
                        {opt.desc && <span className="block text-[10px] text-muted-foreground mt-0.5">{opt.desc}</span>}
                      </div>
                      {currentFormat === opt.id && (
                        <Check className={`h-4 w-4 shrink-0 ${activeTab === "encode" ? "text-cyan-400" : "text-emerald-400"}`} />
                      )}
                    </button>
                  ))}
                </div>

                {/* Caesar shift selector */}
                {isCaesar && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2 animate-fade-up">
                    <span className="text-[11px] font-medium text-muted-foreground">Shift:</span>
                    <button onClick={() => setCaesarShift(s => Math.max(1, s - 1))}
                      className="rounded border border-border/50 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-mono font-bold text-foreground">{caesarShift}</span>
                    <button onClick={() => setCaesarShift(s => Math.min(25, s + 1))}
                      className="rounded border border-border/50 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="text-[10px] text-muted-foreground ml-auto">Encode: +{caesarShift} / Decode: -{caesarShift}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
