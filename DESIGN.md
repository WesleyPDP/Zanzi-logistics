# Design

The site is built to the **Zanzi Logistics company profile** supplied by
marketing (`Marketings input/Zanzi Company Profile.pdf`). That document — not
this file — is the origin of the look; this file records how it was translated
to the web.

Positioning: a **partnership** brand, not an industrial freight brand. The
line the whole thing hangs on is *"We don't just carry freight. We carry
responsibility."* and the idea underneath it is **Quiet Ownership**. The design
should read confident and calm, never loud or aggressive.

## Brand

Red and black, taken straight from the logo artwork:

| Token | Value | Role |
|---|---|---|
| `--red` | `#e00014` | the brand red — tabs, buttons, emphasis, rules |
| `--black` / `--ink` | `#0a0b0d` | display type, dark bands, footer |
| `--paper` | `#ffffff` | page canvas |
| `--paper-dim` | `#f4f5f6` | alternating light bands |
| `--slate` | `#5a6068` | body text on light (6.4:1) |
| `--red-deep` | `#b00010` | small text and links on light (7.0:1) |
| `--red-bright` | `#ff2b3d` | small text and links on black (5.5:1) |
| `--paper-on-ink` | `#f2f3f4` | text on black |
| `--mist-on-ink` | `#a2a7ad` | muted text on black (7.4:1) |

Red is the only chromatic colour on the site. There is no secondary accent.

## Theme

**Light**, unlike the earlier draft. White and light-grey bands carry the
reading; black bands carry the statements (the promise, why Zanzi, the
certifications, the map); one red band closes each page. The nav is white, the
footer is black with a red rule across the top.

## Typography

- **Display: Oswald Variable** (self-hosted). Heavy condensed uppercase,
  weight 700 — the profile's headline voice.
- **Body: IBM Plex Sans Variable** (self-hosted). Weight 400/500, measure ≤ 68ch.
- **Labels: IBM Plex Mono** (self-hosted, 400/600). Tabs, eyebrows, capability
  numbers, form labels, footer meta.

Scale: h1 `clamp(2.5rem → 5.4rem)` lh 0.98 · h2 `clamp(1.9rem → 3.2rem)` ·
h3 `1.25rem` · body `1rem`/1.7 · label `0.7rem`.

## The angle

The logo's Z is built from cut diagonals, so **everything that can be cut is
cut on the same angle** — `--skew: -12deg`. Tabs, buttons and the nav's active
underline are all skewed parallelograms with the inner text un-skewed so it
stays upright. This is the single strongest visual tie to the logo.

## Motifs

- **Red tab** (`Tab.astro`) — the profile's section marker: a red parallelogram
  holding a mono label, sitting above every section heading.
- **Numbered capabilities** — red number over a red underline, then the name,
  then the italicised lead line. Straight from the profile's `01 LINEHAUL`.
- **Road swoosh** (`.swoosh`) — the receding highway from the logo, abstracted
  into a pale diagonal sweep that stops large bands reading as empty.
  Decorative and always `aria-hidden`.
- **The map** — a real South Africa projected from longitude/latitude at build
  time (`src/data/geo.ts`), never hand-placed. Hub-and-spoke from the single
  Johannesburg base, because that is genuinely how the operation is shaped.
  Labels carry a dark `paint-order: stroke` halo so text never sits under a
  route line.

## Components

- **Buttons**: skewed, square corners, mono uppercase. Primary = red fill;
  secondary = hairline outline. Hover shifts the fill and advances the arrow.
  No shadows.
- **Card grids**: hairlines come from a `box-shadow` ring on each card, not
  from a container background showing through the gaps — there are seven
  capabilities, which never fill a 3- or 2-column grid, and a container
  background leaves empty grey cells in the last row.
- **Forms**: white inputs, hairline borders, mono labels, red focus ring.

## Motion

- Reveals: 550ms `translateY(16px)` + fade, `cubic-bezier(0.16, 1, 0.3, 1)`,
  staggered by `nth-child` (no inline styles — CSP).
- Tabs slide in from the left as their section arrives.
- Hovers ≤ 200ms. No parallax, no animated layout properties.
- `prefers-reduced-motion`: everything lands instantly.

**Scoped-style trap:** Astro rewrites selectors in a page's `<style>` block,
so a rule rooted at `html.js` becomes `.js[data-astro-cid-…]` and never
matches. Any reveal that depends on the `js` class must live in `global.css`,
not in a page. This already caused the map's routes to render invisibly once.

## Accessibility contract

WCAG AA throughout. `--slate` is the floor for small text on white,
`--mist-on-ink` on black; `--red` is reserved for display sizes and fills,
with `--red-deep` / `--red-bright` for small text and links. Focus visible on
every interactive element. Skip link first in the DOM. All decorative SVG and
the swoosh are `aria-hidden`.
