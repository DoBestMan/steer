import React, { useEffect, useRef } from 'react';

import Link from '~/components/global/Link/Link';
import Range from '~/components/global/Range/Range';
import { RANGE_SLIDER_SIZE } from '~/components/global/Range/Range.constants';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { useFilterRangeManager } from '../Content/FilterRange.hooks';
import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { FiltersContextProps, useFiltersContext } from '../Filters.context';
import FilterPopup from '../Popup/FilterPopup';
import styles from './SubFilters.styles';

const PRICE_ID = 'price';

interface Props {
  hasResults: boolean;
  onChange: FiltersContextProps['createUpdateFilterGroup'];
  priceFilter: SiteCatalogFilterRange;
}

export default function PriceFilter({
  hasResults,
  onChange,
  priceFilter,
}: Props) {
  const { id, maxValue, minValue, step, unit } = priceFilter;
  const {
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
    isPreviewLoading,
    filtersToApply,
    applyFilters,
  } = useFiltersContext();
  const { lessThan } = useBreakpoints();
  const priceFormatter = mapUnitToLabelFormatter[unit];
  const { isLoading } = useCatalogProductsContext();
  const filterGroupSplit = filtersToApply[id] && filtersToApply[id].split(',');
  const min = filterGroupSplit ? parseInt(filterGroupSplit[0]) : minValue;
  const max = filterGroupSplit ? parseInt(filterGroupSplit[1]) : maxValue;
  const {
    handleMaxChange,
    handleMinChange,
    handleUpdateFilters,
    maxCurrent,
    minCurrent,
    refreshValues,
  } = useFilterRangeManager({
    filterGroup: filtersToApply[id],
    id,
    isLoading: isPreviewLoading,
    maxValue,
    minValue,
    onChange,
  });

  // applies price filter automatically when value changes (lg breakpoint)
  const prevPriceFilter = useRef(filtersToApply[id]);
  useEffect(() => {
    if (
      lessThan.L ||
      isLoading ||
      prevPriceFilter.current === filtersToApply[id]
    ) {
      return;
    }

    prevPriceFilter.current = filtersToApply[id];
    applyFilters();
  }, [applyFilters, lessThan, isLoading, prevPriceFilter, id, filtersToApply]);

  return (
    <>
      <p css={[styles.rangePrefix, hasResults && styles.rangePrefixHide]}>
        {ui('catalog.filters.from')}
      </p>
      <Link
        theme={THEME.LIGHT}
        className="dropdown-button"
        as="button"
        onClick={createOpenFilterHandler(PRICE_ID)}
        css={[styles.range, styles.smallShow]}
      >
        {ui('catalog.filters.priceRange', {
          min: priceFormatter(min),
          max: priceFormatter(max),
        })}
      </Link>
      {lessThan.L ? (
        <FilterPopup
          isOpen={selectingFilter === PRICE_ID}
          onClose={clearSelectingFilter}
          filter={priceFilter}
        />
      ) : (
        <>
          <p css={styles.rangeLabel}>{ui('catalog.filters.priceRangeLabel')}</p>
          <div css={styles.slider}>
            <Range
              onMaxChange={handleMaxChange}
              onMinChange={handleMinChange}
              onUpdate={handleUpdateFilters}
              size={RANGE_SLIDER_SIZE.SMALL}
              formatLabel={mapUnitToLabelFormatter[unit]}
              getAriaText={mapUnitToAriaFormatter[unit]}
              name={ui('catalog.filters.slider', { name: id })}
              interval={step}
              max={maxValue}
              refreshValues={refreshValues}
              min={minValue}
              minCurrent={minCurrent}
              maxCurrent={maxCurrent}
            />
          </div>
        </>
      )}
    </>
  );
}
