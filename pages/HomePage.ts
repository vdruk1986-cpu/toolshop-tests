import { Page, Locator} from '@playwright/test';

export class HomePage {
    readonly productNames: Locator;
    readonly noResults: Locator;

    constructor(private page: Page) {
        this.productNames = page.getByTestId('product-name');
        this.noResults = page.getByTestId('no-results');
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