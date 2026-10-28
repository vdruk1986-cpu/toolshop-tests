import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly productTitle: Locator;
    readonly productQuantity: Locator;
    readonly productPrice: Locator;
    readonly linePrice: Locator;
    readonly total: Locator;

    constructor(private page: Page) {
        this.productTitle = page.getByTestId('product-title');
        this.productQuantity = page.getByTestId('product-quantity');
        this.productPrice = page.getByTestId('product-price');
        this.linePrice = page.getByTestId('line-price');
        this.total = page.getByTestId('cart-total');
    }

    async open() {
        await this.page.getByTestId('nav-cart').click();
    }
}
