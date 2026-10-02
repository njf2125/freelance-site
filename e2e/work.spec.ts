import { test, expect } from "@playwright/test";

const CASE_STUDIES = [
  { slug: "cdr-dash", title: "CDR Dashboard" },
  { slug: "soilcheck", title: "SoilCheck" },
];

test.describe("Work index page", () => {
  test("lists every case study", async ({ page }) => {
    await page.goto("/work");

    await expect(page.getByRole("heading", { level: 1, name: "Selected work" })).toBeVisible();

    for (const { title } of CASE_STUDIES) {
      await expect(page.getByRole("heading", { name: title, level: 3 })).toBeVisible();
    }
  });

  for (const { slug, title } of CASE_STUDIES) {
    test(`"${title}" card links to /work/${slug}`, async ({ page }) => {
      await page.goto("/work");
      await page.getByRole("heading", { name: title, level: 3 }).click();
      await expect(page).toHaveURL(`/work/${slug}`);
    });
  }
});

test.describe("Case study pages", () => {
  for (const { slug, title } of CASE_STUDIES) {
    test(`${slug} renders title, stack, and summary columns`, async ({ page }) => {
      await page.goto(`/work/${slug}`);

      await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
      await expect(page.getByText("Case Study")).toBeVisible();
      await expect(page.getByText("Problem", { exact: true })).toBeVisible();
      await expect(page.getByText("What Was Built")).toBeVisible();
      await expect(page.getByText("Outcome", { exact: true })).toBeVisible();
    });
  }

  test("back link returns to the work index", async ({ page }) => {
    await page.goto("/work/cdr-dash");
    await page.getByRole("link", { name: "← Work" }).click();
    await expect(page).toHaveURL("/work");
  });

  test("next project link navigates to another case study", async ({ page }) => {
    await page.goto("/work/cdr-dash");
    const nextLink = page.getByText("Next Project").locator("..").getByRole("link");
    const href = await nextLink.getAttribute("href");
    expect(href).toMatch(/^\/work\//);

    await nextLink.click();
    await expect(page).toHaveURL(href!);
  });

  test("unknown slug returns a 404", async ({ page }) => {
    const response = await page.goto("/work/this-project-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("bottom CTA links to the contact section", async ({ page }) => {
    await page.goto("/work/soilcheck");
    await page
      .getByRole("link", { name: "Start a project →" })
      .last()
      .click();
    await expect(page).toHaveURL("/#contact");
  });
});
