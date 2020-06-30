import {
  SiteCatalogFilter,
  SiteCatalogSortListItem,
} from '~/data/models/SiteCatalogFilters';

export enum FilterContentTypes {
  SiteCatalogFilterList = 'SiteCatalogFilterList',
  SiteCatalogFilterPopular = 'SiteCatalogFilterPopular',
  SiteCatalogFilterRange = 'SiteCatalogFilterRange',
  SiteCatalogFilterSort = 'SiteCatalogFilterSort',
  SiteCatalogFilterToggle = 'SiteCatalogFilterToggle',
}

type CatalogFilterPopularType = 'SiteCatalogFilterPopular';
type CatalogFilterSortType = 'SiteCatalogFilterSort';

export type SiteCatalogFilterPopular = {
  items: CatalogFilterTypes[];
  type: CatalogFilterPopularType;
};

export type SiteCatalogFilterSort = {
  items: SiteCatalogSortListItem[];
  type: CatalogFilterSortType;
};

export type CatalogFilterTypes =
  | SiteCatalogFilter
  | SiteCatalogFilterPopular
  | SiteCatalogFilterSort;
