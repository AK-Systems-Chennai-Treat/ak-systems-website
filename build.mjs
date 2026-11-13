// Builds the static site into dist/. No dependencies: `node build.mjs`.
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { SITE } from './site.config.mjs';
import { pages } from './src/pages.mjs';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
cpSync('public', OUT, { recursive: true });

for (const page of pages) {
  const file = page.path === '/404' ? '404.html' : join(page.path.slice(1), 'index.html');
  const dest = join(OUT, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, page.html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter(p => p.path !== '/404')
  .map(p => `  <url><loc>${SITE.url}${p.path === '/' ? '/' : p.path + '/'}</loc><lastmod>${today}</lastmod></url>`).join('\n');
writeFileSync(join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages into ${OUT}/`);
