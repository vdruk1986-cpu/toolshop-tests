import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsApi } from '../api/ProductsApi';
import { AccountPage } from '../pages/AccountPage';
import { AuthApi } from '../api/AuthApi';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CartsApi } from '../api/CartsApi';

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsApi: ProductsApi;
  authApi: AuthApi;
  accountPage: AccountPage;
  productPage: ProductPage;
  cartPage: CartPage;
  cartsApi: CartsApi;
};

const apiContextOptions = {
  baseURL: 'https://api.practicesoftwaretesting.com',
  // without it the API answers validation errors with a 302 redirect instead of 422 JSON
  extraHTTPHeaders: { Accept: 'application/json' },
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
    const api = await playwright.request.newContext(apiContextOptions);
    await use(new ProductsApi(api));
    await api.dispose();
  },

  authApi: async ({ playwright }, use) => {
    const api = await playwright.request.newContext(apiContextOptions);
    await use(new AuthApi(api));
    await api.dispose();
  },

  cartsApi: async ({ playwright }, use) => {
    const api = await playwright.request.newContext(apiContextOptions);
    await use(new CartsApi(api));
    await api.dispose();
  },

});

export { expect } from '@playwright/test';