"use client"

const STORAGE_KEY = "vulnex_recent"

export interface RecentPage {
  title: string
  href: string
  timestamp: number
}

export function getRecentPages(): RecentPage[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addRecentPage(page: Omit<RecentPage, "timestamp">) {
  const pages = getRecentPages().filter((p) => p.href !== page.href)
  pages.unshift({ ...page, timestamp: Date.now() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages.slice(0, 10)))
}
