import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero with headline and CTAs", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: /I build the software that actually fits/i })
    ).toBeVisible();

    await expect(page.getByRole("link", { name: "Start a project →" }).first()).toHaveAttribute(
      "href",
      "#contact"
    );
    await expect(page.getByRole("link", { name: "See the work →" })).toHaveAttribute(
      "href",
      "/work"
    );
  });

  test("shows the availability indicator from site config", async ({ page }) => {
    // siteConfig.availability is "available" — pulsing dot + copy.
    await expect(page.getByText("Available for new projects")).toBeVisible();
  });

  test("lists client work, personal projects, and Syconos products", async ({ page }) => {
    const workSection = page.locator("section", { hasText: "Work" }).first();

    for (const title of ["CDR Dashboard", "SoilCheck", "Syconos", "PlotLock", "Client Room", "PitchInILM"]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }

    // Client work gets the "Live client work" badge, personal projects don't.
    await expect(page.getByText("Live client work")).toBeVisible();
    await expect(page.getByText("Personal project").first()).toBeVisible();

    void workSection;
  });

  function projectCard(page: import("@playwright/test").Page, title: string) {
    // The card wrapper is the nearest ancestor with the `group` class —
    // the heading also sits inside a narrower header row div, so a plain
    // ancestor `div` lookup is ambiguous.
    return page
      .getByRole("heading", { name: title })
      .locator("xpath=ancestor::div[contains(concat(' ', normalize-space(@class), ' '), ' group ')][1]");
  }

  test("case study links navigate to the matching case study page", async ({ page }) => {
    await projectCard(page, "CDR Dashboard").getByRole("link", { name: "Case study →" }).click();

    await expect(page).toHaveURL("/work/cdr-dash");
  });

  test("external project links open in a new tab", async ({ page }) => {
    const soilCheckLink = projectCard(page, "SoilCheck").getByRole("link", {
      name: "Visit live ↗",
    });

    await expect(soilCheckLink).toHaveAttribute("href", "https://soilcheck.app");
    await expect(soilCheckLink).toHaveAttribute("target", "_blank");
    await expect(soilCheckLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders the How I Work process steps", async ({ page }) => {
    await expect(page.getByText("How I Work")).toBeVisible();
    for (const step of ["Discovery", "Build", "Launch"]) {
      await expect(page.getByRole("heading", { name: step, exact: true })).toBeVisible();
    }
  });

  test("contact section shows rate and capacity copy from site config", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.getByText(/I take on 1–2 clients at a time/)).toBeVisible();
    await expect(page.getByText(/Projects start from \$2,500/)).toBeVisible();
  });
});
