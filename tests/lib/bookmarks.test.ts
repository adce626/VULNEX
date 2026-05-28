import { describe, it, expect, beforeEach } from "vitest"
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  clearBookmarks,
} from "@/lib/bookmarks"

const STORAGE_KEY = "vulnex_bookmarks"

describe("bookmarks", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("returns empty array when no bookmarks", () => {
    expect(getBookmarks()).toEqual([])
  })

  it("adds a bookmark", () => {
    addBookmark({
      command: "nmap -sV target.com",
      description: "Service scan",
      pageTitle: "Nmap",
      pageUrl: "/tools/nmap",
    })
    const bookmarks = getBookmarks()
    expect(bookmarks).toHaveLength(1)
    expect(bookmarks[0].command).toBe("nmap -sV target.com")
    expect(bookmarks[0].description).toBe("Service scan")
    expect(bookmarks[0].pageTitle).toBe("Nmap")
    expect(bookmarks[0].pageUrl).toBe("/tools/nmap")
    expect(bookmarks[0].timestamp).toBeTypeOf("number")
  })

  it("does not add duplicate bookmarks", () => {
    addBookmark({ command: "nmap -sV target.com", description: "Test", pageTitle: "Nmap", pageUrl: "/tools/nmap" })
    addBookmark({ command: "nmap -sV target.com", description: "Test", pageTitle: "Nmap", pageUrl: "/tools/nmap" })
    expect(getBookmarks()).toHaveLength(1)
  })

  it("removes a bookmark", () => {
    addBookmark({ command: "nmap -sV target.com", description: "Test", pageTitle: "Nmap", pageUrl: "/tools/nmap" })
    removeBookmark("nmap -sV target.com")
    expect(getBookmarks()).toHaveLength(0)
  })

  it("checks if command is bookmarked", () => {
    expect(isBookmarked("nmap -sV target.com")).toBe(false)
    addBookmark({ command: "nmap -sV target.com", description: "Test", pageTitle: "Nmap", pageUrl: "/tools/nmap" })
    expect(isBookmarked("nmap -sV target.com")).toBe(true)
  })

  it("clears all bookmarks", () => {
    addBookmark({ command: "cmd1", description: "Test1", pageTitle: "Page1", pageUrl: "/page1" })
    addBookmark({ command: "cmd2", description: "Test2", pageTitle: "Page2", pageUrl: "/page2" })
    clearBookmarks()
    expect(getBookmarks()).toHaveLength(0)
  })

  it("limits bookmarks to 200", () => {
    for (let i = 0; i < 210; i++) {
      addBookmark({ command: `cmd-${i}`, description: `Test ${i}`, pageTitle: "Page", pageUrl: "/page" })
    }
    expect(getBookmarks()).toHaveLength(200)
  })

  it("adds new bookmarks at the beginning", () => {
    addBookmark({ command: "first", description: "First", pageTitle: "P1", pageUrl: "/p1" })
    addBookmark({ command: "second", description: "Second", pageTitle: "P2", pageUrl: "/p2" })
    const bookmarks = getBookmarks()
    expect(bookmarks[0].command).toBe("second")
    expect(bookmarks[1].command).toBe("first")
  })

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "not-valid-json{{{")
    expect(getBookmarks()).toEqual([])
  })
})
