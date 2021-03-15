import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import { SiteCatalogBrand } from './SiteCatalogBrand';
import { SiteCatalogProductImageTypeEnum } from './SiteCatalogProductImage';
import { SiteCatalogPromotionInfo } from './SiteCatalogPromotionInfo';
import { SiteCategory } from './SiteCategory';
import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteLink } from './SiteLink';
import { SitePrice } from './SitePrice';

export enum SiteCatalogProductItemEnum {
  SiteCatalogProductItem = 'SiteCatalogProductItem',
}

export interface SiteCatalogProductSpec {
  concise: string;
  label: string;
  value: string;
}

export interface SiteCatalogProductItem {
  activeFilterValueList: Array<string> | null;
  brand: SiteCatalogBrand;
  ctaLabel?: string | null;
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
    type?: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage;
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
  category?: SiteCategory | null;
  rating: {
    quantity: number;
    value: number;
  } | null;
  siteCatalogPromotionInfo: SiteCatalogPromotionInfo | null;
  size: string | null;
  specList: Array<SiteCatalogProductSpec>;
  topPicksAttribute: string | null;
  type: SiteCatalogProductItemEnum;
}
