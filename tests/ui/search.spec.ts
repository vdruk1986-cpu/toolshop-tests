import { test, expect } from '../../fixtures/fixtures';

test('search returns only products matching the query', async ({ homePage }) => {
  await homePage.open();
  await homePage.search('hammer');

  await expect(homePage.productNames.first()).toBeVisible();
  for (const name of await homePage.productNames.all()) {
    await expect(name).toContainText(/hammer/i);
  }
});

test('search for a non-existent product shows no results message', async ({ homePage }) => {
  await homePage.open();
  await homePage.search('nonexistentproduct12345');

  await expect(homePage.noResults).toHaveText(/no products found/i);
  await expect(homePage.productNames).toHaveCount(0);
});