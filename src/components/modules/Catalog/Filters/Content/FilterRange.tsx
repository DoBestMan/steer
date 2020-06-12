import { useCallback, useEffect, useState } from 'react';

import Range from '~/components/global/Range/Range';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterRange } from '../Filter.types';
import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterRange.styles';

export default function FilterRange({
  currentMax = 0,
  currentMin = 0,
  filtersToApply,
  label,
  maxValue,
  minValue,
  onChange,
  step,
  unit,
}: CatalogFilterRange & Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  const [shouldReset, setShouldReset] = useState(false);
  const filterGroup = filtersToApply[label];
  const handleChange = useCallback(
    (extrema: string, value: number) => {
      onChange(label, extrema, value);
    },
    [label, onChange],
  );

  useEffect(() => {
    if (!filterGroup) {
      return setShouldReset(true);
    }
    setShouldReset(false);
  }, [filterGroup]);
  return (
    <div css={styles.root}>
      <h3 css={styles.title}>{label}</h3>
      <Range
        formatLabel={mapUnitToLabelFormatter[unit]}
        getAriaText={mapUnitToAriaFormatter[unit]}
        name={ui('catalog.filters.slider', { name: label })}
        interval={step}
        onChange={handleChange}
        max={maxValue}
        shouldReset={shouldReset}
        min={minValue}
        maxDefault={currentMax || maxValue}
        minDefault={currentMin || minValue}
      />
    </div>
  );
}
