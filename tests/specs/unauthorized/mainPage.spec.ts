import test from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('Проверка доступности элементов хэдера', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await mainPage.closeCookiesAlert();
  await mainPage.headerHasCorrectAriaSnapshot();
});

test('Проверка доступности элементов табов категорий', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await mainPage.closeCookiesAlert();
  await mainPage.categoriesTabsHasCorrectAriaSnapshot();
});

test('Проверка доступности элементов бокового меню', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await mainPage.closeCookiesAlert();
  await mainPage.menuHasCorrectAriaSnapshot();
});
