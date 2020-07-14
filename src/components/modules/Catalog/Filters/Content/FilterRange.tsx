import { useCallback, useEffect, useRef, useState } from 'react';

import Range from '~/components/global/Range/Range';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { ChildProps } from '../Popup/FilterPopup.utils';
import FilterHeader from './FilterHeader';
import styles from './FilterRange.styles';

export default function FilterRange({
  currentMaxValue,
  currentMinValue,
  filtersToApply,
  header,
  id,
  isLarge,
  maxValue,
  minValue,
  onChange,
  openStaticModal,
  step,
  unit,
}: SiteCatalogFilterRange &
  Pick<
    ChildProps,
    | 'isPreviewLoading'
    | 'isLarge'
    | 'onChange'
    | 'filtersToApply'
    | 'openStaticModal'
  >) {
  const filterGroup = filtersToApply[id];
  const [shouldReset, setShouldReset] = useState(!filtersToApply[id]);
  const handleChange = useCallback(
    (value: string) => {
      onChange({ value: { [id]: value }, overwrite: true })();
    },
    [id, onChange],
  );

  const prevFilterGroup = useRef(filterGroup);
  useEffect(() => {
    if (prevFilterGroup.current && !filterGroup) {
      setShouldReset(true);
    }

    prevFilterGroup.current = filterGroup;

    setShouldReset(false);
  }, [filterGroup]);

  return (
    <div css={styles.root}>
      <FilterHeader
        headerStyles={styles.header}
        header={header}
        title={<h2 css={styles.title}>{header?.title}</h2>}
        isLarge={isLarge}
        openStaticModal={openStaticModal}
      />
      <Range
        formatLabel={mapUnitToLabelFormatter[unit]}
        getAriaText={mapUnitToAriaFormatter[unit]}
        name={ui('catalog.filters.slider', { name: id })}
        interval={step}
        onUpdate={handleChange}
        max={maxValue}
        shouldReset={shouldReset}
        min={minValue}
        maxDefault={currentMaxValue || maxValue}
        minDefault={currentMinValue || minValue}
      />
    </div>
  );
}
