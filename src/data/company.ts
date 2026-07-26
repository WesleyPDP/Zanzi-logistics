/* ════════════════════════════════════════════════════════════
   Zanzi Logistics — company facts, in one place.

   ⚠️  EVERY VALUE MARKED `PLACEHOLDER` IS INVENTED and must be
   replaced with the real figure before this site goes live.
   Nothing else in the codebase hard-codes a phone number, an
   address, a lead time or a statistic — edit here and the whole
   site updates.
   ════════════════════════════════════════════════════════════ */

export const company = {
  name: 'Zanzi Logistics',
  legalName: 'Zanzi Logistics (Pty) Ltd', // PLACEHOLDER — confirm registered name
  tagline: 'Freight moved on schedule.',
  /** PLACEHOLDER — company registration number */
  regNo: '0000/000000/07',
  /** PLACEHOLDER — VAT number, or delete the footer line that renders it */
  vatNo: '0000000000',
  founded: 2019, // PLACEHOLDER — confirm the real year
} as const;

export const contact = {
  /** PLACEHOLDER — the site links this with tel:, so it must be real */
  phone: '+27 11 000 0000',
  phoneHref: 'tel:+27110000000',
  /** PLACEHOLDER — 24/7 operations line, or remove from the nav + contact page */
  opsPhone: '+27 11 000 0001',
  opsPhoneHref: 'tel:+27110000001',
  email: 'hello@zanzilogistics.co.za', // PLACEHOLDER
  quotesEmail: 'quotes@zanzilogistics.co.za', // PLACEHOLDER
  hours: 'Mon–Fri 07:00–17:00 · Sat 07:00–12:00',
  opsHours: 'Operations desk manned 24/7 for freight in transit',
} as const;

/**
 * Depots. `address` is deliberately suburb-level — fill in real street
 * addresses before launch, or leave as-is if you'd rather not publish them.
 */
export const hubs = [
  {
    code: 'JNB',
    city: 'Johannesburg',
    role: 'Head office & national hub',
    address: 'Kempton Park, Gauteng', // PLACEHOLDER
    note: 'Linehaul origin for all national routes, bonded warehousing, cross-border staging.',
    primary: true,
  },
  {
    code: 'CPT',
    city: 'Cape Town',
    role: 'Regional depot',
    address: 'Bellville, Western Cape', // PLACEHOLDER
    note: 'Western Cape distribution, port collections and container drayage.',
    primary: false,
  },
  {
    code: 'DUR',
    city: 'Durban',
    role: 'Port depot',
    address: 'Pinetown, KwaZulu-Natal', // PLACEHOLDER
    note: 'Port of Durban clearing, container handling and inland transfer.',
    primary: false,
  },
] as const;

/** PLACEHOLDER — every one of these figures. Do not publish unverified. */
export const stats = [
  { value: '3', label: 'Depots nationwide' },
  { value: '9', label: 'Provinces served' },
  { value: '24/7', label: 'Operations desk' },
  { value: '5', label: 'SADC corridors' },
] as const;

