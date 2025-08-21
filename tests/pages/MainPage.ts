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
  private readonly changeThemeButtonLocator: Locator;
  private readonly userLogoLocator: Locator;
  private readonly headerUserMenuLocator: Locator;
  // private readonly spamModalWindow: Locator;

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
    this.changeThemeButtonLocator = this.page.getByRole('button', {
      name: 'Переключить на светлую тему',
    });
    this.userLogoLocator = this.page.getByRole('img', { name: 'Иконка канала channel67448450' });
    this.headerUserMenuLocator = this.page.getByText(
      'channel67448450+7 *** ***-08-02Завершите регистрациюПрофильМой каналСтудия',
    );
    // this.spamModalWindow = this.page.locator(
    //   '.wdp-popup-module__popup wdp-onboardings-inventory-module__popup wdp-onboardings-inventory-module__contentWithPicture',
    // );
  }

  //actions

  async open() {
    await this.page.goto('https://rutube.ru/');
  }
  // async closeModalWindow() {
  //   await this.page.getByRole('button', { name: 'Закрыть' }).click();
  // }
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
  async changeThemeToWhite() {
    await this.changeThemeButtonLocator.click();
  }
  async openHeaderUserMenu() {
    await this.userLogoLocator.click();
  }
  // async closeSpamModal() {
  //   if (await this.spamModalWindow.isVisible()) {
  //     await this.page.getByRole('button', { name: 'Закрыть' }).click();
  //   } else await this.page.getByRole('button', { name: 'Закрыть' }).click();
  // }

  //assertions

  async addPopupListHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerAddButtonPopupListLocator, 'addButtonPopupList.yml');
  }
  async notificationsPopupHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerNotificationsPopupLocator, 'notificationsPopup.yml');
  }
  async authorizationModalHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.authorizationModalLocator, 'authorizationModal.yml');
  }
  async registrationModalHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.authorizationModalLocator, 'registrationModal.yml');
  }
  async headerUserMenuHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerUserMenuLocator, 'headerUserMenuSnapshot.yml');
  }
  async headerHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerLocator, 'headerAriaSnapshot.yml');
  }
  async categoriesTabsHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.categoriesTabsLocator, 'categoriesTabsAriaSnapshot.yml');
  }
  async menuHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.menuLocator, 'menuAriaSnapshot.yml');
  }
  async checkThemeAttributeValue(attributeValue: 'dark2021' | 'white2022') {
    await expect(this.page.locator('html')).toHaveAttribute('data-pen-theme', attributeValue);
  }
}
