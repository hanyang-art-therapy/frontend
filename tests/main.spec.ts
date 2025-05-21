import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test.describe('크로스 브라우징 UI 확인', () => {
  test('메인 페이지 렌더링 테스트', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const title = await page.title();

    expect(title).toContain('한양대학교');
  });

  test('404 NOT FOUND 렌더링 테스트', async ({ page }) => {
    await page.goto('http://localhost:5173/~!ABCD');

    await expect(page.getByText('404 Error')).toBeVisible();
  });

  test('개발중 페이지 렌더링 테스트', async ({ page }) => {
    await page.goto('http://localhost:5173/coming-soon');

    await expect(page.getByText('COMING SOON')).toBeVisible();
  });
});
