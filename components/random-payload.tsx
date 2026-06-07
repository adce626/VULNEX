"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles, RefreshCw } from "lucide-react"

const randomPayloads = [
  { payload: "' OR '1'='1' -- -", label: "SQL Injection" },
  { payload: "http://169.254.169.254/latest/meta-data/", label: "SSRF" },
  { payload: "https://target.com/account.css", label: "Cache Deception" },
  { payload: "/admin", label: "403 Bypass" },
  { payload: "javascript:alert(1)", label: "Open Redirect" },
  { payload: "%0d%0aX-Custom: injected", label: "CRLF Injection" },
  { payload: "'; DROP TABLE users; --", label: "SQL Injection" },
  { payload: "../../etc/passwd", label: "LFI" },
  { payload: "<img src=x onerror=alert(1)>", label: "XSS" },
  { payload: "file:///etc/passwd", label: "SSRF" },
  { payload: "{{7*7}}", label: "SSTI" },
]

export function RandomPayload() {
  const [current, setCurrent] = useState(randomPayloads[0])
  const [flipping, setFlipping] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pickRandom = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setFlipping(true)
    timeoutRef.current = setTimeout(() => {
      let next = current
      while (next.payload === current.payload) {
        next = randomPayloads[Math.floor(Math.random() * randomPayloads.length)]
      }
      setCurrent(next)
      setFlipping(false)
    }, 200)
  }

  useEffect(() => {
    setCurrent(randomPayloads[Math.floor(Math.random() * randomPayloads.length)])
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Random Payload</span>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{current.label}</span>
      </div>
      <code className={`block text-sm font-mono text-foreground bg-muted/50 rounded-lg p-3 break-all transition-opacity ${flipping ? "opacity-0" : "opacity-100"}`}>
        {current.payload}
      </code>
      <button
        onClick={pickRandom}
        className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <RefreshCw className="h-3 w-3" />
        Try your luck
      </button>
    </div>
  )
}
