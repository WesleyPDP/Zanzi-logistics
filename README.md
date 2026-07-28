# Zanzi Logistics

Marketing site for **Zanzi Logistics** — a Johannesburg-based logistics partner
offering linehaul, same-day express, cross-border, dedicated freight, project
logistics, healthcare logistics and warehousing across Southern Africa. Built
with [Astro](https://astro.build) as a fully static site, deployed to
Cloudflare Pages.

> **We don't just carry freight. We carry responsibility.**

## Where the content comes from

All copy and design direction come from the client marketing pack, kept in
`Marketings input/` locally. That folder is **gitignored** — the source
documents live with marketing, not in this repo:

| File | What it drives |
|---|---|
| `Zanzi Logistics Website Copy.docx` | Every word on the site — home, about, services, contact |
| `Zanzi Company Profile.pdf` | The visual language: light theme, red angled tabs, numbered capabilities, dark footer |
| `Logo-exports/` | The logo, and the brand colours `#e00014` / `#0a0b0d` |

The logo files the site actually serves are committed, in
[`public/logo/`](public/logo/). The approved copy is transcribed into
[`src/data/company.ts`](src/data/company.ts) — capabilities, certifications,
values, contact details and the "what you can expect" points all live there.
**Edit that file rather than the pages**, and keep it in step with the source
documents.

`Content.md` in that folder was a set of meeting notes, not a brief, and does
not describe the site.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, "every shipment carries more than freight", Quiet Ownership, capabilities, ISO standards, why Zanzi, CTA |
| `/services` | All seven capabilities in full, plus Certified for Confidence |
| `/network` | Coverage: the map, national reach, cross-border crossings |
| `/about` | Our belief, the promise, what partnership looks like, our values |
| `/contact` | Enquiry form, "prefer to talk?" details, what you can expect |
| `/404` | Not found |

Nav labels are Capabilities / Coverage / About / Let's Talk. Redirects in
`astro.config.mjs`: `/quote` → `/contact`, `/coverage` → `/network`,
`/freight` → `/services`.

## Capabilities

Seven, numbered as in the company profile:

`01` Linehaul · `02` Same-Day Express · `03` Cross-Border · `04` Dedicated
Freight · `05` Project Logistics · `06` Healthcare Logistics · `07` Warehousing

> Note on numbering: the profile lists six capabilities and names `06` *Medical
> Transport*; the website copy calls the same service *Healthcare Logistics*
> and adds *Warehousing*, which the profile mentions in prose. The site carries
> all seven under the website-copy names.

## Certifications

The site publishes ISO 9001:2015, ISO 13485:2016 and ISO 45001:2018, confirmed
by the client as genuinely held. These are **verifiable claims** — do not add
to `certifications` in `company.ts` without a current certificate behind it.

## Design language

Taken from the company profile: light theme, heavy condensed Oswald display,
and everything that can be cut is cut on the logo's `-12deg` angle — tabs,
buttons, the nav's active underline. Red `#e00014` is the only chromatic
colour. Full rationale, the colour contrast table and the accessibility
contract are in **[DESIGN.md](DESIGN.md)**; tokens live in
`src/styles/global.css`.

### The map

`/network` carries a map of South Africa drawn from real longitude/latitude in
[`src/data/geo.ts`](src/data/geo.ts) and projected at build time — no
hand-placed coordinates. It shows hub-and-spoke from the single Johannesburg
base. Edit `mapDepots`, `mapCities`, `mapBorders` and `mapRoutes` to change
what is plotted; `dx`/`dy`/`anchor` position each label. Static, no
interactivity.

No transit times or distances are published anywhere on the site — they depend
on the consignment and the paperwork, and the page says so.

## Contact form

`/contact` posts to [Web3Forms](https://web3forms.com). Set the access key:

```bash
cp .env.example .env
# then set PUBLIC_WEB3FORMS_ACCESS_KEY
```

On Cloudflare Pages, set `PUBLIC_WEB3FORMS_ACCESS_KEY` as a build environment
variable too — it is inlined at build time, not read at runtime.

**Until the key is set the form still renders, but on submit it tells the
visitor to email `info@zanzilogistics.co.za` directly** rather than silently
swallowing the enquiry. That is deliberate, but it is not a substitute for
setting the key.

The key is public by design (it ends up in the client bundle either way).
Abuse is mitigated by the honeypot field and the allowed-domains setting in
the Web3Forms dashboard.

## Security

- Strict security headers in `public/_headers` (Cloudflare Pages):
  `default-src 'none'` CSP with explicit allowances, HSTS, `frame-ancestors
  'none'`, `nosniff`, COOP/CORP.
- No third-party scripts anywhere; fonts self-hosted; the only external call
  is the contact-form POST to `api.web3forms.com`.
- Scripts and styles are always emitted as external files
  (`inlineStylesheets: 'never'`, `assetsInlineLimit: 0`) so the CSP needs no
  `unsafe-inline`.
- Contact form: honeypot field, maxlengths on every input, explicit consent
  checkbox.
- `npm audit`: 0 vulnerabilities.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the build
```

### Verification

With a preview server running:

```bash
npm run check                      # no horizontal overflow at 390/768/1440, a11y basics
npm run shot -- --full             # full-page screenshots → scripts/shots/
npm run shot -- --width=390 --full # phone-width screenshots
```

`npm run check` exits non-zero on failure, so it can gate a deploy. Both
scripts default to `http://localhost:4321`; pass `--base=` if the preview
server picked another port.

## Deployment

Push to `main` → Cloudflare Pages auto-builds (`npm run build`, output
`dist`). Update `site` in `astro.config.mjs` and the sitemap URL in
`public/robots.txt` when the real domain is attached.
