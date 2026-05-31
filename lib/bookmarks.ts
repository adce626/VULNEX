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

export function exportBookmarks(): string {
  const bookmarks = getBookmarks()
  return JSON.stringify(bookmarks, null, 2)
}

export function importBookmarks(json: string): boolean {
  try {
    const imported: Bookmark[] = JSON.parse(json)
    if (!Array.isArray(imported)) return false
    const existing = getBookmarks()
    const existingCommands = new Set(existing.map((b) => b.command))
    let added = 0
    for (const bookmark of imported) {
      if (
        bookmark.command &&
        bookmark.description &&
        bookmark.pageTitle &&
        bookmark.pageUrl &&
        !existingCommands.has(bookmark.command)
      ) {
        existing.unshift(bookmark)
        existingCommands.add(bookmark.command)
        added++
      }
    }
    if (added > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 200)))
    }
    return true
  } catch {
    return false
  }
}
