import {type APIRequestContext } from '@playwright/test';

export class CartsApi {
    constructor(private readonly request: APIRequestContext) {}

    async createCart() {
        return this.request.post('/carts', {
            data: {},
        });
    }

    async addItem(cartId: string, productId: string, quantity: number) {
        return this.request.post(`/carts/${cartId}`, {
            data: { product_id: productId, quantity },
        });
    }

    async getCart(cartId: string) {
        return this.request.get(`/carts/${cartId}`);
    }

}
