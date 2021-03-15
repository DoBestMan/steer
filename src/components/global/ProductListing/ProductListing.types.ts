import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';

export type ProductListingProps = Omit<
  SiteCatalogProductItem,
  'performanceRatingList' | 'topPicksAttribute'
> & {
  isGrouped?: boolean;
  isHighlighted?: boolean;
};
