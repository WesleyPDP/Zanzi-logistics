# Zanzi Logistics

Company website for **Zanzi Logistics** — road freight, third-party
warehousing and distribution, and cross-border and customs clearing across
South Africa and the SADC region. Built with [Astro](https://astro.build) as a
fully static site, deployed to Cloudflare Pages.

---

## ⚠️ Before this goes live

Every business fact on this site lives in **[`src/data/company.ts`](src/data/company.ts)**
and a lot of it is **invented placeholder content**. Nothing else in the
codebase hard-codes a phone number, address, lead time or statistic — edit
that one file and the whole site updates.

Search the file for `PLACEHOLDER`. At minimum, replace:

| What | Where | Currently |
|---|---|---|
| Phone numbers | `contact.phone`, `contact.opsPhone` | `+27 11 000 0000` / `0001` |
| Email addresses | `contact.email`, `contact.quotesEmail` | `@zanzilogistics.co.za` |
| Registration & VAT numbers | `company.regNo`, `company.vatNo` | zeroes |
| Year founded | `company.founded` | `2019` |
| Depot addresses | `hubs[].address` | suburb only, no street |
| Headline statistics | `stats` | depot/province/corridor counts |
| Lane distances & transit times | `lanes` | indicative only |
| Cross-border transit times | `corridors` | border posts real, times indicative |
| Compliance claims | `compliance` | **publish only what you actually hold** |

The marketing copy on `/about` (company story) is written to a plausible
positioning but has not been approved by anyone at the business — read it
before launch and make it true.

The site is also not connected to an inbox yet. See
[Quote form](#quote-form) below.

---

## Pages

| Route | Ref | Purpose |
|---|---|---|
| `/` | ZL-01 | Hero, capability strip, three divisions, operating cycle, network snapshot, commitments, CTA |
| `/services` | ZL-02 | The three divisions in full, equipment table, what we need to quote |
| `/network` | ZL-03 | Depots, route schematic, domestic lead times, SADC corridors, international forwarding |
| `/about` | ZL-04 | The company, operating commitments, cover and compliance, registration details |
| `/contact` | ZL-05 | Freight enquiry form, contact lines, depot list |
| `/404` | ZL-404 | Not found |

Redirects are configured in `astro.config.mjs`: `/quote` → `/contact`,
`/coverage` → `/network`, `/freight` → `/services`.

## What the company does

Three divisions, all run in-house rather than subcontracted:

- **Road freight (FR)** — full truckload, part load / groupage, containerised
  haulage, abnormal and flatbed, dedicated contract fleet.
- **Warehousing & distribution (WD)** — racked and bulk storage, pick / pack /
  dispatch, inventory management, cross-docking, retail DC delivery, returns.
- **Cross-border & customs (XB)** — SADC overland, customs clearing, bonded
  movement, documentation, international sea and air forwarding.

Coverage: South Africa nationwide, SADC overland corridors, and international
import/export by sea and air.

## Design language

**"Freight Manifest"** — the paperwork that travels with the load. Consignment
notes, stencilled crate marks, hazard tape, route diagrams and manifest
tables. **Red and black only** (`#d6202b` / `#121212`), from the logo; red is
the site's one chromatic colour and is always load-bearing. Black bands and
paper bands alternate down every page.

Type is Oswald (display), IBM Plex Sans (body) and IBM Plex Mono (all
reference codes, labels and table headers), all self-hosted via Fontsource.
Full rationale and the accessibility contract are in **[DESIGN.md](DESIGN.md)**;
tokens live in `src/styles/global.css`.

## Quote form

`/contact` posts to [Web3Forms](https://web3forms.com). Set the access key:

```bash
cp .env.example .env
# then set PUBLIC_WEB3FORMS_ACCESS_KEY
```

On Cloudflare Pages, set `PUBLIC_WEB3FORMS_ACCESS_KEY` as a build environment
variable too — it is inlined at build time, not read at runtime.

**If the key is unset the form still renders, but on submit it tells the
visitor to email `quotes@` directly** rather than silently swallowing the
enquiry. That is deliberate, but it is not a substitute for setting the key.

The key is public by design (it ends up in the client bundle either way).
Abuse is mitigated by the honeypot field and the allowed-domains setting in
the Web3Forms dashboard.

## Security

- Strict security headers in `public/_headers` (Cloudflare Pages):
  `default-src 'none'` CSP with explicit allowances, HSTS, `frame-ancestors
  'none'`, `nosniff`, COOP/CORP.
- No third-party scripts anywhere; fonts self-hosted; the only external call
  is the quote-form POST to `api.web3forms.com`.
- Scripts and styles are always emitted as external files
  (`inlineStylesheets: 'never'`, `assetsInlineLimit: 0`) so the CSP needs no
  `unsafe-inline`.
- Quote form: honeypot field, maxlengths on every input, explicit consent
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
