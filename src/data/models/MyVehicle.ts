import { Cars } from '~/components/global/Car/Car.enums';

import { SiteLink } from './SiteLink';

export interface MyVehicle {
  make: string;
  model: string;
  option: string;
  vehicleId: number;
  vehicleType: Cars;
  year: string;
  vehicleLink: SiteLink;
}

export interface MyVehicleList {
  userVehicles: Array<MyVehicle> | null;
}
