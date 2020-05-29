export enum CarTypes {
  'body-type' = 'body-type',
  'passenger-and-light-truck-model' = 'passenger-and-light-truck-model',
  'vehicle-type' = 'vehicle-type',
}

export type CarDetail = {
  backWheelCenterPos: {
    x: number;
    y: number;
  };
  distanceBackToRearWheel: number;
  distanceFrontToFrontWheel: number;
  frontWheelCenterPos: {
    x: number;
    y: number;
  };
  height: number;
  // type: CarTypes;
  wheelWidth: number;
  width: number;
};
