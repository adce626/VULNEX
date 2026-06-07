"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  label: string
  suffix?: string
}

export function AnimatedCounter({ value, label, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return

    const duration = 1200
    const steps = 30
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [visible, value])

  return (
    <div ref={ref} className="text-center">
      <span className="text-2xl font-bold text-primary sm:text-3xl tabular-nums">
        {count}{suffix}
      </span>
      <span className="block text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  )
}
