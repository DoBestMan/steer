export enum Sceneries {
  MOUNTAIN = 'mountain',
}

export const SCENERY_IMG_MAP: { [key: string]: string } = {
  [Sceneries.MOUNTAIN]: '/images/home-header/home-header-mountain.png',
};

export const DEFAULT_SCENERY = SCENERY_IMG_MAP[Sceneries.MOUNTAIN];
