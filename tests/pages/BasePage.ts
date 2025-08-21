import { expect, Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  private readonly spamModalWindow: Locator;
  constructor(page: Page) {
    this.page = page;
    this.spamModalWindow = this.page.locator(
      '.wdp-popup-module__popup wdp-onboardings-inventory-module__popup wdp-onboardings-inventory-module__contentWithPicture',
    );
  }
  async closeCookiesAlert() {
    await this.page.getByRole('button', { name: 'Ок', exact: true }).click();
  }
  async closeSpamModal() {
    if (await this.spamModalWindow.isVisible()) {
      await this.page.getByRole('button', { name: 'Закрыть' }).click();
    } else await this.page.getByRole('button', { name: 'Закрыть' }).click();
  }
  protected async checkAriaSnapshot(locator: Locator, ariaName: string) {
    await expect(locator).toMatchAriaSnapshot({
      name: ariaName,
    });
  }
  protected async checkLayoutByScreenshot(locator: Locator, screenshotName: string) {
    await expect(locator).toHaveScreenshot(screenshotName, { timeout: 15000 });
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
