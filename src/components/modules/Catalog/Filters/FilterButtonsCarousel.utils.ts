import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';

/**
 * Adds Popular Filters to filters list
 */
export function addPopularFiltersToFilterList(
  filters: CatalogFilterTypes[],
  hasPriceFilter: boolean,
  popularFilters: CatalogFilterTypes[],
) {
  const clonedFilters: CatalogFilterTypes[] = JSON.parse(
    JSON.stringify(filters),
  );
  const priceFilterIndex = clonedFilters.findIndex(
    (filter) =>
      filter.type === FilterContentTypes.SiteCatalogFilterRange &&
      filter.id === 'price',
  );

  if (hasPriceFilter && priceFilterIndex > -1) {
    // moves Popular Filters after Price filter
    clonedFilters.splice(priceFilterIndex + 1, 0, {
      type: FilterContentTypes.SiteCatalogFilterPopular,
      items: popularFilters,
    });
  } else {
    // default - moves Popular filters to start of filters
    clonedFilters.splice(0, 0, {
      type: FilterContentTypes.SiteCatalogFilterPopular,
      items: popularFilters,
    });
  }

  return clonedFilters;
}
