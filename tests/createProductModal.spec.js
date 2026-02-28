import { test, expect } from "@playwright/test";
import CreateProductModal from "../components/products/createProductModal";

// dados de entrada/expectativa semelhantes ao fixture de cadastro
const dados = require("../fixtures/products-data.json");

test.describe("Cadastro de Produto", () => {
  let modal;

  test.beforeEach(async ({ page }) => {
    modal = new CreateProductModal(page);

    await page.goto("https://northwind-test-platform.vercel.app/ ");
    await page.getByTestId("email-input").fill("admin@qatest.com");
    await page.getByTestId("password-input").fill("Teste@123");
    await page.getByTestId("login-button").click();
    await modal.open();
  });

  test.describe("Criação de Produto - Validações de Entrada", () => {
    test("Deve exibir mensagem de erro quando o nome estiver vazio", async () => {
      const cenario = dados.nomeObrigatorio;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(
        cenario.esperado.mensagem,
      );
    });

    test("Deve exibir mensagem de erro quando o nome tiver menos de 6 caracteres", async () => {
      const cenario = dados.nomeMuitoCurto;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toHaveText(
        cenario.esperado.mensagem,
      );
    });

    test("Deve exibir mensagem de erro quando o nome contiver números", async () => {
      const cenario = dados.nomeComNumeros;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toHaveText(
        cenario.esperado.mensagem,
      );
    });
  });

  test.describe('Criação de Produto - Fluxo de Sucesso', () => {
    test('Deve criar o produto com sucesso quando os dados forem válidos', async () => {
      const cenario = dados.valido;
      
      await modal.fillName(cenario.dados.name);
      await modal.fillPrice(cenario.dados.price);
      await modal.fillStock(cenario.dados.stock);
      await modal.fillSku(cenario.dados.sku);
      await modal.selectCategory(cenario.dados.category);
      await modal.selectSupplier(cenario.dados.supplier);
      await modal.submit();
      await expect(modal.getError('name')).toBeHidden();
     });
});
});