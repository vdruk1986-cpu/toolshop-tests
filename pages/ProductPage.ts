import { Locator, Page } from '@playwright/test';

export class ProductPage {
    readonly name: Locator;
    readonly price: Locator;
    constructor(private page: Page) {
        this.name = page.getByTestId('product-name');
        this.price = page.getByTestId('unit-price');
    }

    async open(id: string) {
        await this.page.goto(`/product/${id}`);
    }

}