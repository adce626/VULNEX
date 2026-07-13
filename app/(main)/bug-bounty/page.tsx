"use client"

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react"
import Link from "next/link"
import { PageTitle } from "@/components/page-title"
import { useDeviceType } from "@/lib/use-device-type"
import {
  Target, ChevronRight, BookOpen, ArrowRight, Search,
  Globe, Terminal, FileText, Wrench, Sparkles,
  Brain, LinkIcon, Zap, Eye,
} from "lucide-react"

const methodAreas = [
  {
    icon: Search,
    title: "Recon Flow",
    href: "/bug-bounty/recon-flow",
    description: "Subdomain enumeration, port scanning, technology fingerprinting, and endpoint discovery — the foundation of every bounty",
    color: "oklch(0.55 0.22 25)",
    steps: 3,
    available: true,
  },
  {
    icon: LinkIcon,
    title: "Vulnerability Chaining",
    href: "/bug-bounty/chaining",
    description: "Combine low-severity bugs into critical exploits. Learn how XSS + CSRF becomes ATO and IDOR + Rate Limit becomes a data breach",
    color: "oklch(0.65 0.18 50)",
    steps: 6,
    available: true,
  },
  {
    icon: Wrench,
    title: "Automation Setup",
    href: "/bug-bounty/automation",
    description: "Build your personal recon pipeline with Nuclei, Dalfox, Katana, and custom bash scripts — scan while you sleep",
    color: "oklch(0.72 0.16 75)",
    steps: 3,
    available: true,
  },
  {
    icon: FileText,
    title: "Reporting Templates",
    href: "/bug-bounty/reporting",
    description: "Craft professional bug reports that get accepted faster. Templates for every severity level with CVSS scoring guides",
    color: "oklch(0.7 0.14 65)",
    steps: 5,
    available: true,
  },
  {
    icon: Globe,
    title: "Platform Guides",
    href: "/bug-bounty/platforms",
    description: "HackerOne, Bugcrowd, Synack, Intigriti, and OpenBugBounty — platform-specific tips, payout benchmarks, and program selection",
    color: "oklch(0.55 0.22 25)",
    steps: 5,
    available: true,
  },
  {
    icon: Brain,
    title: "Case Studies",
    description: "Real-world bug bounty write-ups dissected step by step — recon, exploitation, report, and payout breakdown",
    color: "oklch(0.65 0.18 50)",
    steps: 8,
  },
]

const attackChains = [
  {
    steps: ["XSS", "CSRF", "ATO"],
    description: "Cross-Site Scripting → Cross-Site Request Forgery → Account Takeover",
    color: "oklch(0.55 0.22 25)",
  },
  {
    steps: ["IDOR", "Rate Limit", "Data Breach"],
    description: "Insecure Direct Object Reference → Rate Limit Bypass → Mass Data Exfiltration",
    color: "oklch(0.65 0.18 50)",
  },
  {
    steps: ["SSRF", "Cloud Meta", "Takeover"],
    description: "Server-Side Request Forgery → Cloud Metadata Extraction → Full Account Takeover",
    color: "oklch(0.72 0.16 75)",
  },
]

const quickLinks = [
  { label: "Recon Toolkit", href: "/toolkit", icon: Wrench },
  { label: "Payload Library", href: "/payloads", icon: Terminal },
  { label: "Interactive Tools", href: "/interactive", icon: Sparkles },
  { label: "Browser Extensions", href: "/browser-extensions", icon: Eye },
]

