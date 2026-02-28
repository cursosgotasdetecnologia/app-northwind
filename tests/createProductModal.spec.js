
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await expect(page.getByRole('heading', { name: 'QA Automation Shop' })).toBeVisible();

  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admin@qatest.com');
  await page.getByTestId('email-input').press('Tab');
  await page.getByTestId('password-input').fill('Teste@123');
  await page.getByTestId('password-input').press('Enter');
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('row', { name: '99 Calça Jeans Preta R$ 139.' })).toBeVisible();



   await page.getByRole('button', { name: 'Adicionar Produto' }).click();
  await page.getByRole('heading', { name: 'Adicionar Produto' }).click();