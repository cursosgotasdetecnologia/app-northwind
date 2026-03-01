class ProductsPage {
  constructor(page) {
    this.page = page;

    this.addProductButton = page.getByRole('button', { name: 'Adicionar Produto' });
    this.addProductHeading = page.getByRole('heading', { name: 'Adicionar Produto' });
    this.addProductCancel = page.getByTestId('add-product-cancel');

    this.searchInput = page.getByRole('textbox', { name: 'Digite o nome do produto...' });
    this.categoryFilter = page.getByRole('combobox').first();
    this.supplierFilter = page.getByRole('combobox').nth(1);
    this.clearFiltersButton = page.getByRole('button', { name: 'Limpar filtros' });

    this.editButton = page.getByRole('button', { name: 'Edit' }).first();
    this.editHeading = page.getByRole('heading', { name: 'Editar Produto' });
    this.editCancel = page.getByTestId('edit-product-cancel');

    this.deleteButton = page.getByRole('button', { name: 'Delete' }).first();
    this.confirmationHeading = page.getByRole('heading', { name: 'Confirmação' });
    this.confirmCancel = page.getByRole('button', { name: 'Cancelar' });

    this.detailsButton = page.getByRole('button', { name: 'Detalhes' }).first();
    this.detailsHeading = page.getByRole('heading', { name: 'Detalhes do Produto' });

    this.nextPageButton = page.getByRole('button', { name: 'Próxima' });
    this.previousPageButton = page.getByRole('button', { name: 'Anterior' });
  }

 
 async cancelAddProduct() {
    await this.addProductCancel.click();
  }

  async filterProducts(name, category, supplier) {
    if (name) await this.searchInput.fill(name);
    if (category) await this.categoryFilter.selectOption(category);
    if (supplier) await this.supplierFilter.selectOption(supplier);
  }

  async clearFilters() {
    await this.clearFiltersButton.click();
  }

  async openEditProduct() {
    await this.editButton.click();
  }

  async openDeleteConfirmation() {
    await this.deleteButton.click();
  }

 
  async openProductDetails() {
    await this.detailsButton.click();
  }


  async goToNextPage() {
    await this.nextPageButton.click();
  }

  async goToPreviousPage() {
    await this.previousPageButton.click();
  }
}

module.exports = ProductsPage;