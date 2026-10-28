import { test, expect } from '../../fixtures/fixtures';
import { cartProductName } from '../../data/products';
import { Product } from '../../types/product';

test('product added from product page appears in cart', async ({ productsApi, productPage, cartPage }) => {
    const response = await productsApi.search(cartProductName);
    const products: Product[] = (await response.json()).data;
    const product = products.find((p) => p.name === cartProductName);
    expect(product, `${cartProductName} must exist in API`).toBeDefined();
    const { id, price: rawPrice } = product!;
    const price = rawPrice.toFixed(2);

    await productPage.open(id);
    await expect(productPage.price).toHaveText(price);

    await productPage.addToCart();
    await expect(productPage.cartQuantity).toHaveText('1');

    await cartPage.open();

    await expect(cartPage.productTitle).toHaveCount(1);
    await expect(cartPage.productTitle).toHaveText(cartProductName);
    await expect(cartPage.productQuantity).toHaveValue('1');
    await expect(cartPage.productPrice).toHaveText(`$${price}`);
    await expect(cartPage.linePrice).toHaveText(`$${price}`);
    await expect(cartPage.total).toHaveText(`$${price}`);
});
