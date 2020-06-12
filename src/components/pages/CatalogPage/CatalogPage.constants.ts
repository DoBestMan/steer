// TODO Move brands data and interface
export enum BRANDS {
  BRIDGESTONE = 'bridgestone',
  CONTINENTAL = 'continental',
  MICHELIN = 'michelin',
  PIRELLI = 'pirelli',
}

export interface Brand {
  altText: string;
  id: BRANDS;
  src: string;
}

export type Brands = Brand[];

export const brands: Brands = [
  {
    altText: 'Continental',
    id: BRANDS.CONTINENTAL,
    src: '/images/brands/continental_logo.svg',
  },
  {
    altText: 'Bridgestone',
    id: BRANDS.BRIDGESTONE,
    src: '/images/brands/bridgestone_logo.svg',
  },
  {
    altText: 'Michelin',
    id: BRANDS.MICHELIN,
    src: '/images/brands/michelin_logo.svg',
  },
  {
    altText: 'Pirelli',
    id: BRANDS.PIRELLI,
    src: '/images/brands/pirelli_logo.svg',
  },
];
