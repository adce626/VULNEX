"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandCardProps {
  command: string
  description?: string
  index: number
}

export function CommandCard({ command, description, index }: CommandCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
            {index}
          </span>
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md transition-all",
            copied
              ? "bg-primary/20 text-primary"
              : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
          )}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex items-start gap-2 rounded-md bg-background p-3">
        <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <code className="text-sm text-foreground break-all font-mono">
          {command}
        </code>
      </div>
    </div>
  )
}
