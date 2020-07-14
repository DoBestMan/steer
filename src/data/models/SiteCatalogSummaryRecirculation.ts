import { SiteIcon } from './SiteIcon';

export interface SiteRecirculationItem {
  description: string;
  icon?: SiteIcon;
  label: string;
  siteQueryParams: { [key: string]: string };
}

export interface SiteCatalogSummaryRecirculation {
  items: SiteRecirculationItem[];
  more: {
    description: string;
    label: string;
    siteQueryParams: { [key: string]: string };
  };
  title: string;
}
