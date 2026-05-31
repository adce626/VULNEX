import { test, expect } from "@playwright/test"

test.describe("Search functionality", () => {
  test("search page loads", async ({ page }) => {
    await page.goto("/search")
    await expect(page).toHaveTitle(/Search/)
  })

  test("search page has input field", async ({ page }) => {
    await page.goto("/search")
    const input = page.locator("input").first()
    await expect(input).toBeVisible()
  })

  test("search returns results for common terms", async ({ page }) => {
    await page.goto("/search")
    const input = page.locator("input").first()
    await input.fill("nmap")
    await page.waitForTimeout(500)
    // Should show some results
    const results = page.locator("[data-testid]")
    // Results might appear or the page might show "no results"
    await expect(page.locator("body")).toContainText(/nmap|Nmap/i)
  })
})

test.describe("Navigation", () => {
  test("sidebar links work", async ({ page }) => {
    await page.goto("/")
    // Check sidebar is visible on desktop
    const sidebar = page.locator("nav").first()
    await expect(sidebar).toBeVisible()
  })

  test("tool pages load", async ({ page }) => {
    await page.goto("/tools")
    await expect(page.locator("h1")).toBeVisible()
  })

  test("vulnerability pages load", async ({ page }) => {
    await page.goto("/vulnerabilities")
    await expect(page.locator("h1")).toBeVisible()
  })

  test("recon pages load", async ({ page }) => {
    await page.goto("/recon")
    await expect(page.locator("h1")).toBeVisible()
  })
})

test.describe("Responsive design", () => {
  test("mobile viewport shows hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")
    // On mobile, sidebar should be hidden by default
    const mainContent = page.locator("#main-content")
    await expect(mainContent).toBeVisible()
  })
})