// ─── Particle Background (client-only) ──────────────────────────────
function ParticleField() {
  const [mounted, setMounted] = useState(false)
  const particles = useRef<{ id: number; x: number; size: number; delay: number; duration: number; drift: number; opacity: number }[]>([])

  useEffect(() => {
    if (particles.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        particles.current.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 8,
          duration: Math.random() * 6 + 5,
          drift: (Math.random() - 0.5) * 30,
          opacity: Math.random() * 0.5 + 0.15,
        })
      }
    }
    setMounted(true)
  }, [])

  if (!mounted) return <div className="pointer-events-none fixed inset-0 z-0" />

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: p.size + "px",
            height: p.size + "px",
            opacity: p.opacity,
            background: p.size > 4
              ? "radial-gradient(circle, oklch(0.72 0.16 75 / 0.8), oklch(0.55 0.22 25 / 0.3))"
              : "oklch(0.72 0.16 75 / 0.6)",
            boxShadow: p.size > 4 ? "0 0 6px oklch(0.72 0.16 75 / 0.4)" : "none",
            animation: `ember-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes ember-float {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-105vh) translateX(var(--drift)) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ─── Mouse Spotlight (client-only) ─────────────────────────────────
function MouseGlow() {
  const [mounted, setMounted] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const visible = useRef(false)

  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
    visible.current = true
  }, [])

  useEffect(() => {
    setMounted(true)
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [handleMove])

  if (!mounted) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-1000"
      style={{
        opacity: visible.current ? 1 : 0,
        background: `radial-gradient(800px circle at ${pos.x}% ${pos.y}%, oklch(0.55 0.22 25 / 0.06), transparent 60%)`,
      }}
    />
  )
}

// ─── Scroll Reveal ─────────────────────────────────────────────────────
function useScrollReveal() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed((prev) => new Set(prev).add(entry.target.id))
          }
        }
      },
      { threshold: 0.15 },
    )

    const elements = document.querySelectorAll("[data-reveal]")
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return revealed
}

function RevealSection({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  const revealed = useScrollReveal()

  return (
    <div
      id={id}
      data-reveal
      className={`transition-all duration-700 ${revealed.has(id) ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} ${className}`}
    >
      {children}
    </div>
  )
}

// ─── Animated Counter ──────────────────────────────────────────────────
function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)
  const intervalMs = typeof window !== "undefined" && window.innerWidth < 640 ? 100 : 35

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const steps = 40
          const increment = target / steps
          let current = 0
          intervalId = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              if (intervalId) clearInterval(intervalId)
            } else {
              setCount(Math.floor(current))
            }
          }, intervalMs)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (intervalId) clearInterval(intervalId)
    }
  }, [target, intervalMs])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold font-mono tracking-tighter sm:text-5xl" style={{
        color: "var(--bb-gold)",
        textShadow: "0 0 30px var(--bb-gold-glow), 0 0 60px oklch(0.72 0.16 75 / 0.2)",
      }}>
        {count}{suffix}
      </div>
      <div className="mt-1 text-xs tracking-[0.15em]" style={{ color: "var(--bb-text-muted)" }}>{label}</div>
    </div>
  )
}

// ─── 3D Tilt Method Card ───────────────────────────────────────────────
function MethodCard({ area }: { area: typeof methodAreas[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(hover: hover)").matches) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -12, y: x * 12 })
  }

  const Icon = area.icon
  const card = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { if (!window.matchMedia("(hover: hover)").matches) return; setHover(true) }}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      className="group relative overflow-hidden rounded-xl border p-6 h-full cursor-default transition-all duration-300"
      style={{
        borderColor: hover ? area.color : "var(--bb-border)",
        background: "var(--bb-card)",
        backdropFilter: "blur(12px)",
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${hover ? 1.02 : 1}, ${hover ? 1.02 : 1}, 1)`,
        boxShadow: hover
          ? `0 0 40px ${area.color}22, 0 0 80px ${area.color}11, 0 8px 32px rgba(0,0,0,0.3)`
          : "0 4px 16px rgba(0,0,0,0.15)",
        transition: hover ? "box-shadow 0.3s, border-color 0.3s" : "all 0.5s ease-out",
      }}
    >
      {/* Animated gradient border overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: hover ? 0.15 : 0,
          background: `linear-gradient(135deg, ${area.color}00, ${area.color}40, ${area.color}00)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300" style={{
          background: `${area.color}22`,
          border: `1px solid ${hover ? area.color : `${area.color}44`}`,
          boxShadow: hover ? `0 0 20px ${area.color}33` : "none",
        }}>
          <Icon className="h-6 w-6 transition-transform duration-300" style={{
            color: area.color,
            transform: hover ? "scale(1.1)" : "scale(1)",
          }} />
        </div>

        <h3 className="mb-2 text-lg font-bold transition-colors duration-300" style={{
          color: hover ? area.color : "var(--bb-text)",
        }}>{area.title}</h3>
        <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>{area.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs tracking-wider" style={{ color: "var(--bb-text-muted)" }}>
            {area.steps} {area.steps === 1 ? "chapter" : "chapters"}
          </span>
          {area.available ? (
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase" style={{
              background: `${area.color}18`,
              color: area.color,
              border: `1px solid ${area.color}40`,
            }}>
              Live
            </span>
          ) : (
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase" style={{
              background: "oklch(0.72 0.16 75 / 0.1)",
              color: "oklch(0.72 0.16 75 / 0.5)",
              border: "1px solid oklch(0.72 0.16 75 / 0.15)",
            }}>
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return area.href && area.available ? (
    <Link key={area.title} href={area.href} className="block">{card}</Link>
  ) : (
    <div key={area.title}>{card}</div>
  )
}

// ─── Chain Card ────────────────────────────────────────────────────────
function ChainCard({ chain }: { chain: typeof attackChains[number] }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="rounded-xl border p-5 transition-all duration-500"
      style={{
        borderColor: hover ? chain.color : "var(--bb-border)",
        background: "var(--bb-card)",
        backdropFilter: "blur(12px)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? `0 0 35px ${chain.color}22, 0 8px 24px rgba(0,0,0,0.2)` : "0 4px 12px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => { if (!window.matchMedia("(hover: hover)").matches) return; setHover(true) }}
      onMouseLeave={() => { if (!window.matchMedia("(hover: hover)").matches) return; setHover(false) }}
    >
      <div className="mb-3 flex items-center gap-1.5">
        {chain.steps.map((step, i) => (
          <span key={step} className="flex items-center gap-1.5">
            <span className="rounded-md px-2 py-1 text-[11px] font-bold font-mono tracking-wider transition-all duration-300" style={{
              background: `${chain.color}18`,
              color: hover ? chain.color : `${chain.color}cc`,
              border: `1px solid ${hover ? chain.color : `${chain.color}30`}`,
              boxShadow: hover ? `0 0 12px ${chain.color}33` : "none",
            }}>
              {step}
            </span>
            {i < chain.steps.length - 1 && (
              <ChevronRight className="h-3 w-3" style={{ color: "var(--bb-text-muted)" }} />
            )}
          </span>
        ))}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "var(--bb-text-secondary)" }}>
        {chain.description}
      </p>
    </div>
  )
}

export default function BugBountyPage() {
  const device = useDeviceType()
  return (
    <div className="bug-bounty-realm">
      <PageTitle title="Bug Bounty — Hunter's Roadmap" />

      {device === "desktop" && <ParticleField />}
      {device === "desktop" && <MouseGlow />}

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-14 items-center border-b px-3 sm:px-6" style={{ background: "oklch(0.075 0.02 30 / 0.95)", backdropFilter: "blur(16px)", borderColor: "var(--bb-border)" }}>
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto">
          <Link href="/bug-bounty" className="shrink-0 flex items-center gap-2 text-sm font-bold tracking-wider" style={{ color: "var(--bb-primary)" }}>
            <Target className="h-4 w-4" /> <span className="hidden sm:inline">BUG BOUNTY</span><span className="sm:hidden">BB</span>
          </Link>
          <div className="h-5 w-px shrink-0" style={{ background: "var(--bb-border)" }} />
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            {[
              { href: "/", label: "Main Site", color: "var(--bb-primary)", dot: "var(--bb-primary)" },
              { href: "/Hope", label: "Full Guide", color: "var(--bb-gold)", dot: "var(--bb-gold)" },
              { href: "/tools", label: "Tools", color: "var(--bb-orange)", dot: "var(--bb-orange)" },
              { href: "/interactive", label: "Interactive", color: "var(--bb-amber)", dot: "var(--bb-amber)" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium tracking-wider transition-all duration-200"
                style={{ color: "var(--bb-text-muted)" }}
                onMouseEnter={(e) => {
                  if (!window.matchMedia("(hover: hover)").matches) return
                  e.currentTarget.style.color = link.color; e.currentTarget.style.background = `${link.color}12`
                }}
                onMouseLeave={(e) => {
                  if (!window.matchMedia("(hover: hover)").matches) return
                  e.currentTarget.style.color = "var(--bb-text-muted)"; e.currentTarget.style.background = "transparent"
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full transition-all duration-200" style={{ background: link.dot, boxShadow: `0 0 6px ${link.dot}` }} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden border-b px-6 text-center" style={{ borderColor: "var(--bb-border)" }}>
        {/* Ambient glow layers */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: `
            radial-gradient(ellipse at 30% 20%, oklch(0.55 0.22 25 / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, oklch(0.72 0.16 75 / 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 40%, oklch(0.55 0.22 25 / 0.08) 0%, transparent 60%)
          `,
        }} />

        <div className="relative z-10">
          {/* Target icon with enhanced pulse */}
          <div className="mx-auto mb-6 sm:mb-8 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full" style={{
            background: "var(--bb-primary-glow)",
            border: "2px solid var(--bb-primary)",
            animation: "target-pulse 2.5s ease-in-out infinite",
            boxShadow: "0 0 40px var(--bb-primary-glow), 0 0 80px oklch(0.55 0.22 25 / 0.15)",
          }}>
            <Target className="h-8 w-8 sm:h-12 sm:w-12" style={{ color: "var(--bb-primary)" }} />
          </div>

          <h1 className="mb-3 sm:mb-4 text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight" style={{
            color: "var(--bb-text)",
            textShadow: "0 0 40px oklch(0.55 0.22 25 / 0.3), 0 0 80px oklch(0.55 0.22 25 / 0.1)",
          }}>
            BUG BOUNTY
          </h1>
          <p className="mx-auto mb-10 sm:mb-12 max-w-2xl text-base sm:text-lg" style={{
            color: "var(--bb-text-secondary)",
            textShadow: "0 0 20px oklch(0.5 0.02 30 / 0.3)",
          }}>
            The hunter&apos;s roadmap — from your first recon to your first payout
          </p>

          {/* Stats with animated counters */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-center">
            <AnimatedCounter target={11} suffix="" label="CHAPTERS" />
            <div className="w-px self-stretch" style={{ background: "var(--bb-border)" }} />
            <AnimatedCounter target={8} suffix="" label="CHAINS" />
            <div className="w-px self-stretch" style={{ background: "var(--bb-border)" }} />
            <AnimatedCounter target={6} suffix="" label="METHODS" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2" style={{ borderColor: "var(--bb-text-muted)" }}>
            <div className="mx-auto mt-1.5 h-2 w-1 rounded-full animate-pulse" style={{ background: "var(--bb-gold)" }} />
          </div>
        </div>
      </section>

      {/* Featured Guide Card */}
      <RevealSection id="featured-guide">
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Link href="/Hope" className="group relative block overflow-hidden rounded-2xl border p-8 transition-all duration-500 sm:p-12" style={{
            borderColor: "var(--bb-border)",
            background: "linear-gradient(135deg, oklch(0.12 0.03 30 / 0.8), oklch(0.08 0.02 30 / 0.5))",
          }}>
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-30 group-hover:scale-110" style={{ background: "var(--bb-primary)" }} />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full opacity-10 blur-3xl transition-all duration-700 group-hover:opacity-20 group-hover:scale-110" style={{ background: "var(--bb-gold)" }} />

            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110" style={{
                  background: "var(--bb-primary-glow)",
                  border: "1px solid var(--bb-primary)",
                  boxShadow: "0 0 20px var(--bb-primary-glow)",
                }}>
                  <BookOpen className="h-6 w-6" style={{ color: "var(--bb-primary)" }} />
                </div>
                <span className="text-xs font-semibold tracking-widest" style={{ color: "var(--bb-primary)" }}>
                  START HERE
                </span>
              </div>

              <h2 className="mb-3 text-3xl font-bold sm:text-4xl transition-colors duration-300 group-hover:text-white" style={{ color: "var(--bb-text)" }}>
                Full Bug Bounty Guide
              </h2>
              <p className="mb-6 max-w-2xl transition-colors duration-300" style={{ color: "var(--bb-text-secondary)" }}>
                11 chapters covering the complete bug hunting lifecycle — from mindset and platform selection, through recon and manual testing, to chaining vulnerabilities and submitting winning reports.
              </p>

              <div className="mb-8 flex flex-wrap gap-3 text-xs tracking-wider">
                {["Mindset", "Recon", "Burp Suite", "Vuln Testing", "WAF Bypass", "Chaining", "Reporting"].map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 transition-all duration-300 hover:scale-105" style={{
                    background: "var(--bb-primary-glow)",
                    color: "var(--bb-primary)",
                    border: "1px solid oklch(0.55 0.22 25 / 0.25)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 group-hover:gap-4 group-hover:shadow-xl" style={{
                background: "var(--bb-primary)",
                color: "white",
                boxShadow: "0 0 25px var(--bb-primary-glow), 0 4px 16px rgba(0,0,0,0.3)",
              }}>
                Read the Guide <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </section>
      </RevealSection>

      {/* Method Areas */}
      <RevealSection id="method-areas">
        <section className="mx-auto max-w-6xl px-6 pb-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold" style={{ color: "var(--bb-text)" }}>Method Areas</h2>
            <p className="mt-2" style={{ color: "var(--bb-text-muted)" }}>Core pillars of the bug hunting workflow</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {methodAreas.map((area) => (
              <MethodCard key={area.title} area={area} />
            ))}
          </div>
        </section>
      </RevealSection>

      {/* Attack Chains */}
      <RevealSection id="attack-chains">
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold" style={{ color: "var(--bb-text)" }}>Attack Chains</h2>
            <p className="mt-2" style={{ color: "var(--bb-text-muted)" }}>How low-severity bugs combine into critical exploits</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {attackChains.map((chain) => (
              <ChainCard key={chain.description} chain={chain} />
            ))}
          </div>
        </section>
      </RevealSection>

      {/* Quick Links */}
      <RevealSection id="quick-links">
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="rounded-xl border p-6 transition-all duration-300 hover:border-opacity-50" style={{
            borderColor: "var(--bb-border)",
            background: "oklch(0.08 0.01 30 / 0.4)",
            backdropFilter: "blur(12px)",
          }}>
            <div className="mb-6 flex items-center gap-2">
              <Zap className="h-4 w-4" style={{ color: "var(--bb-gold)" }} />
              <span className="text-sm font-semibold tracking-wider" style={{ color: "var(--bb-gold)" }}>ESSENTIAL TOOLS</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
                    style={{
                      background: "oklch(0.1 0.01 30 / 0.5)",
                      border: "1px solid var(--bb-border)",
                      color: "var(--bb-text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                      if (!window.matchMedia("(hover: hover)").matches) return
                      e.currentTarget.style.borderColor = "var(--bb-primary)"
                      e.currentTarget.style.color = "var(--bb-primary)"
                      e.currentTarget.style.background = "oklch(0.55 0.22 25 / 0.08)"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      if (!window.matchMedia("(hover: hover)").matches) return
                      e.currentTarget.style.borderColor = "var(--bb-border)"
                      e.currentTarget.style.color = "var(--bb-text-secondary)"
                      e.currentTarget.style.background = "oklch(0.1 0.01 30 / 0.5)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Footer */}
      <footer className="border-t px-6 py-10 text-center" style={{ borderColor: "var(--bb-border)" }}>
        <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3" style={{ color: "var(--bb-text-muted)" }}>
          <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Main Site
        </Link>
      </footer>
    </div>
  )
}
