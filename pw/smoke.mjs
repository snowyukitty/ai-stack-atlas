// Smoke test for the single-file build (dist/index.html).
// Loads the built file over file:// and asserts the things that have actually
// broken before: duplicate ids, horizontal overflow, deep-link occlusion under
// the sticky header, search grammar, a11y affordances, theme handling, and the
// JS-on / JS-off (noscript) view behavior. Run with `npm run smoke` after a build.
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const dist = resolve('dist/index.html');
if (!existsSync(dist)) {
  console.error(`dist/index.html not found at ${dist} — run "npm run build" first.`);
  process.exit(2);
}
const FILE = pathToFileURL(dist).href;

const results = [];
let failed = 0;
function check(name, cond, detail = '') {
  results.push({ name, pass: !!cond, detail });
  if (!cond) failed++;
}

const browser = await chromium.launch();

async function newCtx(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  return { ctx, page, errors };
}

async function overflow(page) {
  return await page.evaluate(() => {
    const d = document.documentElement;
    return { scrollW: d.scrollWidth, clientW: d.clientWidth, overflow: d.scrollWidth > d.clientWidth + 1 };
  });
}

async function dupIds(page) {
  return await page.evaluate(() => {
    const ids = Array.from(document.querySelectorAll('[id]')).map((e) => e.id);
    const seen = new Set(), dupes = new Set();
    for (const id of ids) { if (seen.has(id)) dupes.add(id); seen.add(id); }
    return [...dupes];
  });
}

