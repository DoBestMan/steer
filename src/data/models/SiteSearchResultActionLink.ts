import { SiteLink } from './SiteLink';
import { VehicleMetadata } from './VehicleMetadata';

export interface SiteSearchResultActionLink {
  link: SiteLink;
  type: 'SiteSearchResultActionLink';
  vehicleMetadata?: VehicleMetadata;
}
