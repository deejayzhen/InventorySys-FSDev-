import { expect, test } from "@playwright/test";

test("adds a part", async ({ page }) => {
  const sku = `TEST-${Date.now()}`;

  await page.goto("http://localhost:5173");
  await page.getByRole("button", { name: "Add Part" }).click();
  await page.getByPlaceholder("Name", { exact: true }).fill("AMD RX 5700 XT");
  await page.getByPlaceholder("SKU", { exact: true }).fill(sku);
  await page.getByPlaceholder("Brand", { exact: true }).fill("AMD");
  await page.getByPlaceholder("Category", { exact: true }).fill("GPU");
  await page.getByPlaceholder("Quantity", { exact: true }).fill("3");
  await page.getByPlaceholder("Price", { exact: true }).fill("99.99");
  await page.getByRole("button", { name: "Add", exact: true }).click();

  await expect(page.getByText(sku)).toBeVisible();
});
