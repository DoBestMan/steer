import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';

interface GroupedFilters {
  otherFilters: CatalogFilterTypes[];
  popularFilters: CatalogFilterTypes[];
}
export function getGroupedFilters(
  filters: CatalogFilterTypes[],
): GroupedFilters {
  const groupedFilters = filters.reduce<GroupedFilters>(
    (acc, filter) => {
      if (filter.type === FilterContentTypes.CatalogFilterToggle) {
        acc.popularFilters.push(filter);
        return acc;
      }

      acc.otherFilters.push(filter);
      return acc;
    },
    { popularFilters: [], otherFilters: [] },
  );

  return groupedFilters;
}
