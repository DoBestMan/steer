import { ReactNode, useEffect, useState } from 'react';

import { createContext } from '~/lib/utils/context';

export type FilterValue = number | string | boolean;
export type FilterObject = { [id: string]: FilterValue };
export type FilterMap = Record<string, FilterObject | FilterValue>;

interface ContextProviderProps {
  children: ReactNode;
  onApplyFilters: (filters: FilterMap) => void;
}

/*
 * Filter context props
 * @activeFilters - currently applied filters (see data structure below)
 * @applyFilters - triggers search with newly added filters
 * @clearSelectingFilter - closes filter dropdown
 * @createOpenFilterHandler - opens filter dropdown
 * @createToggleFilterHandler - used for toggle filters that have no dropdown
 * @selectingFilter - the filter that has an open dropdown
 * Some function props are used in both click event and other scenarios (useEffect or other custom trigger)
 * which is why they might be wrapped with another function
 */
export interface FiltersContextProps {
  activeFilters: FilterMap;
  clearSelectingFilter: () => void;
  createApplyFiltersHandler: (filters: FilterMap) => () => void;
  createOpenFilterHandler: (label: string) => () => void;
  createToggleFilterHandler: (filter: string, value: FilterValue) => () => void;
  selectingFilter: string;
}

const FiltersContext = createContext<FiltersContextProps>();

/*
 * Filters map will parse query params and add these values to the initial state of applied filters
 * As the user applies filters in each group, they will be added to this map so
 * that filters from other groups will persist when we fetch the results
 * Dropdown filters have a nested key value and toggle filters will be top level key/value
 * An example of what this might look like:
 *    {
 *      sortBy: 'priceDesc',
 *      deals: true,
 *      brands: {
 *        firestone: true
 *      },
 *      warranty: {
 *        currentMin: 10000,
 *        currentMax: 25000
 *      }
 *    }
 */

interface ContextArgs {
  onApplyFilters: ContextProviderProps['onApplyFilters'];
}

export function useFiltersContextSetup({ onApplyFilters }: ContextArgs) {
  // TODO: parse query params and add to default applied filters
  const initialState = {};
  const [filtersMap, setFiltersMap] = useState<FilterMap>(initialState);
  const [selectingFilter, setSelectingFilter] = useState('');

  useEffect(() => {
    onApplyFilters(filtersMap);
  }, [filtersMap, onApplyFilters]);
  return {
    activeFilters: filtersMap,
    clearSelectingFilter: () => setSelectingFilter(''),
    createApplyFiltersHandler: (filters: FilterMap) => () => {
      setFiltersMap({ ...filtersMap, ...filters });
      setSelectingFilter('');
    },
    createOpenFilterHandler: (label: string) => () => setSelectingFilter(label),
    createToggleFilterHandler: (filter: string, value: FilterValue) => () => {
      setFiltersMap({
        ...filtersMap,
        [filter]: value,
      });
    },
    selectingFilter,
  };
}

export function FiltersContextProvider({
  children,
  onApplyFilters,
}: ContextProviderProps) {
  const value = useFiltersContextSetup({ onApplyFilters });
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export const useFiltersContext = FiltersContext.useContext;
