/**
 * Regression checks against a running preview server: no page may scroll
 * horizontally at any breakpoint, and every page must keep its basic
 * accessibility guarantees.
 *
 *   npm run build && npm run preview
 *   node scripts/check.mjs --base=http://localhost:4321
 *
 * Exits non-zero if anything fails, so it can gate a deploy.
 */
import { chromium } from 'playwright';

const baseArg = process.argv.find((a) => a.startsWith('--base='));
const base = baseArg ? baseArg.split('=').slice(1).join('=') : 'http://localhost:4321';
const routes = ['/', '/services', '/network', '/about', '/contact', '/404'];
const widths = [390, 768, 1440];

const browser = await chromium.launch();
let failures = 0;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      // any element sticking out past the viewport
      wide: [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(0, 4)
        .map((el) => `${el.tagName}.${String(el.className).slice(0, 40)}`),
    }));
    const overflow = r.scrollW > r.innerW + 1;
    if (overflow) {
      failures++;
      console.log(`✗ ${width}px ${route} — scrollWidth ${r.scrollW} > ${r.innerW}`);
      console.log(`    culprits: ${r.wide.join(', ') || 'none identified'}`);
    } else {
      console.log(`✓ ${width}px ${route}`);
    }
  }
  await page.close();
}

// Accessibility spot-checks on the built markup
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const route of routes) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  const a = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    imgNoAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
    inputNoLabel: [...document.querySelectorAll('input:not([type=checkbox]):not([type=hidden]), select, textarea')]
      .filter((i) => !document.querySelector(`label[for="${i.id}"]`)).length,
    linkNoText: [...document.querySelectorAll('a')]
      .filter((l) => !l.textContent.trim() && !l.getAttribute('aria-label')).length,
    title: document.title,
  }));
  const bad = a.h1 !== 1 || a.imgNoAlt || a.inputNoLabel || a.linkNoText || !a.title;
  if (bad) failures++;
  console.log(`${bad ? '✗' : '✓'} a11y ${route} — h1:${a.h1} img-no-alt:${a.imgNoAlt} input-no-label:${a.inputNoLabel} link-no-text:${a.linkNoText}`);
}

await browser.close();
console.log(failures ? `\n${failures} problem(s)` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
