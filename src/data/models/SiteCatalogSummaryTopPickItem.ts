import { SiteCatalogProductItem } from './SiteCatalogProductItem';
import { SiteCatalogSummaryTopPickItemAdditionalInfo } from './SiteCatalogSummaryTopPickItemAdditionalInfo';
import { SiteImage } from './SiteImage';

export interface SiteCatalogSummaryTopPickItem {
  ctaLabel: string | null;
  fallbackImage: SiteImage | null;
  header: {
    additionalInfoLabel?: string | null;
    pill?: string | null; // either this is null
    subtitle?: string | null; // or this is null
    titleLine1: string;
    titleLine2?: string | null;
  };
  product: SiteCatalogProductItem | null;
  siteCatalogSummaryTopPickItemAdditionalInfo: SiteCatalogSummaryTopPickItemAdditionalInfo | null;
}
