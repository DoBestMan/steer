import { useCallback, useEffect, useState } from 'react';

import Range from '~/components/global/Range/Range';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilters';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterRange.styles';

export default function FilterRange({
  currentMaxValue,
  currentMinValue,
  filtersToApply,
  header,
  id,
  maxValue,
  minValue,
  onChange,
  step,
  unit,
}: SiteCatalogFilterRange & Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  const [shouldReset, setShouldReset] = useState(false);
  const filterGroup = filtersToApply[id];
  const handleChange = useCallback(
    (extrema: string, value: number) => {
      let val = '';
      const min = filterGroup?.split(',')[0] || minValue;
      const max = filterGroup?.split(',')[1] || maxValue;

      if (extrema === 'currentMin') {
        val = `${value},${max}`;
      }
      if (extrema === 'currentMax') {
        val = `${min},${value}`;
      }

      onChange({ value: { [id]: val }, overwrite: true })();
    },
    [id, filterGroup, maxValue, minValue, onChange],
  );

  useEffect(() => {
    if (!filterGroup) {
      return setShouldReset(true);
    }
    setShouldReset(false);
  }, [filterGroup]);

  return (
    <div css={styles.root}>
      {header && <h3 css={styles.title}>{header.title}</h3>}
      <Range
        formatLabel={mapUnitToLabelFormatter[unit]}
        getAriaText={mapUnitToAriaFormatter[unit]}
        name={ui('catalog.filters.slider', { name: id })}
        interval={step}
        onChange={handleChange}
        max={maxValue}
        shouldReset={shouldReset}
        min={minValue}
        maxDefault={currentMaxValue || maxValue}
        minDefault={currentMinValue || minValue}
      />
    </div>
  );
}
