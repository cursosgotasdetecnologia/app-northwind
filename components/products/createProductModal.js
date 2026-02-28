
const { expect } = require('@playwright/test');

class CreateProductModal {
  constructor(page) {
    this.page = page;

        // botões visíveis na página principal/modal
    this.addProductButton = page.getByRole('button', { name: 'Adicionar Produto' });
    this.modalHeading = page.getByRole('heading', { name: 'Adicionar Produto' });


    this.nameInput = page.getByTestId("add-product-name");
    this.priceInput = page.getByTestId("edit-product-price");
    this.stockInput = page.getByTestId("add-product-stock");
    this.skuInput = page.getByTestId("add-product-sku");
    this.categoryDropdown = page.getByRole("button", {
      name: "Selecione a Categoria",
    });
    this.supplierDropdown = page.getByRole("button", {
      name: "Selecione o Fornecedor",
    });
    this.submitButton = page.getByTestId("add-product-submit");
    this.cancelButton = page.getByTestId("add-product-cancel");

    // mensagens de erro exibidas pelo modal
    this.errorName = page.getByTestId("error-name");
    this.errorPrice = page.getByTestId("error-price");
    this.errorStock = page.getByTestId("error-stock");
    this.errorSku = page.getByTestId("error-sku");
  }
  // métdos de preenchimento
  async open() {
    await this.addProductButton.click();
    await expect(this.modalHeading).toBeVisible();
    await expect(this.nameInput).toBeVisible();
  }

  async fillName(value) {
    await this.nameInput.fill(value);
  }

  async fillPrice(value) {
    await this.priceInput.fill(value);
  }

  async fillStock(value) {
    await this.stockInput.fill(value);
  }

  async fillSku(value) {
    await this.skuInput.fill(value);
  }

  async selectCategory(name) {
    await this.categoryDropdown.click();
    await this.page.getByRole("button", { name }).click();
  }

  async selectSupplier(name) {
    await this.supplierDropdown.click();
    await this.page.getByRole("button", { name }).click();
  }

  // ações do modal
  async submit() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  // acessor para os elementos de erro por campo
  getError(field) {
    switch (field) {
      case "name":
        return this.errorName;
      case "price":
        return this.errorPrice;
      case "stock":
        return this.errorStock;
      case "sku":
        return this.errorSku;
      default:
        throw new Error(`Campo de erro desconhecido: ${field}`);
    }
  }
}

module.exports = CreateProductModal;
