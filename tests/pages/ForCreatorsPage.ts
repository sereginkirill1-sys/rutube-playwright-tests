import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForCreatorsPage extends BasePage {
  static readonly testsParams = [
    {
      url: 'https://rutube.ru/for_creators/#main',
      screenshotName: 'mainTab.png',
      name: 'Главная',
    },
    {
      url: 'https://rutube.ru/for_creators/#steps',
      screenshotName: 'stepsTab.png',
      name: 'Первые шаги',
    },
    {
      url: 'https://rutube.ru/for_creators/#faq',
      screenshotName: 'faqTab.png',
      name: 'Как развивать канал',
    },
    {
      url: 'https://rutube.ru/for_creators/#monetization',
      screenshotName: 'monetizationTab.png',
      name: 'Монетизация',
    },
    {
      url: 'https://rutube.ru/for_creators/#rules',
      screenshotName: 'rulesTab.png',
      name: 'Правила',
    },
    {
      url: 'https://rutube.ru/for_creators/#team',
      screenshotName: 'teamTab.png',
      name: 'Команда R',
    },
  ];
  private readonly pageContentLocator: Locator;
  constructor(page: Page) {
    super(page);
    this.pageContentLocator = this.page.locator('#___gatsby');
  }
  async open(url: string) {
    await this.page.goto(url);
  }
  async pageHasCorrectLayout(screenshotName: string) {
    await this.checkLayoutByScreenshot(this.pageContentLocator, screenshotName);
  }
}
