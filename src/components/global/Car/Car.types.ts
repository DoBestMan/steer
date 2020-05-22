export enum Cars {
  'car--sedan' = 'car--sedan',
}

export function instanceOfCars(idCar: string): idCar is Cars {
  return idCar in Cars;
}

export enum CarSizes {
  'none' = 'none',
  'small' = 'small',
}

export type CarDetail = {
  distanceBackToRearWheel: number;
  distanceFrontToFrontWheel: number;
  wheelWidth: number;
  width: number;
};
