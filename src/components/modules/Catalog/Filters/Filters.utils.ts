import {
  SiteCatalogFilterGroup,
  SiteCatalogFilterItem,
  SiteCatalogFilterState,
  SiteCatalogFilterTypeEnum,
  SiteCatalogSortListItem,
} from '~/data/models/SiteCatalogFilters';

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
      if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle) {
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

export function getFilterLabel(filter: CatalogFilterTypes) {
  if ('item' in filter) {
    return filter.item.title;
  }

  if ('header' in filter && filter.header) {
    return filter.header.title;
  }

  return '';
}

export function getInitialFiltersState(
  filtersList: CatalogFilterTypes[],
  sortList: SiteCatalogSortListItem[],
) {
  if (!filtersList && !sortList) {
    return {
      initialState: {},
      isPopularActive: false,
    };
  }

  const initialState: Record<string, string> = {};
  let isPopularActive = false;
  filtersList.forEach((filter: CatalogFilterTypes) => {
    // toggle filter
    if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle) {
      if (filter.item.state === SiteCatalogFilterState.Selected) {
        isPopularActive = true;
        Object.keys(filter.item.value).forEach((key) => {
          initialState[key] = filter.item.value[key];
        });
      }
    }

    // list filter
    if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterList) {
      filter.filterGroups.forEach((group: SiteCatalogFilterGroup) => {
        group.items.forEach((item: SiteCatalogFilterItem) => {
          if (item.state === SiteCatalogFilterState.Selected) {
            Object.keys(item.value).forEach((key) => {
              if (initialState[key]) {
                initialState[key] = initialState[key] + ',' + item.value[key];
                return;
              }
              initialState[key] = item.value[key];
            });
          }
        });
      });
    }

    // range filter
    if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterRange) {
      if (!filter.currentMinValue && !filter.currentMaxValue) {
        return;
      }
      initialState[filter.id] = `${filter.currentMinValue || filter.minValue},${
        filter.currentMaxValue || filter.maxValue
      }`;
    }
  });

  if (sortList) {
    const selectedSort = sortList.find(
      (item) => item.state === SiteCatalogFilterState.Selected,
    );
    selectedSort &&
      Object.keys(selectedSort.value).forEach(
        (key) => (initialState[key] = selectedSort.value[key]),
      );
  }

  return {
    initialState,
    isPopularActive,
  };
}

export function strictEqualsValue(
  value: Record<string, string>,
  activeFilters: Record<string, string>,
) {
  return Object.keys(value).every((key) => activeFilters[key] === value[key]);
}

export function hasActiveValue(
  filter: CatalogFilterTypes | SiteCatalogFilterItem,
  activeFilters: Record<string, string>,
): boolean {
  if ('value' in filter) {
    return Object.keys(filter.value).some(
      (key) => !!activeFilters[key]?.includes(filter.value[key]),
    );
  }

  if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle) {
    return Object.keys(filter.item.value).some((key) => !!activeFilters[key]);
  }

  if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterList) {
    let isActive = false;
    filter.filterGroups.forEach((group) =>
      group.items.forEach((item) => {
        isActive = Object.keys(item.value).some((key) => !!activeFilters[key]);
      }),
    );
    return isActive;
  }

  if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterRange) {
    return !!activeFilters[filter.id];
  }

  return false;
}

export function getValueKeys(filter: CatalogFilterTypes) {
  let valueKeys: string[] = [];
  // toggle filter
  if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle) {
    valueKeys = [...valueKeys, ...Object.keys(filter.item.value)];
  }

  // list filter
  if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterList) {
    filter.filterGroups.forEach((group: SiteCatalogFilterGroup) => {
      group.items.forEach((item: SiteCatalogFilterItem) => {
        valueKeys = [...valueKeys, ...Object.keys(item.value)];
      });
    });
  }

  // range filter
  if (filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterRange) {
    valueKeys = [...valueKeys, filter.id];
  }

  // popular filter
  if (filter.type === FilterContentTypes.SiteCatalogFilterPopular) {
    filter.items.forEach((filterItem) => {
      if ('item' in filterItem) {
        valueKeys = [...valueKeys, ...Object.keys(filterItem.item.value)];
      }
    });
  }

  const dedupedKeys: string[] = [];
  valueKeys.forEach((key) => {
    if (dedupedKeys.indexOf(key) < 0) {
      dedupedKeys.push(key);
    }
  });

  return dedupedKeys;
}
