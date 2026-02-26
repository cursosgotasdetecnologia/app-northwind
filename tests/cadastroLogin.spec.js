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
      await cadastroPage.preencherFormulario(cenario.dados);
      await expect(
        cadastroPage.getMensagemErro(cenario.esperado.mensagem),
      ).toBeVisible();
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("Deve exibir erro quando nome tiver números", async () => {
      const cenario = dados.nomeComNumeros;
      await cadastroPage.preencherFormulario(cenario.dados);
      await expect(
        cadastroPage.getMensagemErro(cenario.esperado.mensagem),
      ).toBeVisible();
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Validação de Email", () => {
    test("Deve exibir erro quando email não ter o @", async () => {
      const cenario = dados.emailSemArroba;
      await cadastroPage.preencherFormulario(cenario.dados);
      await expect(
        cadastroPage.getMensagemErro(cenario.esperado.mensagem),
      ).toBeVisible();
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("Deve exibir erro quando email não tiver o domínio após o @", async () => {
      const cenario = dados.emailSemDominio;
      await cadastroPage.preencherFormulario(cenario.dados);
      await expect(
        cadastroPage.getMensagemErro(cenario.esperado.mensagem),
      ).toBeVisible();
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
      const cenario = dados.emailSemIdentificacao;
      await cadastroPage.preencherFormulario(cenario.dados);
      await expect(
        cadastroPage.getMensagemErro(cenario.esperado.mensagem),
      ).toBeVisible();
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Validação de Senha", () => {
    test("Deve exibir erro quando senha não tiver ao menos uma letra maiúscula", async () => {
      const cenario = dados.senhaSemMaiusculas;
      await cadastroPage.preencherFormulario(cenario.dados);
      await expect(
        cadastroPage.getMensagemErro(cenario.esperado.mensagem),
      ).toBeVisible();
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Caminho Feliz", () => {
    test("Cadastro de Usuário com dado válidos", async ({ page }) => {
      const cenario = dados.valido;
      await cadastroPage.preencherFormulario(cenario.dados);
      await cadastroPage.getBotaoCadastrar().click();
      await expect(
        cadastroPage.getMensagemErro(cenario.esperado.mensagem),
      ).toBeVisible();
    });
  });

});


