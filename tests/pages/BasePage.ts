import { expect, Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async closeCookiesAlert() {
    await this.page.getByRole('button', { name: 'Ок', exact: true }).click();
  }
  protected async checkAriaSnapshot(locator: Locator, ariaName: string) {
    await expect(locator).toMatchAriaSnapshot({
      name: ariaName,
    });
  }
  protected async checkLayoutByScreenshot(locator: Locator, screenshotName: string) {
    await expect(locator).toHaveScreenshot(screenshotName);
  }
  protected async hideElement(selector: string) {
    await this.page.evaluate((selector) => {
      const header = document.querySelector(selector);
      if (header) {
        (header as HTMLElement).style.display = 'none';
      }
    }, selector);
  }
}
