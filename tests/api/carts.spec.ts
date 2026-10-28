import { test, expect } from '../../fixtures/fixtures';
import { cartProductName } from '../../data/products';
import { Product } from '../../types/product';
import { Cart } from '../../types/cart';


test('product added to a new cart is returned by GET /carts/:id', async ({ productsApi, cartsApi }) => {
    const searchResponse = await productsApi.search(cartProductName);
    const products: Product[] = (await searchResponse.json()).data;
    const product = products.find((p) => p.name === cartProductName);
    expect(product, `${cartProductName} must exist in API`).toBeDefined();
    const { id: productId, name, price } = product!;

    const createResponse = await cartsApi.createCart();
    expect(createResponse.status()).toBe(201);
    const { id: cartId } = await createResponse.json();
    expect(cartId).toBeTruthy();

    const addResponse = await cartsApi.addItem(cartId, productId, 1);
    expect(addResponse.status()).toBe(200);

    const getResponse = await cartsApi.getCart(cartId);
    expect(getResponse.status()).toBe(200);
    const cart: Cart = await getResponse.json();

    expect(cart.cart_items).toHaveLength(1);
    const [item] = cart.cart_items;
    expect(item.product_id).toBe(productId);
    expect(item.quantity).toBe(1);
    expect(item.product.name).toBe(name);
    expect(item.product.price).toBe(price);
});


for (const productId of ['01AAAAAAAAAAAAAAAAAAAAAAAA', 'nonexistent-id']) {
    test(`POST /carts/:id with unknown product_id "${productId}" returns 422 and keeps cart empty`, async ({ cartsApi }) => {
        const createResponse = await cartsApi.createCart();
        expect(createResponse.status()).toBe(201);
        const { id: cartId } = await createResponse.json();

        const addResponse = await cartsApi.addItem(cartId, productId, 1);
        expect(addResponse.status()).toBe(422);
        const body = await addResponse.json();
        expect(body.errors.product_id.length).toBeGreaterThan(0);

        const getResponse = await cartsApi.getCart(cartId);
        expect(getResponse.status()).toBe(200);
        const cart: Cart = await getResponse.json();
        expect(cart.cart_items).toHaveLength(0);
    });
}
