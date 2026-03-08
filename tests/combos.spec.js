import { test, expect } from '@playwright/test';
const ProductsPage = require('../pages/productsPage');
const fornecedores = require('../fixtures/combo-fornecedores.json');
const categorias = require('../fixtures/combo-categorias.json');

test.describe('[Gestao de Produtos] Validacao dos Combos', () => {
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

  // ─────────────────────────────────────────────────────────────
  test.describe('Fornecedores', () => {

    test('Deve exibir o combo de fornecedores na tela', async () => {
      await expect(productsPage.supplierFilter).toBeVisible();
    });

    test('Deve exibir a opcao padrao Todos os fornecedores', async () => {
      await expect(productsPage.supplierFilter).toHaveValue('');
    });

    test('Deve conter todos os fornecedores esperados no combo', async () => {
      for (const fornecedor of fornecedores.valores) {
        // usa value exato para evitar match parcial
        const option = productsPage.supplierFilter.locator(`option[value="${fornecedor.value}"]`);
        await expect(option).toHaveText(fornecedor.label);
      }
    });

    test('Nao deve conter fornecedores fora da lista esperada', async () => {
      const esperados = fornecedores.valores.map(f => f.label);
      const options = productsPage.supplierFilter.locator('option:not([value=""])');
      const count = await options.count();

      for (let i = 0; i < count; i++) {
        const texto = (await options.nth(i).textContent()).trim();
        expect(esperados).toContain(texto);
      }
    });

    test('Deve conter exatamente o numero esperado de fornecedores', async () => {
      const options = productsPage.supplierFilter.locator('option:not([value=""])');
      expect(await options.count()).toBe(fornecedores.valores.length);
    });

    test('Listar todos os fornecedores no terminal', async () => {
      const options = productsPage.supplierFilter.locator('option:not([value=""])');
      const count = await options.count();
      console.log(`\n— Fornecedores no combo (${count} itens) —`);
      for (let i = 0; i < count; i++) {
        const texto = (await options.nth(i).textContent()).trim();
        console.log(`  ${i + 1}. ${texto}`);
      }
    });

  });

  // ─────────────────────────────────────────────────────────────
  test.describe('Categorias', () => {

    test('Deve exibir o combo de categorias na tela', async () => {
      await expect(productsPage.categoryFilter).toBeVisible();
    });

    test('Deve exibir a opcao padrao Todas as categorias', async () => {
      await expect(productsPage.categoryFilter).toHaveValue('');
    });

    test('Deve conter todas as categorias esperadas no combo', async () => {
      for (const categoria of categorias.valores) {
        // categorias usam o proprio nome como value — match exato
        const option = productsPage.categoryFilter.locator(`option[value="${categoria.value}"]`);
        await expect(option).toHaveText(categoria.label);
      }
    });

    test('Nao deve conter categorias fora da lista esperada', async () => {
      const esperados = categorias.valores.map(c => c.label);
      const options = productsPage.categoryFilter.locator('option:not([value=""])');
      const count = await options.count();

      for (let i = 0; i < count; i++) {
        const texto = (await options.nth(i).textContent()).trim();
        expect(esperados).toContain(texto);
      }
    });

    test('Deve conter exatamente o numero esperado de categorias', async () => {
      const options = productsPage.categoryFilter.locator('option:not([value=""])');
      expect(await options.count()).toBe(categorias.valores.length);
    });

    test('Listar todas as categorias no terminal', async () => {
      const options = productsPage.categoryFilter.locator('option:not([value=""])');
      const count = await options.count();
      console.log(`\n— Categorias no combo (${count} itens) —`);
      for (let i = 0; i < count; i++) {
        const texto = (await options.nth(i).textContent()).trim();
        console.log(`  ${i + 1}. ${texto}`);
      }
    });

  });

});