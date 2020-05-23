import { Breakpoint } from '~/lib/constants/breakpoints.types';

import { Cars, CarSizes, CarTypes } from './Car.types';

export const CAR_TYPES: Record<string, CarTypes> = {
  BODY_TYPE: CarTypes['body-type'],
  PASSENGER_AND_LIGHT_TRUCK_MODEL: CarTypes['passenger-and-light-truck-model'],
  VEHICLE_TYPE: CarTypes['vehicle-type'],
};

export const CARS: Record<string, string> = {
  COMMERCIAL_VAN: Cars['car--commercial-van'],
  SEDAN: Cars['car--sedan'],
};

// For car animation (Homepage: hero, PLP loading interstitial..)
// Based on car--sedan width
/* eslint sort-keys: 0 */
export const VEHICLE_SCALE_SMALL: Record<Breakpoint, number> = {
  S: 0.1740052473, // final width = 128,
  M: 0.3031497669, // final width = 223,
  L: 0.3915118065, // final width = 288,
  XL: 0.3915118065, // final width = 288,
};

export const DEFAULT_CAR = Cars['car--sedan'];

export const CAR_SIZES: Record<string, CarSizes> = {
  NONE: CarSizes.none,
  SMALL: CarSizes.small,
};

/* eslint sort-keys: 0 */
export const WHEEL_WIDTH: Record<Breakpoint, number> = {
  S: 300,
  M: 300,
  L: 300,
  XL: 300,
};

export const CAR_DETAILS_TYPES: Record<Cars, CarTypes> = {
  'car--commercial-van': CAR_TYPES.BODY_TYPE,
  'car--sedan': CAR_TYPES.BODY_TYPE,
};
