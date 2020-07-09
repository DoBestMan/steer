import { useCallback, useEffect, useRef, useState } from 'react';

import Range from '~/components/global/Range/Range';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
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
  isLarge,
  maxValue,
  minValue,
  onChange,
  step,
  unit,
}: SiteCatalogFilterRange &
  Pick<
    ChildProps,
    'isPreviewLoading' | 'isLarge' | 'onChange' | 'filtersToApply'
  >) {
  const showHeader = ((isLarge && header?.infoLink) || !isLarge) && header;
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
      {showHeader && (
        <div css={styles.header}>
          <h2 css={styles.title}>{header?.title}</h2>
          {header?.infoLink && (
            <p css={[styles.infoLink, !isLarge && styles.infoLinkTitle]}>
              {header.infoLink.label}
            </p>
          )}
        </div>
      )}
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
