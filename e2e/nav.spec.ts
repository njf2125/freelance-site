import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("logo links back to home", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("banner").getByRole("link", { name: "nickfig.dev" }).click();
    await expect(page).toHaveURL("/");
  });

  test("nav links go to Work, Blog, and About", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("navigation").getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL("/work");

    await page.getByRole("navigation").getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL("/blog");

    await page.getByRole("navigation").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
  });

  test("Start a project nav link jumps to the contact section", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("navigation").getByRole("link", { name: "Start a project" }).click();
    await expect(page).toHaveURL("/#contact");
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("nav stays visible while scrolling (sticky header)", async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 2000);
    await expect(page.getByRole("banner")).toBeInViewport();
  });

  test("footer social links are present and open in a new tab", async ({ page }) => {
    await page.goto("/");
    const github = page.getByRole("contentinfo").getByRole("link", { name: "GitHub" });
    const linkedin = page.getByRole("contentinfo").getByRole("link", { name: "LinkedIn" });

    await expect(github).toHaveAttribute("href", "https://github.com/njf2125");
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", "noopener noreferrer");

    await expect(linkedin).toHaveAttribute("href", "https://linkedin.com/in/nickfigliolia");
    await expect(linkedin).toHaveAttribute("target", "_blank");
  });
});
