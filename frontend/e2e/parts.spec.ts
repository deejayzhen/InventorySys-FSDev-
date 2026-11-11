import { expect, test } from "@playwright/test";

test("adds a part", async ({ page }) => {
  const sku = `TEST-${Date.now()}`;

  await page.goto("http://localhost:5173");
  await page.getByPlaceholder("Name", { exact: true }).fill("Test Part");
  await page.getByPlaceholder("SKU", { exact: true }).fill(sku);
  await page.getByPlaceholder("Brand", { exact: true }).fill("Test Brand");
  await page.getByPlaceholder("Category", { exact: true }).fill("GPU");
  await page.getByPlaceholder("Quantity", { exact: true }).fill("3");
  await page.getByPlaceholder("Price", { exact: true }).fill("99.99");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText(sku)).toBeVisible();
});
