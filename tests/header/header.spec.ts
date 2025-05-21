import { test, expect } from '@playwright/test';

test.describe('헤더', () => {
  test('모바일인 경우 햄버거 버튼 노출', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.getByLabel('모바일 메뉴 열기')).toBeVisible();
  });
});
