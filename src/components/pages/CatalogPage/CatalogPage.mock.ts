import {
  filterSortMock,
  siteCatalogFiltersMock,
} from '~/components/modules/Catalog/Filters/Filters.mock';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';

export const emptyHandleUpdateFilters = () => {};

export const emptyOnPreviewResults = () => Promise.resolve();

export const emptyCatalogProductsMock: SiteCatalogProducts = {
  siteCatalogProductsResultList: [],
  listResultMetadata: {},
  siteCatalogProductsMeta: { title: '' },
  siteCatalogFilters: {
    filtersList: siteCatalogFiltersMock as SiteCatalogFilters['filtersList'],
    sortList: filterSortMock,
  },
};
