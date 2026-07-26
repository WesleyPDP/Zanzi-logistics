/* ════════════════════════════════════════════════════════════
   Map geometry for the /network illustration.

   Everything here is real longitude/latitude. The SVG coordinates
   are derived at build time by `project()` below, so the shape
   stays correct if the viewBox changes — nothing is hand-placed.

   The outline is a deliberate simplification (roughly 50 points
   for a border that is thousands of kilometres long). It is an
   illustration of where we run, not a survey document.
   ════════════════════════════════════════════════════════════ */

export type LonLat = readonly [number, number];

/** South Africa's national boundary, traced clockwise from the Botswana tripoint. */
export const southAfrica: LonLat[] = [
  [20.0, -24.77], // Namibia / Botswana / South Africa tripoint
  [20.8, -25.6],
  [21.7, -25.75],
  [22.7, -25.95],
  [23.7, -25.92],
  [24.7, -25.8],
  [25.4, -25.65],
  [25.9, -24.85], // north-east up the Marico to the Limpopo
  [26.6, -24.6],
  [27.4, -24.35],
  [28.3, -24.05],
  [29.1, -23.15],
  [29.99, -22.22], // Limpopo / Shashe confluence, Beitbridge
  [30.6, -22.3],
  [31.3, -22.35], // Pafuri, northern Kruger
  [31.55, -23.6],
  [31.9, -24.6],
  [32.0, -25.35],
  [32.05, -26.05],
  [32.9, -26.85], // Kosi Bay, Mozambique border meets the coast
  [32.55, -27.6],
  [32.2, -28.4],
  [31.6, -29.25],
  [31.02, -29.86], // Durban
  [30.3, -30.75],
  [29.5, -31.35],
  [28.7, -32.1],
  [27.9, -32.98], // East London
  [26.8, -33.65],
  [25.6, -33.96], // Gqeberha
  [24.8, -34.2],
  [23.5, -34.05],
  [22.2, -34.1],
  [21.0, -34.45],
  [20.02, -34.83], // Cape Agulhas
  [19.3, -34.62],
  [18.85, -34.38],
  [18.45, -34.36], // Cape Point
  [18.35, -33.9], // Cape Town
  [18.25, -33.0],
  [17.9, -32.6],
  [18.15, -31.8],
  [17.45, -30.95],
  [17.15, -30.2],
  [16.85, -29.3],
  [16.45, -28.58], // Orange River mouth
  [17.2, -28.72], // east along the Orange
  [18.0, -28.88],
  [19.0, -28.56],
  [19.8, -28.48],
  [20.0, -28.4],
  [20.0, -26.6], // north along the 20°E meridian
];

/** Lesotho — an enclave, so it is cut out of the fill with fill-rule evenodd. */
export const lesotho: LonLat[] = [
  [27.0, -29.65],
  [27.6, -28.65],
  [28.4, -28.58],
  [29.1, -29.1],
  [29.45, -29.65],
  [29.3, -30.15],
  [28.6, -30.65],
  [27.75, -30.6],
  [27.05, -30.05],
];

export interface MapPlace {
  code: string;
  name: string;
  lon: number;
  lat: number;
  /** label offset from the marker, in SVG units */
  dx: number;
  dy: number;
  anchor: 'start' | 'middle' | 'end';
}

/** Depots get a red square and a large code; the rest are route waypoints. */
/**
 * Label offsets are chosen to sit in the gaps between the route lines that
 * meet at each point. Where that is impossible — Johannesburg has five legs
 * converging on it — the labels also carry a dark halo (see `paint-order`
 * in network.astro) so they stay legible over a line.
 */
export const mapDepots: MapPlace[] = [
  { code: 'JNB', name: 'Johannesburg', lon: 28.05, lat: -26.2, dx: 20, dy: -14, anchor: 'start' },
  { code: 'DUR', name: 'Durban', lon: 31.02, lat: -29.86, dx: 18, dy: -2, anchor: 'start' },
  // west over the Atlantic: the only leg out of Cape Town runs east
  { code: 'CPT', name: 'Cape Town', lon: 18.42, lat: -33.93, dx: -18, dy: -6, anchor: 'end' },
];

