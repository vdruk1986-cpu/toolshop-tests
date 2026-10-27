import { Page, Locator} from '@playwright/test';

export class HomePage {
    readonly productNames: Locator;

    constructor(private page: Page) {
        this.productNames = page.getByTestId('product-name');
    }

    async open() {
        await this.page.goto('/');
    }

    async search(text: string) {
        await this.page.getByTestId('search-query').fill(text);

        const searchResponse = this.page.waitForResponse(
            (resp) => resp.url().includes('/products/search') && resp.ok()
        );

        await this.page.getByTestId('search-submit').click();
        await searchResponse;
        
    }
}