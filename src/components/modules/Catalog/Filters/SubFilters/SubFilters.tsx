import { useEffect, useRef } from 'react';

import Link from '~/components/global/Link/Link';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import {
  SiteCatalogSortListItem,
  SiteCatalogSortListItemStateEnum,
} from '~/data/models/SiteCatalogSortListItem';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { FilterContentTypes } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import FilterPopup from '../Popup/FilterPopup';
import PriceFilter from './PriceFilter';
import styles from './SubFilters.styles';

const SORT_ID = 'sort';

interface Props {
  priceFilter?: SiteCatalogFilterRange;
  resultsCount: number;
  sortList: SiteCatalogSortListItem[];
}

export default function SubFilters({
  resultsCount,
  sortList,
  priceFilter,
}: Props) {
  const {
    filtersToApply,
    applyFilters,
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
    createUpdateFilterGroup,
  } = useFiltersContext();
  const sortItem = sortList.find(
    (item) => item.state === SiteCatalogSortListItemStateEnum.Selected,
  );

  // refetch results if price changes
  const prevPriceFilter = useRef(priceFilter && filtersToApply[priceFilter.id]);

  const isOpen = selectingFilter === SORT_ID;

  useEffect(() => {
    if (
      !priceFilter ||
      prevPriceFilter.current === filtersToApply[priceFilter.id]
    ) {
      return;
    }

    prevPriceFilter.current = filtersToApply[priceFilter.id];
    applyFilters();
  }, [applyFilters, prevPriceFilter, priceFilter, filtersToApply]);

  return (
    <div css={styles.root}>
      <p css={[styles.results, priceFilter && styles.decorator]}>
        {ui('catalog.filters.results', { number: resultsCount })}
      </p>
      {priceFilter && (
        <PriceFilter
          onChange={createUpdateFilterGroup}
          hasResults={!!resultsCount}
          priceFilter={priceFilter}
        />
      )}
      {!!sortList.length && (
        <div css={styles.sortBy}>
          <p css={styles.sortLabel}>{ui('catalog.filters.sortBy')} </p>
          <Link
            data-testid="sort-filter-button"
            className="dropdown-button"
            theme={THEME.LIGHT}
            as="button"
            onClick={createOpenFilterHandler(SORT_ID)}
            css={[styles.sort, isOpen && styles.disableEvents]}
            aria-expanded={isOpen}
          >
            {(sortItem && sortItem.title) || sortList[0].title}
          </Link>
        </div>
      )}
      <FilterPopup
        hasActionBar={false}
        isOpen={isOpen}
        onClose={clearSelectingFilter}
        filter={{
          items: sortList,
          type: FilterContentTypes.SiteCatalogFilterSort,
        }}
      />
    </div>
  );
}
