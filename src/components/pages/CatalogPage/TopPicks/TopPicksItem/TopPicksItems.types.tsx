import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteCatalogSummaryTopPickItemAdditionalInfo } from '~/data/models/SiteCatalogSummaryTopPickItemAdditionalInfo';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePrice } from '~/data/models/SitePrice';

export interface TopPickItemsHeader {
  additionalInfoLabel?: string | null;
  pill?: string | null; // either this is null
  subtitle?: string | null; // or this is null
  titleLine1: string;
  titleLine2?: string | null;
}

export interface TopPickItemsProps {
  addVehicleInfo?: boolean;
  asset?: SiteImage | null;
  brand?: SiteCatalogBrand | null;
  ctaLabel?: string | null;
  deliveryInfo?: {
    isFeatured?: boolean;
    value: string;
  } | null;
  exploreMore?: () => void;
  header?: TopPickItemsHeader;
  index?: number;
  indexHovered?: number | null;
  isCurrent?: boolean;
  location?: string;
  oeModal?: SiteCatalogSummaryTopPickItemAdditionalInfo | null;
  onItemMouseEnter?: (index: number) => void;
  onItemMouseLeave?: () => void;
  openSearch?: () => void;
  priceList?: Array<{
    label: string | null;
    price: SitePrice;
  }> | null;
  productFeature?: string | null;
  productName?: string | null;
  rating?: {
    quantity: number;
    value: number;
  } | null;
  show?: boolean;
  totalResult?: number | string;
  url?: string | null;
  viewMoreData?: SiteCatalogSummaryTopPicksMore | null;
}
