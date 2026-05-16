"use client"

const STORAGE_KEY = "vulnex_bookmarks"

export interface Bookmark {
  command: string
  description: string
  pageTitle: string
  pageUrl: string
  timestamp: number
}

export function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addBookmark(bookmark: Omit<Bookmark, "timestamp">) {
  const bookmarks = getBookmarks()
  const exists = bookmarks.some((b) => b.command === bookmark.command)
  if (exists) return
  bookmarks.unshift({ ...bookmark, timestamp: Date.now() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks.slice(0, 200)))
}

export function removeBookmark(command: string) {
  const bookmarks = getBookmarks().filter((b) => b.command !== command)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function isBookmarked(command: string): boolean {
  return getBookmarks().some((b) => b.command === command)
}

export function clearBookmarks() {
  localStorage.removeItem(STORAGE_KEY)
}
