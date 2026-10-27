import { test, expect } from '../../fixtures/fixtures';
import { existingProductQuery, nonExistentProductQuery } from '../../data/search';

test('search returns only products matching the query', async ({ homePage }) => {
  await homePage.open();
  await homePage.search(existingProductQuery);

  await expect(homePage.productNames.first()).toBeVisible();
  for (const name of await homePage.productNames.all()) {
    await expect(name).toContainText(new RegExp(existingProductQuery, 'i'));
  }
});

test('search for a non-existent product shows no results message', async ({ homePage }) => {
  await homePage.open();
  await homePage.search(nonExistentProductQuery);

  await expect(homePage.noResults).toHaveText(/no products found/i);
  await expect(homePage.productNames).toHaveCount(0);
});
