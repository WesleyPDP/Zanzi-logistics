# Design

Design language: **"Freight Manifest"** — the paperwork that travels with the
load. Consignment notes, stencilled crate marks, hazard tape, route diagrams
and manifest tables. Hard, industrial, legible at a glance in a depot at 5am.

Reference lane: printed waybills × shipping-container stencils × road-marking
paint. Explicitly **NOT**: corporate-navy freight SaaS, stock photos of trucks
at sunset, soft rounded cards, gradient hero blobs.

## Brand

Red and black, from the logo. Red is the only chromatic colour on the site —
there is no secondary accent, no supporting palette. Everything that is not
black, white-ish or grey is red, and red is always load-bearing (it marks the
thing you're meant to act on, or the thing being measured).

## Theme

Dual-tone rather than light-or-dark: **black bands and paper bands alternate**
down every page, like a manifest interleaved with carbon copies. The nav is
always black. Paper carries the reading; black carries the statements.

## Colour

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f2f1ef` | page canvas |
| `--paper-raised` | `#fafaf9` | sheets, inputs, cards |
| `--paper-dim` | `#e4e3e0` | recessed bands |
| `--ink` | `#121212` | text, black sections, nav |
| `--ink-soft` | `#1c1c1c` | raised surface on black |
| `--ink-line` | `#2e2e2e` | plates and frames on black |
| `--steel` | `#56555a` | muted text on paper (6.5:1) |
| `--red` | `#d6202b` | display, fills, hazard tape, plates |
| `--red-deep` | `#a30f18` | small text and links on paper (7.1:1) |
| `--red-bright` | `#ff4d55` | small text and links on black (5.8:1) |
| `--on-red` | `#fff6f6` | text on red fills (4.8:1) |
| `--paper-on-ink` | `#ededeb` | text on black |
| `--mist-on-ink` | `#a3a2a0` | muted text on black (7.4:1) |

Never `#000` or `#fff` — the black is `#121212` so red doesn't vibrate against
it, and the paper is a neutral off-white so printed-document texture reads.
All greys are neutral (no warm cast — that's PointZero's territory).

## Typography

- **Display: Oswald Variable** (self-hosted, @fontsource). Condensed grotesk,
  weight 600–700, uppercase, tracking `0.01em`. This is stencil-adjacent
  without being a novelty face — it's the register-plate voice.
- **Body: IBM Plex Sans Variable** (self-hosted). Institutional, slightly
  mechanical, built for documents. Weight 400/500, measure ≤ 66ch.
- **Data: IBM Plex Mono** (self-hosted, 400/600). Every reference number,
  code, label, dimension, lead time and table header. This is the manifest
  voice: `0.68–0.76rem`, tracking `0.1–0.18em`, uppercase.

Scale: display `clamp(2.9rem → 7rem)` lh 0.92 · h2 `clamp(2rem → 3.5rem)` ·
h3 `1.3rem` · body `1rem`/1.7 · data `0.72rem`.

## Motifs (the vocabulary)

- **Hazard tape** — 45° red/black diagonal stripes, 8px tall, used as a section
  divider and under the nav. The signature element; used sparingly (never more
  than twice per page).
- **The Z-route mark** — the logo Z drawn as a route diagram: two horizontals
  and a diagonal, with a node at origin and destination.
- **Reference codes** — every page (`ZL-01`), every service (`FR-01`, `WD-02`,
  `XB-03`) and every form (`ZL/ENQ/01`) carries a mono code.
- **Route lines** — a rule with square nodes and mono place labels, measuring a
  real corridor (`JHB ●━━━━━━● CPT · 1 400 KM · 2 DAYS`).
- **Stencil plates** — bordered mono blocks like the ID plate on a container,
  used for statuses and category marks.
- **Manifest tables** — hairline-ruled tables with mono headers and a red rule
  under the header row. Services and lead times are tables, not card grids.
- **Manifest block** — the footer is a consignment note header: CONSIGNOR /
  ORIGIN / SERVICE / REF / ISSUE / SHEET.

## Components

- **Buttons**: square corners (radius 0 site-wide), mono uppercase. Primary =
  red fill; on black, secondary = hairline outline. Hover shifts the fill and
  advances the arrow 4px. No shadows anywhere on the site.
- **Nav**: black bar, red hazard hairline beneath, Z-route mark + `ZANZI`
  wordmark, mono links, red square CTA.
- **Forms**: paper-raised inputs, hairline borders, mono labels, red focus
  ring (2px outline, no glow).
- **Cards**: hairline-framed plates with a mono code in the corner. Flat.

## Motion

Freight moves along a line, so the site does too: reveals translate on **X**,
not Y. Precise, quick, never bouncy.

- Reveals: 500ms `translateX(-18px)` + fade, `cubic-bezier(0.16, 1, 0.3, 1)`,
  staggered by `nth-child` (no inline styles — CSP).
- Route lines and rules draw left→right via `stroke-dashoffset` / `scaleX`.
- Hovers ≤ 200ms. No parallax, no animated layout properties.
- `prefers-reduced-motion`: everything lands instantly.

## Accessibility contract

WCAG AA throughout. `--steel` is the floor for small text on paper,
`--mist-on-ink` on black. `--red` is reserved for display sizes (≥24px) and
fills; links and small text use `--red-deep` on paper and `--red-bright` on
black. Focus visible on every interactive element. Skip link first in the DOM.
Hazard tape and all decorative SVG are `aria-hidden`.
