import { test, expect } from '@playwright/test';


test('that the timer is working', async ({ page }) => {
    await page.goto('http://localhost:5500');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.getByText('Your eggs are rey!')).toBeVisible();

    await page.getByRole('button', { name: 'OK'}).click();

    await expect(page.getByText('Your eggs are ready!')).not.toBeVisible();
})
