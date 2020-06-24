import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

export type ProductListingProps = Omit<
  SiteCatalogProductItem,
  | 'size'
  | 'dataMomentList'
  | 'deliveryInfo'
  | 'performanceRatingList'
  | 'specList'
  | 'topPicksAttribute'
> & {
  defaultImage?: PRODUCT_IMAGE_TYPES;
  isHighlighted?: boolean;
};
