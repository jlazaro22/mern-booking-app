import { expect, test } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';
const testEmail = `test_${crypto.randomUUID()}@test.com`;

test('should allow the user to register', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an account here' }).click();
  await expect(
    page.getByRole('heading', { name: 'Create an account' }),
  ).toBeVisible();

  await page.locator('input[name="firstName"]').fill('test_firstName');
  await page.locator('input[name="lastName"]').fill('test_lastName');
  await page.locator('input[name="email"]').fill(testEmail);
  await page.locator('input[name="password"]').fill('password123');
  await page.locator('input[name="confirmPassword"]').fill('password123');

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Registration successful!')).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.locator('input[name="email"]').fill(testEmail);
  await page.locator('input[name="password"]').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Sign in successful!')).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
