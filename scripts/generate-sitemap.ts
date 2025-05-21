import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://hy-erica-arttherapy.com/';

// 정적 라우트
const staticRoutes = [
  '/',
  '/gallery',
  '/my-page',
  '/my-page/reset-pw',
  '/intro/professors',
  '/intro/certificates',
  '/coming-soon',
  '/sign-in',
  '/sign-up',
  '/find-my',
];

const dynamicRoutes = Array.from({ length: 23 }, (_, i) => `/gallery/${i + 1}`);

const allRoutes = [...staticRoutes, ...dynamicRoutes];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${SITE_URL}${route}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
};

generateSitemap();
