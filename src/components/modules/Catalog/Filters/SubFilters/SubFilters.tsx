import Link from '~/components/global/Link/Link';
import Range from '~/components/global/Range/Range';
import { RANGE_SLIDER_SIZE } from '~/components/global/Range/Range.constants';
import {
  SiteCatalogFilterRange,
  SiteCatalogFilterState,
  SiteCatalogSortListItem,
} from '~/data/models/SiteCatalogFilters';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { FilterContentTypes } from '../Filter.types';
import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { useFiltersContext } from '../Filters.context';
import FilterPopup from '../Popup/FilterPopup';
import styles from './SubFilters.styles';

const PRICE_ID = 'price';
const SORT_ID = 'sort';

interface Props {
  priceFilter: SiteCatalogFilterRange;
  resultsCount: number;
  sortList: SiteCatalogSortListItem[];
}

export default function SubFilters({
  resultsCount,
  sortList,
  priceFilter,
}: Props) {
  const {
    currentMaxValue,
    currentMinValue,
    id,
    maxValue,
    minValue,
    step,
    unit,
  } = priceFilter;
  const {
    // activeFilters,
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
  } = useFiltersContext();
  const min = currentMinValue || minValue;
  const max = currentMaxValue || maxValue;
  const { lessThan } = useBreakpoints();
  const priceFormatter = mapUnitToLabelFormatter[unit];
  const sortItem = sortList.find(
    (item) => item.state === SiteCatalogFilterState.Selected,
  );
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
        className="filter-button"
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
              size={RANGE_SLIDER_SIZE.SMALL}
              formatLabel={mapUnitToLabelFormatter[unit]}
              getAriaText={mapUnitToAriaFormatter[unit]}
              name={ui('catalog.filters.slider', { name: id })}
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
        className="filter-button"
        theme={THEME.LIGHT}
        as="button"
        onClick={createOpenFilterHandler(SORT_ID)}
        css={styles.sort}
        aria-expanded={selectingFilter === SORT_ID}
      >
        {(sortItem && sortItem.title) || sortList[0].title}
      </Link>
      <FilterPopup
        hasActionBar={false}
        isOpen={selectingFilter === SORT_ID}
        onClose={clearSelectingFilter}
        filter={{
          items: sortList,
          type: FilterContentTypes.SiteCatalogFilterSort,
        }}
      />
    </div>
  );
}
