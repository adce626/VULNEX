"use client"

import { useState } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import {
  ArrowRight,
  ChevronRight,
  Home,
  Target,
  Crosshair,
  Shield,
  Brain,
  BookOpen,
  Route,
  Zap,
  Star,
  Flame,
  AlertTriangle,
  TrendingUp,
  Users,
  Code,
} from "lucide-react"
import { cn } from "@/lib/utils"

const realityCards = [
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "Bug bounty is not fast money",
    desc: "Most hunters spend 6-12 months before first payout. Treat it as a marathon.",
    color: "from-rose-500/20 to-rose-500/5 border-rose-500/30",
    iconColor: "text-rose-400",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Most hunters quit before their first valid bug",
    desc: "Persistence is the #1 predictor of success, not talent or tools.",
    color: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: <Crosshair className="h-5 w-5" />,
    title: "Recon matters more than payload spam",
    desc: "A deep recon finding beats 1000 automated scans. Know your target.",
    color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Reading reports beats watching motivation videos",
    desc: "One real bug report teaches more than 10 hours of theory.",
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Your methodology is your weapon",
    desc: "Without a system, you're just guessing. Build workflows, not habits.",
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Community over competition",
    desc: "The best hunters share. Privz, collaborate, and grow together.",
    color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
]

const roadmaps = [
  {
    stage: "Foundation",
    icon: <Star className="h-4 w-4" />,
    items: ["HTTP & Web Basics", "Burp Suite Proficiency", "Recon Fundamentals", "Read 50 Bug Reports"],
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    stage: "Core Skills",
    icon: <Target className="h-4 w-4" />,
    items: ["XSS, SQLi, SSRF Deep Dive", "Authentication Bypasses", "IDOR & Access Control", "Subdomain Enumeration"],
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    stage: "Advanced",
    icon: <Zap className="h-4 w-4" />,
    items: ["Prototype Pollution", "JWT Attacks", "Cloud Misconfigurations", "GraphQL Exploitation"],
    color: "from-violet-500/20 to-violet-500/5",
  },
  {
    stage: "Mastery",
    icon: <Flame className="h-4 w-4" />,
    items: ["0-Day Discovery Mindset", "Chain Exploitation", "Bypass Technique Research", "Mentorship & Sharing"],
    color: "from-amber-500/20 to-amber-500/5",
  },
]

export default function HopePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="HOPE — Every Expert Was Once Lost" />
      <MainSidebar />
      <main className="lg:pl-64">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <Flame className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Every Hunter Starts With Nothing</span>
            </div>

            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                HOPE
              </span>
            </h1>

            <p className="mt-4 text-xl text-muted-foreground sm:text-2xl font-light">
              Every Expert Was Once Lost
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground/70">
              A place for mindset, growth, learning paths, and the reality of web hacking.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Start Journey <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#roadmaps"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-card hover:border-primary/30"
              >
                Explore Resources <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Route className="h-3 w-3 text-primary" /> Roadmaps</span>
              <span className="flex items-center gap-1.5"><Brain className="h-3 w-3 text-primary" /> Mindset</span>
              <span className="flex items-center gap-1.5"><Code className="h-3 w-3 text-primary" /> Practice</span>
              <span className="flex items-center gap-1.5"><Users className="h-3 w-3 text-primary" /> Community</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Reality Check */}
        <section id="reality" className="relative border-b border-border/50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-1.5">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span className="text-xs font-medium text-rose-400 uppercase tracking-wider">Reality Check</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Uncomfortable Truths</h2>
              <p className="mt-2 text-muted-foreground">The reality no one tells you about bug hunting</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {realityCards.map((card, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500",
                    card.color,
                    hoveredCard === idx ? "scale-[1.02] shadow-xl" : "shadow-none"
                  )}
                >
                  <div className={cn(
                    "absolute -right-6 -top-6 h-16 w-16 rounded-full transition-all duration-500",
                    hoveredCard === idx ? "scale-[3] opacity-20" : "opacity-10 scale-100",
                    card.iconColor.replace("text-", "bg-").replace("-400", "-500/30")
                  )} />
                  <div className={cn("mb-3", card.iconColor)}>{card.icon}</div>
                  <h3 className="font-semibold text-foreground text-sm">{card.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmaps */}
        <section id="roadmaps" className="relative py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                <Route className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Learning Path</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Bug Hunter Roadmap</h2>
              <p className="mt-2 text-muted-foreground">From complete beginner to confident researcher</p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent hidden lg:block" />
              <div className="space-y-6">
                {roadmaps.map((stage, idx) => (
                  <div key={idx} className="relative lg:pl-20">
                    <div className="absolute left-6 top-6 hidden h-5 w-5 rounded-full border-2 border-primary bg-background lg:flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className={cn("rounded-2xl border p-6 transition-all hover:shadow-lg", stage.color)}>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {stage.icon}
                        </span>
                        <h3 className="font-bold text-foreground">{stage.stage}</h3>
                      </div>
                      <ul className="space-y-2">
                        {stage.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-border py-16 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <Flame className="mx-auto h-8 w-8 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Start Today. Fail. Learn. Repeat.</h2>
            <p className="mt-2 text-muted-foreground">
              The only difference between a beginner and an expert is the number of bugs they&apos;ve found.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/payloads" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 transition-all">
                Browse Payloads <Code className="h-4 w-4" />
              </Link>
              <Link href="/tools" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 transition-all">
                Explore Tools <Zap className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
