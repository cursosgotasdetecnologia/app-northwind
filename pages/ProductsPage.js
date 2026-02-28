import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await expect(page.getByRole('heading', { name: 'QA Automation Shop' })).toBeVisible();

  await page.getByText('Email: admin@qatest.com').click();
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admin@qatest.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Teste@123');
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('row', { name: '97 Camiseta Básica Preta R$' })).toBeVisible();

  await page.getByRole('heading', { name: 'QA Automation Shop' }).click();
  await page.getByRole('button', { name: 'Adicionar Produto' }).click();
  await expect(page.getByRole('heading', { name: 'Adicionar Produto' })).toBeVisible();

  await page.getByTestId('add-product-cancel').click();
  await page.getByRole('textbox', { name: 'Digite o nome do produto...' }).click();
  await page.getByRole('combobox').first().selectOption('Acessórios');
  await page.getByRole('combobox').nth(1).selectOption('17');
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await expect(page.getByRole('row', { name: '97 Camiseta Básica Preta R$' })).toBeVisible();

  await page.getByRole('columnheader', { name: 'ID' }).click();
  await page.getByRole('cell', { name: '97' }).click();
  await page.getByRole('columnheader', { name: 'Nome' }).click();
  await page.getByRole('cell', { name: 'Camiseta Básica Preta' }).click();
  await page.getByRole('columnheader', { name: 'Preço' }).click();
  await page.getByRole('columnheader', { name: 'Preço' }).click();
  await page.getByRole('cell', { name: 'R$ 49.90' }).click();
  await page.getByRole('columnheader', { name: 'Categoria' }).click();
  await page.getByRole('cell', { name: 'Eletrônicos' }).click();
  await page.getByRole('columnheader', { name: 'Fornecedor' }).click();
  await page.getByRole('cell', { name: 'TechSupply Brasil' }).first().click();
  await page.getByRole('columnheader', { name: 'Ações' }).click();
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await expect(page.getByRole('heading', { name: 'Editar Produto' })).toBeVisible();

  await page.getByTestId('edit-product-cancel').click();
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await expect(page.getByRole('heading', { name: 'Confirmação' })).toBeVisible();

  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.getByRole('button', { name: 'Detalhes' }).first().click();
  await expect(page.getByRole('heading', { name: 'Detalhes do Produto' })).toBeVisible();

  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.getByText('Mostrando 1–10 de 28 produtos').click();
  await page.getByText('Página 1 de').click();
  await page.getByRole('button', { name: 'Próxima' }).click();
  await expect(page.getByRole('row', { name: '108 Meia Cano Alto Branca R$' })).toBeVisible();

  await page.getByRole('button', { name: 'Anterior' }).click();
});