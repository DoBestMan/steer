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

/**
 * Toggle filters are grouped into `Popular Filters` on large breakpoint
 */
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

/**
 * Catch all function to determine the label a filter should use based on filter shape
 */
export function getFilterLabel(filter: CatalogFilterTypes) {
  if ('item' in filter) {
    return filter.item.title;
  }

  if ('header' in filter && filter.header) {
    return filter.header.title;
  }

  return '';
}

/**
 * Maps over filters returned from the API to determine the initial state.
 * Most will use the `state` field as reference (value = "Selected") but range filter
 * will look to `currentMin/MaxValue` for active state
 * So we don't have to map over all values again to determine the Popular Filters button state,
 * this function also determines the Popular Filters state if any toggle filters are active
 * @returns {
 *    initialState: Record<string, string>
 *    isPopularActive: boolean
 * }
 */
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

/**
 * Unlike other filters that may include a value in state, radio types need to
 * have a strict match to their value in state
 * @returns boolean
 */
export function strictEqualsValue(
  value: Record<string, string>,
  activeFilters: Record<string, string>,
) {
  return Object.keys(value).every((key) => activeFilters[key] === value[key]);
}

/**
 * Based on the shape of a filter, determines if any values exist in state
 * @returns boolean
 */
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

/**
 * Based on the shape of a filter, returns a deduped list of the filter value keys
 * Used when resetting a filter; maps over keys to remove from state
 * @returns string[]
 */
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
