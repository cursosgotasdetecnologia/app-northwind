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
    //this.editHeading = page.getByRole('heading', { name: 'Editar Produto' });
    //this.editCancel = page.getByTestId('edit-product-cancel');

    this.deleteButton = page.getByRole('button', { name: 'Delete' }).first();
    // this.confirmationHeading = page.getByRole('heading', { name: 'Confirmação' });
    // this.confirmCancel = page.getByRole('button', { name: 'Cancelar' });

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

  //AÇÕES DE EDITAR
  
  async editFirstProduct() {
    const rows = this.page.locator('table tbody tr');

    // Aguarda ao menos uma linha aparecer (tabela carrega via API)
    await rows.first().waitFor({ state: 'visible', timeout: 5000 });

    const count = await rows.count();

    if (count === 0) {
      throw new Error('Nenhum produto disponível para edição');
    }







    await rows.first().getByRole('button', { name: 'Edit' }).click();
  }

  async editProductByName(productName) {
    const row = this.page.locator('table tbody tr').filter({ hasText: productName });
    const count = await row.count();

    if (count === 0) {
      throw new Error(`Produto "${productName}" não encontrado`);
    }

    await row.getByRole('button', { name: 'Edit' }).click();
  }

  async openEditProduct() {
    await this.editButton.click();
  }


  getRowByName(nome) {
  return this.page.locator('table tr').filter({
    has: this.page.locator('td', { hasText: nome })
  });
}

getEditButtonFromRow(row) {
  return row.getByRole('button', { name: 'Editar' });
}



 async getLastProductName() {
    const rows = this.page.locator('table tbody tr');
    await rows.first().waitFor({ state: 'visible', timeout: 3000 });

    const count = await rows.count();

    const nomeProduto = await rows.nth(count - 1).locator('td').nth(1).textContent();
    return nomeProduto.trim();
  }

  
   // Clica em Delete no último produto da lista
  async clickDeleteLastProduct() {
    const rows = this.page.locator('table tbody tr');
    await rows.first().waitFor({ state: 'visible', timeout: 3000 });
    const count = await rows.count();
    await rows.nth(count - 1).getByRole('button', { name: 'Delete' }).click();
  }
  
  // Clica em Delete no primeiro produto da lista
  async clickDeleteFirstProduct() {
    const rows = this.page.locator('table tbody tr');
    await rows.first().waitFor({ state: 'visible', timeout: 3000 });
    await rows.first().getByRole('button', { name: 'Delete' }).click();
  }
  






  
}

module.exports = ProductsPage;