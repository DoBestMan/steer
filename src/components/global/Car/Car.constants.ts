import { Breakpoint } from '~/lib/constants/breakpoints.types';

import { CarDetail, Cars } from './Car.types';

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

/* eslint sort-keys: 0 */
export const WHEEL_WIDTH: Record<Breakpoint, number> = {
  S: 300,
  M: 300,
  L: 300,
  XL: 300,
};

export const CAR_DETAILS: Record<Cars, CarDetail> = {
  'car--sedan': {
    distanceBackToRearWheel: 119.9,
    distanceFrontToFrontWheel: 62,
    wheelWidth: 100,
    width: 735.61,
  },
};
