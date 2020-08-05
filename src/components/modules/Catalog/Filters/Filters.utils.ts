import { SiteCatalogFilterGroup } from '~/data/models/SiteCatalogFilterGroup';
import {
  SiteCatalogFilterItem,
  SiteCatalogFilterItemStateEnum,
} from '~/data/models/SiteCatalogFilterItem';
import {
  SiteCatalogSortListItem,
  SiteCatalogSortListItemStateEnum,
} from '~/data/models/SiteCatalogSortListItem';
import { minMaxify } from '~/lib/utils/string';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';

interface GroupedFilters {
  otherFilters: CatalogFilterTypes[];
  popularFilters: CatalogFilterTypes[];
}

/**
 * Gets number of applied filters for a given filter list
 */
export function getAppliedCount(filter: CatalogFilterTypes) {
  if (filter.type !== FilterContentTypes.SiteCatalogFilterList) {
    return;
  }
  const vals: string[] = []; // used to dedupe count
  filter.filterGroups.forEach((group: SiteCatalogFilterGroup) => {
    group.items.forEach((item: SiteCatalogFilterItem) => {
      if (item.state === SiteCatalogFilterItemStateEnum.Selected) {
        // all values must match another filter to be a duplicate, and all
        // values have to be grouped as one string, which will count as one selected filter
        let concatKeyVals = '';
        Object.entries(item.value).forEach(([k, v]) => {
          concatKeyVals += k + v;
        });
        if (vals.indexOf(concatKeyVals) < 0) {
          vals.push(concatKeyVals);
        }
      }
    });
  });

  return vals.length;
}

/**
 * Toggle filters are grouped into `Popular Filters` on large breakpoint
 */
export function getGroupedFilters(
  filters: CatalogFilterTypes[],
): GroupedFilters {
  const groupedFilters = filters.reduce<GroupedFilters>(
    (acc, filter) => {
      if (filter.type === FilterContentTypes.SiteCatalogFilterToggle) {
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
  if (filter.type === FilterContentTypes.SiteCatalogFilterToggle) {
    return filter.item.title;
  }

  if ('header' in filter && filter.header) {
    const count = getAppliedCount(filter);
    return filter.header.title + (count ? ` (${count})` : '');
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
    if (filter.type === FilterContentTypes.SiteCatalogFilterToggle) {
      if (filter.item.state === SiteCatalogFilterItemStateEnum.Selected) {
        isPopularActive = true;
        Object.keys(filter.item.value).forEach((key) => {
          initialState[key] = filter.item.value[key];
        });
      }
    }

    // list filter
    if (filter.type === FilterContentTypes.SiteCatalogFilterList) {
      filter.filterGroups.forEach((group: SiteCatalogFilterGroup) => {
        group.items.forEach((item: SiteCatalogFilterItem) => {
          if (item.state === SiteCatalogFilterItemStateEnum.Selected) {
            Object.keys(item.value).forEach((key) => {
              if (!initialState[key]) {
                initialState[key] = item.value[key];
                return;
              }

              if (
                initialState[key] &&
                !initialState[key].includes(item.value[key])
              ) {
                initialState[key] = initialState[key] + ',' + item.value[key];
                return;
              }
            });
          }
        });
      });
    }

    // range filter
    if (filter.type === FilterContentTypes.SiteCatalogFilterRange) {
      if (!filter.currentMinValue && !filter.currentMaxValue) {
        return;
      }
      initialState[filter.id] = minMaxify(
        filter.currentMinValue || 0,
        filter.currentMaxValue || 0,
      );
    }
  });

  if (sortList) {
    const selectedSort = sortList.find(
      (item) => item.state === SiteCatalogSortListItemStateEnum.Selected,
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
 * Based on the shape of a filter, determines if any values exist in state
 * @returns boolean
 */
export function hasActiveValue(
  filter: CatalogFilterTypes | SiteCatalogFilterItem,
  activeFilters: Record<string, string>,
): boolean {
  // SiteCatalogFilterItem
  if ('value' in filter) {
    return Object.keys(filter.value).some(
      (key) => !!activeFilters[key]?.includes(filter.value[key]),
    );
  }

  if (filter.type === FilterContentTypes.SiteCatalogFilterToggle) {
    return Object.keys(filter.item.value).some((key) => !!activeFilters[key]);
  }

  if (filter.type === FilterContentTypes.SiteCatalogFilterList) {
    let isActive = false;
    filter.filterGroups.forEach((group) =>
      group.items.forEach((item) => {
        if (isActive) {
          return;
        }
        isActive = Object.keys(item.value).some((key) => !!activeFilters[key]);
      }),
    );
    return isActive;
  }

  if (filter.type === FilterContentTypes.SiteCatalogFilterRange) {
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
  if (filter.type === FilterContentTypes.SiteCatalogFilterToggle) {
    valueKeys = [...valueKeys, ...Object.keys(filter.item.value)];
  }

  // list filter
  if (filter.type === FilterContentTypes.SiteCatalogFilterList) {
    filter.filterGroups.forEach((group: SiteCatalogFilterGroup) => {
      group.items.forEach((item: SiteCatalogFilterItem) => {
        valueKeys = [...valueKeys, ...Object.keys(item.value)];
      });
    });
  }

  // range filter
  if (filter.type === FilterContentTypes.SiteCatalogFilterRange) {
    valueKeys = [...valueKeys, filter.id];
  }

  // popular filter
  if (filter.type === FilterContentTypes.SiteCatalogFilterPopular) {
    filter.items.forEach((filterItem) => {
      if (filterItem.type === FilterContentTypes.SiteCatalogFilterToggle) {
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
