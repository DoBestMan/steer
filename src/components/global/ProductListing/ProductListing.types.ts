import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

export type ProductListingProps = Omit<
  SiteCatalogProductItem,
  'performanceRatingList' | 'specList' | 'topPicksAttribute'
> & {
  defaultImage?: PRODUCT_IMAGE_TYPES;
  hoverImage?: PRODUCT_IMAGE_TYPES;
  isGrouped?: boolean;
  isHighlighted?: boolean;
};
