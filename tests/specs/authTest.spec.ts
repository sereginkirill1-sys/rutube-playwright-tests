import { test, expect } from '@playwright/test';
import path from 'path';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

chromium.use(stealth());

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('test', async () => {
  test.setTimeout(40000);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rutube.ru/');
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await page.getByRole('button', { name: 'Вход и регистрация' }).click();
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .getByRole('textbox', { name: 'Введите телефон' })
    .click();
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .getByRole('textbox', { name: 'Введите телефон' })
    .fill(process.env.LOGIN!);
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .getByRole('button', { name: 'Продолжить' })
    .click();
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .locator('#login-password')
    .fill(process.env.PASSWORD!);
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .getByRole('button', { name: 'Войти', exact: true })
    .click();

  await page.getByRole('img', { name: 'Иконка канала channel67448450' }).click();
  await page
    .locator('section')
    .filter({ hasText: /^channel67448450\+7 \*\*\* \*\*\*-08-02Завершите регистрацию$/ })
    .locator('img')
    .click();
  await page.getByRole('link', { name: 'Профиль' }).click();

  await page.context().storageState({ path: authFile });
});
