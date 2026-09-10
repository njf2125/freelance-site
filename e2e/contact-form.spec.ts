import { test, expect, Page } from "@playwright/test";

async function goToContactForm(page: Page) {
  await page.goto("/#contact");
  await page.locator("#contact").scrollIntoViewIfNeeded();
}

test.describe("Contact form", () => {
  test("requires name, email, and message before submitting", async ({ page }) => {
    await goToContactForm(page);

    const submit = page.getByRole("button", { name: "Send message" });
    await submit.click();

    // Native HTML5 validation blocks submission — the form stays on the page.
    await expect(page.getByLabel("Name")).toBeFocused();
  });

  test("submits successfully and shows a confirmation message", async ({ page }) => {
    await page.route("https://api.web3forms.com/submit", async (route) => {
      const body = route.request().postDataJSON();
      expect(body.name).toBe("Jane Smith");
      expect(body.email).toBe("jane@company.com");
      expect(body.message).toBe("I need a custom dashboard built.");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await goToContactForm(page);

    await page.getByLabel("Name").fill("Jane Smith");
    await page.getByLabel("Email").fill("jane@company.com");
    await page.getByLabel("Message").fill("I need a custom dashboard built.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Message sent. I'll be in touch within a day or two.")).toBeVisible();
  });

  test("shows an error message when submission fails", async ({ page }) => {
    await page.route("https://api.web3forms.com/submit", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid access key." }),
      });
    });

    await goToContactForm(page);

    await page.getByLabel("Name").fill("Jane Smith");
    await page.getByLabel("Email").fill("jane@company.com");
    await page.getByLabel("Message").fill("Hello there.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Invalid access key.")).toBeVisible();
    // Form should still be usable for a retry.
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("honeypot field is hidden from real users", async ({ page }) => {
    await goToContactForm(page);
    await expect(page.locator('input[name="botcheck"]')).toBeHidden();
  });
});
