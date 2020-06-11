import Link from '~/components/global/Link/Link';
import Range from '~/components/global/Range/Range';
import { RANGE_SLIDER_SIZE } from '~/components/global/Range/Range.constants';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterRange, CatalogFilterSort } from '../Filter.types';
import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { FiltersContextProps } from '../Filters.context';
import FilterPopup from '../Popup/FilterPopup';
import styles from './SubFilters.styles';

interface Props {
  activeFilters: FiltersContextProps['activeFilters'];
  isAdvancedView?: boolean;
  onClose: FiltersContextProps['clearSelectingFilter'];
  onOpen: FiltersContextProps['createOpenFilterHandler'];
  priceFilter: CatalogFilterRange;
  resultsCount: number;
  selectingFilter: FiltersContextProps['selectingFilter'];
  sortFilter: CatalogFilterSort;
}

export default function SubFilters({
  activeFilters,
  resultsCount,
  sortFilter,
  onClose,
  onOpen,
  priceFilter,
  selectingFilter,
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
  const min = currentMin || minValue;
  const max = currentMax || maxValue;
  const { lessThan } = useBreakpoints();
  const priceFormatter = mapUnitToLabelFormatter[unit];
  const sortItem = sortFilter.items.find(
    (item) => item.id === activeFilters[sortFilter.label],
  );

  return (
    <div css={styles.root}>
      <p css={styles.results}>
        {ui('catalog.filters.results', { number: resultsCount })}
      </p>
      <Link
        theme={LINK_THEME.LIGHT}
        as="button"
        onClick={onOpen(priceFilter.label)}
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
          onClose={onClose}
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
        theme={LINK_THEME.LIGHT}
        as="button"
        onClick={onOpen(sortFilter.label)}
        css={styles.sort}
      >
        {sortItem?.title || sortFilter.items[0].title}
      </Link>
      <FilterPopup
        isOpen={sortFilter.label === selectingFilter}
        onClose={onClose}
        filter={sortFilter}
      />
    </div>
  );
}
