/* Unsplash photo catalogue — same URLs as the legacy imagery.js */
const U = (id: string, w = 1200, q = 78) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const IMG = {
  hero_a: U('1554224155-6726b3ff858f', 900),
  hero_b: U('1518770660439-4636190af475', 900),
  hero_c: U('1521737604893-d14cc237f11d', 900),
  hero_d: U('1454165804606-c3d57bc86b40', 900),

  quote_portrait: U('1573496359142-b8d87734a5a2', 720),
  quote_alt_a: U('1494790108377-be9c29b29330', 720),
  quote_alt_b: U('1580489944761-15a19d654956', 720),

  intern_strip: U('1522202176988-66273c2fd55f', 1400),
  intern_b: U('1517245386807-bb43f82c33c4', 1200),
  intern_c: U('1531482615713-2afd69097998', 1200),

  cta_back: U('1551434678-e076c223a692', 1800),

  sol_asd: U('1517048676732-d65bc937f952', 1400),
  sol_aida: U('1531403009284-440f080d1e12', 1400),
  sol_rag: U('1481627834876-b7833e8f5570', 1400),
  sol_wfa: U('1497366754035-f200968a6e72', 1400),

  prod_awe: U('1558494949-ef010cbdcc31', 1400),
  prod_aka: U('1573496359142-b8d87734a5a2', 1400),

  contact_loc: U('1533628635777-112b2239b1c7', 1400),

  cust_northarc: U('1573496359142-b8d87734a5a2', 720),
  cust_brackmoor: U('1576091160550-2173dba999ef', 720),
  cust_meridian: U('1581090700227-1e37b190418e', 720),
  cust_halden: U('1589994965851-a8f479c573a9', 720),
} as const;

export type ImgKey = keyof typeof IMG;

export type Treatment = 'duotone' | 'mute' | 'full' | 'grain';
export type Density = 'sparse' | 'balanced' | 'rich';

export interface ImageryState {
  enabled: boolean;
  treatment: Treatment;
  density: Density;
  grain: boolean;
}

export const DEFAULTS: ImageryState = {
  enabled: true,
  treatment: 'duotone',
  density: 'balanced',
  grain: true,
};

export const STORAGE_KEY = 'aptiveon.imagery.v1';
