import { SiteCatalogPromotion } from './SiteCatalogPromotionInfo';
import { SitePrice } from './SitePrice';

export type PriceList = Array<{
  label?: string | null;
  price: SitePrice | null;
}> | null;
export interface SiteCompareTableCell {
  value: string | number | string[] | PriceList | null;
  quantity?: number;
  promotion?: SiteCatalogPromotion;
}
