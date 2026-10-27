import { test, expect } from '../../fixtures/fixtures';
import { Product } from "../../types/product";


test('GET /products returns a list of products and every product has id, name and price', async ({ productsApi }) => {
    const response = await productsApi.getAll();

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);

    for (const product of body.data as Product[]) {
        expect(typeof product.id).toBe('string');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
    }
});


test('GET /products/search hammer returns products containing "hammer"', async ({ productsApi }) => {
    const response = await productsApi.search('hammer');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    for (const product of body.data) {
        expect(product.name).toMatch(/hammer/i);
    }
});



test('GET /products/:id with unknown id returns 404', async ({ productsApi }) => {
    const response = await productsApi.getById('999888777');

    expect(response.status()).toBe(400);
});
