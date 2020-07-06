import { SiteIcon } from './SiteIcon';
import { SitePromotionStyleEnum } from './SitePromotion';

export interface SiteCatalogPromotion {
  icon?: SiteIcon;
  isUppercase?: boolean;
  label: string;
  style: SitePromotionStyleEnum;
}

export interface SiteCatalogPromotionInfo {
  count: number;
  list: SiteCatalogPromotion[];
}
