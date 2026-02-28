
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.getByRole('heading', { name: 'Confirmação' }).click();
  await page.getByText('Tem certeza que deseja').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByRole('row', { name: '109 Meia Cano Alto Preta R$' })).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).first().click();
  await expect(page.getByRole('heading', { name: 'Confirmação' })).toBeVisible();

  await page.getByRole('button', { name: 'Cancelar' }).click();