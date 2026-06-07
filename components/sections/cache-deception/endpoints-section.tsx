import { Globe } from "lucide-react"
import { sensitivePaths, extensions, extensionAppends, fakeDirectories } from "./data"

function VerticalList({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={`flex flex-col ${className || "p-4 text-sm font-mono text-foreground"}`}>
      {items.map((item) => (
        <span key={item} className="py-0.5">{item}</span>
      ))}
    </div>
  )
}

export function EndpointsSection() {
  return (
    <section id="endpoints" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Phase 4</span>
          <h2 className="text-2xl font-bold text-foreground">Endpoints & File Extensions</h2>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Identifying Cacheable Endpoints</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        When looking for web cache deception bugs, some endpoints are more likely to be vulnerable. Start by checking these common sensitive paths first:
      </p>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Sensitive Paths</div>
        <VerticalList items={sensitivePaths} />
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">File Extensions to Test</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        When testing for cache deception, append various file extensions to sensitive endpoints to make them appear as static resources:
      </p>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Extensions</div>
        <VerticalList items={extensions} />
      </div>

      <div className="mt-4 rounded-lg border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Extension Appends</div>
        <VerticalList items={extensionAppends} />
      </div>

      <div className="mt-4 rounded-lg border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Fake Directories</div>
        <VerticalList items={fakeDirectories} />
      </div>
    </section>
  )
}
