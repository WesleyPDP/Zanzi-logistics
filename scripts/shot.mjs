/**
 * Screenshot every page against a running preview server, for visual review.
 *
 *   npm run build && npm run preview      # in one terminal
 *   node scripts/shot.mjs                 # in another
 *
 * Options:
 *   --base=http://localhost:4321   preview server URL
 *   --out=scripts/shots            output directory
 *   --width=1440                   viewport width (use 390 for phone)
 *   --full                         full-page instead of above-the-fold
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};

const base = arg('base', 'http://localhost:4321');
const out = arg('out', 'scripts/shots');
const width = Number(arg('width', '1440'));
const fullPage = process.argv.includes('--full');

const routes = [
  ['/', 'home'],
  ['/services', 'services'],
  ['/network', 'network'],
  ['/about', 'about'],
  ['/contact', 'contact'],
  ['/404', '404'],
];

await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 2,
});

for (const [route, name] of routes) {
  const res = await page.goto(base + route, { waitUntil: 'networkidle' });
  // 404 is expected to 404; everything else must be 200
  if (name !== '404' && res && res.status() !== 200) {
    console.error(`✗ ${route} returned ${res.status()}`);
  }
  // Reveals are driven by IntersectionObserver, so a full-page capture of an
  // unscrolled page would catch every section still hidden. Walk down the
  // page to trigger them, then return to the top.
  if (fullPage) {
    await page.evaluate(async () => {
      // global.css sets `scroll-behavior: smooth`, which would make each
      // scrollTo animate and cancel the previous one — never reaching the
      // bottom. Force instant jumps for the duration of the walk.
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 140));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.style.scrollBehavior = prev;
    });
  }
  // let the reveal + draw-in animations settle
  await page.waitForTimeout(2600);
  const file = `${out}/${width}-${name}.png`;
  await page.screenshot({ path: file, fullPage });
  console.log(`✓ ${route} → ${file}`);
}

await browser.close();
