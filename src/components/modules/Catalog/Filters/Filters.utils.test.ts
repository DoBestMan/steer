import { SiteCatalogFilterTypeEnum } from '~/data/models/SiteCatalogFilters';

import { CatalogFilterTypes } from './Filter.types';
import { getGroupedFilters } from './Filters.utils';

const toggleFilters = [
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle },
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle },
];

const otherFilters = [
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterRange },
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterList },
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterList },
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
      (type) => type === SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle,
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
      otherFilterTypes.includes(
        SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle,
      ),
    ).toBe(false);
  });
});
