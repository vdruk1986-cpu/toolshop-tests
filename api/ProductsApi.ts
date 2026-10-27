import {type APIRequestContext } from '@playwright/test';

export class ProductsApi {
    constructor(private readonly request: APIRequestContext) {}

    async getAll() {
        return this.request.get('/products');
    }

    async search(text: string) {
        return this.request.get(`/products/search?q=${encodeURIComponent(text)}`);
    }

    async getById(id: string) {
       return this.request.get(`/products/${id}`);
    }

}