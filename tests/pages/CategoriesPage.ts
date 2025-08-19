import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoriesPage extends BasePage {
  private readonly contentPageLocator: Locator;
  private readonly spamModalWindow: Locator;

  constructor(page: Page) {
    super(page);
    this.contentPageLocator = this.page.locator('.application-module__content');
    this.spamModalWindow = this.page.locator(
      '.wdp-popup-module__popup wdp-onboardings-inventory-module__popup wdp-onboardings-inventory-module__contentWithPicture',
    );
  }
  async open() {
    this.page.goto('https://rutube.ru/categories/');
  }
  async contentPageHasCorrectLayout() {
    await this.checkLayoutByScreenshot(this.contentPageLocator, 'categoriesPage.png');
  }
  async closeSpamModal() {
    if (await this.spamModalWindow.isVisible()) {
      await this.page.getByRole('button', { name: 'Закрыть' }).click();
    } else await this.page.getByRole('button', { name: 'Закрыть' }).click();
  }
  async hideHeader() {
    await this.hideElement('header');
  }
}
