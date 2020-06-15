import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import { getGroupedFilters } from './Filters.utils';

const toggleFilters = [
  { type: FilterContentTypes.CatalogFilterToggle },
  { type: FilterContentTypes.CatalogFilterToggle },
];

const otherFilters = [
  { type: FilterContentTypes.CatalogFilterRange },
  { type: FilterContentTypes.CatalogFilterChecklistLarge },
  { type: FilterContentTypes.CatalogFilterChecklist },
];

describe('getGroupedFilters', () => {
  it('groups toggles into popularFilters category', () => {
    const groupedFilters = getGroupedFilters([
      ...toggleFilters,
      ...otherFilters,
    ] as CatalogFilterTypes[]);

    const popularFilterTypes = groupedFilters.popularFilters.map(
      (filter) => filter.type,
    );
    const filteredTypes = popularFilterTypes.filter(
      (type) => type === FilterContentTypes.CatalogFilterToggle,
    );

    expect(groupedFilters.popularFilters).toHaveLength(2);
    expect(filteredTypes).toHaveLength(2);
  });

  it('groups non toggle filters into otherFilters', () => {
    const groupedFilters = getGroupedFilters([
      ...toggleFilters,
      ...otherFilters,
    ] as CatalogFilterTypes[]);

    const otherFilterTypes = groupedFilters.otherFilters.map(
      (filter) => filter.type,
    );

    expect(groupedFilters.popularFilters).toHaveLength(2);
    expect(groupedFilters.otherFilters).toHaveLength(3);
    expect(
      otherFilterTypes.includes(FilterContentTypes.CatalogFilterToggle),
    ).toBe(false);
  });
});
