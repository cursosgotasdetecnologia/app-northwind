import { test, expect } from "@playwright/test";
import CreateProductModal from "../components/products/createProductModal";
//import { faker } from "@faker-js/faker/locale/pt_BR";
import { faker } from "@faker-js/faker";
import EditProductModal from "../components/products/editProductModal";

const ProductsPage = require("../pages/ProductsPage");
const dados = require("../fixtures/products-data.json");

test.describe("[Gestão de Produtos] Edição de Produtos", () => {
  let productsPage;
  let modal;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);

    modal = new EditProductModal(page);

    await page.goto("/");
    await page.getByTestId("email-input").fill(process.env.USER_EMAIL);
    await page.getByTestId("password-input").fill(process.env.USER_PASSWORD);
    await page.getByTestId("login-button").click();

    await page.waitForURL("**/products");
    await page
      .locator("table tbody tr")
      .first()
      .waitFor({ state: "visible", timeout: 3000 });

    // limpa qualquer estado salvo
    // await page.evaluate(() => {
    //   localStorage.clear();
    //   sessionStorage.clear();
    // });
  });

  /* ──────────────────────────────────────────────────
Validações de campos obrigatórios no modal de edição
─────────────────────────────────────────────────────*/

  test.describe("Edição de Produto - Validações de Campos Obrigatórios", () => {
    test.beforeEach(async () => {
      await productsPage.editFirstProduct();
      await expect(modal.modalHeading).toBeVisible();
    });

    test("Não deve salvar quando o nome for apagado", async () => {
      const cenario = dados.edicaoNomeObrigatorio;

      await modal.fillName(cenario.dados.name);
      await modal.save();

      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(
        cenario.esperado.mensagem,
      );
    });

    test("Deve exibir mensagem de erro quando o nome tiver menos de 6 caracteres", async () => {
      const cenario = dados.nomeMuitoCurto;

      await modal.fillName(cenario.dados.name);
      await modal.save();

      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(
        cenario.esperado.mensagem,
      );
    });

    test("Deve exibir mensagem de erro quando o nome contiver números", async () => {
      const cenario = dados.nomeComNumeros;

      await modal.fillName(cenario.dados.name);
      await modal.save();

      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(
        cenario.esperado.mensagem,
      );
    });
  });

  //────────────────────────────────────────────
  // Regras de existência
  // ───────────────────────────────────────────

  test.describe("Edição de Produto - Regras de Existência", () => {
    test("Não deve exibir botão de editar quando o produto não existir", async ({
      page,
    }) => {
      const nomeFake = dados.produtoInexistente.nome;
      const row = productsPage.getRowByName(nomeFake);

      await productsPage.searchInput.fill(nomeFake);
      await expect(row).toHaveCount(0);
      await page.waitForTimeout(500);
      await page.screenshot({ path: "screenshot-existencia.png" });

      await page.screenshot({
        path: "test-results/screenshots/screenshot-existencia.png",
      });
    });

    test("Deve exibir mensagem de produto não encontrado ao buscar nome inexistente", async ({
      page,
    }) => {
      const nomeFake = dados.produtoInexistente.nome;

      await productsPage.searchInput.fill(nomeFake);

      await expect(
        page.getByText(dados.produtoInexistente.esperado.mensagem),
      ).toBeVisible();
    });
  });

  /* ────────────────────────────────────────────────────────────
Fluxo de sucesso — editar produto já existente
─────────────────────────────────────────────────────────────*/
  test.describe("Edição de Produto - Edição com Fluxos de Sucesso", () => {
    test("Deve atualizar as informações do produto quando ele já estiver cadastrado", async ({
      page,
    }) => {
      const cenario = dados.produtoParaEdicao;

      await productsPage.editFirstProduct();
      await expect(modal.modalHeading).toBeVisible();

      await modal.fillName(cenario.dadosEdicao.novoNome);
      await modal.fillPrice(cenario.dadosEdicao.novoPreco);
      await modal.save();

      await expect(page.locator("table")).toContainText(
        cenario.dadosEdicao.novoNome,
      );
    });
  });

  test("Deve permitir editar o produto imediatamente após o cadastro", async ({
    page,
  }) => {
    const cenario = dados.produtoCriarEEditar;
    const createModal = new CreateProductModal(page);

    // Nome único a cada execução — sem números, sem colisão
    const nomeProduto = faker.commerce.productName();
    //const skuProduto  = faker.string.alphanumeric(8).toUpperCase();
    const skuProduto =
      faker.string.alpha(3).toUpperCase() +
      faker.string.alphanumeric(5).toUpperCase();

    const novoNome = faker.commerce.productName();

    // 1. Cria o produto
    await createModal.open();

    //await createModal.fillName(cenario.preCondicao.name);
    await createModal.fillName(nomeProduto);

    await createModal.fillPrice(cenario.preCondicao.price);
    await createModal.fillStock(cenario.preCondicao.stock);

    //await createModal.fillSku(cenario.preCondicao.sku);
    await createModal.fillSku(skuProduto);

    await createModal.selectCategory(cenario.preCondicao.category);
    await createModal.selectSupplier(cenario.preCondicao.supplier);

    await createModal.submit();

    // Aguarda o modal fechar antes de interagir com a tabela
    await expect(createModal.modalHeading).toBeHidden({ timeout: 5000 });
    await page
      .locator("table tbody tr")
      .first()
      .waitFor({ state: "visible", timeout: 10000 });

    // Aguarda a tabela recarregar com os dados atualizados
    //await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 10000 });

    // 2. Filtra e localiza o produto criado
    //await productsPage.filterProducts(cenario.preCondicao.name, '', '');
    await productsPage.filterProducts(nomeProduto, "", "");

    //await expect(page.locator('table')).toContainText(cenario.preCondicao.name, { timeout: 10000 });
    await expect(page.locator("table")).toContainText(nomeProduto, {
      timeout: 10000,
    });

    // 3. Edita o produto

    //await productsPage.editProductByName(cenario.preCondicao.name);
    await productsPage.editProductByName(nomeProduto);

    await expect(modal.modalHeading).toBeVisible();

    //await modal.fillName(cenario.dadosEdicao.novoNome);
    await modal.fillName(novoNome);

    await modal.fillPrice(cenario.dadosEdicao.novoPreco);
    await modal.save();

    // 4. Verifica o nome atualizado na tabela
    await productsPage.clearFilters();
    //await productsPage.filterProducts(cenario.dadosEdicao.novoNome, '', '');
    await productsPage.filterProducts(novoNome, "", "");
    await expect(page.locator("table")).toContainText(novoNome);
  });

  //   test("Deve atualizar as informações do produto quando ele já estiver cadastrado", () => {
  //     // seus testes aqui
  //   });

  //   test("Deve permitir editar o produto imediatamente após o cadastro", () => {
  //     // seus testes aqui
  //   });

  // });

  // test.describe("Regras de Existência do Produto", () => {
  //   test("Não deve permitir edição quando o produto não for localizado", () => {});
  // });
});