export const mapCities: MapPlace[] = [
  { code: 'PLK', name: 'Polokwane', lon: 29.45, lat: -23.9, dx: 13, dy: 5, anchor: 'start' },
  // above the marker — the Nakop, Cape Town and Gqeberha legs all leave below it
  { code: 'BFN', name: 'Bloemfontein', lon: 26.21, lat: -29.09, dx: 0, dy: -16, anchor: 'middle' },
  // below the marker, clear of the coastal run in from Cape Town
  { code: 'PLZ', name: 'Gqeberha', lon: 25.6, lat: -33.96, dx: 0, dy: 26, anchor: 'middle' },
];

export const mapBorders: MapPlace[] = [
  { code: 'BBR', name: 'Beitbridge · ZWE', lon: 29.99, lat: -22.22, dx: 13, dy: -7, anchor: 'start' },
  { code: 'LEB', name: 'Lebombo · MOZ', lon: 31.98, lat: -25.44, dx: 13, dy: -3, anchor: 'start' },
  { code: 'SKP', name: 'Skilpadshek · BWA', lon: 25.75, lat: -25.28, dx: -13, dy: -5, anchor: 'end' },
  { code: 'NKP', name: 'Nakop · NAM', lon: 20.02, lat: -28.42, dx: -13, dy: -5, anchor: 'end' },
];

/** Neighbouring countries, labelled faintly so the outline reads as a map. */
export const mapNeighbours = [
  { name: 'Namibia', lon: 18.1, lat: -25.4 },
  { name: 'Botswana', lon: 23.4, lat: -23.4 },
  // kept high and west of Beitbridge so it clears that border-post label
  { name: 'Zimbabwe', lon: 29.2, lat: -21.72 },
  { name: 'Mozambique', lon: 33.0, lat: -24.2 },
  { name: 'Lesotho', lon: 28.25, lat: -29.6 },
] as const;

/** Route legs, given as place codes resolved against the sets above. */
export const mapRoutes = {
  domestic: [
    ['JNB', 'PLK'],
    ['JNB', 'DUR'],
    ['JNB', 'BFN'],
    ['BFN', 'CPT'],
    ['BFN', 'PLZ'],
    ['PLZ', 'CPT'],
    ['DUR', 'PLZ'],
  ],
  crossBorder: [
    ['PLK', 'BBR'],
    ['JNB', 'LEB'],
    ['JNB', 'SKP'],
    ['BFN', 'NKP'],
  ],
} as const;

/* ── Projection ──
   Equirectangular, with the longitude axis scaled by cos(mean latitude)
   so the country is not stretched sideways. Fitted to the viewBox below. */

export const VIEW_W = 1000;
export const VIEW_H = 780;

const LON_MIN = 16.0;
const LON_MAX = 33.4;
const LAT_MAX = -21.6;
const LAT_MIN = -35.2;
const PAD = 30;

const LON_COS = Math.cos((((LAT_MAX + LAT_MIN) / 2) * Math.PI) / 180);
const spanX = (LON_MAX - LON_MIN) * LON_COS;
const spanY = LAT_MAX - LAT_MIN;
const scale = Math.min((VIEW_W - PAD * 2) / spanX, (VIEW_H - PAD * 2) / spanY);
const originX = PAD + (VIEW_W - PAD * 2 - spanX * scale) / 2;
const originY = PAD + (VIEW_H - PAD * 2 - spanY * scale) / 2;

/** Longitude/latitude → SVG x/y. */
export const project = (lon: number, lat: number): [number, number] => [
  Number((originX + (lon - LON_MIN) * LON_COS * scale).toFixed(1)),
  Number((originY + (LAT_MAX - lat) * scale).toFixed(1)),
];

/** A closed SVG path for a ring of coordinates. */
export const ringToPath = (ring: LonLat[]): string =>
  ring
    .map(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      return `${i === 0 ? 'M' : 'L'}${x} ${y}`;
    })
    .join(' ') + ' Z';
