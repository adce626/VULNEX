import { toolsData } from "../lib/tools-data"
import { sqlInjectionCategories } from "../lib/sql-injection-data"
import { ssrfCategories } from "../lib/ssrf-data"
import { wordpressCategories } from "../lib/wordpress-data"
import { ffufCategories } from "../lib/ffuf-data"
import { googleDorksData } from "../lib/google-dorks-data"

describe("tools-data.ts", () => {
  it("has 24 tools", () => {
    expect(toolsData.length).toBe(24)
  })

  it("each tool has required fields", () => {
    for (const tool of toolsData) {
      expect(tool.id).toBeTruthy()
      expect(tool.name).toBeTruthy()
      expect(tool.icon).toBeTruthy()
      expect(tool.category).toBeTruthy()
      expect(tool.description).toBeTruthy()
      expect(Array.isArray(tool.commands)).toBe(true)
      expect(Array.isArray(tool.whenToUse)).toBe(true)
      expect(Array.isArray(tool.notes)).toBe(true)
      expect(Array.isArray(tool.commonErrors)).toBe(true)
      expect(Array.isArray(tool.tags)).toBe(true)
    }
  })

  it("each command has command and description", () => {
    for (const tool of toolsData) {
      for (const cmd of tool.commands) {
        expect(typeof cmd.command).toBe("string")
        expect(typeof cmd.description).toBe("string")
      }
    }
  })
})

describe("sql-injection-data.ts", () => {
  it("has categories with commands", () => {
    expect(sqlInjectionCategories.length).toBeGreaterThan(0)
    for (const cat of sqlInjectionCategories) {
      expect(cat.category).toBeTruthy()
      expect(Array.isArray(cat.commands)).toBe(true)
      for (const cmd of cat.commands) {
        expect(typeof cmd.command).toBe("string")
        expect(typeof cmd.description).toBe("string")
      }
    }
  })
})

describe("ssrf-data.ts", () => {
  it("has categories with commands", () => {
    expect(ssrfCategories.length).toBeGreaterThan(0)
    for (const cat of ssrfCategories) {
      expect(cat.category).toBeTruthy()
      expect(Array.isArray(cat.commands)).toBe(true)
    }
  })
})

describe("wordpress-data.ts", () => {
  it("has categories with commands", () => {
    expect(wordpressCategories.length).toBeGreaterThan(0)
    for (const cat of wordpressCategories) {
      expect(cat.category).toBeTruthy()
      expect(Array.isArray(cat.commands)).toBe(true)
    }
  })
})

describe("ffuf-data.ts", () => {
  it("has categories with commands", () => {
    expect(ffufCategories.length).toBeGreaterThan(0)
    for (const cat of ffufCategories) {
      expect(cat.category).toBeTruthy()
      expect(Array.isArray(cat.commands)).toBe(true)
    }
  })
})

describe("google-dorks-data.ts", () => {
  it("has dorks with command field (not query)", () => {
    expect(googleDorksData.length).toBeGreaterThan(0)
    for (const cat of googleDorksData) {
      for (const dork of cat.dorks) {
        expect(typeof (dork as any).command).toBe("string")
        expect(typeof dork.description).toBe("string")
        expect((dork as any).query).toBeUndefined()
      }
    }
  })
})

describe("guides/*.ts files", () => {
  it("guides directory has 24 files", () => {
    const fs = require("fs")
    const path = require("path")
    const files = fs.readdirSync(path.join(__dirname, "../lib/guides"))
    const tsFiles = files.filter((f: string) => f.endsWith(".ts"))
    expect(tsFiles.length).toBe(24)
  })
})
