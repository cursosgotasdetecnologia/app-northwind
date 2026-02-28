

  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.getByRole('heading', { name: 'Editar Produto' }).click();
  await page.getByText('Nome *').click();
  await page.getByTestId('edit-product-name').click();
  await page.getByText('Preço (R$) *').click();
  await page.getByTestId('edit-product-price').click();
  await page.getByText('Estoque *').click();
  await page.getByTestId('edit-product-stock').click();
  await page.getByText('SKU *').click();
  await page.getByTestId('edit-product-sku').click();
  await page.getByText('Categoria *').click();
  await page.getByRole('button', { name: 'Livros', exact: true }).click();
  await page.getByRole('button', { name: 'Acessórios' }).click();
  await page.getByText('Fornecedor *').click();
  await page.getByRole('button', { name: 'Livros & Cia' }).click();
  await expect(page.getByRole('button', { name: 'BookExpress' })).toBeVisible();

  await page.getByRole('button', { name: 'Empresa Email Longo' }).click();
  await page.getByTestId('edit-product-submit').click();
  await page.getByTestId('error-name').click();
  await page.getByTestId('edit-product-cancel').click();