"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"

export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string, label = "Copied!") => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      if (textarea.parentNode) document.body.removeChild(textarea)
    }
    setCopied(true)
    toast.success(label, {
      duration: 1500,
      style: { background: 'oklch(0.72 0.19 165 / 0.15)', border: '1px solid oklch(0.72 0.19 165 / 0.3)' },
    })
    setTimeout(() => setCopied(false), timeout)
  }, [timeout])

  return { copied, copy }
}
