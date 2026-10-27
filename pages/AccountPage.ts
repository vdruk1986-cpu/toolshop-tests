import { Locator, Page } from "@playwright/test";

export class AccountPage {
  readonly title: Locator;
  constructor(private page: Page) {
    this.title = page.getByTestId('page-title');
  }
}