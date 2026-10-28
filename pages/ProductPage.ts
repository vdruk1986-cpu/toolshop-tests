import { Locator, Page } from '@playwright/test';

export class ProductPage {
    readonly name: Locator;
    readonly price: Locator;
    readonly cartQuantity: Locator;
    constructor(private page: Page) {
        this.name = page.getByTestId('product-name');
        this.price = page.getByTestId('unit-price');
        this.cartQuantity = page.getByTestId('cart-quantity');
    }

    async open(id: string) {
        await this.page.goto(`/product/${id}`);
    }

    async addToCart() {
        const addItemResponse = this.page.waitForResponse(
            (resp) => resp.request().method() === 'POST' && /\/carts\/[^/]+$/.test(resp.url()) && resp.ok()
        );

        await this.page.getByTestId('add-to-cart').click();
        await addItemResponse;
    }

}
