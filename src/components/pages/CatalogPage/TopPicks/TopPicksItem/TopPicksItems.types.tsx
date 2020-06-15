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
  asset?: SiteImage;
  brand?: SiteCatalogBrand;
  ctaLabel?: string;
  deliveryInfo?: {
    isFeatured?: boolean;
    value: string;
  };
  exploreMore?: () => void;
  header?: TopPickItemsHeader;
  index: number;
  isCurrent?: boolean;
  location?: string;
  oeModal?: SiteCatalogSummaryTopPickItemAdditionalInfo;
  openSearch?: () => void;
  priceList?: {
    label: string | null;
    price: SitePrice;
  }[];
  productFeature?: string;
  productName?: string;
  rating?: {
    quantity: number;
    value: number;
  };
  totalResult?: number | string;
  url?: string;
  viewMoreData?: SiteCatalogSummaryTopPicksMore;
}
