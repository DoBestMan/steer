import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteCatalogPromotion } from '~/data/models/SiteCatalogPromotionInfo';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
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
  activeIndex?: number;
  addVehicleInfo?: boolean;
  asset?: SiteImage | null;
  brand?: SiteCatalogBrand | null;
  ctaLabel?: string | null;
  currentIndex: number;
  customerServiceNumber: { display: string; value: string };
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
  openModal?: () => void;
  openSearch?: () => void;
  pick?: SiteCatalogSummaryTopPickItem;
  priceList?: Array<{
    label: string | null;
    price: SitePrice | null;
  }> | null;
  productFeature?: string | null;
  productName?: string | null;
  promotionInfo?: SiteCatalogPromotion | null;
  rating?: {
    quantity: number;
    value: number;
  } | null;
  show?: boolean;
  slideTo: (index: number) => void;
  totalResult?: number | string;
  url?: string | null;
  viewMoreData?: SiteCatalogSummaryTopPicksMore | null;
}
