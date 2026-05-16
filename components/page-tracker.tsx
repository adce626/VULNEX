"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { addRecentPage } from "@/lib/recently-viewed"

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const title = document.title.replace(" | VULNEX", "") || "Home"
    addRecentPage({ title, href: pathname })
  }, [pathname])

  return null
}
