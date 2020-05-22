import { Cars as CarType } from '~/components/global/Car/Car.types';

export interface VehicleType {
  /**
   * Front-end specific ID that defines which Car to load and display
   */
  carId: CarType;
}
