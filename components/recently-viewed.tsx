"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getRecentPages, type RecentPage } from "@/lib/recently-viewed"
import { Clock, ArrowRight } from "lucide-react"

export function RecentlyViewed() {
  const [pages, setPages] = useState<RecentPage[]>([])

  useEffect(() => {
    setPages(getRecentPages().slice(0, 5))
  }, [])

  if (pages.length === 0) return null

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 border-t border-border">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Recently Viewed</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {page.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
