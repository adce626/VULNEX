import { Bug, BookOpen, Search, Video, ExternalLink } from "lucide-react"
import { toolLinks } from "./data"

const toolIcons = [Bug, BookOpen, Search, Video]

export function ToolsSection() {
  return (
    <section className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <ExternalLink className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Tools</span>
          <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {toolLinks.map((link, i) => {
          const Icon = toolIcons[i] || ExternalLink
          return (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-foreground group-hover:text-amber-500">{link.label}</div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{link.desc}</p>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
