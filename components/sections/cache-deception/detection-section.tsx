import { Search, ChevronRight } from "lucide-react"
import Image from "next/image"
import { CommandCard } from "@/components/command-card"
import { analysisHeaders, detectionCommands } from "./data"

interface DetectionSectionProps {
  setExpandedImg: (src: string | null) => void
}

export function DetectionSection({ setExpandedImg }: DetectionSectionProps) {
  return (
    <section id="detection" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Phase 2</span>
          <h2 className="text-2xl font-bold text-foreground">Cache Detection & Analysis</h2>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Using Cache Checker Tools</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Online tools like giftofspeed.com can help determine if a resource is being cached. These tools analyze HTTP responses and provide insights into caching behavior. You can enter the full URL with your cache key to test it or use the base domain to discover which resources are currently cached.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/cache-deception/1_vcvZczhAwedktCn10SoTzw.webp")}>
          <Image src="/images/vulnerabilities/cache-deception/1_vcvZczhAwedktCn10SoTzw.webp" alt="Cache detection with GiftOfSpeed" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
        </div>
        <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/cache-deception/1__5CU9iT97AyPga8p_LFSSQ.webp")}>
          <Image src="/images/vulnerabilities/cache-deception/1__5CU9iT97AyPga8p_LFSSQ.webp" alt="Cache analysis results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
        </div>
      </div>

      <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground">Key Headers to Analyze</h3>
      <div className="mb-6 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 font-semibold text-foreground">Header</th>
              <th className="px-4 py-3 font-semibold text-foreground">What to Look For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {analysisHeaders.map((h) => (
              <tr key={h.header}>
                <td className="px-4 py-3 font-medium text-foreground">{h.header}</td>
                <td className="px-4 py-3 text-muted-foreground">{h.lookFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        <strong>HIT</strong> means the content was served from the cache.<br />
        <strong>MISS</strong> means the content was fetched from the origin server.<br />
        <strong>X-Cache: dynamic</strong> indicates the response was generated dynamically.<br />
        <strong>X-Cache: refresh</strong> shows that the cached content was outdated and refreshed.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Manual Verification Techniques</h3>
      <ul className="space-y-2 text-muted-foreground">
        <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span><strong>Request-Response Analysis:</strong> Make multiple identical requests and compare responses</span></li>
        <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span><strong>Cache Busting:</strong> Add unique parameters ?v=123 to URLs and observe if responses change</span></li>
        <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span><strong>Timing Analysis:</strong> Cached responses typically have faster response times</span></li>
      </ul>

      <div className="mt-4 space-y-2">
        {detectionCommands.map((c) => (
          <CommandCard key={c.idx} command={c.cmd} description={c.desc} index={c.idx} />
        ))}
      </div>
    </section>
  )
}
