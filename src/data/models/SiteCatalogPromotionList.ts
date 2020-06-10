import { PROMO_STYLES } from '~/components/modules/Catalog/ProductListing/PromoTag/PromoTag.types';

import { SiteIcon } from './SiteIcon';

export interface SiteCatalogPromotion {
  icon: SiteIcon;
  label: string;
  style: PROMO_STYLES;
}

export interface SiteCatalogPromotionList {
  count: number;
  list: SiteCatalogPromotion[];
}
