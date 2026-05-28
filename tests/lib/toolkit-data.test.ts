import { describe, it, expect } from "vitest"
import { hueMap, sections, statCards } from "@/lib/toolkit-data"

describe("toolkit-data", () => {
  describe("hueMap", () => {
    it("has entries for all 17 sections", () => {
      expect(Object.keys(hueMap)).toHaveLength(17)
    })

    it("has numeric hue values", () => {
      Object.values(hueMap).forEach((val) => {
        expect(val).toBeTypeOf("number")
        expect(val).toBeGreaterThanOrEqual(0)
        expect(val).toBeLessThanOrEqual(360)
      })
    })

    it("includes sql-injection", () => {
      expect(hueMap["sql-injection"]).toBe(10)
    })
  })

  describe("sections", () => {
    it("has 17 sections", () => {
      expect(sections).toHaveLength(17)
    })

    it("each section has a unique id", () => {
      const ids = sections.map((s) => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it("each section has title, icon, color, and subs", () => {
      sections.forEach((sec) => {
        expect(sec.title).toBeTruthy()
        expect(typeof sec.icon === "function" || typeof sec.icon === "object").toBe(true)
        expect(sec.color).toContain("from-")
        expect(Array.isArray(sec.subs)).toBe(true)
        expect(sec.subs.length).toBeGreaterThan(0)
      })
    })

    it("each subcategory has items", () => {
      sections.forEach((sec) => {
        sec.subs.forEach((sub) => {
          expect(sub.title).toBeTruthy()
          expect(Array.isArray(sub.items)).toBe(true)
          expect(sub.items.length).toBeGreaterThan(0)
        })
      })
    })

    it("each command has name, command, and description", () => {
      sections.forEach((sec) => {
        sec.subs.forEach((sub) => {
          sub.items.forEach((item) => {
            expect(item.name).toBeTruthy()
            expect(item.command).toBeTruthy()
            expect(item.description).toBeTruthy()
          })
        })
      })
    })

    it("first section is subdomain enumeration", () => {
      expect(sections[0].id).toBe("subdomain")
      expect(sections[0].title).toBe("Subdomain Enumeration")
    })

    it("last section is SQL injection", () => {
      expect(sections[sections.length - 1].id).toBe("sql-injection")
    })

    it("has the expected section ids", () => {
      const expectedIds = [
        "subdomain", "asn-ip", "live-host", "urls", "nuclei",
        "sensitive-files", "params", "directory", "wordpress", "cors",
        "takeover", "git", "ssrf", "open-redirect", "lfi",
        "additional", "sql-injection",
      ]
      expect(sections.map((s) => s.id)).toEqual(expectedIds)
    })
  })

  describe("statCards", () => {
    it("has 4 stat cards", () => {
      expect(statCards).toHaveLength(4)
    })

    it("each stat card has icon, label, and value", () => {
      statCards.forEach((stat) => {
        expect(typeof stat.icon === "function" || typeof stat.icon === "object").toBe(true)
        expect(stat.label).toBeTruthy()
        expect(stat.value).toBeTruthy()
      })
    })
  })
})
