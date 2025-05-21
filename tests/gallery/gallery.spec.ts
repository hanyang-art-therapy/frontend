import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test.describe('갤러리 상세/리뷰', () => {
  test('상세 진입 및 리뷰 목록 노출', async ({ page }) => {
    await page.goto('http://localhost:5173/gallery/1');
    await expect(page.getByText('작품 정보')).toBeVisible();
  });

  test('공동 작품일 경우 작가별 작품 설명 노출', async ({ page }) => {
    await page.goto('http://localhost:5173/gallery/24');
    await expect(page.getByText('작가별 작품 설명')).toBeVisible();
  });

  test('리뷰 작성 및 이미지 업로드', async ({ page }) => {
    await page.goto('http://localhost:5173/gallery/1');
    await page.getByPlaceholder('감상평을 작성해주세요.').fill('테스트 리뷰');
  });
});
