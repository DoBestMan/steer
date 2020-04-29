export enum Sceneries {
  MOUNTAIN = 'mountain',
}

export enum Vehicles {
  HATCH = 'hatch',
}

const VEHICLE_IMG_MAP: { [key: string]: string } = {
  [Vehicles.HATCH]: '/images/home-header/home-header-hatch.png',
};

const SCENERY_IMG_MAP: { [key: string]: string } = {
  [Sceneries.MOUNTAIN]: '/images/home-header/home-header-mountain.png',
};

export const DEFAULT_SCENERY = SCENERY_IMG_MAP[Sceneries.MOUNTAIN];
export const DEFAULT_VEHICLE = VEHICLE_IMG_MAP[Vehicles.HATCH];
