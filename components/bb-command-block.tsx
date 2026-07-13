"use client"

import { BBCopyButton } from "./bb-copy-button"

export function BBCommandBlock({ cmd, desc }: { cmd: string; desc: string }) {
  return (
    <div
      className="group rounded-lg border transition-all duration-200"
      style={{ background: "oklch(0.07 0.015 30 / 0.6)", borderColor: "var(--bb-border)" }}
      onMouseEnter={(e) => {
        if (!window.matchMedia("(hover: hover)").matches) return
        e.currentTarget.style.borderColor = "var(--bb-primary)"
      }}
      onMouseLeave={(e) => {
        if (!window.matchMedia("(hover: hover)").matches) return
        e.currentTarget.style.borderColor = "var(--bb-border)"
      }}
    >
      <div className="flex items-start gap-3 p-3">
        <span className="mt-0.5 shrink-0 font-mono text-xs" style={{ color: "oklch(0.45 0.15 25)" }}>$</span>
        <div className="min-w-0 flex-1">
          <code className="block overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm leading-relaxed" style={{ color: "var(--bb-text)" }}>
            {cmd}
          </code>
          <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>{desc}</p>
        </div>
        <BBCopyButton text={cmd} />
      </div>
    </div>
  )
}