// ---------- DESKTOP 1366x900 ----------
{
  const { ctx, page, errors } = await newCtx(1366, 900);
  await page.goto(FILE, { waitUntil: 'networkidle' });

  const dupes = await dupIds(page);
  check('desktop: no duplicate ids', dupes.length === 0, dupes.join(', '));

  const ov = await overflow(page);
  check('desktop home: no horizontal overflow', !ov.overflow, `scrollW=${ov.scrollW} clientW=${ov.clientW}`);

  // Navigate to catalog and search "codex"
  await page.goto(FILE + '#catalog', { waitUntil: 'networkidle' });
  await page.fill('#search', 'codex');
  await page.waitForTimeout(150);
  const catalogVisible = await page.evaluate(() => {
    const cat = document.getElementById('catalog');
    const cards = Array.from(cat.querySelectorAll('[data-product]'));
    const shown = cards.filter((c) => c.style.display !== 'none' && c.offsetParent !== null);
    return { count: shown.length, ids: shown.map((c) => c.id), rcount: (document.getElementById('rcount')||{}).textContent };
  });
  check('desktop: catalog search "codex" → exactly 1 result', catalogVisible.count === 1,
    `count=${catalogVisible.count} ids=[${catalogVisible.ids.join(', ')}] rcount="${catalogVisible.rcount}"`);
  check('desktop: count uses singular "1 product" (not "products")',
    /\b1 product\b/.test(catalogVisible.rcount) && !/1 products/.test(catalogVisible.rcount),
    `rcount="${catalogVisible.rcount}"`);

  const ariaLabel = await page.getAttribute('#search', 'aria-label');
  check('desktop: search input has accessible name (aria-label)', !!ariaLabel, `aria-label="${ariaLabel}"`);

  const ovCat = await overflow(page);
  check('desktop catalog: no horizontal overflow', !ovCat.overflow, `scrollW=${ovCat.scrollW} clientW=${ovCat.clientW}`);

  // Deep link
  await page.goto(FILE + '#catalog/p-codex-cli', { waitUntil: 'networkidle' });
  await page.waitForTimeout(150);
  const deep = await page.evaluate(() => {
    const el = document.getElementById('p-codex-cli');
    if (!el) return { exists: false, visible: false };
    const r = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return { exists: true, visible: el.offsetParent !== null && style.display !== 'none', w: r.width };
  });
  check('desktop: deep link #catalog/p-codex-cli element exists', deep.exists, JSON.stringify(deep));
  check('desktop: deep link #catalog/p-codex-cli visible', deep.exists && deep.visible, JSON.stringify(deep));

  // Deep-linked card must clear the sticky header (not occluded).
  const occ = await page.evaluate(() => {
    const h = document.querySelector('.site-header').getBoundingClientRect();
    const c = document.getElementById('p-codex-cli').getBoundingClientRect();
    return { headerBottom: h.bottom, cardTop: c.top, occluded: c.top < h.bottom - 1 };
  });
  check('desktop: deep-linked card not occluded by header', !occ.occluded,
    `cardTop=${occ.cardTop.toFixed(0)} headerBottom=${occ.headerBottom.toFixed(0)}`);

  // Skip link: present, off-screen by default, slides in on focus.
  const skip = await page.evaluate(() => {
    const a = document.querySelector('.skip-link');
    if (!a) return { exists: false };
    const before = a.getBoundingClientRect().top;
    a.focus();
    const after = a.getBoundingClientRect().top;
    return { exists: true, hiddenBefore: before < 0, visibleAfter: after >= 0 };
  });
  check('desktop: skip link exists & hidden until focus', skip.exists && skip.hiddenBefore && skip.visibleAfter, JSON.stringify(skip));

  // Focus management: navigating moves focus into the target view.
  await page.evaluate(() => { document.body.focus(); location.hash = ''; });
  await page.click('#mainnav a[data-go="concepts"]');
  await page.waitForTimeout(120);
  const focused = await page.evaluate(() => {
    const a = document.activeElement;
    return a ? (a.getAttribute && a.getAttribute('data-view')) : null;
  });
  check('desktop: nav to "concepts" moves focus into that view', focused === 'concepts', `activeView=${focused}`);

  // theme-color meta present for both schemes.
  const themeColors = await page.evaluate(() =>
    Array.from(document.querySelectorAll('meta[name="theme-color"]')).map((m) => m.getAttribute('media')));
  check('desktop: theme-color meta for dark & light', themeColors.length === 2, themeColors.join(' | '));

  // Favicon: inline SVG data URI that actually decodes to a non-empty raster.
  const fav = await page.evaluate(async () => {
    const link = document.querySelector('link[rel="icon"]');
    if (!link) return { ok: false, reason: 'no link' };
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('data:image/svg+xml,')) return { ok: false, reason: 'not inline svg' };
    const dim = await new Promise((res) => {
      const img = new Image();
      img.onload = () => res({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => res({ w: 0, h: 0 });
      img.src = href;
    });
    return { ok: dim.w > 0 && dim.h > 0, dim };
  });
  check('desktop: favicon is inline SVG that renders', fav.ok, JSON.stringify(fav));

  check('desktop: no console/page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- MOBILE 390x844 ----------
{
  const { ctx, page, errors } = await newCtx(390, 844);
  await page.goto(FILE, { waitUntil: 'networkidle' });

  const ov = await overflow(page);
  check('mobile home: no horizontal overflow', !ov.overflow, `scrollW=${ov.scrollW} clientW=${ov.clientW}`);

  await page.goto(FILE + '#catalog', { waitUntil: 'networkidle' });
  await page.waitForTimeout(150);
  const ovCat = await overflow(page);
  check('mobile catalog: no horizontal overflow', !ovCat.overflow, `scrollW=${ovCat.scrollW} clientW=${ovCat.clientW}`);

  await page.fill('#search', 'codex');
  await page.waitForTimeout(150);
  const cnt = await page.evaluate(() => {
    const cat = document.getElementById('catalog');
    return Array.from(cat.querySelectorAll('[data-product]')).filter((c) => c.style.display !== 'none' && c.offsetParent !== null).length;
  });
  check('mobile: catalog search "codex" → exactly 1 result', cnt === 1, `count=${cnt}`);

  const dupes = await dupIds(page);
  check('mobile: no duplicate ids', dupes.length === 0, dupes.join(', '));

  // The original bug: deep-linked card occluded by the taller (wrapped) mobile header.
  await page.goto(FILE + '#catalog/p-codex-cli', { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  const occ = await page.evaluate(() => {
    const h = document.querySelector('.site-header').getBoundingClientRect();
    const c = document.getElementById('p-codex-cli').getBoundingClientRect();
    return { headerH: h.height, headerBottom: h.bottom, cardTop: c.top, occluded: c.top < h.bottom - 1 };
  });
  check('mobile: deep-linked card not occluded by wrapped header', !occ.occluded,
    `headerH=${occ.headerH.toFixed(0)} cardTop=${occ.cardTop.toFixed(0)} headerBottom=${occ.headerBottom.toFixed(0)}`);

  check('mobile: no console/page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- COMPARE view + charts (desktop) ----------
{
  const { ctx, page, errors } = await newCtx(1366, 900);

  // Rankings benchmark bars render with sane widths.
  await page.goto(FILE + '#rankings', { waitUntil: 'networkidle' });
  const bars = await page.evaluate(() => {
    const fills = Array.from(document.querySelectorAll('[data-view="rankings"] .bar-fill'));
    return { count: fills.length, widths: fills.map((f) => f.style.width) };
  });
  check('rankings: benchmark bars render', bars.count >= 8, `count=${bars.count}`);
  check('rankings: bar widths are valid %', bars.widths.every((w) => /^\d+(\.\d+)?%$/.test(w)),
    bars.widths.slice(0, 4).join(', '));

  // Compare view: nav works, ≥2 matrices, each populated, names deep-link.
  await page.goto(FILE + '#compare', { waitUntil: 'networkidle' });
  await page.waitForTimeout(120);
  const cmp = await page.evaluate(() => {
    const view = document.querySelector('[data-view="compare"]');
    const visible = view && !view.hidden && view.offsetParent !== null;
    const tables = Array.from((view || document).querySelectorAll('table.matrix'));
    const rowCounts = tables.map((t) => t.querySelectorAll('tbody tr').length);
    const firstLink = view && view.querySelector('table.matrix tbody th[scope="row"] a');
    return {
      visible, tables: tables.length, rowCounts,
      linkTarget: firstLink ? firstLink.getAttribute('data-target') : null,
    };
  });
  check('compare: view shown via #compare', cmp.visible, JSON.stringify(cmp));
  check('compare: has ≥2 comparison matrices', cmp.tables >= 2, `tables=${cmp.tables}`);
  check('compare: every matrix has rows', cmp.rowCounts.length > 0 && cmp.rowCounts.every((n) => n >= 2),
    `rowCounts=[${cmp.rowCounts.join(', ')}]`);
  check('compare: model rows deep-link to catalog cards', !!cmp.linkTarget && cmp.linkTarget.startsWith('p-'),
    `linkTarget=${cmp.linkTarget}`);

  // Home charts present.
  await page.goto(FILE, { waitUntil: 'networkidle' });
  const home = await page.evaluate(() => ({
    stats: document.querySelectorAll('.statbar .stat').length,
    catbars: document.querySelectorAll('.catbars .catbar').length,
    layers: document.querySelectorAll('.layers .layer').length,
  }));
  check('home: stat strip populated', home.stats >= 5, `stats=${home.stats}`);
  check('home: category bar chart populated', home.catbars === 12, `catbars=${home.catbars}`);
  check('home: layered stack diagram present', home.layers === 4, `layers=${home.layers}`);

  check('compare/charts: no console/page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- COMPARE view: no horizontal page overflow (mobile) ----------
{
  const { ctx, page } = await newCtx(390, 844);
  await page.goto(FILE + '#compare', { waitUntil: 'networkidle' });
  await page.waitForTimeout(120);
  const ov = await overflow(page);
  check('mobile compare: no horizontal page overflow (matrix scrolls internally)', !ov.overflow,
    `scrollW=${ov.scrollW} clientW=${ov.clientW}`);
  await ctx.close();
}

// ---------- Companies view (deep dives) ----------
{
  const { ctx, page, errors } = await newCtx(1366, 900);
  await page.goto(FILE + '#companies', { waitUntil: 'networkidle' });
  await page.waitForTimeout(120);
  const co = await page.evaluate(() => {
    const v = document.querySelector('[data-view="companies"]');
    return {
      visible: !!v && !v.hidden && v.offsetParent !== null,
      rows: v ? v.querySelectorAll('table.matrix tbody tr').length : 0,
      cards: v ? v.querySelectorAll('.company').length : 0,
      anchored: !!(v && v.querySelector('#co-anthropic')),
    };
  });
  check('companies: view shown via #companies', co.visible, JSON.stringify(co));
  check('companies: comparison matrix has 11 rows', co.rows === 11, `rows=${co.rows}`);
  check('companies: 11 deep-dive profile cards', co.cards === 11, `cards=${co.cards}`);
  check('companies: profile cards anchored (#co-…)', co.anchored);
  check('companies: no console/page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Languages: EN primary · JA · 繁 (Simplified kept but hidden) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'networkidle' });
  const defLang = await page.evaluate(() => document.documentElement.getAttribute('data-lang'));
  check('lang: first load defaults to English', defLang === 'en', `data-lang=${defLang}`);
  const hasHant = await page.$('#langseg button[data-lang="hant"]');
  const hasJa = await page.$('#langseg button[data-lang="ja"]');
  const zhBtn = await page.$('#langseg button[data-lang="zh"]');
  const zhBtnHidden = zhBtn
    ? await page.$eval('#langseg button[data-lang="zh"]', (el) => el.hasAttribute('hidden') || el.offsetParent === null)
    : true;
  check('lang: 繁 (Traditional) button exists', !!hasHant);
  check('lang: 日 (Japanese) button exists', !!hasJa);
  check('lang: Simplified 简 button stays in DOM (for re-enable)', !!zhBtn);
  check('lang: Simplified 简 button is temporarily hidden', zhBtnHidden);
  if (hasHant) {
    await page.click('#langseg button[data-lang="hant"]');
    await page.waitForTimeout(80);
    const st = await page.evaluate(() => {
      const root = document.documentElement;
      const wrap = document.querySelector('.hero .lead');
      const zh = wrap.querySelector('[lang="zh"]');
      const hant = wrap.querySelector('[lang="hant"]');
      const en = wrap.querySelector('[lang="en"]');
      const vis = (el) => !!el && el.offsetParent !== null;
      return {
        dataLang: root.getAttribute('data-lang'),
        htmlLang: root.getAttribute('lang'),
        hantVisible: vis(hant),
        enVisible: vis(en),
        zhVisible: vis(zh),
        zhPresent: !!zh,
        differs: !!zh && !!hant && zh.textContent !== hant.textContent,
        hantText: hant ? hant.textContent.slice(0, 30) : '',
      };
    });
    check('lang: clicking 繁 sets data-lang=hant', st.dataLang === 'hant', JSON.stringify(st));
    check('lang: html lang becomes zh-Hant', st.htmlLang === 'zh-Hant', `lang=${st.htmlLang}`);
    check('lang: Traditional span shows, English/Simplified hidden', st.hantVisible && !st.enVisible && !st.zhVisible, JSON.stringify(st));
    check('lang: Simplified span kept in DOM', st.zhPresent, JSON.stringify(st));
    check('lang: Traditional text differs from Simplified', st.differs, `hant="${st.hantText}"`);
  }
  await ctx.close();
}

// ---------- Social / SEO meta (share card) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'domcontentloaded' });
  const meta = await page.evaluate(() => ({
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    ogW: document.querySelector('meta[property="og:image:width"]')?.content || '',
    twCard: document.querySelector('meta[name="twitter:card"]')?.content || '',
    twImage: document.querySelector('meta[name="twitter:image"]')?.content || '',
  }));
  check('social: og:image is an absolute .png URL', /^https?:\/\/.+\.png$/.test(meta.ogImage), `og:image=${meta.ogImage}`);
  check('social: og:image dimensions declared', meta.ogW === '1200', `width=${meta.ogW}`);
  check('social: twitter card is summary_large_image', meta.twCard === 'summary_large_image', `card=${meta.twCard}`);
  check('social: twitter:image matches og:image', meta.twImage === meta.ogImage, `tw=${meta.twImage}`);
  await ctx.close();
}

// ---------- THEME: honor prefers-color-scheme on first visit ----------
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'domcontentloaded' });
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  check(`theme: prefers-color-scheme:${scheme} (no stored pref) → data-theme="${scheme}"`, theme === scheme, `got "${theme}"`);
  await ctx.close();
}

// ---------- JS ON: only the active view is shown ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'networkidle' });
  const hiddenWithJs = await page.evaluate(() => {
    const cat = document.querySelector('[data-view="catalog"]');
    return cat.hidden && cat.offsetParent === null;
  });
  check('JS on: non-active view (catalog) is hidden on home', hiddenWithJs);
  await ctx.close();
}

// ---------- JS OFF: noscript fallback reveals all views ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'domcontentloaded' });
  const visibleNoJs = await page.evaluate(() => {
    const views = Array.from(document.querySelectorAll('[data-view]'));
    return views.map((v) => ({ view: v.getAttribute('data-view'), shown: v.offsetParent !== null || v.getBoundingClientRect().height > 0 }));
  });
  const allShown = visibleNoJs.every((v) => v.shown);
  check('JS off: noscript fallback reveals all views', allShown, JSON.stringify(visibleNoJs));
  await ctx.close();
}

await browser.close();

console.log('\n=== SMOKE TEST RESULTS ===');
for (const r of results) {
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
