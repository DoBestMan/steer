import {
  filterSort,
  mockSiteCatalogFilters,
} from '~/components/modules/Catalog/Filters/Filters.mocks';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';

export const emptyHandleUpdateFilters = () => {};

export const emptyOnPreviewResults = () => Promise.resolve();

export const emptyCatalogProducts: SiteCatalogProducts = {
  siteCatalogProductsResultList: [],
  listResultMetadata: {},
  siteCatalogProductsMeta: { title: '' },
  siteCatalogFilters: {
    filtersList: mockSiteCatalogFilters as SiteCatalogFilters['filtersList'],
    sortList: filterSort,
  },
};
