export enum Sceneries {
  FORREST = 'forrest',
}

export enum Vehicles {
  CAR = 'car',
}

export const VEHICLE_IMG_MAP: { [key: string]: string } = {
  [Vehicles.CAR]: '/images/home-header/home-header-car.png',
};

export const SCENERY_IMG_MAP: { [key: string]: string } = {
  [Sceneries.FORREST]: '/images/home-header/home-header-forrest.png',
};

export const DEFAULT_SCENERY = SCENERY_IMG_MAP[Sceneries.FORREST];
export const DEFAULT_VEHICLE = VEHICLE_IMG_MAP[Vehicles.CAR];
