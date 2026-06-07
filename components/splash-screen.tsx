"use client"

import { useState, useEffect, useCallback } from "react"
import { Shield, Search, Bug, Terminal, Globe, Lock, Zap, Server, Cloud, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { sectionCards, navigation } from "@/lib/site-data"
import { iconMap } from "@/lib/icon-map"
import { SITE_STATS } from "@/lib/stats"

const floatingIcons = [
  { Icon: Shield, delay: 0.2, x: "10%", y: "15%" },
  { Icon: Search, delay: 0.4, x: "85%", y: "20%" },
  { Icon: Bug, delay: 0.6, x: "15%", y: "75%" },
  { Icon: Terminal, delay: 0.8, x: "80%", y: "80%" },
  { Icon: Globe, delay: 1.0, x: "50%", y: "10%" },
  { Icon: Lock, delay: 1.2, x: "90%", y: "50%" },
  { Icon: Zap, delay: 1.4, x: "5%", y: "45%" },
  { Icon: Server, delay: 1.6, x: "70%", y: "35%" },
  { Icon: Cloud, delay: 1.8, x: "30%", y: "85%" },
  { Icon: Wrench, delay: 2.0, x: "60%", y: "65%" },
]

const sectionIcons = sectionCards.slice(0, 6).map((c) => ({
  Icon: iconMap[c.icon],
  label: c.title,
}))

const statItems = [
  { label: "Sections", value: sectionCards.length },
  { label: "Topics", value: navigation.reduce((acc, s) => acc + (s.items?.length || 0), 0) },
  { label: "Commands", value: SITE_STATS.commandCount },
]

interface SplashScreenProps {
  onEnter: () => void
}

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const [phase, setPhase] = useState<"logo" | "intro" | "stats">("logo")
  const [counters, setCounters] = useState([0, 0, 0])
  const [dismissing, setDismissing] = useState(false)
  const [visible, setVisible] = useState(true)

  const handleEnter = useCallback(() => {
    setDismissing(true)
    setTimeout(() => {
      setVisible(false)
      onEnter()
    }, 600)
  }, [onEnter])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("intro"), 1200)
    const t2 = setTimeout(() => setPhase("stats"), 2800)
    const t3 = setTimeout(() => handleEnter(), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [handleEnter])

  useEffect(() => {
    if (phase !== "stats") return
    const steps = 25
    const interval = 50
    let step = 0

    const timer = setInterval(() => {
      step++
      setCounters(statItems.map((s) => {
        const val = Math.min(Math.round((s.value / steps) * step), s.value)
        if (s.label === "Topics") return Math.min(val, s.value)
        return val
      }))
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [phase])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background transition-opacity duration-600",
        dismissing ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Animated Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, delay, x, y }) => (
          <div
            key={x + y}
            className={cn(
              "absolute transition-all duration-1000 text-muted-foreground/20",
              phase !== "logo" ? "opacity-0 scale-0" : "opacity-100 scale-100"
            )}
            style={{
              left: x,
              top: y,
              transitionDelay: `${delay}s`,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <Icon className="h-8 w-8" />
          </div>
        ))}
      </div>

      {/* Phase 1: Logo */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center transition-all duration-700",
          phase === "logo" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 absolute"
        )}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 mb-6">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          VULNEX
        </h1>
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
          Loading arsenal...
        </p>
      </div>

      {/* Phase 2: Intro */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center transition-all duration-700 px-6",
          phase === "intro" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 absolute"
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 mb-5">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">VULNEX</h2>
        <p className="mt-3 max-w-lg text-center text-sm text-muted-foreground leading-relaxed">
          A bug hunter&apos;s toolkit with <span className="text-primary font-semibold">{SITE_STATS.commandCount}+ commands</span> and <span className="text-primary font-semibold">50+ tools</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {sectionIcons.map((item, i) => {
            const IconComponent = item.Icon
            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1.5 transition-all duration-500"
                style={{
                  opacity: phase === "intro" ? 1 : 0,
                  transform: phase === "intro" ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${i * 100 + 300}ms`,
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconComponent className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Phase 3: Stats */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center transition-all duration-700 px-6",
          phase === "stats" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 absolute"
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 mb-5">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">VULNEX</h2>
        <div className="mt-8 flex items-center justify-center gap-8 sm:gap-12">
          {statItems.map((item, i) => (
            <div key={item.label} className="text-center">
              <span className="block text-3xl font-bold text-primary sm:text-4xl tabular-nums">
                {counters[i]}{item.label === "Commands" ? "+" : ""}
              </span>
              <span className="block text-xs text-muted-foreground mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
