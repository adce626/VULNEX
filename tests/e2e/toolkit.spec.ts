import { test, expect } from "@playwright/test"

test.describe("Toolkit page", () => {
  test("loads the toolkit page", async ({ page }) => {
    await page.goto("/toolkit")
    await expect(page).toHaveTitle(/Toolkit/)
  })

  test("displays the page title", async ({ page }) => {
    await page.goto("/toolkit")
    await expect(page.locator("text=Quick Recon Toolkit")).toBeVisible()
  })

  test("has a domain input field", async ({ page }) => {
    await page.goto("/toolkit")
    const input = page.locator('input[placeholder*="domain"]')
    await expect(input).toBeVisible()
  })

  test("has a Generate button", async ({ page }) => {
    await page.goto("/toolkit")
    const btn = page.locator("text=Generate")
    await expect(btn).toBeVisible()
  })

  test("has a theme toggle button", async ({ page }) => {
    await page.goto("/toolkit")
    const toggle = page.locator("text=Dark")
    await expect(toggle).toBeVisible()
  })

  test("domain input accepts text", async ({ page }) => {
    await page.goto("/toolkit")
    const input = page.locator('input[placeholder*="domain"]')
    await input.fill("test.com")
    await expect(input).toHaveValue("test.com")
  })

  test("sections are visible after scroll", async ({ page }) => {
    await page.goto("/toolkit")
    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(1000)
    // Check that at least one section header is visible
    const sections = page.locator("text=Subdomain Enumeration")
    await expect(sections).toBeVisible()
  })
})
