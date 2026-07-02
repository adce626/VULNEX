"use client"

import { type ReactNode, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setAnimating(true)
    const t = setTimeout(() => setAnimating(false), 400)
    return () => clearTimeout(t)
  }, [pathname])

  return <div className={animating ? "animate-fade-up" : ""}>{children}</div>
}
