// Generate the social-share (Open Graph) card -> public/og.png (1200x630).
// On-brand: dark squircle palette, teal->blue gradient, the 3-diamond stack logo.
// Run: node brand/make-og.mjs   (needs the `playwright` devDependency + chromium)
// The PNG is a committed, deployed asset (served at <site>/og.png); it is NOT
// inlined into the single-file build — it only matters for the hosted/shared URL.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const icon = readFileSync(resolve('brand/icon.svg'), 'utf8');

const html = `<!doctype html><html><head><meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: "Segoe UI", system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #e7ecf5;
    background:
      radial-gradient(1100px 700px at 86% -20%, rgba(124,156,255,0.20), transparent 60%),
      radial-gradient(900px 600px at -10% 120%, rgba(91,227,201,0.14), transparent 55%),
      #0b0e14;
    overflow: hidden;
  }
  .card { position: relative; width: 1200px; height: 630px; padding: 60px 70px; display: flex; gap: 24px; }
  .card::after { /* hairline frame for a premium, framed look */
    content: ""; position: absolute; inset: 24px; border: 1px solid rgba(124,156,255,0.16);
    border-radius: 28px; pointer-events: none;
  }
  .left { flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
  .kicker { text-transform: uppercase; letter-spacing: 0.3em; font-size: 21px; font-weight: 800; color: #5be3c9; }
  .title { margin-top: 14px; font-size: 80px; line-height: 1.0; font-weight: 850; letter-spacing: -0.02em;
    background: linear-gradient(118deg, #ffffff 8%, #7c9cff 52%, #5be3c9 82%, #ff8fb1);
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  .sub { margin-top: 20px; font-size: 27px; line-height: 1.4; color: #aab3c5; max-width: 24ch; }
  .sub b { color: #e7ecf5; font-weight: 700; }
  .pills { display: flex; flex-wrap: wrap; gap: 11px; margin-top: 22px; }
  .pill { font-size: 20px; font-weight: 700; padding: 8px 17px; border-radius: 999px;
    border: 1px solid #283044; background: #161b27; color: #aab3c5; }
  .pill.accent { color: #06121f; border-color: transparent; background: linear-gradient(135deg, #7c9cff, #5be3c9); }
  .foot { display: flex; align-items: center; gap: 14px; font-size: 21px; color: #76819a; font-weight: 600; margin-top: 28px; white-space: nowrap; }
  .foot .url { color: #7c9cff; font-weight: 800; }
  .dot { color: #283044; }
  .right { width: 330px; display: grid; place-items: center; }
  .logo { width: 300px; height: 300px; filter: drop-shadow(0 26px 60px rgba(91,227,201,0.28)); }
  .logo svg { width: 100%; height: 100%; }
</style></head>
<body>
  <div class="card">
    <div class="left">
      <div>
        <div class="kicker">EN · 日 · 繁 · 简 — AI Stack Atlas</div>
        <div class="title">AI Stack<br>Atlas</div>
        <div class="sub">看懂整个 AI Stack — <b>agents, CLIs, harnesses, infra &amp; creative AI (image / video / 3D / avatars)</b>, mapped.</div>
        <div class="pills">
          <span class="pill accent">92 products</span>
          <span class="pill">12 categories</span>
          <span class="pill">4 languages EN / 日 / 繁 / 简</span>
        </div>
      </div>
      <div class="foot">
        <span class="url">snowyukitty.github.io/ai-stack-atlas</span>
        <span class="dot">●</span>
        <span>data-driven</span>
      </div>
    </div>
    <div class="right"><div class="logo">${icon}</div></div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
const card = await page.$('.card');
await card.screenshot({ path: resolve('public/og.png') });
await browser.close();
console.log('Wrote public/og.png (1200x630 @2x)');
