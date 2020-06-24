import { PROMO_STYLES } from '~/components/global/PromoTag/PromoTag.types';

import { SiteIcon } from './SiteIcon';

export interface SiteCatalogPromotion {
  icon?: SiteIcon;
  isUppercase?: boolean;
  label: string;
  style: PROMO_STYLES;
}

export interface SiteCatalogPromotionInfo {
  count: number;
  list: SiteCatalogPromotion[];
}
