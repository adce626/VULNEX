"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { iconMap } from "@/lib/icon-map"
import { sectionCards } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const items = sectionCards.slice(0, 8)

export function FeaturedCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const total = Math.ceil(items.length / 2)

  const goTo = useCallback((i: number) => {
    setCurrent((i + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (isPaused) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(next, 4000)
    return () => clearInterval(timerRef.current)
  }, [next, isPaused])

  const visibleItems = [items[current * 2], items[current * 2 + 1]].filter(Boolean)

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Featured Sections</h2>
        <div className="flex gap-1">
          <button
            onClick={prev}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="grid gap-3 sm:grid-cols-2 transition-opacity duration-500"
          key={current}
        >
          {visibleItems.map((card) => {
            if (!card) return null
            const Icon = iconMap[card.icon]
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg animate-fade-up"
                style={{ animationDuration: "0.4s" }}
              >
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <div className={cn(
                  "mb-3 flex h-9 w-9 items-center justify-center rounded-lg",
                  card.color === "primary" && "bg-primary/10 text-primary",
                  card.color === "destructive" && "bg-destructive/10 text-destructive",
                  card.color === "accent" && "bg-accent/10 text-accent"
                )}>
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{card.description}</p>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
