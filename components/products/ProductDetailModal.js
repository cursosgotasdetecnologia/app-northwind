
  await page.getByRole('button', { name: 'Detalhes' }).first().click();
  await page.getByRole('heading', { name: 'Detalhes do Produto' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Detalhes' }).first().click();
  await expect(page.getByRole('heading', { name: 'Detalhes do Produto' })).toBeVisible();

  await page.getByText('ID:').click();
  await page.locator('span').filter({ hasText: '99' }).click();
  await page.getByText('SKU:').click();
  await page.getByText('JEANS-PR-').click();
  await page.getByText('Nome:').click();
  await page.locator('span').filter({ hasText: 'Calça Jeans Preta' }).click();
  await page.getByText('Preço:').click();
  await page.locator('span').filter({ hasText: 'R$' }).click();
  await page.getByText('Estoque:').click();
  await page.getByText('unid.').click();
  await page.getByText('unid.').click();
  await page.getByText('Categoria:').click();
  await page.locator('span').filter({ hasText: /^Livros$/ }).click();
  await page.getByText('Fornecedor:').click();
  await page.locator('span').filter({ hasText: 'Livros & Cia' }).click();
  await page.getByText('Slug:').click();
  await page.getByText('calca-jeans-preta').click();
  await page.getByRole('button', { name: 'OK, entendi!' }).click();
  await page.getByRole('button', { name: 'Detalhes' }).first().click();
  await expect(page.getByRole('heading', { name: 'Detalhes do Produto' })).toBeVisible();

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Imprimir (PDF/PNG)' }).click();
  const page1 = await page1Promise;
  await page.getByRole('button', { name: 'Cancelar' }).click();
});