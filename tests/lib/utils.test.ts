import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn (clsx + tailwind-merge)", () => {
  it("merges class names", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
  })

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra")
  })

  it("handles undefined and null", () => {
    expect(cn("base", undefined, null)).toBe("base")
  })

  it("handles empty input", () => {
    expect(cn()).toBe("")
  })

  it("handles Tailwind conflicting classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("handles responsive classes", () => {
    expect(cn("p-2", "md:p-4")).toBe("p-2 md:p-4")
  })

  it("merges arrays", () => {
    expect(cn(["p-2", "p-4"])).toBe("p-4")
  })
})
