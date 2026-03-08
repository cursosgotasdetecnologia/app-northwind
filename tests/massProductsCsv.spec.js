import { test, expect } from "@playwright/test";
import fs from 'fs';
import Papa from 'papaparse';
const ProductsPage = require("../pages/ProductsPage");
const CreateProductModal = require("../components/products/createProductModal");

// ← substitui o require do JSON
const csvFile = fs.readFileSync('fixtures/product-mass.csv', 'utf-8');
const { data: produtos } = Papa.parse(csvFile, {
  header: true,
  skipEmptyLines: true,
});

test.describe("Cadastro em Massa via CSV", () => {
  let modal;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    modal = new CreateProductModal(page);
    productsPage = new ProductsPage(page);

    await page.goto("/");
    await page.getByTestId("email-input").fill(process.env.USER_EMAIL);
    await page.getByTestId("password-input").fill(process.env.USER_PASSWORD);
    await page.getByTestId("login-button").click();

    await page.waitForURL("**/products");
    await page
      .locator("table tbody tr")
      .first()
      .waitFor({ state: "visible", timeout: 25000 });
  });

  test('Deve cadastrar produtos em massa via CSV', async ({ page }) => {
    test.setTimeout(120000);

    for (const produto of produtos) { // ← nome da variavel mudou
      console.log(`Criando: ${produto.name}`);

      await productsPage.addProductButton.waitFor({ state: 'visible' });
      await productsPage.addProductButton.click();
      await modal.nameInput.waitFor({ state: 'visible' });

      await modal.fillName(produto.name);
      await modal.fillSku(produto.sku);
      await modal.fillPrice(produto.price); // ← sem String(), papaparse já é string
      await modal.fillStock(produto.stock); // ← sem String()
      await modal.selectCategory(produto.category);
      await modal.selectSupplier(produto.supplier);

      await modal.submit();

      await modal.nameInput.waitFor({ state: 'hidden', timeout: 15000 });
      await page.locator('table tbody tr').first().waitFor({ state: 'visible' });
    }
  });
});