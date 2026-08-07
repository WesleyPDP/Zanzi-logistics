/* ════════════════════════════════════════════════════════════
   Zanzi Logistics — company facts and approved copy.

   Source of truth: the marketing pack in `Marketings input/`
   ("Zanzi Logistics Website Copy" and "Zanzi Company Profile").
   Copy below is taken from those documents — edit them and this
   file together, not one without the other.
   ════════════════════════════════════════════════════════════ */

export const company = {
  name: 'Zanzi Logistics',
  legalName: 'Zanzi Logistics',
  /** The line the whole brand hangs on. */
  promise: 'We don’t just carry freight. We carry responsibility.',
  /** The idea behind the promise. */
  principle: 'Quiet Ownership',
  intro:
    'At Zanzi Logistics, we believe the strongest businesses are built on trusted partnerships. We help businesses move with confidence by taking responsibility for the operational challenges that stand between them and their growth.',
} as const;

export const contact = {
  phone: '+27 84 505 6323',
  phoneHref: 'tel:+27845056323',
  phoneAlt: '+27 82 970 3683',
  phoneAltHref: 'tel:+27829703683',
  email: 'info@zanzilogistics.co.za',
  /** Marketing publishes the city only — no street address. */
  office: 'Johannesburg, South Africa',
  hours: 'Monday – Friday | 08:00 – 17:00',
} as const;

/**
 * The capability set. Numbering follows the company profile; Warehousing
 * appears in the profile intro and the homepage copy, and Healthcare
 * Logistics is the website-copy name for the profile's "Medical Transport".
 */
export const capabilities = [
  {
    no: '01',
    slug: 'linehaul',
    name: 'Linehaul',
    lead: 'Keeping your operations connected.',
    body: 'Reliable transport between branches, warehouses and distribution centres that keeps your supply chain moving without interruption. Whether you’re replenishing stock, supporting manufacturing or connecting regional operations, we ensure freight arrives where it’s needed, on schedule and with complete visibility.',
    short: 'Reliable freight movement between branches, warehouses and distribution centres.',
  },
  {
    no: '02',
    slug: 'same-day-express',
    name: 'Same-Day Express',
    lead: 'Because some deliveries simply can’t wait.',
    body: 'When every hour counts, speed alone isn’t enough. Our Same-Day Express service combines rapid response with proactive communication, giving you confidence that urgent freight will arrive exactly when it’s needed.',
    short: 'Time-critical deliveries when every hour matters.',
  },
  {
    no: '03',
    slug: 'cross-border',
    name: 'Cross-Border',
    lead: 'Southern Africa without the uncertainty.',
    body: 'Moving freight across borders is about more than transport. It’s about documentation, compliance, coordination and experience. We manage the complexity behind the scenes so your business can continue moving forward.',
    short: 'Seamless freight movement throughout the SADC region with customs expertise.',
  },
  {
    no: '04',
    slug: 'dedicated-freight',
    name: 'Dedicated Freight',
    lead: 'One shipment. One vehicle. One priority.',
    body: 'When timing, security or operational requirements demand complete focus, your freight travels exclusively on a dedicated vehicle without any unnecessary stops, transfers or handling. It’s transport designed entirely around your business.',
    short: 'Exclusive vehicle solutions tailored to your shipment and schedule.',
  },
  {
    no: '05',
    slug: 'project-logistics',
    name: 'Project Logistics',
    lead: 'For freight that refuses to fit the standard.',
    body: 'Not every shipment fits neatly onto a truck. Whether it’s oversized equipment, sensitive cargo or operationally complex freight, we combine planning, experience and careful execution to ensure every movement is handled with confidence.',
    short: 'Planned transport for oversized, specialised and complex cargo.',
  },
  {
    no: '06',
    slug: 'healthcare-logistics',
    name: 'Healthcare Logistics',
    lead: 'Precision where it matters most.',
    body: 'Specialised transport solutions for sensitive medical devices and healthcare equipment, delivered with precision, care and complete accountability.',
    short: 'Specialised transport for sensitive medical devices and healthcare equipment.',
  },
  {
    no: '07',
    slug: 'warehousing',
    name: 'Warehousing',
    lead: 'Storage that keeps your business moving.',
    body: 'Warehousing should do more than hold inventory. Our storage solutions become an extension of your operation, supporting smarter inventory management, faster distribution and a supply chain that’s ready when you are.',
    short: 'Storage that becomes an extension of your operation.',
  },
] as const;

