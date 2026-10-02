import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("index lists posts that link to their pages", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1, name: "Writing" })).toBeVisible();

    const firstPost = page.locator("main li a").first();
    const href = await firstPost.getAttribute("href");
    expect(href).toMatch(/^\/blog\/[\w-]+$/);

    await firstPost.click();
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "← Blog" })).toHaveAttribute("href", "/blog");
  });

  test("unknown post returns a 404", async ({ page }) => {
    const response = await page.goto("/blog/this-post-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("RSS feed is valid XML with at least one item", async ({ request }) => {
    const response = await request.get("/blog/rss.xml");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/rss+xml");
    const body = await response.text();
    expect(body).toContain("<rss");
    expect(body).toContain("<item>");
  });
});

test.describe("Retired case study URLs", () => {
  for (const slug of ["clientroom", "samepage"]) {
    test(`/work/${slug} redirects to the Syconos section`, async ({ page }) => {
      await page.goto(`/work/${slug}`);
      await expect(page).toHaveURL("/work#syconos");
      await expect(page.locator("#syconos")).toBeVisible();
    });
  }
});
