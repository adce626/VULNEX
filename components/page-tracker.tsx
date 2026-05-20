"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { addRecentPage } from "@/lib/recently-viewed"

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    let title = document.title
    if (title === "VULNEX" || !title) title = "Home"
    else title = title.replace(" | VULNEX", "")
    addRecentPage({ title, href: pathname })
  }, [pathname])

  return null
}
