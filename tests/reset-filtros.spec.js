import { test, expect } from '@playwright/test';
const ProductsPage = require('../pages/ProductsPage');

test.describe('[Gestao de Produtos] Reset de Filtros', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await page.goto('/');
    await page.getByTestId('email-input').fill(process.env.USER_EMAIL);
    await page.getByTestId('password-input').fill(process.env.USER_PASSWORD);
    await page.getByTestId('login-button').click();
    await page.locator('table tbody tr').first()
      .waitFor({ state: 'visible', timeout: 15000 });
  });

  test('Deve limpar todos os filtros e restaurar a lista completa', async ({ page }) => {
    const rows = page.locator('table tbody tr');

    // 1 — conta antes de filtrar
    const totalInicial = await rows.count();

    // 2 — aplica os 3 filtros
    await productsPage.searchInput.fill('Cinto');
    
    await expect(rows).not.toHaveCount(totalInicial, { timeout: 10000 });

    await productsPage.categoryFilter.selectOption('Informática');
    await productsPage.supplierFilter.selectOption('4'); // GlobalTech Imports

    // aguarda estabilizar apos os 3 filtros
    await page.waitForTimeout(500);

    // 3 — valida que filtrou
    const totalFiltrado = await rows.count();
    expect(totalFiltrado).toBeLessThanOrEqual(totalInicial);

    // 4 — limpa os filtros
    await productsPage.clearFilters();

    // 5 — aguarda voltar ao total inicial
    await expect(rows).toHaveCount(totalInicial, { timeout: 10000 });

    // 6 — valida que os campos voltaram vazios
    await expect(productsPage.searchInput).toHaveValue('');
    await expect(productsPage.categoryFilter).toHaveValue('');
    await expect(productsPage.supplierFilter).toHaveValue('');
  });
});