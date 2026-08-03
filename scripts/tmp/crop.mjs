import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1180, height: 760 }, deviceScaleFactor: 2 });
const img = 'http://localhost:4322/og.png?v=' + Date.now();
// full card, a 1:1 centre crop (what a chat bubble often shows), and a phone-size thumb
await p.setContent(`<body style="margin:0;background:#fff;font-family:monospace;padding:16px">
  <div style="font-size:12px;margin-bottom:6px">FULL 1200x630</div>
  <img src="${img}" width="600" style="display:block;outline:1px solid #ccc">
  <div style="display:flex;gap:26px;margin-top:18px;align-items:flex-start">
    <div>
      <div style="font-size:12px;margin-bottom:6px">1:1 CENTRE CROP</div>
      <div style="width:300px;height:300px;overflow:hidden;position:relative;outline:1px solid #ccc">
        <img src="${img}" style="position:absolute;width:571px;height:300px;left:-135px;top:0">
      </div>
    </div>
    <div>
      <div style="font-size:12px;margin-bottom:6px">CHAT THUMB ~240px</div>
      <img src="${img}" width="240" style="display:block;outline:1px solid #ccc">
    </div>
    <div>
      <div style="font-size:12px;margin-bottom:6px">SMALL 64px</div>
      <img src="${img}" width="64" style="display:block;outline:1px solid #ccc">
    </div>
  </div>
</body>`);
await p.waitForTimeout(900);
await p.screenshot({ path: 'scripts/shots/og-crops.png' });
await b.close();
