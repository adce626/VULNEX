"use client"

import { useState, useMemo } from "react"
import { CommandCard } from "@/components/command-card"
import { Copy, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CommandItem {
  command: string
  description: string
}

interface CommandListProps {
  commands: CommandItem[]
  startIndex?: number
  pageSize?: number
  pageTitle?: string
  domain?: string
}

export function CommandList({ commands, startIndex = 0, pageSize = 20, pageTitle, domain }: CommandListProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(commands.length / pageSize)

  const paginatedCommands = useMemo(() => {
    const start = (page - 1) * pageSize
    return commands.slice(start, start + pageSize)
  }, [commands, page, pageSize])

  const copyAll = async () => {
    const text = commands.map((c) => domain ? c.command.replace(/example\.com/g, domain) : c.command).join("\n")
    await navigator.clipboard.writeText(text)
    toast.success(`Copied ${commands.length} commands!`, {
      duration: 2000,
      style: { background: 'oklch(0.72 0.19 165 / 0.15)', border: '1px solid oklch(0.72 0.19 165 / 0.3)' },
    })
  }

  const needsPagination = commands.length > pageSize

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={copyAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <Copy className="h-3.5 w-3.5" />
          Copy All ({commands.length})
        </button>
      </div>
      <div className="space-y-3">
        {paginatedCommands.map((cmd, i) => (
          <CommandCard
            key={startIndex + (page - 1) * pageSize + i}
            command={cmd.command}
            description={cmd.description}
            index={startIndex + (page - 1) * pageSize + i + 1}
            pageTitle={pageTitle}
            domain={domain}
          />
        ))}
      </div>
      {needsPagination && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              "flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm transition-colors",
              page === 1
                ? "opacity-30 cursor-not-allowed text-muted-foreground"
                : "text-muted-foreground hover:border-primary/30 hover:text-primary"
            )}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={cn(
              "flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm transition-colors",
              page === totalPages
                ? "opacity-30 cursor-not-allowed text-muted-foreground"
                : "text-muted-foreground hover:border-primary/30 hover:text-primary"
            )}
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
