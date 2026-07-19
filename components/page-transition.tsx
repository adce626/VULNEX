"use client"

import { type ReactNode, useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [animating, setAnimating] = useState(false)
  const isMobile = useRef(false)

  useEffect(() => {
    isMobile.current = window.innerWidth < 768
    const handleResize = () => { isMobile.current = window.innerWidth < 768 }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isMobile.current) return
    setAnimating(true)
    const t = setTimeout(() => setAnimating(false), 400)
    return () => clearTimeout(t)
  }, [pathname])

  return <div className={animating ? "animate-fade-up" : ""}>{children}</div>
}
