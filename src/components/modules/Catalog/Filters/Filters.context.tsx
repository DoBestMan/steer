import { ReactNode, useCallback, useState } from 'react';

import { createContext } from '~/lib/utils/context';

export type FilterValue = number | string | boolean;
export type FilterObject = { [id: string]: FilterValue };
export type FilterMap = Record<string, FilterObject>;
export interface UpdateFilterArgs {
  group: string;
  id: string;
  value: FilterValue;
}
export interface ToggleFilterArgs extends UpdateFilterArgs {
  overwrite?: boolean;
}

interface ContextProviderProps {
  children: ReactNode;
  onApplyFilters: (filters: FilterMap) => void;
}

/*
 * Filter context props
 * @activeFilters - currently applied filters (see data structure below)
 * @applyFilters - triggers search with newly added filters (filtersToApply)
 * @cancelApplyFilters - resets filtersToApply if a popup is closed without applying
 * @clearSelectingFilter - closes filter dropdown
 * @createOpenFilterHandler - opens filter dropdown
 * @createResetFiltersHandler - resets all selected filters from a group
 * @createToggleFilterHandler - used for filters that are immediately applied on click (toggles/sort) with the option to overwrite all values
 * @createUpdateFilterGroup - updates grouped filters to apply once `Apply` is clicked
 * @filtersToApply - selected filters from a currently open popup (not immediately applied)
 * @selectingFilter - the filter that has an open dropdown
 * Some function props are used in both click event and other scenarios (useEffect or other custom trigger)
 * which is why they might be wrapped with another function
 */
export interface FiltersContextProps {
  activeFilters: FilterMap;
  applyFilters: () => void;
  cancelApplyFilters: () => void;
  clearSelectingFilter: () => void;
  createOpenFilterHandler: (label: string) => () => void;
  createResetFiltersHandler: (label: string) => () => void;
  createToggleFilterHandler: (filter: ToggleFilterArgs) => () => void;
  createUpdateFilterGroup: (filter: UpdateFilterArgs) => () => void;
  filtersToApply: FilterMap;
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
 *      sortBy: {
 *        priceDesc: true
 *      },
 *      popular: {
 *        deals: true,
 *        fuelEfficient: true
 *      },
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
  const [activeFilters, setActiveFilters] = useState<FilterMap>(initialState);
  const [selectingFilter, setSelectingFilter] = useState('');
  const [filtersToApply, setFiltersToApply] = useState<FilterMap>(
    activeFilters,
  );

  return {
    activeFilters,
    applyFilters: () => {
      setSelectingFilter('');
      onApplyFilters(filtersToApply);
      setActiveFilters(filtersToApply);
    },
    cancelApplyFilters: () => {
      setFiltersToApply(activeFilters);
    },
    clearSelectingFilter: () => setSelectingFilter(''),
    createOpenFilterHandler: (label: string) => () => setSelectingFilter(label),
    createResetFiltersHandler(group: string) {
      return () => {
        setFiltersToApply((prevState) => ({
          ...prevState,
          [group]: {},
        }));
      };
    },
    createToggleFilterHandler: ({
      group,
      id,
      value,
      overwrite = false,
    }: ToggleFilterArgs) => () => {
      const newFilters = {
        ...filtersToApply,
        [group]: {
          ...(!overwrite && filtersToApply[group]),
          [id]: value,
        },
      };
      setFiltersToApply(newFilters);
      setActiveFilters(newFilters);
      onApplyFilters(newFilters);
    },
    createUpdateFilterGroup: useCallback(
      ({ group, id, value }: UpdateFilterArgs) => () => {
        setFiltersToApply((prevState) => {
          if (prevState[group] && prevState[group][id]) {
            // immutably removes id from group in prevState
            const { [id]: _, ...rest } = prevState[group];
            return {
              ...prevState,
              [group]: {
                ...rest,
              },
            };
          }
          return {
            ...prevState,
            [group]: {
              ...prevState[group],
              [id]: value,
            },
          };
        });
      },
      [],
    ),
    filtersToApply,
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
