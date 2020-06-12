import { Breakpoint } from '~/lib/constants/breakpoints.types';

import { Cars } from './Car.enums';
import { CarTypes } from './Car.types';

export const CAR_TYPES: Record<string, CarTypes> = {
  BODY_TYPE: CarTypes['body-type'],
  PASSENGER_AND_LIGHT_TRUCK_MODEL: CarTypes['passenger-and-light-truck-model'],
  VEHICLE_TYPE: CarTypes['vehicle-type'],
};

export const DEFAULT_CAR = Cars['car--sedan'];

export const WHEEL_WIDTH: Record<Breakpoint, number> = {
  S: 175,
  M: 260,
  L: 230,
  XL: 230,
};

export const DEFAULT_SCALE_VECTOR: Record<Breakpoint, number> = {
  S: 1,
  M: 1.5,
  L: 1.7,
  XL: 1.7,
};

export const CAR_DETAILS_TYPES: Record<Cars, CarTypes> = {
  'car--atv-utv': CAR_TYPES.VEHICLE_TYPE,
  'car--audi-a6': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--chevrolet-camaro': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--chevrolet-corvette': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--chevrolet-silverado-1500': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--chevrolet-tahoe': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--commercial': CAR_TYPES.VEHICLE_TYPE,
  'car--commercial-van': CAR_TYPES.BODY_TYPE,
  'car--convertible': CAR_TYPES.BODY_TYPE,
  'car--coupe': CAR_TYPES.BODY_TYPE,
  'car--crossover': CAR_TYPES.BODY_TYPE,
  'car--dodge-challenger': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--dodge-charger': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--electric': CAR_TYPES.BODY_TYPE,
  'car--farm': CAR_TYPES.VEHICLE_TYPE,
  'car--ford-escape': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--ford-explorer': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--ford-f-150': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--ford-fusion': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--ford-mustang': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--gmc-sierra-1500': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--hatchback': CAR_TYPES.BODY_TYPE,
  'car--honda-accord': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--honda-civic': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--honda-crv': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--hybrid': CAR_TYPES.BODY_TYPE,
  'car--industrial': CAR_TYPES.VEHICLE_TYPE,
  'car--jeep-grand-cherokee': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--jeep-wrangler': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--lawn-and-garden': CAR_TYPES.VEHICLE_TYPE,
  'car--luxury': CAR_TYPES.BODY_TYPE,
  'car--minivan': CAR_TYPES.BODY_TYPE,
  'car--motocycle': CAR_TYPES.VEHICLE_TYPE,
  'car--nissan-altima': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--offroad': CAR_TYPES.BODY_TYPE,
  'car--otr': CAR_TYPES.VEHICLE_TYPE,
  'car--racing': CAR_TYPES.BODY_TYPE,
  'car--ram-1500': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--rv': CAR_TYPES.VEHICLE_TYPE,
  'car--sedan': CAR_TYPES.BODY_TYPE,
  'car--sports-car': CAR_TYPES.BODY_TYPE,
  'car--suv': CAR_TYPES.BODY_TYPE,
  'car--toyota-4runner': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--toyota-camry': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--toyota-corolla': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--toyota-tacoma': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--toyota-tundra': CAR_TYPES.PASSENGER_AND_LIGHT_TRUCK_MODEL,
  'car--trailer': CAR_TYPES.VEHICLE_TYPE,
  'car--truck': CAR_TYPES.BODY_TYPE,
  'car--wagon': CAR_TYPES.BODY_TYPE,
};
