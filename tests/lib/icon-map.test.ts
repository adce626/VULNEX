import { describe, it, expect } from "vitest"
import { iconMap } from "@/lib/icon-map"

describe("iconMap", () => {
  it("has entries for all expected keys", () => {
    const expectedKeys = [
      "search", "bug", "server", "cloud", "wrench", "brain",
      "shield", "puzzle", "terminal", "siren", "target", "zap",
      "globe", "lock", "database", "code", "folder-search", "network", "key",
    ]
    expectedKeys.forEach((key) => {
      expect(iconMap[key]).toBeDefined()
    })
  })

  it("has 19 entries", () => {
    expect(Object.keys(iconMap)).toHaveLength(19)
  })

  it("each entry is a React component", () => {
    Object.values(iconMap).forEach((comp) => {
      expect(comp).toBeTypeOf("function")
    })
  })

  it("maps string keys to valid icons", () => {
    expect(iconMap["search"]?.displayName || iconMap["search"]?.name).toBeTruthy()
    expect(iconMap["bug"]?.displayName || iconMap["bug"]?.name).toBeTruthy()
  })
})
