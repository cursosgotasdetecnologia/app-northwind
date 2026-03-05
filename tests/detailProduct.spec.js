import { test, expect } from "@playwright/test";
import ProductDetailModal from "../components/products/productDetailModal";
const ProductsPage = require("../pages/ProductsPage");

test.describe("[Gestão de Produtos] Detalhes do Produto", () => {
  let productsPage;
  let detailModal;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    detailModal = new ProductDetailModal(page);

    await page.goto("/");
    await page.getByTestId("email-input").fill(process.env.USER_EMAIL);
    await page.getByTestId("password-input").fill(process.env.USER_PASSWORD);
    await page.getByTestId("login-button").click();

    await page.waitForURL("**/products");
    await page
      .locator("table tbody tr")
      .first()
      .waitFor({ state: "visible", timeout: 3000 });
  });

  // ─────────────────────────────────────────────────────────────
  // Abrir modal
  // ─────────────────────────────────────────────────────────────

  test("Deve abrir o modal de detalhes do primeiro produto", async ({
    page,
  }) => {
    const rows = page.locator("table tbody tr");
    await rows.first().getByRole("button", { name: "Detalhes" }).click();

    await expect(detailModal.heading).toBeVisible();
  });

  test("Deve abrir o modal de detalhes do último produto da página", async ({
    page,
  }) => {
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    await rows
      .nth(count - 1)
      .getByRole("button", { name: "Detalhes" })
      .click();
    await expect(detailModal.heading).toBeVisible();
    await detailModal.close();
  });

  // ─────────────────────────────────────────────────────────────
  // Validar campos do modal
  // ─────────────────────────────────────────────────────────────

  test("Deve exibir todos os campos no modal de detalhes", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await rows.first().getByRole("button", { name: "Detalhes" }).click();

    await expect(detailModal.heading).toBeVisible();
    await expect(detailModal.fieldId).toBeVisible();
    await expect(detailModal.fieldSku).toBeVisible();
    await expect(detailModal.fieldNome).toBeVisible();
    await expect(detailModal.fieldPreco).toBeVisible();
    await expect(detailModal.fieldEstoque).toBeVisible();
    await expect(detailModal.fieldCategoria).toBeVisible();
    await expect(detailModal.fieldFornecedor).toBeVisible();
    await expect(detailModal.fieldSlug).toBeVisible();

    //await detailModal.close();
  });

  // ─────────────────────────────────────────────────────────────
  // Botões do modal
  // ─────────────────────────────────────────────────────────────

  test("Deve fechar o modal ao clicar em OK entendi", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await rows.first().getByRole("button", { name: "Detalhes" }).click();
    await expect(detailModal.heading).toBeVisible();

    await detailModal.close();

    await expect(detailModal.heading).toBeHidden();
  });

  test("Deve fechar o modal ao clicar em Cancelar", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await rows.first().getByRole("button", { name: "Detalhes" }).click();
    await expect(detailModal.heading).toBeVisible();

    await detailModal.cancel();

    await expect(detailModal.heading).toBeHidden();
  });

  // ─────────────────────────────────────────────────────────────
  // Imprimir
  // ─────────────────────────────────────────────────────────────

  test("Deve abrir nova aba ao clicar em Imprimir", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await rows.first().getByRole("button", { name: "Detalhes" }).click();
    await expect(detailModal.heading).toBeVisible();

    const popup = await detailModal.print();

    expect(popup).toBeTruthy();
    await popup.waitForLoadState("load");
   
    const titulo = await popup.title();
    expect(titulo).toContain("QA Automation Shop");

    await popup.screenshot({ path: "screenshots/print-preview.png" });
    //await popup.close();
  });

  
});
