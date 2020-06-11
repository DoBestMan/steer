import { useCallback, useState } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';

import {
  FilterObject,
  FiltersContextProps,
  FilterValue,
} from '../Filters.context';

/*
 * This hook behaves similarly to what exists in `Filters.context.ts` -- The main purpose of it being separated is to
 * handle dropdown filter application. If a user does not click `Apply` while the dropdown is open, we shouldn't
 * persist the filters that had been selected while the dropdown was open. This is only used for local state of a popup.
 */

function useFilterPopup({
  createApplyFiltersHandler,
}: Pick<FiltersContextProps, 'createApplyFiltersHandler'>) {
  const { greaterThan } = useBreakpoints();
  const [filtersToApply, setFiltersToApply] = useState<
    Record<string, FilterObject>
  >({});

  return {
    applyFilter: () => createApplyFiltersHandler(filtersToApply)(),
    filtersToApply,
    isLarge: greaterThan.M,
    onChange: useCallback((group: string, id: string, value: FilterValue) => {
      setFiltersToApply((prevState) => ({
        ...prevState,
        [group]: {
          ...prevState[group],
          [id]: value,
        },
      }));
    }, []),
  };
}

export default useFilterPopup;