/** The three divisions. `code` is the reference used across the site. */
export const divisions = [
  {
    code: 'FR',
    slug: 'road-freight',
    name: 'Road Freight',
    short: 'FTL, LTL and dedicated fleet across all nine provinces.',
    blurb:
      'Full loads, part loads and dedicated contract fleet, moved on scheduled linehaul between our depots and delivered into any address in the country.',
    services: [
      {
        ref: 'FR-01',
        name: 'Full truckload (FTL)',
        desc: 'A dedicated vehicle for your load, collected and delivered direct with no intermediate handling.',
      },
      {
        ref: 'FR-02',
        name: 'Part load & groupage (LTL)',
        desc: 'You pay for the space you use. Loads are consolidated onto scheduled linehaul and split at the destination depot.',
      },
      {
        ref: 'FR-03',
        name: 'Containerised haulage',
        desc: 'Container drayage from the ports of Durban and Cape Town to inland depots, warehouses and unpack sites.',
      },
      {
        ref: 'FR-04',
        name: 'Abnormal & flatbed',
        desc: 'Over-dimensional and over-mass freight on flatbed and step-deck trailers, with permits and escorts arranged.',
      },
      {
        ref: 'FR-05',
        name: 'Dedicated contract fleet',
        desc: 'Vehicles and drivers assigned to your operation on a fixed monthly contract, running your routes to your schedule.',
      },
    ],
  },
  {
    code: 'WD',
    slug: 'warehousing',
    name: 'Warehousing & Distribution',
    short: 'Third-party storage, pick and pack, and onward distribution.',
    blurb:
      'Third-party logistics: we hold your stock, manage it as if it were ours, and push it out to your customers, your stores or your distribution centres.',
    services: [
      {
        ref: 'WD-01',
        name: 'Racked & bulk storage',
        desc: 'Palletised racking and open bulk floor space, billed per pallet or per square metre.',
      },
      {
        ref: 'WD-02',
        name: 'Pick, pack & dispatch',
        desc: 'Orders picked to your spec, packed, labelled and released onto the correct outbound route the same day.',
      },
      {
        ref: 'WD-03',
        name: 'Inventory management',
        desc: 'Goods-received checks, cycle counts and stock reporting, so your figures and ours agree at month end.',
      },
      {
        ref: 'WD-04',
        name: 'Cross-docking',
        desc: 'Inbound freight broken down and reloaded straight onto outbound vehicles, without ever entering storage.',
      },
      {
        ref: 'WD-05',
        name: 'Retail & DC distribution',
        desc: 'Delivery into major retail distribution centres to their booking windows, compliance and labelling rules.',
      },
      {
        ref: 'WD-06',
        name: 'Returns handling',
        desc: 'Reverse logistics: collection, inspection, and either return to stock or disposal on your instruction.',
      },
    ],
  },
  {
    code: 'XB',
    slug: 'cross-border',
    name: 'Cross-Border & Customs',
    short: 'SADC overland, customs clearing and international forwarding.',
    blurb:
      'Overland freight into the SADC region, cleared through the border by our own people, plus customs clearing and forwarding for import and export by sea and air.',
    services: [
      {
        ref: 'XB-01',
        name: 'SADC overland freight',
        desc: 'Scheduled and ad-hoc road freight into Zimbabwe, Botswana, Namibia, Mozambique and Zambia.',
      },
      {
        ref: 'XB-02',
        name: 'Customs clearing',
        desc: 'Entries lodged, duties and VAT calculated, and queries handled directly with the revenue authority.',
      },
      {
        ref: 'XB-03',
        name: 'Bonded movement',
        desc: 'Cargo moved under bond between ports, bonded warehouses and border posts without duty falling due.',
      },
      {
        ref: 'XB-04',
        name: 'Documentation',
        desc: 'Commercial invoices, packing lists, certificates of origin, permits and road manifests, prepared and checked before the truck moves.',
      },
      {
        ref: 'XB-05',
        name: 'International forwarding',
        desc: 'Sea and air freight forwarding for import and export, door to door, with the inland leg on our own fleet.',
      },
    ],
  },
] as const;

/**
 * The operating cycle — what actually happens to a load. This is the
 * "pick up, routing, delivery" spine of the business.
 */
export const cycle = [
  {
    step: '01',
    name: 'Booking',
    desc: 'You send the load details — what it is, where it is, where it needs to be, and by when. We confirm the rate and the collection window in writing.',
  },
  {
    step: '02',
    name: 'Collection',
    desc: 'A vehicle arrives inside the agreed window. The load is checked against the waybill, sealed where required, and signed for at the point of collection.',
  },
  {
    step: '03',
    name: 'Routing & linehaul',
    desc: 'The load is planned onto the right route — direct if it is a full load, consolidated onto scheduled linehaul if it is not. Cross-border loads are cleared before they reach the border.',
  },
  {
    step: '04',
    name: 'Delivery & POD',
    desc: 'Delivered into the agreed window, checked in by the receiver, and signed for. Proof of delivery comes back to you, and it is filed against the job.',
  },
] as const;

/**
 * Domestic linehaul lead times.
 * PLACEHOLDER — every distance and transit time below is indicative and
 * must be checked against your real schedule before publishing.
 */
export const lanes = [
  { from: 'JNB', to: 'CPT', km: '1 400 km', ftl: '2 days', ltl: '3–4 days' },
  { from: 'JNB', to: 'DUR', km: '570 km', ftl: '1 day', ltl: '2–3 days' },
  { from: 'JNB', to: 'PLZ', km: '1 050 km', ftl: '2 days', ltl: '3–4 days' },
  { from: 'CPT', to: 'DUR', km: '1 660 km', ftl: '2–3 days', ltl: '4–5 days' },
  { from: 'JNB', to: 'BFN', km: '400 km', ftl: '1 day', ltl: '2 days' },
  { from: 'JNB', to: 'NLP', km: '320 km', ftl: '1 day', ltl: '2 days' },
] as const;

