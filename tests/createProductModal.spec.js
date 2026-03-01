import { test, expect } from "@playwright/test";
import CreateProductModal from "../components/products/createProductModal";

// dados de entrada/expectativa semelhantes ao fixture de cadastro
const dados = require("../fixtures/products-data.json");
const ProductsPage = require('../pages/productsPage');


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
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem,);
    });
  });

  test.describe("Criação de Produto - Fluxo de Sucesso", () => {
    test("Deve criar o produto com sucesso quando os dados forem válidos", async () => {
      const cenario = dados.valido;

      await modal.fillName(cenario.dados.name);
      await modal.fillPrice(cenario.dados.price);
      await modal.fillStock(cenario.dados.stock);
      await modal.fillSku(cenario.dados.sku);
      await modal.selectCategory(cenario.dados.category);
      await modal.selectSupplier(cenario.dados.supplier);
      await modal.submit();
      await expect(modal.getError("name")).toBeHidden();
    });
  });




test.describe('[Gestão de Produtos] Elementos da Tela de Produtos', () => {

  test('Deve exibir os filtros de busca e botão de limpeza', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Validação
    await expect(productsPage.searchInput).toBeVisible();
    await expect(productsPage.categoryFilter).toBeVisible();
    await expect(productsPage.supplierFilter).toBeVisible();
    //await expect(productsPage.clearFiltersButton).toBeVisible();
  });

  test('Deve exibir ação de edição disponível para o produto', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Validação
    await expect(productsPage.editButton).toBeVisible();
  });

  test('Deve exibir ação de exclusão disponível para o produto', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Validação
    await expect(productsPage.deleteButton).toBeVisible();
  });

  test('Deve exibir ação de visualização de detalhes do produto', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Validação
    await expect(productsPage.detailsButton).toBeVisible();
  });

  test('Deve exibir controles de paginação', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Validação
    await expect(productsPage.nextPageButton).toBeVisible();
    await expect(productsPage.previousPageButton).toBeVisible();
  });

});

  test.describe("[Gestão de Produtos] Manutenção de Produtos", () => {
    test("Deve atualizar as informações do produto quando ele já estiver cadastrado", () => {
      // seus testes aqui
    });

    test("Deve permitir editar o produto imediatamente após o cadastro", () => {
      // seus testes aqui
    });

  });

  test.describe("Regras de Existência do Produto", () => {
    test("Não deve permitir edição quando o produto não for localizado", () => {});
  });



});

