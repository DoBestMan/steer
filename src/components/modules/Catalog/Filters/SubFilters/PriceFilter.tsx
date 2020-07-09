import Link from '~/components/global/Link/Link';
import Range from '~/components/global/Range/Range';
import { RANGE_SLIDER_SIZE } from '~/components/global/Range/Range.constants';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { useFiltersContext } from '../Filters.context';
import FilterPopup from '../Popup/FilterPopup';
import styles from './SubFilters.styles';

const PRICE_ID = 'price';

interface Props {
  hasResults: boolean;
  priceFilter: SiteCatalogFilterRange;
}

export default function PriceFilter({ hasResults, priceFilter }: Props) {
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
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
  } = useFiltersContext();
  const min = currentMinValue || minValue;
  const max = currentMaxValue || maxValue;
  const { lessThan } = useBreakpoints();
  const priceFormatter = mapUnitToLabelFormatter[unit];

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
    </>
  );
}
