import { test, expect } from '../../fixtures/fixtures';



test('check product details', async ({ productsApi, productPage }) => {
    const response = await productsApi.getAll();

    const firstProduct = (await response.json()).data[0];

    await productPage.open(firstProduct.id);

    await expect(productPage.name).toHaveText(firstProduct.name);
    await expect(productPage.price).toContainText(firstProduct.price.toFixed(2));
});