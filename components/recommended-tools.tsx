"use client"

import React from "react"
import Link from "next/link"
import { getToolById, type ToolGuide } from "@/lib/tools-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  ChevronRight,
} from "lucide-react"

const categoryColors: Record<string, string> = {
  "Recon & OSINT": "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  "Web Vulnerabilities": "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
  "Tools & Methods": "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  "Cloud & Assets": "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  "Advanced Topics": "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
}

interface RecommendedToolsProps {
  toolIds: string[]
  title?: string
}

export function RecommendedTools({ toolIds, title = "الأدوات المقترحة" }: RecommendedToolsProps) {
  const tools = toolIds
    .map((id) => getToolById(id))
    .filter((tool): tool is ToolGuide => !!tool)

  if (tools.length === 0) return null

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.JSX.Element> = {
      search: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
      globe: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      zap: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
      target: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
      database: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>,
      code: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
      shield: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
      "folder-search": <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 20a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2"/><path d="M14 14a2 2 0 0 0-2-2h4a2 2 0 0 0-.88-.34l-.44-.22h-.06l-.26-.13a2 2 0 0 1-.22-.13L9.4 9.48c-.43-.32-.45-.42-.77-.68"/><path d="M2 7.5V7a2 2 0 0 1 2-2h3.24l1.46-1.46A2 2 0 0 1 10.76 2h5.48a2 2 0 0 1 1.4.59l1.46 1.46A2 2 0 0 1 21 5.24V8"/></svg>,
      network: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M8.5 16.5l4-4"/><rect x="2" y="16" width="6" height="6" rx="1"/><path d="M12 12V8"/><rect x="8.5" y="2" width="6" height="6" rx="1"/><path d="M11.5 8.5l-4-4"/><rect x="16" y="2" width="6" height="6" rx="1"/></svg>,
      cloud: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
      key: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15.5 7.5 7-7m0 0-7-7"/><circle cx="9" cy="18" r="5"/><path d="M15.5 7.5 13 10"/><circle cx="13.5" cy="12.5" r="0.5"/></svg>,
    }
    return icons[iconName] || icons.search
  }

  return (
    <section className="scroll-mt-20">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">أدوات مفيدة لهذا القسم مع أبرز الأوامر</p>
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
                      {tool.commands.length} أوامر
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