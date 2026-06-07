import { BookOpen, ChevronRight } from "lucide-react"
import { cacheTypes, cacheControlHeaders } from "./data"

export function CacheFundamentalsSection() {
  return (
    <section id="cache-fundamentals" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Phase 1</span>
          <h2 className="text-2xl font-bold text-foreground">Cache Fundamentals</h2>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Types of Caches</h3>
      <div className="mb-6 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 font-semibold text-foreground">Type</th>
              <th className="px-4 py-3 font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cacheTypes.map((c) => (
              <tr key={c.type}>
                <td className="px-4 py-3 font-medium text-foreground">{c.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Cache Control Headers</h3>
      <div className="mb-6 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 font-semibold text-foreground">Header</th>
              <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cacheControlHeaders.map((h) => (
              <tr key={h.header}>
                <td className="px-4 py-3 font-medium text-foreground">{h.header}</td>
                <td className="px-4 py-3 text-muted-foreground">{h.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Cache Keys</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Caches use keys to identify and store resources. These keys are typically based on:
      </p>
      <ul className="space-y-2 text-muted-foreground">
        <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span>The full URL (including query parameters)</span></li>
        <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span>Selected headers (Host, User-Agent, Accept-Encoding etc.)</span></li>
        <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span>Cookies (in some configurations)</span></li>
      </ul>
    </section>
  )
}
