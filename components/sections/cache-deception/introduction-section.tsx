import { ChevronRight } from "lucide-react"
import { CommandCard } from "@/components/command-card"
import { guideItems, impactItems } from "./data"

export function IntroductionSection() {
  return (
    <section id="introduction" className="scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
      <p className="text-muted-foreground leading-relaxed">
        Web cache deception is a high-impact vulnerability where attackers trick caching mechanisms into storing and serving sensitive content, enabling unauthorized data access or account takeover. This guide covers advanced detection and exploitation techniques to help security professionals safeguard their applications.
      </p>

      <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">In This Guide</h3>
      <ul className="space-y-2 text-muted-foreground">
        {guideItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">What is Web Cache Deception?</h3>
      <p className="text-muted-foreground leading-relaxed">
        Web Cache Deception (WCD) occurs when an attacker manipulates a caching system such as a CDN, reverse proxy or browser cache into storing sensitive content under what appears to be a harmless static resource. When another user requests that resource the cache serves the sensitive data instead, exposing information that should remain private. This typically arises from improper cache configurations, missing or incorrect security headers or flaws in how URLs and query parameters are processed.
      </p>

      <h4 className="mt-6 mb-2 font-medium text-foreground">A Simplified WCD Attack Flow</h4>
      <ul className="space-y-2 text-muted-foreground list-decimal list-inside">
        <li>The website uses a CDN or reverse proxy (e.g., Cloudflare, Akamai, Fastly) that caches static files like .css, .js, .jpg</li>
        <li>Private pages exist (e.g., /account, /profile, /settings) that should never be cached</li>
        <li>Attacker appends a fake static file extension to a private endpoint</li>
      </ul>

      <div className="mt-3">
        <CommandCard command="https://target.com/account/style.css" description="Append .css to private endpoint" index={1} />
      </div>

      <ol className="space-y-1 text-muted-foreground list-decimal list-inside mt-2" start={4}>
        <li>The cache sees .css → treats it as a static resource → stores the HTML content of the private page</li>
        <li>Any unauthenticated user visiting that URL later gets the cached private content</li>
      </ol>

      <h4 className="mt-6 mb-2 font-medium text-foreground">Impact</h4>
      <ul className="space-y-2 text-muted-foreground">
        {impactItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
