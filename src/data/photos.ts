export interface Photo {
  src: string;
  srcSet: string;
}

export type PhotoVariant = 'card' | 'bg';

const CARD_WIDTHS = [240, 480, 960, 1280];
const BG_WIDTHS = [640, 960, 1280];

const build = (key: string, variant: PhotoVariant): Photo => {
  const widths = variant === 'bg' ? BG_WIDTHS : CARD_WIDTHS;
  const suffix = variant === 'bg' ? '-bg' : '';
  return {
    src: `/images/opt/${key}${suffix}-960.webp`,
    srcSet: widths
      .map((width) => `/images/opt/${key}${suffix}-${width}.webp ${width}w`)
      .join(', '),
  };
};

const entry = (key: string) => ({
  card: build(key, 'card'),
  bg: build(key, 'bg'),
});

export const PHOTOS: Record<string, Record<PhotoVariant, Photo>> = {
  hero: entry('hero'),
  jeep: entry('jeep'),
  trek: entry('trek'),
  goa: entry('goa'),
  candi: entry('candi'),
  kopi: entry('kopi'),
  pkopi: entry('pkopi'),
  karet: entry('karet'),
  pkaret: entry('pkaret'),
  sboma: entry('sboma'),
  srimba: entry('srimba'),
  glamp: entry('glamp'),
  camp: entry('camp'),
  event: entry('event'),
  out: entry('out'),
};
