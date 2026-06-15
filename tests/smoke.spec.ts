import { test, expect } from "@playwright/test";

test("homepage loads with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Edu Menezes/);
});

test("homepage renders Hero section", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("MENEZES");
});

test("project page loads correctly", async ({ page }) => {
  await page.goto("/projects/adidas-inevitable");
  await expect(page.locator("h1")).toContainText("Adidas Inevitable");
});

test("project page has Index and About links", async ({ page }) => {
  await page.goto("/projects/adidas-inevitable");
  await expect(page.getByText("← Index")).toBeVisible();
  await expect(page.getByText("About")).toBeVisible();
});

test("404 page shows correct message", async ({ page }) => {
  await page.goto("/projects/nonexistent-slug");
  await expect(page.locator("h1")).toContainText("404");
});
