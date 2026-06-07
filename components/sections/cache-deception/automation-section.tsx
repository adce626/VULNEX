import Image from "next/image"
import { FileText } from "lucide-react"
import { automationCommands, toolLinks } from "./data"

interface AutomationSectionProps {
  setExpandedImg: (src: string | null) => void
}

export function AutomationSection({ setExpandedImg }: AutomationSectionProps) {
  return (
    <section id="automation" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Phase 7</span>
          <h2 className="text-2xl font-bold text-foreground">Mass Hunting & Automation</h2>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Simple Exploitation Checklist</h3>
      <ol className="mb-6 space-y-3 text-muted-foreground list-decimal list-inside">
        <li>Identify private endpoint</li>
        <li>Append static-like extension</li>
        <li>Test caching: <code className="rounded bg-muted px-1.5 py-0.5 text-sm">curl -I https://target.com/account.css</code></li>
        <li>Look for cache hit headers</li>
        <li>Verify sensitive content exposure</li>
        <li>Try multiple variations for bypass</li>
      </ol>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Automation Commands</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Use these one-liner automations to hunt Web Cache Deception vulnerabilities at scale:
      </p>

      <div className="rounded-lg border border-border bg-card">
        <div className="flex flex-col p-4 font-mono text-sm text-foreground">
          {automationCommands.map((cmd) => (
            <span key={cmd} className="py-0.5 break-all text-xs">{cmd}</span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        This pipeline does the following: Gets all URLs for the target domain using gau. Filters URLs to only keep those with sensitive paths like /account, /profile, /admin, etc. Saves the filtered URLs to a file. Appends /style.css to each URL to mimic a static file (a common cache deception trick). Uses httpx-toolkit to check which URLs respond with HTTP 200, showing live pages that might be cached improperly.
      </p>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Recommended Tools</h3>

      <div className="rounded-lg border border-border bg-card">
        <div className="flex flex-col p-4 font-mono text-sm text-foreground">
          <span className="py-0.5 break-all">https://github.com/PortSwigger/web-cache-deception-scanner</span>
          <span className="py-0.5 break-all">https://portswigger.net/web-security/web-cache-deception</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/cache-deception/1_iH7QDDM-x5P9gPAn-GtNVQ.webp")}>
          <Image src="/images/vulnerabilities/cache-deception/1_iH7QDDM-x5P9gPAn-GtNVQ.webp" alt="Web Cache Deception Scanner tool" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
        </div>
        <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/cache-deception/1_EA9YF1swfX_hVWkphY9LvA.webp")}>
          <Image src="/images/vulnerabilities/cache-deception/1_EA9YF1swfX_hVWkphY9LvA.webp" alt="PortSwigger WCD practice lab" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
        </div>
      </div>
    </section>
  )
}
