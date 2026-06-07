import { CheckCircle } from "lucide-react"
import { preventionItems } from "./data"

export function PreventionSection() {
  return (
    <section id="prevention" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Phase 8</span>
          <h2 className="text-2xl font-bold text-foreground">Prevention and Mitigation</h2>
        </div>
      </div>

      <div className="space-y-4">
        {preventionItems.map((item) => (
          <div key={item.title} className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
