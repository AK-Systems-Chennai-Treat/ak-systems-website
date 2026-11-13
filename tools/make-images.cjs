// Renders og-image.png and apple-touch-icon.png into src/assets. Run once: node tools/make-images.cjs
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const A = path.join(__dirname, '..', 'src', 'assets');
const logo = fs.readFileSync(path.join(A, 'logo.svg'), 'utf8');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;800&display=swap" rel="stylesheet"></head>
  <body style="margin:0;width:1200px;height:630px;font-family:'Plus Jakarta Sans';color:#fff;background:radial-gradient(900px 500px at 85% 0%,#2A3590,transparent 60%),linear-gradient(160deg,#141838,#0B1230);display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box">
  <div style="display:flex;align-items:center;gap:18px;font-size:40px"><div style="width:84px;height:84px">${logo.replace('<svg', '<svg width="84" height="84"')}</div><b>AK</b><span style="color:#AEB6E0;font-weight:500;margin-left:-6px">Systems</span></div>
  <div style="font-size:64px;font-weight:800;line-height:1.08;margin-top:40px;letter-spacing:-1.5px">Quality software,<br><span style="color:#8FA4FF">designed, built and run.</span></div>
  <div style="font-size:26px;color:#B9C1E6;margin-top:28px">Software products and services · Makers of ChennaiTreat</div></body></html>`);
  await p.waitForLoadState('networkidle'); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(A, 'og-image.png') });
  await p.setViewportSize({ width: 180, height: 180 });
  await p.setContent(`<body style="margin:0;background:#141838">${logo.replace('<svg', '<svg width="180" height="180"').replace('rx="10"', 'rx="0"')}</body>`);
  await p.screenshot({ path: path.join(A, 'apple-touch-icon.png') });
  await b.close();
})();
