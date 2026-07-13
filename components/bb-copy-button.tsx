"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function BBCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200"
      style={{ background: "oklch(0.55 0.22 25 / 0.12)", color: "var(--bb-primary)" }}
      onMouseEnter={(e) => {
        if (!window.matchMedia("(hover: hover)").matches) return
        e.currentTarget.style.background = "oklch(0.55 0.22 25 / 0.22)"
      }}
      onMouseLeave={(e) => {
        if (!window.matchMedia("(hover: hover)").matches) return
        e.currentTarget.style.background = "oklch(0.55 0.22 25 / 0.12)"
      }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
