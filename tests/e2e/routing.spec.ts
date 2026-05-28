import { test, expect } from "@playwright/test"

test.describe("Page routing", () => {
  test("home page loads with title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/VULNEX/)
  })

  test("methods page renders", async ({ page }) => {
    await page.goto("/methods")
    await expect(page.locator("h1")).toBeVisible()
  })

  test("rapid bug discovery page loads", async ({ page }) => {
    await page.goto("/methods/rapid-bug-discovery")
    await expect(page.locator("h1")).toContainText("Rapid Bug Discovery")
  })

  test("github recon page loads", async ({ page }) => {
    await page.goto("/recon/github-recon")
    await expect(page.locator("h1")).toContainText("GitHub Recon")
  })

  test("sql injection page loads", async ({ page }) => {
    await page.goto("/vulnerabilities/sql-injection")
    await expect(page.locator("h1")).toContainText("SQL Injection")
  })

  test("cloud pages load", async ({ page }) => {
    await page.goto("/cloud/s3-buckets")
    await expect(page.locator("h1")).toContainText("S3 Bucket")
  })
})
