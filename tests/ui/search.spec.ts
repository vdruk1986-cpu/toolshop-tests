import { test, expect } from '../../fixtures/fixtures';

test('search returns only products matching the query', async ({ homePage }) => {
  await homePage.open();
  await homePage.search('hammer');

  await expect(homePage.productNames.first()).toBeVisible();
  for (const name of await homePage.productNames.all()) {
    await expect(name).toContainText(/hammer/i);
  }
});