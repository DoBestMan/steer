import { SiteIcon } from './SiteIcon';
import { SiteLink } from './SiteLink';

interface RecirculationItem {
  description: string;
  icon: SiteIcon;
  label: string;
  link: SiteLink;
}

export interface SiteCatalogSummaryRecirculation {
  items: RecirculationItem[];
  more: {
    description: string;
    label: string;
    link: SiteLink;
  };
  title: string;
}
