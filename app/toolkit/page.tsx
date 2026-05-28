"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import {
  Search,
  ChevronRight,
  Home,
  Copy,
  Check,
  Wand2,
  X,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"
import { hueMap, sections, statCards } from "@/lib/toolkit-data"

function NeonCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-transparent bg-gradient-to-br from-zinc-900/90 to-black/90 p-[1px] ${className}`}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent2)]/20 to-purple-500/20 opacity-50" />
      <div className="relative rounded-xl bg-black/95 p-5">
        {children}
      </div>
    </div>
  )
}

export default function QuickReconPage() {
  const [domain, setDomain] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [notif, setNotif] = useState("")
  const [isNeon, setIsNeon] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const obsRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    return () => obsRef.current?.disconnect()
  }, [])

  // Cursor Trail
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches
    if (isMobile) return

    const trails: HTMLDivElement[] = []
    const trailCount = 15
    const accent = "var(--accent)"
    for (let i = 0; i < trailCount; i++) {
      const el = document.createElement("div")
      const size = Math.max(3, 8 - i * 0.3)
      el.style.cssText = `position:fixed;pointer-events:none;border-radius:50%;z-index:9999;width:${size}px;height:${size}px;background:${accent};opacity:${1 - i * 0.05};mix-blend-mode:screen;box-shadow:0 0 ${6 + i * 2}px ${accent};transition:opacity .3s;top:0;left:0`
      document.body.appendChild(el)
      trails.push(el)
    }

    let mx = 0, my = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener("mousemove", onMove)

    let animId: number
    const animate = () => {
      for (let i = 0; i < trails.length; i++) {
        const tx = i === 0 ? mx : parseFloat(trails[i - 1].style.left || "0")
        const ty = i === 0 ? my : parseFloat(trails[i - 1].style.top || "0")
        const cx = parseFloat(trails[i].style.left || "0")
        const cy = parseFloat(trails[i].style.top || "0")
        const speed = Math.max(0.05, 0.15 - i * 0.005)
        trails[i].style.left = `${cx + (tx - cx) * speed}px`
        trails[i].style.top = `${cy + (ty - cy) * speed}px`
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(animId)
      trails.forEach((el) => el.remove())
    }
  }, [])

  // Particles
  useEffect(() => {
    const container = document.getElementById("particles-container")
    if (!container) return
    const particles: HTMLDivElement[] = []
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div")
      const size = 2 + Math.random() * 3
      p.style.cssText = `position:absolute;border-radius:50%;background:var(--accent);width:${size}px;height:${size}px;left:${Math.random() * 100}%;bottom:-10px;opacity:0;animation:particleFloat ${15 + Math.random() * 25}s ease-in ${Math.random() * 15}s infinite`
      container.appendChild(p)
      particles.push(p)
    }
    return () => particles.forEach((p) => p.remove())
  }, [])

  // Light flare mouse follower + 3D card tilt
  useEffect(() => {
    const flare = document.getElementById("light-flare")
    if (!flare) return
    let timeout: ReturnType<typeof setTimeout>
    const onMove = (e: MouseEvent) => {
      flare.style.left = `${e.clientX - 144}px`
      flare.style.top = `${e.clientY - 144}px`
      flare.style.opacity = "1"
      clearTimeout(timeout)
      timeout = setTimeout(() => { flare.style.opacity = "0" }, 1500)
    }
    document.addEventListener("mousemove", onMove)

    // 3D tilt on cards
    const handleTilt = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLDivElement>(".tilt-card")
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const dx = (x - cx) / cx
        const dy = (y - cy) / cy
        card.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`
      })
    }
    const resetTilt = () => {
      document.querySelectorAll<HTMLDivElement>(".tilt-card").forEach((card) => {
        card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)"
      })
    }
    document.addEventListener("mousemove", handleTilt)
    document.addEventListener("mouseleave", resetTilt)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mousemove", handleTilt)
      document.removeEventListener("mouseleave", resetTilt)
      clearTimeout(timeout)
    }
  }, [])

  // Staggered card entry on visible sections
  useEffect(() => {
    if (visibleSections.size === 0) return
    visibleSections.forEach((secId) => {
      const container = document.getElementById(secId)
      if (!container) return
      const cards = container.querySelectorAll<HTMLDivElement>(".tilt-card")
      cards.forEach((card, idx) => {
        card.style.animationDelay = `${idx * 0.06}s`
        card.classList.add("tool-card-enter")
      })
    })
  }, [visibleSections])

  const sectionRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      if (!obsRef.current) {
        obsRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => new Set(prev).add(entry.target.id))
              }
            })
          },
          { rootMargin: "0px 0px -100px 0px", threshold: 0.1 }
        )
      }
      obsRef.current.observe(node)
    }
  }, [])

  const themeVars = {
    "--accent": isNeon ? "#ff0080" : "#00ff41",
    "--accent2": isNeon ? "#00d4ff" : "#06b6d4",
    "--border": isNeon ? "rgba(255,0,128,0.25)" : "rgba(0,255,65,0.2)",
    "--borderL": isNeon ? "rgba(255,0,128,0.12)" : "rgba(0,255,65,0.1)",
    "--glow": isNeon ? "rgba(255,0,128,0.25)" : "rgba(0,255,65,0.2)",
    "--hover-border": isNeon ? "rgba(255,0,128,0.4)" : "rgba(0,255,65,0.3)",
    "--scan-color": isNeon ? "rgba(255,0,128,0.08)" : "rgba(0,255,65,0.06)",
  } as React.CSSProperties

  const replaceDomain = useCallback((cmd: string) => {
    return cmd.replace(/\{\{domain\}\}/g, domain || "example.com")
  }, [domain])

  useEffect(() => {
    if (!notif) return
    const t = setTimeout(() => setNotif(""), 3000)
    return () => clearTimeout(t)
  }, [notif])

  const copyCmd = useCallback(async (cmd: string, id: string) => {
    const text = replaceDomain(cmd)
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setNotif("Command copied to clipboard!")
    setTimeout(() => setCopiedId(null), 2500)
  }, [replaceDomain])

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-body, #0a0a0a)", ...themeVars }}>

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${isNeon ? "rgba(255,0,128,0.04)" : "rgba(0,220,130,0.04)"} 1px, transparent 1px), linear-gradient(to bottom, ${isNeon ? "rgba(255,0,128,0.04)" : "rgba(0,220,130,0.04)"} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Light Flare */}
      <div id="light-flare" className="fixed pointer-events-none z-0 w-72 h-72 rounded-full opacity-0 blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${isNeon ? "rgba(255,0,128,0.15)" : "rgba(0,220,130,0.15)"} 0%, transparent 70%)`,
        }}
      />

      {/* Particles Container */}
      <div id="particles-container" className="fixed inset-0 pointer-events-none z-0" />

      {/* Animations */}
      <style>{`
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: transparent; }
          50% { border-color: var(--accent); box-shadow: 0 0 15px var(--glow); }
        }
        @keyframes waveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cardEntry {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .tool-card-enter {
          animation: cardEntry 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }
        .section-visible .section-header-icon {
          animation: borderPulse 3s ease-in-out 1;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; opacity: 0.3; }
        ::-webkit-scrollbar-thumb:hover { opacity: 0.6; }
        * { scrollbar-width: thin; scrollbar-color: var(--accent) transparent; }
        @media (pointer: coarse) {
          .tilt-card { transition: transform 0.3s ease-out !important; transform: none !important; }
        }
      `}</style>

      <PageTitle title="Quick Recon Toolkit" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b bg-black/50" style={{ borderColor: "var(--border)" }}>
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="flex items-center gap-1" style={{ color: "var(--accent)" }}>
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/toolkit" style={{ color: "var(--accent)" }}>Toolkit</Link>
              <ChevronRight className="h-4 w-4" />
              <span style={{ color: "var(--accent)" }}>Quick Recon Toolkit</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-black via-zinc-900 to-black" style={{ borderColor: "var(--border)" }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, var(--scan-color) 2px, var(--scan-color) 4px)",
          }} />
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[120px]" style={{ backgroundColor: "var(--accent)" }} />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[100px]" />
          <div className="relative px-6 py-14 text-center lg:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${isNeon ? "#ff0080" : "#00ff41"}20, ${isNeon ? "#00d4ff" : "#06b6d4"}20)`, boxShadow: `0 10px 40px var(--glow)` }}>
              <Wand2 className="h-10 w-10" style={{ color: "var(--accent)" }} />
            </div>
            <h1 className="text-4xl font-black text-transparent lg:text-5xl font-['Orbitron',monospace] tracking-wider bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${isNeon ? "#ff0080" : "#00ff41"}, ${isNeon ? "#00d4ff" : "#06b6d4"}, #d946ef)` }}>
              Quick Recon Toolkit
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              All-in-one recon command generator — enter a domain, get every command you need.
            </p>

            {/* Theme Toggle + Domain Input */}
            <div className="mx-auto mt-8 max-w-2xl space-y-4">
              <div className="relative flex gap-3 rounded-2xl p-[1.5px] shadow-lg" style={{ background: `linear-gradient(to right, ${isNeon ? "#ff0080" : "#00ff41"}33, ${isNeon ? "#00d4ff" : "#06b6d4"}33, #d946ef33)`, boxShadow: `0 10px 40px var(--glow)` }}>
                <div className="flex flex-1 items-center gap-2 rounded-2xl bg-black px-4">
                  <Search className="h-5 w-5" style={{ color: "var(--accent)" }} />
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain (e.g., example.com)"
                    className="w-full bg-transparent py-4 text-base text-white placeholder:text-gray-600 focus:outline-none font-mono"
                  />
                  {domain && (
                    <button onClick={() => setDomain("")} className="shrink-0 rounded-lg p-1.5 text-gray-500 transition-all hover:bg-white/10 hover:text-white">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setNotif("Commands updated for: " + (domain || "example.com"))}
                  className="mr-1 flex items-center gap-2 rounded-xl px-6 py-2 font-bold text-black transition-all hover:shadow-lg hover:scale-105 font-mono"
                  style={{ background: `linear-gradient(to right, ${isNeon ? "#ff0080" : "#00ff41"}, ${isNeon ? "#00d4ff" : "#06b6d4"})`, boxShadow: `0 4px 20px var(--glow)` }}
                >
                  <Wand2 className="h-4 w-4" />
                  Generate
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsNeon((p) => !p)}
                className="mx-auto flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all hover:scale-105"
                style={{ border: "1px solid var(--border)", color: "var(--accent)" }}
              >
                {isNeon ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isNeon ? "Neon" : "Dark"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto max-w-6xl px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {statCards.map((stat) => (
              <NeonCard key={stat.label}>
                <div className="flex flex-col items-center gap-1">
                  <stat.icon className="h-6 w-6" style={{ color: "var(--accent)" }} />
                  <span className="text-2xl font-black text-white font-['Orbitron',monospace]">{stat.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>

        {/* Tool Sections */}
        <div className="mx-auto max-w-6xl space-y-6 p-6">
          {sections.map((sec) => {
            const isVisible = visibleSections.has(sec.id)
            return (
              <div
                key={sec.id}
                id={sec.id}
                ref={isVisible ? undefined : sectionRefCallback}
                className={`${isVisible ? "section-visible" : ""} group overflow-hidden rounded-2xl border bg-gradient-to-br from-zinc-900/90 to-black/90 p-[1px] shadow-lg transition-all duration-700 hover:shadow-2xl`}
                style={{
                  borderColor: isVisible ? `oklch(0.7 0.2 ${hueMap[sec.id] ?? 40})` : "transparent",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {/* Section Header */}
                <div className="flex w-full items-center justify-between bg-gradient-to-r from-white/5 to-transparent p-5">
                  <div className="flex items-center gap-3">
                    <div className={`section-header-icon flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${sec.color}`}>
                      <sec.icon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">{sec.title}</h2>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-gray-400">
                      {sec.subs.reduce((a, s) => a + s.items.length, 0)}
                    </span>
                  </div>
                </div>

                {/* Section Content */}
                  <div className="space-y-8 p-5 pt-2">
                    {sec.subs.map((sub) => (
                      <div key={sub.title}>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                          {sub.title}
                        </h3>
                        <div className="space-y-3">
                          {sub.items.map((item, idx) => {
                            const id = `${sec.id}-${sub.title}-${idx}`
                            const displayCmd = replaceDomain(item.command)
                            return (
                              <div
                                key={id}
                                className="tilt-card group relative rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-[var(--hover-border)] hover:bg-zinc-900 hover:shadow-lg"
                              >
                                <div className="flex items-start gap-3 p-4 pb-2">
                                  <span className="mt-0.5 shrink-0 font-mono text-sm" style={{ color: "var(--accent)" }}>$</span>
                                  <pre className="flex-1 overflow-x-auto font-mono text-sm text-gray-300 whitespace-pre-wrap break-all">
                                    {displayCmd}
                                  </pre>
                                  <button
                                    onClick={() => copyCmd(item.command, id)}
                                    className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-gray-500 opacity-0 transition-all hover:scale-105 group-hover:opacity-100"
                                    style={{ borderColor: "var(--border)" }}
                                  >
                                    {copiedId === id ? (
                                      <Check className="h-4 w-4" style={{ color: "var(--accent)" }} />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center justify-between border-t border-zinc-800/50 px-4 py-2" style={{ borderColor: "var(--borderL)" }}>
                                  <p className="text-xs text-gray-500">{item.description}</p>
                                  <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>{item.name}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            )
          })}

          {/* Footer */}
          <footer className="border-t pt-10 pb-6 text-center" style={{ borderColor: "var(--borderL)" }}>
            <p className="text-sm text-gray-500 font-mono">
              <span style={{ color: "var(--accent)" }}>$</span> Commands auto-update with your target domain.
              Empty input defaults to <span style={{ color: "var(--accent)" }}>example.com</span>
            </p>
          </footer>
        </div>
      </main>

      {/* Notification */}
      <div
        className={`fixed right-6 top-24 z-50 rounded-xl border px-6 py-3 text-sm font-medium text-white shadow-lg backdrop-blur transition-all duration-300 ${
          notif ? "translate-x-0 opacity-100" : "translate-x-96 opacity-0 pointer-events-none"
        }`}
        style={{ borderColor: "var(--border)", background: `linear-gradient(to right, ${isNeon ? "#ff0080" : "#00ff41"}33, ${isNeon ? "#00d4ff" : "#06b6d4"}33)`, boxShadow: `0 10px 40px var(--glow)` }}
      >
        {notif}
      </div>
    </div>
  )
}
