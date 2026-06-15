import { test, expect } from "@playwright/test";

// CI-safe smoke tests — page structure and navigation only (no video assets,
// which are served from local files not in the repo).

test("homepage loads with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Edu Menezes/);
});

test("hero renders the name and value prop", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Menezes");
  await expect(page.getByText(/motion designer/i).first()).toBeVisible();
});

test("conversion CTA is present in the header", async ({ page }) => {
  await page.goto("/");
  const cta = page.locator('header a:has-text("Start a project")');
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", /^mailto:/);
});

test("index lists project links", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator('#index a[href^="/projects/"]');
  expect(await cards.count()).toBeGreaterThanOrEqual(20);
});

test("project page renders title and back link", async ({ page }) => {
  await page.goto("/projects/one-second-ads");
  await expect(page.locator("h1")).toContainText("One Second Ads");
  await expect(page.getByText("Back to Index")).toBeVisible();
});

test("project page has prev/next navigation", async ({ page }) => {
  await page.goto("/projects/one-second-ads");
  const navLinks = page.locator('nav a[href^="/projects/"]');
  expect(await navLinks.count()).toBe(2);
});

test("unknown project returns the 404 page", async ({ page }) => {
  await page.goto("/projects/nonexistent-slug");
  await expect(page.locator("h1")).toContainText("404");
});
