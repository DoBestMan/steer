import { HeaderWithLogoProps } from '~/components/global/HeaderWithLogo/HeaderWithLogo';

import { SiteVehicleMakeModelList } from './SiteVehicleMakeModelList';

export interface SiteVehicleMakeModelProps {
  makeName: string;
  makeModelName: string;
  header: HeaderWithLogoProps;
  list: Array<SiteVehicleMakeModelList>;
}
