import { Terminal } from "lucide-react"
import { pathPoisonUrls, obfuscatedPaths, delimiterUrls, specialHeaders, encodedPaths, cacheKeyPayloads, cacheKeyUrls, openRedirectPayloads } from "./data"

function VerticalList({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={`flex flex-col ${className || "p-4 text-sm font-mono text-foreground"}`}>
      {items.map((item) => (
        <span key={item} className="py-0.5 break-all">{item}</span>
      ))}
    </div>
  )
}

function Card({ label, items, labelClass }: { label?: string; items: string[]; labelClass?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      {label && (
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      )}
      <VerticalList items={items} />
    </div>
  )
}

export function WcdPayloadsSection() {
  return (
    <section id="payloads" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <Terminal className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Phase 5</span>
          <h2 className="text-2xl font-bold text-foreground">WCD Payload Techniques</h2>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Path Poison</h3>
      <Card items={pathPoisonUrls} />

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Obfuscated Path</h3>
      <Card items={obfuscatedPaths} />

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Using Delimiters</h3>
      <Card items={delimiterUrls} />

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Force Cache with Special Headers</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        These headers can deceive caching systems into handling a dynamic response as if it were tied to a different cacheable URL:
      </p>
      <Card items={specialHeaders} />

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Bypassing with Encoded Paths</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        URL encoding can confuse backend vs frontend behavior, potentially creating cacheable paths that access sensitive data:
      </p>
      <Card items={encodedPaths} />

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Injecting Cache Keys with Query Parameters</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Many CDNs cache based on certain query parameters. Attackers can exploit this by crafting URLs:
      </p>

      <Card label="Cache Key Payloads" items={cacheKeyPayloads} />

      <div className="mt-4">
        <Card items={cacheKeyUrls} />
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Open Redirect Payloads</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Open redirect vulnerabilities can be chained with WCD to bypass URL validation and redirect users to malicious sites — useful for phishing and cache poisoning:
      </p>
      <Card items={openRedirectPayloads} />
    </section>
  )
}
