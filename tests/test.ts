import { expect, test } from '@playwright/test';

test.describe('auth', () => {
	test('login successfully', async ({ page }) => {
		await page.goto('/login');
		await expect(page.locator('button[type="submit"]')).toBeVisible();

		await page.locator('input[name="email"]').fill('jacob.shuman7@gmail.com');
		await page.locator('input[name="password"]').fill('testing');
		await page.locator('button[type="submit"]').click();

		await expect(page).toHaveURL(/.*\/admin$/);
	});
});
