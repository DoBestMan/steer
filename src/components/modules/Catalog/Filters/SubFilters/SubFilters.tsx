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
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
  } = useFiltersContext();
  const sortItem = sortList.find(
    (item) => item.state === SiteCatalogSortListItemStateEnum.Selected,
  );
  return (
    <div css={styles.root}>
      <p css={[styles.results, !resultsCount && styles.resultsNone]}>
        {ui('catalog.filters.results', { number: resultsCount })}
      </p>
      {priceFilter && (
        <PriceFilter hasResults={!!resultsCount} priceFilter={priceFilter} />
      )}
      <p css={styles.sortLabel}>{ui('catalog.filters.sortBy')} </p>
      <Link
        className="dropdown-button"
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
