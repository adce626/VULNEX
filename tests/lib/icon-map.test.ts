import { describe, it, expect } from "vitest"
import { iconMap } from "@/lib/icon-map"

describe("iconMap", () => {
  it("has entries for all expected keys", () => {
    const expectedKeys = [
      "search", "bug", "server", "cloud", "wrench", "brain",
      "shield", "puzzle", "terminal", "siren", "target", "zap",
      "globe", "lock", "database", "code", "folder-search", "network", "key",
      "wand", "file-code", "sword",
    ]
    expectedKeys.forEach((key) => {
      expect(iconMap[key]).toBeDefined()
    })
  })

  it("has 22 entries", () => {
    expect(Object.keys(iconMap)).toHaveLength(22)
  })

  it("each entry is a valid React component", () => {
    Object.values(iconMap).forEach((comp) => {
      expect(typeof comp === "function" || typeof comp === "object").toBe(true)
    })
  })

  it("maps string keys to valid icons", () => {
    expect(iconMap["search"]).toBeTruthy()
    expect(iconMap["bug"]).toBeTruthy()
    expect(iconMap["terminal"]).toBeTruthy()
  })
})
