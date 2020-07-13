import { SiteLink } from './SiteLink';

export interface SiteSearchResultActionLink {
  link: SiteLink;
  type: 'SiteSearchResultActionLink';
  vehicleMetadata?: { [key: string]: string };
}
