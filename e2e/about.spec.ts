import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders name and bio", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Nick Figliolia" })).toBeVisible();
    await expect(page.getByText(/I started in quality assurance/)).toBeVisible();
  });

  test("lists the tech stack", async ({ page }) => {
    for (const tech of ["React", "TypeScript", "Next.js", "Cloudflare Pages"]) {
      await expect(page.getByText(tech, { exact: true })).toBeVisible();
    }
  });

  test("shows availability card matching site config", async ({ page }) => {
    await expect(page.getByText("Open to projects")).toBeVisible();
    await expect(page.getByText(/1–2 clients at a time/)).toBeVisible();
  });

  test("CTA button links to the contact section on the home page", async ({ page }) => {
    await page.getByRole("link", { name: "Start a project →" }).click();
    await expect(page).toHaveURL("/#contact");
  });

  test("social links point to the right destinations", async ({ page }) => {
    await expect(page.getByRole("link", { name: /dev@nickfig\.dev/ })).toHaveAttribute(
      "href",
      "mailto:dev@nickfig.dev"
    );
    await expect(page.getByRole("link", { name: "GitHub ↗" })).toHaveAttribute(
      "href",
      "https://github.com/njf2125"
    );
    await expect(page.getByRole("link", { name: "LinkedIn ↗" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/nickfigliolia"
    );
  });
});
