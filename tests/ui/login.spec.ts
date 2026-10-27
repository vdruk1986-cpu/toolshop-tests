import { test, expect } from '../../fixtures/fixtures';
import { validUser, invalidUser } from '../../data/users';


test('customer can log in with valid credentials', async ({ loginPage, accountPage, page}) => {
  await loginPage.open();

  await loginPage.login(validUser.email, validUser.password);

  await expect(accountPage.title).toHaveText('My account');
  await expect(page).toHaveURL(/account/);

});

test('customer can not log in with invalid credentials', async ({ loginPage, page}) => {

  await loginPage.open();

  await loginPage.login(invalidUser.email, invalidUser.password);

  await expect(loginPage.error).toBeVisible();
  await expect(page).toHaveURL(/auth\/login/);

});