import { describe, it, expect, beforeEach } from "vitest"
import { getRecentPages, addRecentPage } from "@/lib/recently-viewed"

describe("recently-viewed", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("returns empty array when no recent pages", () => {
    expect(getRecentPages()).toEqual([])
  })

  it("adds a recent page", () => {
    addRecentPage({ title: "Nmap", href: "/tools/nmap" })
    const pages = getRecentPages()
    expect(pages).toHaveLength(1)
    expect(pages[0].title).toBe("Nmap")
    expect(pages[0].href).toBe("/tools/nmap")
    expect(pages[0].timestamp).toBeTypeOf("number")
  })

  it("moves duplicate pages to the top", () => {
    addRecentPage({ title: "Nmap", href: "/tools/nmap" })
    addRecentPage({ title: "Sqlmap", href: "/tools/sqlmap" })
    addRecentPage({ title: "Nmap", href: "/tools/nmap" })
    const pages = getRecentPages()
    expect(pages).toHaveLength(2)
    expect(pages[0].title).toBe("Nmap")
    expect(pages[1].title).toBe("Sqlmap")
  })

  it("limits recent pages to 10", () => {
    for (let i = 0; i < 15; i++) {
      addRecentPage({ title: `Page ${i}`, href: `/page-${i}` })
    }
    expect(getRecentPages()).toHaveLength(10)
  })

  it("adds new pages at the beginning", () => {
    addRecentPage({ title: "First", href: "/first" })
    addRecentPage({ title: "Second", href: "/second" })
    const pages = getRecentPages()
    expect(pages[0].title).toBe("Second")
    expect(pages[1].title).toBe("First")
  })

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("vulnex_recent", "bad-json{{{")
    expect(getRecentPages()).toEqual([])
  })
})
