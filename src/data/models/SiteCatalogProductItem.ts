import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import { SiteCatalogBrand } from './SiteCatalogBrand';
import { SiteCatalogPromotionInfo } from './SiteCatalogPromotionInfo';
import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteLink } from './SiteLink';
import { SitePrice } from './SitePrice';

export enum SiteCatalogProductItemEnum {
  SiteCatalogProductItem = 'SiteCatalogProductItem',
}

export interface SiteCatalogProductItem {
  activeFilterValueList: Array<string> | null;
  brand: SiteCatalogBrand;
  dataMomentList: Array<{
    icon: SiteIcon;
    label: string;
  }> | null;
  deliveryInfo: {
    isFeatured: boolean;
    value: string;
  } | null;
  gridAttribute: string | null;
  highlight: string | null;
  imageList: Array<{
    image: SiteImage;
    productImageType: PRODUCT_IMAGE_TYPES;
  }>;
  link: SiteLink;
  loadSpeedRating: string | null;
  name: string;
  performanceRatingList: Array<{
    label: string;
    value: number;
  }>;
  priceList: Array<{
    label: string | null;
    price: SitePrice | null;
  }> | null;
  rating: {
    quantity: number;
    value: number;
  } | null;
  siteCatalogPromotionInfo: SiteCatalogPromotionInfo | null;
  size: string | null;
  specList: Array<{
    concise: string;
    label: string;
    value: string;
  }>;
  topPicksAttribute: string | null;
  type: SiteCatalogProductItemEnum;
}
