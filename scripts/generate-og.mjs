/**
 * Generates the social share card (public/og.png, 1200×630) and the iOS
 * home-screen icon (public/apple-touch-icon.png, 180×180).
 *
 *   node scripts/generate-og.mjs
 *
 * Run this whenever the promise line, the logo or the brand colours change.
 * Both outputs are committed, so a normal build never needs Playwright.
 */
import { chromium } from 'playwright';
import { writeFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const tmp = join(here, '.og.html');

const font = (p) => pathToFileURL(join(root, 'node_modules', p)).href;
const OSWALD = font('@fontsource-variable/oswald/files/oswald-latin-wght-normal.woff2');
const MONO = font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2');
const LOGO = pathToFileURL(join(root, 'public/logo/zanzi-logistics-on-dark.svg')).href;
const ICON = pathToFileURL(join(root, 'public/favicon.svg')).href;

const CAPABILITIES =
  'Linehaul · Same-Day Express · Cross-Border · Dedicated Freight · Project Logistics · Healthcare Logistics · Warehousing';

const html = `<!doctype html><meta charset="utf-8"><style>
  @font-face { font-family: Oswald; src: url("${OSWALD}") format("woff2"); font-weight: 200 700; }
  @font-face { font-family: Plex; src: url("${MONO}") format("woff2"); font-weight: 400; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0a0b0d; overflow: hidden; position: relative; }

  /* the road swoosh, cut on the logo's angle */
  .sweep {
    position: absolute; inset: -20% -30% -20% 40%;
    background: linear-gradient(100deg,
      transparent 0 38%,
      rgba(242,243,244,.055) 38% 49%,
      transparent 49% 57%,
      rgba(224,0,20,.30) 57% 64%,
      transparent 64%);
    transform: skewX(-12deg);
  }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: #e00014; }

  .inner {
    position: relative; padding: 72px 80px; height: 100%;
    display: flex; flex-direction: column; align-items: flex-start;
  }
  .logo { height: 104px; width: auto; }

  h1 {
    font-family: Oswald, sans-serif; font-weight: 700; text-transform: uppercase;
    font-size: 84px; line-height: 0.98; letter-spacing: .005em; color: #f2f3f4;
    margin-top: auto;
  }
  h1 em { font-style: normal; color: #e00014; }

  .foot { margin-top: 34px; display: flex; align-items: flex-start; gap: 18px; }
  .tab {
    background: #e00014; color: #fff; font-family: Plex, monospace; font-size: 15px;
    letter-spacing: .18em; text-transform: uppercase; padding: 9px 22px 9px 16px;
    transform: skewX(-12deg);
  }
  .tab span { display: block; transform: skewX(12deg); }
  .caps {
    font-family: Plex, monospace; font-size: 15px; letter-spacing: .06em;
    color: #a2a7ad; line-height: 1.55; padding-top: 5px; max-width: 780px;
  }
</style>
<body>
  <div class="sweep"></div>
  <div class="inner">
    <img class="logo" src="${LOGO}">
    <h1>We don’t just carry freight.<br><em>We carry responsibility.</em></h1>
    <div class="foot">
      <span class="tab"><span>Johannesburg</span></span>
      <span class="caps">${CAPABILITIES}</span>
    </div>
  </div>
  <div class="bar"></div>
</body>`;

writeFileSync(tmp, html);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(root, 'public/og.png') });
  console.log('✓ public/og.png (1200×630)');

  // iOS home-screen icon: the favicon, rendered flat at 180px
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await icon.setContent(
    `<body style="margin:0"><img src="${ICON}" width="180" height="180"></body>`
  );
  await icon.waitForTimeout(300);
  await icon.screenshot({ path: join(root, 'public/apple-touch-icon.png') });
  console.log('✓ public/apple-touch-icon.png (180×180)');
} finally {
  await browser.close();
  unlinkSync(tmp);
}