/**
 * Vehicle types freight can be moved on, as supplied by the client.
 *
 * `name` is the exact wording given and is what appears in the enquiry
 * dropdown; `size` and `feature` only split that name up for display.
 *
 * ⚠️ Two items to confirm with the client before this is considered final:
 *   - "4 ton rail lift" is almost certainly meant to be "tail lift", to
 *     match the 8 and 16 ton entries. Left as supplied rather than guessed.
 *   - "Super link" is normally written "Superlink" in SA road freight.
 */
export const vehicles = [
  { name: '1 ton', size: '1 ton', feature: null },
  { name: '4 ton', size: '4 ton', feature: null },
  { name: '4 ton rail lift', size: '4 ton', feature: 'Rail lift' },
  { name: '8 ton', size: '8 ton', feature: null },
  { name: '8 ton tail lift', size: '8 ton', feature: 'Tail lift' },
  { name: '12 ton', size: '12 ton', feature: null },
  { name: '16 ton', size: '16 ton', feature: null },
  { name: '16 ton with tail lift', size: '16 ton', feature: 'Tail lift' },
  { name: '16 ton and trailer', size: '16 ton', feature: 'With trailer' },
  { name: 'Super link', size: 'Super link', feature: null },
] as const;

/**
 * ISO certifications, confirmed by the client as genuinely held.
 * These are verifiable claims — do not add to this list without a
 * current certificate to back it.
 */
export const certifications = [
  {
    code: 'ISO 9001:2015',
    name: 'Quality Management Systems',
    body: 'Delivering consistent, reliable service through robust quality management processes.',
  },
  {
    code: 'ISO 13485:2016',
    name: 'Medical Devices Quality Management Systems',
    body: 'Supporting the safe and compliant handling of medical devices and healthcare logistics.',
  },
  {
    code: 'ISO 45001:2018',
    name: 'Occupational Health & Safety Management Systems',
    body: 'Maintaining safe working environments for our people, our partners and every operation we undertake.',
  },
] as const;

/** Homepage — "Why Businesses Choose Zanzi". */
export const whyZanzi = [
  {
    title: 'We Think Ahead',
    body: 'We anticipate challenges before they become disruptions, helping your business stay one step ahead.',
  },
  {
    title: 'We Communicate Clearly',
    body: 'No surprises. No silence. Just proactive communication that keeps you informed and in control.',
  },
  {
    title: 'We Take Responsibility',
    body: 'From collection to delivery, we treat every shipment with the same care and accountability we’d expect for our own business.',
  },
] as const;

/** About page — "Our Values". */
export const values = [
  { title: 'We Take Responsibility', body: 'We own the outcome from collection through to delivery.' },
  { title: 'We Build Partnerships', body: 'Your business goals become part of our own.' },
  { title: 'We Communicate Clearly', body: 'Honest, proactive communication creates confidence.' },
  { title: 'We Follow Through', body: 'Doing what we say we’ll do is the foundation of trust.' },
  {
    title: 'We Never Stop Improving',
    body: 'Every delivery teaches us something. Every partnership makes us better.',
  },
] as const;

/** Contact page — "What You Can Expect". */
export const expectations = [
  {
    title: 'We’ll Listen First',
    body: 'Before recommending a solution, we take the time to understand your business, your operation and what success looks like for you.',
  },
  {
    title: 'We’ll Build Around Your Business',
    body: 'No two businesses move the same way. We tailor our logistics solutions around your operational requirements — not the other way around.',
  },
  {
    title: 'We’ll Stay Involved',
    body: 'From your first shipment to your hundredth, you’ll have a team that communicates proactively, follows through on commitments and treats your business like it’s worth protecting.',
  },
] as const;

/**
 * Border crossings we work through. These are real, named crossings —
 * no transit times are published, because those depend entirely on the
 * consignment and the paperwork.
 */
export const crossings = [
  { country: 'Zimbabwe', post: 'Beitbridge' },
  { country: 'Botswana', post: 'Skilpadshek / Kopfontein' },
  { country: 'Mozambique', post: 'Lebombo / Ressano Garcia' },
  { country: 'Namibia', post: 'Nakop / Ariamsvlei' },
  { country: 'Eswatini', post: 'Oshoek' },
  { country: 'Lesotho', post: 'Maseru Bridge' },
] as const;

/** Major domestic centres served on linehaul from the Johannesburg base. */
export const centres = [
  'Cape Town',
  'Durban',
  'Gqeberha',
  'Bloemfontein',
  'Polokwane',
  'Nelspruit',
  'East London',
  'Kimberley',
] as const;
