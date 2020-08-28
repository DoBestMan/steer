import { useCallback, useEffect, useRef, useState } from 'react';

import { minMaxify } from '~/lib/utils/string';

import { FiltersContextProps } from '../Filters.context';

interface Args {
  filterGroup?: string;
  id: string;
  isLoading: boolean;
  maxValue: number;
  minValue: number;
  onChange: FiltersContextProps['createUpdateFilterGroup'];
}

export function useFilterRangeManager({
  filterGroup,
  isLoading,
  onChange,
  id,
  minValue,
  maxValue,
}: Args) {
  const splitFilterGroup = filterGroup?.split(',');
  const currentMinValue =
    (splitFilterGroup && parseInt(splitFilterGroup[0])) || minValue;
  const currentMaxValue =
    (splitFilterGroup && parseInt(splitFilterGroup[1])) || maxValue;
  const minMax = useRef(minMaxify(currentMinValue, currentMaxValue));

  const [shouldReset, setShouldReset] = useState(!filterGroup);
  const [minCurrent, setMinCurrent] = useState(currentMinValue);
  const [maxCurrent, setMaxCurrent] = useState(currentMaxValue);
  const [refreshValues, setRefreshValues] = useState(false);

  const handleChange = useCallback(() => {
    onChange({ value: { [id]: minMax.current }, overwrite: true })();
  }, [id, onChange]);
  const prevIsLoading = useRef(isLoading);
  function handleMaxChange(value: number) {
    setMaxCurrent(value);
  }
  function handleMinChange(value: number) {
    setMinCurrent(value);
  }

  // update minmax value if either changes
  useEffect(() => {
    minMax.current = minMaxify(minCurrent, maxCurrent);
  }, [minCurrent, maxCurrent]);

  // used to reset values if a response fails after preview is done loading
  // `setRefreshValues` will trigger an update in range slider to set value
  useEffect(() => {
    if (prevIsLoading.current && !isLoading) {
      if (minCurrent !== currentMinValue) {
        setMinCurrent(currentMinValue);
        setRefreshValues(true);
      }
      if (maxCurrent !== currentMaxValue) {
        setMaxCurrent(currentMaxValue);
        setRefreshValues(true);
      }
    }
    if (refreshValues) {
      setRefreshValues(false);
    }
    prevIsLoading.current = isLoading;
  }, [
    isLoading,
    currentMaxValue,
    refreshValues,
    maxCurrent,
    minCurrent,
    currentMinValue,
  ]);

  // used to reset filter values to min/max
  // `shouldReset` tells range slider to update slider node styles
  const prevFilterGroup = useRef(filterGroup);
  useEffect(() => {
    if (prevFilterGroup.current && !filterGroup) {
      setMinCurrent(minValue);
      setMaxCurrent(maxValue);
      setShouldReset(true);
    }

    if (!prevFilterGroup.current && filterGroup) {
      setShouldReset(false);
    }

    prevFilterGroup.current = filterGroup;
  }, [filterGroup, minValue, maxValue]);

  return {
    handleMaxChange,
    handleMinChange,
    handleUpdateFilters: handleChange,
    maxCurrent,
    minCurrent,
    refreshValues,
    shouldReset,
  };
}
