import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';

export type ProductListingProps = Omit<
  SiteCatalogProductItem,
  'performanceRatingList' | 'specList' | 'topPicksAttribute'
> & {
  isGrouped?: boolean;
  isHighlighted?: boolean;
};
