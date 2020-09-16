import { SiteQueryParams } from './SiteQueryParams';
import { VehicleMetadata } from './VehicleMetadata';

interface CTA {
  label: string;
  siteQueryParams: SiteQueryParams | null;
  vehicleMetadata: VehicleMetadata | null;
}

interface InfoLink {
  contentId: string;
  label: string;
}

export interface SiteCatalogSummaryPrompt {
  body: string | null;
  ctaList: CTA[] | null;
  infoLink: InfoLink | null;
  mustShow: boolean;
  title: string;
}
