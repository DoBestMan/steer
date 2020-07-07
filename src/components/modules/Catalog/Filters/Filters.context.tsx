import {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { createContext } from '~/lib/utils/context';

import { CatalogFilterTypes } from './Filter.types';
import { getInitialFiltersState, getValueKeys } from './Filters.utils';

interface ContextProviderProps {
  children: ReactNode;
  siteCatalogFilters: SiteCatalogFilters;
}

/*
 * Filter context props
 * @activeFilters - currently applied filters (see data structure below)
 * @applyFilters - triggers search with newly added filters (filtersToApply)
 * @clearFiltersToApply - resets to initial state if closing dropdown without resetting or applying
 * @clearSelectingFilter - closes filter dropdown
 * @createOpenFilterHandler - opens filter dropdown
 * @createResetFiltersHandler - resets all selected filters from a group
 * @createToggleFilterHandler - used for filters that are immediately applied on click (toggles/sort) with the option to overwrite all values
 * @createUpdateFilterGroup - updates grouped filters to apply once `Apply` is clicked
 * @filtersToApply - selected filters from a currently open popup (not immediately applied)
 * @isLoading - loading state for fetching new results
 * @isPopularActive - determines if popular filter button has active state
 * @previewFiltersToApply - previews filters to apply with updated count (does not apply filters globally)
 * @selectingFilter - the filter index that has an open dropdown
 * Some function props are used in both click event and other scenarios (useEffect or other custom trigger)
 * which is why they might be wrapped with another function
 */
interface UpdateFilterArgs {
  overwrite?: boolean;
  value: Record<string, string>;
}
export interface FiltersContextProps {
  activeFilters: Record<string, string>;
  applyFilters: () => void;
  clearFiltersToApply: () => void;
  clearSelectingFilter: () => void;
  createOpenFilterHandler: (id: number | string) => (e?: MouseEvent) => void;
  createResetFiltersHandler: (filter: CatalogFilterTypes) => () => void;
  createToggleFilterHandler: (args: UpdateFilterArgs) => () => void;
  createUpdateFilterGroup: (args: UpdateFilterArgs) => () => void;
  filtersToApply: Record<string, string>;
  isLoading: boolean;
  isPopularActive: boolean;
  previewFiltersToApply: () => void;
  selectingFilter: number | string | null;
}

const FiltersContext = createContext<FiltersContextProps>();

/*
 * Filters map will run through initial results to determine filters that are marked as selected for initialState
 * As the user applies filters in each group, they will be added to this map and then as query params so they persist
 * Each filter has a value object that may contain multiple values (eg `sort` and `order` from the sort list)
 * Sort filters and range filters will need to overwrite the values in state, while toggle filters will either
 * add the value to the state, or remove it all together if untoggled (if value exists in state already)
 * List filters will be appended as a comma separated list, and removed altogether if the value is empty
 * An example of what this might look like:
 *    {
 *      sort: 'price',
 *      order: 'desc',
 *      deals: 'true',
 *      brand: 'firestone,goodyear',
 *      warranty: 0,5000
 *    }
 */

interface ContextArgs {
  siteCatalogFilters: SiteCatalogFilters;
}

export function useFiltersContextSetup({
  siteCatalogFilters = { filtersList: [], sortList: [], totalMatches: 0 },
}: ContextArgs) {
  const { isLoading, handleUpdateResults } = useCatalogPageContext();
  const { initialState, isPopularActive } = useMemo(
    () =>
      getInitialFiltersState(
        siteCatalogFilters.filtersList,
        siteCatalogFilters.sortList,
      ),
    [siteCatalogFilters],
  );
  const [selectingFilter, setSelectingFilter] = useState<
    number | string | null
  >(null);
  const [filtersToApply, setFiltersToApply] = useState<Record<string, string>>(
    initialState,
  );

  useEffect(() => {
    const { initialState } = getInitialFiltersState(
      siteCatalogFilters.filtersList,
      siteCatalogFilters.sortList,
    );
    setFiltersToApply(initialState);
  }, [siteCatalogFilters]);

  return {
    activeFilters: initialState,
    applyFilters: () => {
      setSelectingFilter(null);
      handleUpdateResults(filtersToApply);
    },
    clearFiltersToApply: () => {
      setFiltersToApply(initialState);
    },
    clearSelectingFilter: () => setSelectingFilter(null),
    createOpenFilterHandler: (id: number | string) => (e?: MouseEvent) => {
      setSelectingFilter(id);
      if (e?.target instanceof HTMLButtonElement) {
        // force focus, document.activeElement isn't updated if you click
        // a filter button while another filter dropdown is open
        e.target.focus();
      }
    },
    createResetFiltersHandler: (filter: CatalogFilterTypes) => () => {
      const vals = getValueKeys(filter);
      let newState = { ...filtersToApply };
      vals.forEach((key) => {
        if (newState[key]) {
          const { [key]: _, ...rest } = newState;
          newState = rest;
          return;
        }
      });
      setFiltersToApply(newState);
      // Apply reset filters automatically?
      // onApplyFilters(newState);
    },
    createToggleFilterHandler: ({
      value,
      overwrite = false,
    }: UpdateFilterArgs) => () => {
      let newState = { ...filtersToApply };
      Object.keys(value).forEach((key) => {
        if (overwrite || !newState[key]) {
          newState[key] = value[key];
          return;
        }

        const { [key]: _, ...rest } = newState;
        newState = rest;
        return;
      });
      setFiltersToApply(newState);
      handleUpdateResults(newState);
    },
    createUpdateFilterGroup: useCallback(
      ({ value, overwrite = false }: UpdateFilterArgs) => () =>
        setFiltersToApply((prevState) => {
          let newState = { ...prevState };

          Object.entries(value).forEach(([key, value]) => {
            if (overwrite) {
              newState[key] = value;
              return;
            }

            // key did not exist in state, add it
            if (!newState[key]) {
              newState[key] = value;
              return;
            }

            // filter key exists, add or remove value
            // existing key does not include value, append to current val
            if (!newState[key].includes(value)) {
              newState[key] = `${newState[key]},${value}`;
              return;
            }

            // value exists, remove it
            const valArr = newState[key].split(',');
            const filteredVals = valArr.filter((v) => v !== value);
            const newVal = filteredVals.join(',');

            // value is empty, remove key from state altogether
            if (!newVal) {
              const { [key]: _, ...rest } = newState;
              newState = rest;
              return;
            }

            // set newly modified value
            newState[key] = newVal;
            return;
          });
          return newState;
        }),
      [],
    ),
    filtersToApply,
    isLoading,
    isPopularActive,
    previewFiltersToApply: () => {
      // TODO: preview count/updated filter results in open dropdown
    },
    selectingFilter,
  };
}

export function FiltersContextProvider({
  children,
  siteCatalogFilters,
}: ContextProviderProps) {
  const value = useFiltersContextSetup({ siteCatalogFilters });
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export const useFiltersContext = FiltersContext.useContext;
