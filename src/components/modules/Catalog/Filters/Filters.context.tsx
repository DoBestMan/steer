import isStrictEqual from 'fast-deep-equal';
import { MouseEvent, ReactNode, useMemo, useState } from 'react';

import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { isBrowser } from '~/lib/utils/browser';
import { createContext } from '~/lib/utils/context';

import { CatalogFilterTypes } from './Filter.types';
import { getInitialFiltersState, getValueKeys } from './Filters.utils';

interface ContextProviderProps {
  children: ReactNode;
  onPreviewFilters: (filters?: Record<string, string>) => Promise<void>;
  previewFiltersData: { filters: SiteCatalogFilters; totalMatches: number };
  siteCatalogFilters: SiteCatalogFilters;
}

/*
 * Filter context props
 * @activeFilters - filters that are currently applied to catalog
 * @applyFilters - triggers fetch with newly selected filters (`filtersToApply`), clears open filter popup if applicable
 * @clearFiltersToApply - resets filters if popup was closed without applying
 * @clearSelectingFilter - closes filter popup
 * @createOpenFilterHandler - handler to open filter popup
 * @createResetFiltersHandler - handler to reset all selected filters from a group (does not trigger new fetch unless actively applied)
 * @createToggleFilterHandler - handler for filters that are immediately applied on click (toggles/sort)
 * @createUpdateFilterGroup - updates filter value in `filtersToApply` with the option to overwrite value altogether, previews filters to get updated filter counts
 * @filtersToApply - selected filters from a currently open popup (not immediately applied on selection)
 * @isPopularActive - determines if popular filter button has active state
 * @isPreviewLoading - loading state for fetching new filter counts
 * @previewFiltersData - used to reflect new data for filters in open popup (eg count, disabled states, etc)
 * @selectingFilter - filter id that is currently open
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
  setFiltersToApply: (filtersToApply: Record<string, string>) => void;
  totalMatches: number;
}

const FiltersContext = createContext<FiltersContextProps>();

interface ContextArgs {
  onPreviewFilters: ContextProviderProps['onPreviewFilters'];
  previewFiltersData: ContextProviderProps['previewFiltersData'];
  siteCatalogFilters: SiteCatalogFilters;
}

export function useFiltersContextSetup({
  onPreviewFilters,
  previewFiltersData,
  siteCatalogFilters = { filtersList: [], sortList: [] },
}: ContextArgs) {
  const { setGlobalToastMessage } = useGlobalToastContext();
  const { handleUpdateResults } = useCatalogProductsContext();
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

  return {
    activeFilters: initialState,
    applyFilters: () => {
      selectingFilter && setSelectingFilter(null);
      handleUpdateResults(filtersToApply);
    },
    clearFiltersToApply: () => {
      setFiltersToApply(initialState);
      if (!isStrictEqual(filtersToApply, initialState)) {
        // ensures filter result count is up to date upon reopening
        onPreviewFilters();
      }
    },
    clearSelectingFilter: () => {
      if (isBrowser()) {
        document.body.style.overflow = 'unset';
      }
      setSelectingFilter(null);
    },
    createOpenFilterHandler: (id: number | string) => (e?: MouseEvent) => {
      setSelectingFilter(id);
      if (isBrowser()) {
        document.body.style.overflow = 'hidden';
      }
      if (e?.target instanceof HTMLButtonElement) {
        // force focus, document.activeElement isn't updated if you click
        // a filter button while another filter dropdown is open
        e.target.focus();
      }
    },
    createResetFiltersHandler: (filter: CatalogFilterTypes) => () => {
      const vals = getValueKeys(filter);
      const newState = { ...filtersToApply };
      vals.forEach((key) => {
        if (newState[key]) {
          newState[key] = '';
        }
      });
      setIsPreviewLoading(true);
      onPreviewFilters(newState)
        .then(() => {
          setFiltersToApply(newState);
          setIsPreviewLoading(false);
          handleUpdateResults(newState, true);
        })
        .catch((e) => {
          setGlobalToastMessage(e.message);
          setIsPreviewLoading(false);
        });
    },
    createToggleFilterHandler: (value: Record<string, string>) => () => {
      const newState = { ...filtersToApply };
      Object.keys(value).forEach((key) => {
        newState[key] = value[key];
      });
      setFiltersToApply(newState);
      handleUpdateResults(newState);
    },
    createUpdateFilterGroup: ({
      value,
      overwrite = false,
    }: UpdateFilterArgs) => async () => {
      const filters = { ...filtersToApply };
      Object.entries(value).forEach(([key, value]) => {
        if (overwrite) {
          filters[key] = value;
          return;
        }

        // key did not exist in state, add it
        if (!filters[key]) {
          filters[key] = value;
          return;
        }

        // existing key does not include value, append to current val
        if (!filters[key].includes(value)) {
          filters[key] = `${filters[key]},${value}`;
          return;
        }

        // value exists, remove it
        const valArr = filters[key].split(',');
        const filteredVals = valArr.filter((v) => v !== value);
        const newVal = filteredVals.join(',');

        // set newly modified value
        filters[key] = newVal;
        return;
      });

      setIsPreviewLoading(true);
      onPreviewFilters(filters)
        .then(() => {
          setFiltersToApply(filters);
          setIsPreviewLoading(false);
          handleUpdateResults(filters, true);
        })
        .catch((e) => {
          setGlobalToastMessage(e.message);
          setIsPreviewLoading(false);
        });
    },
    filtersToApply,
    isPopularActive,
    isPreviewLoading,
    previewFiltersData: previewFiltersData.filters,
    selectingFilter,
    setFiltersToApply,
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
