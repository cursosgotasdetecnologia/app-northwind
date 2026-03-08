import { test, expect } from '@playwright/test';
const ProductsPage = require('../pages/productsPage');

test.describe('[Gestao de Produtos] Busca Dinamica', () => {
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

  test('Deve filtrar produtos pelo termo buscado', async ({ page }) => {
    const termo = 'RGB';
    const rows = page.locator('table tbody tr');

    // conta antes de filtrar — tabela ja tem linhas
    const totalAntes = await rows.count();

    await productsPage.searchInput.fill(termo);

    // aguarda a tabela mudar de tamanho
    await expect(rows).not.toHaveCount(totalAntes, { timeout: 10000 });

    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    // valida linha a linha que todos contem o termo
    for (let i = 0; i < count; i++) {
      const nomeProduto = await rows.nth(i).locator('td').nth(1).textContent();
      expect(nomeProduto.toLowerCase()).toContain(termo.toLowerCase());
    }
  });

  test('Deve exibir lista vazia quando nenhum produto for encontrado', async ({ page }) => {
    const rows = page.locator('table tbody tr');
    const totalAntes = await rows.count();

    await productsPage.searchInput.fill('zzzzz_inexistente');

    // aguarda a tabela mudar
    await expect(rows).not.toHaveCount(totalAntes, { timeout: 10000 });

    expect(await rows.count()).toBe(0);
  });
});
