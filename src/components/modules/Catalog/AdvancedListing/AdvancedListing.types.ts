import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

export type AdvancedListingProps = Omit<
  SiteCatalogProductItem,
  | 'activeFilterValueList'
  | 'deliveryInfo'
  | 'gridAttribute'
  | 'loadSpeedRating'
  | 'topPicksAttribute'
> & {
  defaultImage?: PRODUCT_IMAGE_TYPES;
};
