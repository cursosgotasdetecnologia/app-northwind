import { test, expect } from "@playwright/test";
import CadastroPage from "../pages/CadastroPage";

test.describe("Cadastro de Usuário", () => {
  let cadastroPage;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Cadastre-se" }).click();
  });

  const dados = require("../fixtures/dados-cadastro-login.json");

  test.describe("Validação de Nome", () => {
    test("Deve exibir erro quando nome tiver menos de 3 caracteres", async () => {
      const cenario = dados.nomeCurto;
      await cadastroPage.preencherNome(cenario.nome);
      await expect(cadastroPage.mensagemNomeCurto).toBeVisible();
    });

    test("Deve exibir erro quando nome tiver números", async () => {
      const cenario = dados.nomeComNumeros;
      await cadastroPage.preencherNome(cenario.nome);
      await expect(cadastroPage.mensagemNomeComNumero).toBeVisible();
    });
  });

  test.describe("Validação de Email", () => {

  test("Deve exibir erro quando email não ter o @", async () => {
    const cenario = dados.emailSemArroba;
    await cadastroPage.preencherNome(cenario.nome);
    await cadastroPage.preencherEmail(cenario.email);
    await expect(cadastroPage.mensagemEmailSemArroba).toBeVisible();
  });
  test("Deve exibir erro quando email não tiver o domínio após o @", async () => {
    const cenario = dados.emailSemDominio;
    await cadastroPage.preencherNome(cenario.nome);
    await cadastroPage.preencherEmail(cenario.email);
    await expect(cadastroPage.mensagemEmailSemDominio).toBeVisible();
  });
  test("Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
    const cenario = dados.emailSemIdentificacao;
    await cadastroPage.preencherNome(cenario.nome);
    await cadastroPage.preencherEmail(cenario.email);
    await expect(cadastroPage.mensagemEmailSemIdentificacao).toBeVisible();
  });
});

  test.describe("Validação de Senha", () => {});
    test("Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
      const cenario = dados.senhaSemMaiusculas;
      await cadastroPage.preencherNome(cenario.nome);
      await cadastroPage.preencherEmail(cenario.email);
      await expect(cadastroPage.mensagemSenhaSemMaiuscula).toBeVisible();
    });
  });




// test('Cadastro de Usuário', async ({ page }) => {
//   const cadastroPage = new CadastroPage(page);

//   await page.goto('https://northwind-test-platform.vercel.app/');
//   await page.getByRole('link', { name: 'Cadastre-se' }).click();
//   await cadastroPage.preencherNome('Marieanaute Julianae Car');
//   await cadastroPage.preencherEmail('marireeeutuliane@gmail.com');
//   await cadastroPage.preencherSenha('SenhaForte@123');
//   await cadastroPage.preencherConfirmarSenha('SenhaForte@123');
//   await cadastroPage.clicarCadastrar();
//   await expect(cadastroPage.mensagemSucesso).toBeVisible()

// });
