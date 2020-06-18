import Link from '~/components/global/Link/Link';
import Range from '~/components/global/Range/Range';
import { RANGE_SLIDER_SIZE } from '~/components/global/Range/Range.constants';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterRange, CatalogFilterSort } from '../Filter.types';
import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { useFiltersContext } from '../Filters.context';
import FilterPopup from '../Popup/FilterPopup';
import styles from './SubFilters.styles';

interface Props {
  priceFilter: CatalogFilterRange;
  resultsCount: number;
  sortFilter: CatalogFilterSort;
}

export default function SubFilters({
  resultsCount,
  sortFilter,
  priceFilter,
}: Props) {
  const {
    currentMax,
    currentMin,
    label,
    maxValue,
    minValue,
    step,
    unit,
  } = priceFilter;
  const {
    activeFilters,
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
  } = useFiltersContext();
  const min = currentMin || minValue;
  const max = currentMax || maxValue;
  const { lessThan } = useBreakpoints();
  const priceFormatter = mapUnitToLabelFormatter[unit];
  const sortKey =
    activeFilters[sortFilter.label] &&
    Object.keys(activeFilters[sortFilter.label])[0];
  const sortItem =
    sortKey && sortFilter.items.find((item) => item.id === sortKey);
  return (
    <div css={styles.root}>
      <p css={[styles.results, !resultsCount && styles.resultsNone]}>
        {ui('catalog.filters.results', { number: resultsCount })}
      </p>
      <p css={[styles.rangePrefix, resultsCount && styles.rangePrefixHide]}>
        {ui('catalog.filters.from')}
      </p>
      <Link
        theme={THEME.LIGHT}
        as="button"
        onClick={createOpenFilterHandler(priceFilter.label)}
        css={[styles.range, styles.smallShow]}
      >
        {ui('catalog.filters.priceRange', {
          min: priceFormatter(min),
          max: priceFormatter(max),
        })}
      </Link>
      {lessThan.L ? (
        <FilterPopup
          isOpen={sortFilter.label === selectingFilter}
          onClose={clearSelectingFilter}
          filter={sortFilter}
        />
      ) : (
        <>
          <p css={styles.rangeLabel}>{ui('catalog.filters.priceRangeLabel')}</p>
          <div css={styles.slider}>
            <Range
              size={RANGE_SLIDER_SIZE.SMALL}
              formatLabel={mapUnitToLabelFormatter[unit]}
              getAriaText={mapUnitToAriaFormatter[unit]}
              name={ui('catalog.filters.slider', { name: label })}
              interval={step}
              max={maxValue}
              min={minValue}
              maxDefault={max}
              minDefault={min}
            />
          </div>
        </>
      )}
      <p css={styles.sortLabel}>{ui('catalog.filters.sortBy')} </p>
      <Link
        theme={THEME.LIGHT}
        as="button"
        onClick={createOpenFilterHandler(sortFilter.label)}
        css={styles.sort}
      >
        {(sortItem && sortItem.title) || sortFilter.items[0].title}
      </Link>
      <FilterPopup
        isOpen={sortFilter.label === selectingFilter}
        onClose={clearSelectingFilter}
        filter={sortFilter}
      />
    </div>
  );
}
