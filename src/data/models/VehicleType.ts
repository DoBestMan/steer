import { Cars } from '~/components/global/Car/Car.enums';

export interface VehicleType {
  /**
   * Front-end specific ID that defines which Car to load and display
   */
  carId: Cars;
}
