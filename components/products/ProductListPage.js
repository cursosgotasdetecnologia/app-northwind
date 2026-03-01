class ProductListPage {
  constructor(page) {
    this.page = page;
    this.campoBusca = page.getByTestId("search-product");
  }

  async buscarProduto(nome) {
    await this.campoBusca.fill(nome);
  }

  async clicarEditarProduto(nome) {
    await this.page
      .getByRole("row", { name: nome })
      .getByTestId("edit-product")
      .click();
  }

  async validarProdutoNaLista(nome) {
    await this.page.getByRole("row", { name: nome }).waitFor();
  }
}

module.exports = ProductListPage;