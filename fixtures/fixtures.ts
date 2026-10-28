import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsApi } from '../api/ProductsApi';
import { AccountPage } from '../pages/AccountPage';
import { AuthApi } from '../api/AuthApi';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsApi: ProductsApi;
  authApi: AuthApi;
  accountPage: AccountPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  productsApi: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({
      baseURL: 'https://api.practicesoftwaretesting.com',
    });
    await use(new ProductsApi(api));
    await api.dispose();
  },

  authApi: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({
      baseURL: 'https://api.practicesoftwaretesting.com',
    });
    await use(new AuthApi(api));
    await api.dispose();
  },

});

export { expect } from '@playwright/test';