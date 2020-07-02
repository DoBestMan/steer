import {
  filterSort,
  mockSiteCatalogFilters,
} from '~/components/modules/Catalog/Filters/Filters.mocks';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';

export const emptyHandleUpdateResults = () => {};

export const emptyCatalogProducts = {
  siteCatalogProductsResultList: [],
  listResultMetadata: {},
  siteCatalogProductsMeta: { title: '' },
  siteCatalogFilters: {
    filtersList: mockSiteCatalogFilters as SiteCatalogFilters['filtersList'],
    sortList: filterSort,
    totalMatches: 0,
  },
};
