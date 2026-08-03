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

/*
 * Layout note: WhatsApp (and several other chat clients) centre-crop a
 * 1.91:1 card towards square in the preview bubble. So the composition is
 * CENTRED and everything meaningful is kept inside a ~700px-wide safe zone,
 * which survives a 630×630 centre crop. That is why this card is centred
 * while the site itself is left-aligned — a share card that gets cropped is
 * worth more than one that matches the page exactly.
 *
 * Type is also deliberately large: these previews are often read at
 * thumbnail size on a phone.
 */
const SAFE = 760; // px — keep all content within this centred column

const html = `<!doctype html><meta charset="utf-8"><style>
  @font-face { font-family: Oswald; src: url("${OSWALD}") format("woff2"); font-weight: 200 700; }
  @font-face { font-family: Plex; src: url("${MONO}") format("woff2"); font-weight: 400; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0a0b0d; overflow: hidden; position: relative; }

  /* the road swoosh, cut on the logo's angle — kept to the outer thirds so
     it never sits behind the type */
  .sweep {
    position: absolute; inset: -20% -30% -20% 46%;
    background: linear-gradient(100deg,
      transparent 0 38%,
      rgba(242,243,244,.05) 38% 49%,
      transparent 49% 58%,
      rgba(224,0,20,.26) 58% 65%,
      transparent 65%);
    transform: skewX(-12deg);
  }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; background: #e00014; }

  .inner {
    position: relative; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    padding: 48px 40px 62px;
  }
  .logo { height: 96px; width: auto; }

  .kicker {
    margin-top: 30px;
    font-family: Oswald, sans-serif; font-weight: 500; text-transform: uppercase;
    font-size: 34px; line-height: 1; letter-spacing: .02em; color: #a2a7ad;
    max-width: ${SAFE}px;
  }
  h1 {
    margin-top: 14px;
    font-family: Oswald, sans-serif; font-weight: 700; text-transform: uppercase;
    font-size: 96px; line-height: 0.94; letter-spacing: .005em; color: #f2f3f4;
    max-width: ${SAFE}px;
  }
  h1 em { font-style: normal; color: #e00014; }

  .rule { margin-top: 30px; width: 132px; height: 5px; background: #e00014; }
  .place {
    margin-top: 24px;
    font-family: Plex, monospace; font-size: 19px; letter-spacing: .22em;
    text-transform: uppercase; color: #a2a7ad;
  }
</style>
<body>
  <div class="sweep"></div>
  <div class="inner">
    <img class="logo" src="${LOGO}">
    <p class="kicker">We don’t just carry freight.</p>
    <h1>We carry <em>responsibility.</em></h1>
    <div class="rule"></div>
    <p class="place">Johannesburg &middot; Southern Africa</p>
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