/**
 * Cross-border corridors.
 * PLACEHOLDER — border posts are real, transit times are indicative.
 */
export const corridors = [
  { country: 'Zimbabwe', border: 'Beitbridge', transit: '3–5 days', note: 'Daily departures from Johannesburg' },
  { country: 'Botswana', border: 'Skilpadshek / Kopfontein', transit: '2–3 days', note: 'Scheduled weekly linehaul' },
  { country: 'Namibia', border: 'Nakop / Ariamsvlei', transit: '3–4 days', note: 'Consolidated groupage available' },
  { country: 'Mozambique', border: 'Lebombo / Ressano Garcia', transit: '2–4 days', note: 'Maputo corridor, bonded transit' },
  { country: 'Zambia', border: 'Beitbridge → Chirundu', transit: '5–7 days', note: 'Via Zimbabwe, under bond' },
] as const;

/** Place codes used in the lane table, spelled out for the reader. */
export const placeNames: Record<string, string> = {
  JNB: 'Johannesburg',
  CPT: 'Cape Town',
  DUR: 'Durban',
  PLZ: 'Gqeberha',
  BFN: 'Bloemfontein',
  NLP: 'Polokwane',
};

/** What we will and will not take on — stated plainly. */
export const commitments = [
  {
    ref: '01',
    title: 'A named controller on every account',
    body: 'You deal with a person who knows your freight, not a queue. They book it, they watch it, and they are the one who calls you if something changes.',
  },
  {
    ref: '02',
    title: 'The rate you were quoted is the rate you are invoiced',
    body: 'Quotes are issued in writing with the surcharges spelled out. Nothing appears on the invoice that was not on the quote, unless you asked for it in writing.',
  },
  {
    ref: '03',
    title: 'Bad news early',
    body: 'A truck breaks down, a border closes, a load is short. You hear it from us the moment we know, not when you chase the POD three days later.',
  },
  {
    ref: '04',
    title: 'Goods in transit cover as standard',
    body: 'Every load moves under goods-in-transit cover. High-value consignments can be declared and covered to their full value on request.',
  },
] as const;

/**
 * Equipment we can put under a load. These are capability descriptions, not
 * a fleet count — add real vehicle numbers here only once they are verified.
 */
export const equipment = [
  { type: 'Superlink', payload: 'up to 34 t', deck: '2 × 8 m', use: 'National linehaul, palletised and bulk freight' },
  { type: 'Tri-axle trailer', payload: 'up to 30 t', deck: '13.6 m', use: 'FTL between depots and direct deliveries' },
  { type: 'Flatbed & step-deck', payload: 'up to 30 t', deck: '13.6 m', use: 'Abnormal, over-dimensional and machinery' },
  { type: 'Skeletal trailer', payload: '20 ft / 40 ft', deck: 'Container', use: 'Port drayage and container haulage' },
  { type: 'Rigid 8 t truck', payload: 'up to 8 t', deck: '7 m', use: 'Urban distribution and retail DC delivery' },
  { type: 'Rigid 4 t truck', payload: 'up to 4 t', deck: '5 m', use: 'Part loads, collections and last-leg delivery' },
] as const;

/** What we need from a customer before a rate can be issued. */
export const quoteChecklist = [
  { ref: '01', item: 'Collection and delivery addresses', why: 'Suburb and province is enough to start; we need the full address to book.' },
  { ref: '02', item: 'What the freight is', why: 'Commodity, and whether it is hazardous, temperature-sensitive or high-value.' },
  { ref: '03', item: 'Mass and dimensions', why: 'Total kilograms, and pallet count or LxWxH. This decides the vehicle.' },
  { ref: '04', item: 'When it is ready', why: 'The collection date, and the date it must be delivered by.' },
  { ref: '05', item: 'Loading and offloading', why: 'Whether there is a forklift or dock at each end, or whether we must load by hand.' },
  { ref: '06', item: 'For cross-border: the paperwork', why: 'Commercial invoice, packing list and any permits. We will tell you what is missing.' },
] as const;

/** Compliance credentials. PLACEHOLDER — publish only what you actually hold. */
export const compliance = [
  { item: 'Goods-in-transit insurance', detail: 'All freight covered as standard; declared-value cover on request.' },
  { item: 'Public liability cover', detail: 'Maintained on all operations and warehousing sites.' },
  { item: 'Customs clearing accreditation', detail: 'Entries lodged under our own customs code.' },
  { item: 'Operator compliance', detail: 'Roadworthy fleet, licensed operators, and drivers on managed hours.' },
] as const;
