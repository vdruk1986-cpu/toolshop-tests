import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly error: Locator;

    constructor(private page: Page) {
        this.error = page.getByText('Invalid email or password');
    }

    async open() {
        await this.page.goto('/auth/login');
    }


    async login(email: string, password: string) {
        await this.page.getByTestId('email').fill(email);
        await this.page.getByTestId('password').fill(password);
        await this.page.getByTestId('login-submit').click();
    }
}