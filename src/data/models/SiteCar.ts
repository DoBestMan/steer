import { Cars } from '~/components/global/Car/Car.enums';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
export interface SiteCar {
  vehicleType: Cars;
  type: ICON_IMAGE_TYPE.CAR;
}
