import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class MainPage extends BasePage {
  private readonly headerLocator: Locator;
  private readonly categoriesTabsLocator: Locator;
  private readonly menuLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.headerLocator = this.page.getByRole('banner');
    this.categoriesTabsLocator = this.page
      .getByRole('main')
      .locator('div')
      .filter({
        hasText: 'ГлавнаяРекомендацииФильмыСериалыТелешоуСпортБлогерыНовостиМузыкаПодкастыДетямТВ ',
      })
      .nth(1);
    this.menuLocator = this.page.getByLabel('Облегченная панель навигации');
  }

  async open() {
    await this.page.goto('https://rutube.ru/');
  }

  async headerHasCorrectAriaSnapshot() {
    await expect(this.headerLocator).toMatchAriaSnapshot();
  }

  async categoriesTabsHasCorrectAriaSnapshot() {
    await expect(this.categoriesTabsLocator).toMatchAriaSnapshot();
  }

  async menuHasCorrectAriaSnapshot() {
    await expect(this.menuLocator).toMatchAriaSnapshot();
  }
}
