"use client"

import { useState, useEffect, memo } from "react"
import { toast } from "sonner"
import { Check, Copy, Terminal, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { addBookmark, removeBookmark, isBookmarked } from "@/lib/bookmarks"
import { usePathname } from "next/navigation"

interface CommandCardProps {
  command: string
  description?: string
  index: number
  pageTitle?: string
  domain?: string
}

export const CommandCard = memo(function CommandCard({ command, description, index, pageTitle, domain }: CommandCardProps) {
  const displayCommand = domain ? command.replace(/example\.com/g, domain) : command
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setBookmarked(isBookmarked(command))
  }, [command])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(displayCommand)
    setCopied(true)
    toast.success('Copied!', {
      duration: 1500,
      style: { background: 'oklch(0.72 0.19 165 / 0.15)', border: '1px solid oklch(0.72 0.19 165 / 0.3)' },
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (bookmarked) {
      removeBookmark(command)
      setBookmarked(false)
      toast('Removed from bookmarks', {
        duration: 1500,
        style: { background: 'oklch(0.6 0.2 25 / 0.15)', border: '1px solid oklch(0.6 0.2 25 / 0.3)' },
      })
    } else {
      addBookmark({
        command,
        description: description || '',
        pageTitle: pageTitle || document.title.replace(' | VULNEX', ''),
        pageUrl: pathname,
      })
      setBookmarked(true)
      toast.success('Bookmarked!', {
        duration: 1500,
        style: { background: 'oklch(0.72 0.19 165 / 0.15)', border: '1px solid oklch(0.72 0.19 165 / 0.3)' },
      })
    }
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
        <div className="flex items-center gap-1">
          <button
            onClick={toggleBookmark}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md transition-all",
              bookmarked
                ? "text-amber-400 hover:text-amber-500"
                : "text-muted-foreground/40 hover:text-amber-400 opacity-60 hover:opacity-100"
            )}
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Star className={cn("h-4 w-4", bookmarked && "fill-amber-400")} />
          </button>
          <button
            onClick={copyToClipboard}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md transition-all",
              copied
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
            )}
            aria-label={copied ? "Copied" : "Copy command"}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-start gap-2 rounded-md bg-background p-3">
        <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <code className="text-sm text-foreground break-all font-mono">
          {displayCommand}
        </code>
      </div>
    </div>
  )
})
