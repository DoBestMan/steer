import { Breakpoint } from '~/lib/constants';

import { WHEEL_WIDTH } from './Car.constants';
import { Cars } from './Car.enums';
import { CarDetail } from './Car.types';
import { CAR_DETAILS } from './CarDetails.constants';

export function instanceOfCars(idCar: string): idCar is Cars {
  return idCar in Cars;
}

export function getScaleVector(carId: Cars, breakpoint: Breakpoint): number {
  return WHEEL_WIDTH[breakpoint] / CAR_DETAILS[carId].wheelWidth;
}

// TODO: delete?
export function getScaledCarDetails(
  carId: Cars,
  scaleVector: number,
): CarDetail {
  const carDetail = CAR_DETAILS[carId];

  return {
    backWheelCenterPos: {
      x: carDetail.backWheelCenterPos.x * scaleVector,
      y: carDetail.backWheelCenterPos.y * scaleVector,
    },
    distanceBackToRearWheel: carDetail.distanceBackToRearWheel * scaleVector,
    distanceFrontToFrontWheel:
      carDetail.distanceFrontToFrontWheel * scaleVector,
    frontWheelCenterPos: {
      x: carDetail.frontWheelCenterPos.x * scaleVector,
      y: carDetail.frontWheelCenterPos.y * scaleVector,
    },
    height: carDetail.height * scaleVector,
    wheelWidth: carDetail.wheelWidth * scaleVector,
    width: carDetail.width * scaleVector,
  };
}
