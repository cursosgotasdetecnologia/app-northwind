class ProductDetailModal {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole("heading", { name: "Detalhes do Produto" });
    this.closeButton = page.getByRole("button", { name: "OK, entendi!" });
    this.cancelButton = page.getByRole("button", { name: "Cancelar" });
    this.printButton = page.getByRole("button", { name: "Imprimir (PDF/PNG)" });

    this.fieldId = page.getByText("ID:");
    this.fieldSku = page.getByText("SKU:");
    this.fieldNome = page.getByText("Nome:");
    this.fieldPreco = page.getByText("Preço:");
    this.fieldEstoque = page.getByText("Estoque:");
    this.fieldCategoria = page.getByText("Categoria:");
    this.fieldFornecedor = page.getByText("Fornecedor:");
    this.fieldSlug = page.getByText("Slug:");
  }

  async close() {
    await this.closeButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async print() {
    const [popup] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.printButton.click(),
    ]);
    return popup;
  }
}

module.exports = ProductDetailModal;
