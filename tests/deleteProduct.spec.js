import { test, expect } from '@playwright/test';
const DeleteConfirmationDialog = require('../components/products/deleteConfirmationDialog');
const dados = require('../fixtures/products-data.json');
const ProductsPage = require("../pages/ProductsPage");

test.describe('[Gestão de Produtos] Exclusão de Produtos', () => {
    let productsPage;
    let dialog;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        dialog = new DeleteConfirmationDialog(page);

        await page.goto('/');
        await page.getByTestId('email-input').fill(process.env.USER_EMAIL);
        await page.getByTestId('password-input').fill(process.env.USER_PASSWORD);
        await page.getByTestId('login-button').click();

        await page.waitForURL('**/products');
        await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 15000 });
    });

    // ─────────────────────────────────────────────────────────────
    // Diálogo de confirmação
    // ─────────────────────────────────────────────────────────────

 test('Deve exibir o diálogo de confirmação ao clicar em excluir', async () => {
        await productsPage.clickDeleteLastProduct();

        await expect(dialog.heading).toBeVisible();
        await expect(dialog.bodyText).toBeVisible();
        await expect(dialog.confirmButton).toBeVisible();
        await expect(dialog.cancelButton).toBeVisible();

        //await dialog.cancel();
    });


    // Cancelar exclusão
    // ─────────────────────────────────────────────────────────────

    test('Deve manter o produto quando a exclusão for cancelada', async ({ page }) => {
        const nomeProduto = await productsPage.getLastProductName();

        await productsPage.clickDeleteLastProduct();
        await expect(dialog.heading).toBeVisible();

        await dialog.cancel();

        await expect(page.locator('table')).toContainText(nomeProduto);
    });










    // ─────────────────────────────────────────────────────────────
    // Excluir último produto
    // ─────────────────────────────────────────────────────────────

    test('Deve excluir o último produto da página após confirmação', async ({ page }) => {
        const nomeProduto = await productsPage.getLastProductName();

        await productsPage.clickDeleteLastProduct();
        await expect(dialog.heading).toBeVisible();
        await dialog.confirm();

        await productsPage.searchInput.fill(nomeProduto);
        await expect(page.getByText(dados.produtoInexistente.esperado.mensagem)).toBeVisible();
    });

});