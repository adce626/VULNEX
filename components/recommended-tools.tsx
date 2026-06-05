"use client"

import React from "react"
import Link from "next/link"
import { getToolById, type ToolGuide } from "@/lib/tools-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { iconMap } from "@/lib/icon-map"
import {
  BookOpen,
  ChevronRight,
} from "lucide-react"

const categoryColors: Record<string, string> = {
  "Recon & OSINT": "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  "Web Vulnerabilities": "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
  "Methods": "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  "Cloud & Assets": "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  "Advanced Topics": "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
}

interface RecommendedToolsProps {
  toolIds: string[]
  title?: string
}

export function RecommendedTools({ toolIds, title = "Recommended Tools" }: RecommendedToolsProps) {
  const tools = toolIds
    .map((id) => getToolById(id))
    .filter((tool): tool is ToolGuide => !!tool)

  if (tools.length === 0) return null

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName]
    return Icon ? <Icon className="size-4" /> : null
  }

  return (
    <section className="scroll-mt-20">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Essential tools with top commands for this section</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const colorClass = categoryColors[tool.category] || "from-primary/20 to-primary/5 border-primary/30 text-primary"
          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                        {getIcon(tool.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                          {tool.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground">{tool.category}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {tool.commands.length} commands
                    </Badge>
                  </div>

<p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                     {tool.description}
                   </p>

                   <div className="space-y-1.5 mb-3">
                     {tool.commands.slice(0, 3).map((cmd, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-[11px] text-muted-foreground/80">
                         <div className="size-4 rounded-sm bg-primary/10 flex items-center justify-center">
                           <span className="text-[9px] font-bold text-primary">{idx + 1}</span>
                         </div>
                         <code className="font-mono text-[11px]">{cmd.command.split(' ')[0]}</code>
                         <span className="truncate">{cmd.description}</span>
                       </div>
                     ))}
                   </div>

                   <div className="flex flex-wrap gap-1">
                     {tool.tags.slice(0, 3).map((tag) => (
                       <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0 bg-background/50">
                         {tag}
                       </Badge>
                     ))}
                   </div>

                   <div className="flex items-center justify-end mt-3 pt-2 border-t border-border/50">
                     <span className="text-[11px] text-muted-foreground group-hover:text-primary transition-colors">
                       Full guide <ChevronRight className="size-3 inline align-middle" />
                     </span>
                   </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}