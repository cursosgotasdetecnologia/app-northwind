import { test, expect, describe } from "@playwright/test";
import CadastroPage from "../pages/CadastroPage";


test('Cadastro de Usuário', async ({ page }) => {
  const cadastroPage = new CadastroPage(page);

  await page.goto('https://northwind-test-platform.vercel.app/');
  await page.getByRole('link', { name: 'Cadastre-se' }).click();
  await cadastroPage.preencherNome('Marieanate Julianae Car');
  await cadastroPage.preencherEmail('marireeetuliane@gmail.com');
  await cadastroPage.preencherSenha('SenhaForte@123');
  await cadastroPage.preencherConfirmarSenha('SenhaForte@123');
  await cadastroPage.clicarCadastrar();
  await expect(cadastroPage.mensagemSucesso).toBeVisible()

});
