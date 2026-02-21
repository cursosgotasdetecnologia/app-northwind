import { test, expect } from '@playwright/test';

test('Validar acesso sem credenciais', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('');
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Email e senha são obrigatórios')).toBeVisible();
});


test('Validar acesso sem senha', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admin@qatest.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('');
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Email e senha são obrigatórios')).toBeVisible();
});


test('Validar acesso sem email', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Teste@123');
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Email e senha são obrigatórios')).toBeVisible();
});


test('Validar acesso caminho feliz', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admin@qatest.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Teste@123');
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('heading')).toContainText('QA Automation Shop');
  await expect(page.getByRole('button', { name: 'Regras do Playground' })).toBeVisible();
  
});

test('Verificar acesso com email invalido', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admingmail.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Teste@123');
  await page.getByTestId('login-button').click();
  await expect(page.locator('form')).toContainText('Formato de email inválido. Use: nome@dominio.com');
  
});

test('Verificar acesso com senha invalida', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await page.getByTestId('email-input').click(); 
  await page.getByTestId('email-input').fill('admin@qatest.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Teste@1234');
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Email ou senha inválidos')).toBeVisible();

});