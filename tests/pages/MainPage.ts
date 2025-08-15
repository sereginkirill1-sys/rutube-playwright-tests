import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class MainPage extends BasePage {
  private readonly headerLocator: Locator;
  private readonly categoriesTabsLocator: Locator;
  private readonly menuLocator: Locator;
  private readonly headerAddButtonLocator: Locator;
  private readonly headerNotificationsButtonLocator: Locator;
  private readonly headerLoginButtonLocator: Locator;
  private readonly headerAddButtonPopupListLocator: Locator;
  private readonly headerNotificationsPopupLocator: Locator;
  private readonly authorizationModalLocator: Locator;
  private readonly switchToEmailAuthorizationButtonLocator: Locator;
  private readonly switchToNumberRegistrationButtonLocator: Locator;
  private readonly menuButtonLocator: Locator;
  private readonly openMenuAriaLocator: Locator;
  private readonly changeThemeButtonLocator: Locator;

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
    this.headerAddButtonLocator = this.page.getByRole('button', { name: 'Добавить' });
    this.headerNotificationsButtonLocator = this.page.getByRole('button', { name: 'Уведомления' });
    this.headerLoginButtonLocator = this.page.getByRole('button', { name: 'Вход и регистрация' });
    this.headerAddButtonPopupListLocator = this.page.locator(
      '.wdp-header-right-module__uploader ul',
    );
    this.headerNotificationsPopupLocator = this.page.locator(
      '.wdp-notifications-popup-module__wrapper',
    );
    this.authorizationModalLocator = this.page.locator('iframe[title="Multipass"]');
    this.switchToEmailAuthorizationButtonLocator = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'войти с помощью Почта' });
    this.switchToNumberRegistrationButtonLocator = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'Зарегистрироваться по телефону' });
    this.menuButtonLocator = this.page.getByRole('button', { name: 'Открыть меню навигации' });
    this.openMenuAriaLocator = this.page.locator('.menu-content-module__menuOpen');
    this.changeThemeButtonLocator = this.page.getByRole('button', {
      name: 'Переключить на светлую тему',
    });
  }

  async open() {
    await this.page.goto('https://rutube.ru/');
  }

  async closeModalWindow() {
    await this.page.getByRole('button', { name: 'Закрыть' }).click();
  }

  async headerHasCorrectAriaSnapshot() {
    await expect(this.headerLocator).toMatchAriaSnapshot({ name: 'headerAriaSnapshot.yml' });
  }

  async categoriesTabsHasCorrectAriaSnapshot() {
    await expect(this.categoriesTabsLocator).toMatchAriaSnapshot({
      name: 'categoriesTabsAriaSnapshot.yml',
    });
  }

  async menuHasCorrectAriaSnapshot() {
    await expect(this.menuLocator).toMatchAriaSnapshot({ name: 'menuAriaSnapshot.yml' });
  }

  async openAddPopupList() {
    await this.headerAddButtonLocator.click();
  }

  async openNotificationsPopup() {
    await this.headerNotificationsButtonLocator.click();
  }

  async openAuthorizationModal() {
    await this.headerLoginButtonLocator.click();
  }

  async switchToRegistrationModal() {
    await this.switchToEmailAuthorizationButtonLocator.click();
    await this.switchToNumberRegistrationButtonLocator.click();
  }

  async addPopupListHasCorrectAriaSnapshot() {
    await expect(this.headerAddButtonPopupListLocator).toMatchAriaSnapshot({
      name: 'addButtonPopupList.yml',
    });
  }

  async notificationsPopupHasCorrectAriaSnapshot() {
    await expect(this.headerNotificationsPopupLocator).toMatchAriaSnapshot({
      name: 'notificationsPopup.yml',
    });
  }

  async authorizationModalHasCorrectAriaSnapshot() {
    await expect(this.authorizationModalLocator).toMatchAriaSnapshot({
      name: 'authorizationModal.yml',
    });
  }

  async registrationModalHasCorrectAriaSnapshot() {
    await expect(this.authorizationModalLocator).toMatchAriaSnapshot({
      name: 'registrationModal.yml',
    });
  }

  async openFullMenu() {
    await this.menuButtonLocator.click();
  }

  async fullMenuHasCorrectAriaSnapshot() {
    await expect(this.openMenuAriaLocator).toMatchAriaSnapshot({
      name: 'fullMenuSnapshot.yml',
    });
  }

  async changeThemeToWhite() {
    await this.changeThemeButtonLocator.click();
  }

  async checkThemeAttributeValue(attributeValue: 'dark2021' | 'white2022') {
    await expect(this.page.locator('html')).toHaveAttribute('data-pen-theme', attributeValue);
  }
}
