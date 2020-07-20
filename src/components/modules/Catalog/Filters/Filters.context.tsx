import {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { createContext } from '~/lib/utils/context';

import { CatalogFilterTypes } from './Filter.types';
import { getInitialFiltersState, getValueKeys } from './Filters.utils';

interface ContextProviderProps {
  children: ReactNode;
  onPreviewFilters: (filters: Record<string, string>) => Promise<void>;
  previewFiltersData: SiteCatalogFilters;
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
 * @isPopularActive - determines if popular filter button has active state
 * @isPreviewLoading - loading state for fetching new results
 * @previewFiltersData - used to reflect new data for filters in open popup (eg count, disabled states, etc)
 * @selectingFilter - the filter index that has an open dropdown
 * @totalMatches - matching results with filters applied
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
  createToggleFilterHandler: (value: Record<string, string>) => () => void;
  createUpdateFilterGroup: (args: UpdateFilterArgs) => () => void;
  filtersToApply: Record<string, string>;
  isPopularActive: boolean;
  isPreviewLoading: boolean;
  previewFiltersData: SiteCatalogFilters;
  selectingFilter: number | string | null;
  totalMatches: number;
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
  onPreviewFilters: ContextProviderProps['onPreviewFilters'];
  previewFiltersData: ContextProviderProps['previewFiltersData'];
  siteCatalogFilters: SiteCatalogFilters;
}

export function useFiltersContextSetup({
  onPreviewFilters,
  previewFiltersData,
  siteCatalogFilters = { filtersList: [], sortList: [], totalMatches: 0 },
}: ContextArgs) {
  const { isLoading, handleUpdateResults } = useCatalogPageContext();
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
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

  const firstRun = useRef(true);
  useEffect(() => {
    if (!selectingFilter) {
      firstRun.current = true;
      return;
    }

    // don't preview filters upon opening a dropdown
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setIsPreviewLoading(true);
    onPreviewFilters(filtersToApply).then(() => {
      setIsPreviewLoading(false);
    });
  }, [
    selectingFilter,
    setIsPreviewLoading,
    filtersToApply,
    initialState,
    onPreviewFilters,
  ]);

  useEffect(() => {
    // wait until new results have come in to rehydrate initial state
    if (isLoading) {
      return;
    }

    const { initialState } = getInitialFiltersState(
      siteCatalogFilters.filtersList,
      siteCatalogFilters.sortList,
    );
    setFiltersToApply(initialState);
  }, [isLoading, siteCatalogFilters]);

  return {
    activeFilters: initialState,
    applyFilters: () => {
      selectingFilter && setSelectingFilter(null);
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
    createToggleFilterHandler: (value: Record<string, string>) => () => {
      const newState = { ...filtersToApply };
      Object.keys(value).forEach((key) => {
        if (newState[key]) {
          newState[key] = '';
          return;
        }
        newState[key] = value[key];
      });

      setFiltersToApply(newState);
      handleUpdateResults(newState);
    },
    createUpdateFilterGroup: useCallback(
      ({ value, overwrite = false }: UpdateFilterArgs) => () =>
        setFiltersToApply((prevState) => {
          const newState = { ...prevState };

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

            // set newly modified value
            newState[key] = newVal;
            return;
          });
          return newState;
        }),
      [],
    ),
    filtersToApply,
    isPopularActive,
    isPreviewLoading,
    previewFiltersData,
    selectingFilter,
    totalMatches: previewFiltersData.totalMatches,
  };
}

export function FiltersContextProvider({
  children,
  siteCatalogFilters,
  onPreviewFilters,
  previewFiltersData,
}: ContextProviderProps) {
  const value = useFiltersContextSetup({
    previewFiltersData,
    siteCatalogFilters,
    onPreviewFilters,
  });
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export const useFiltersContext = FiltersContext.useContext;
