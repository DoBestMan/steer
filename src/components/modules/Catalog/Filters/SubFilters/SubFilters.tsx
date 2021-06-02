import Link from '~/components/global/Link/Link';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import { SiteCatalogProductGroupItemEnum } from '~/data/models/SiteCatalogProductGroupList';
import {
  SiteCatalogSortListItem,
  SiteCatalogSortListItemStateEnum,
} from '~/data/models/SiteCatalogSortListItem';
import { THEME } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
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
  showingResult: number;
  sizeList?: string[];
  sortList: SiteCatalogSortListItem[];
}

export default function SubFilters({
  showingResult,
  resultsCount,
  sortList,
  priceFilter,
  sizeList = [],
}: Props) {
  const {
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
    createUpdateFilterGroup,
  } = useFiltersContext();

  const { setGlobalToastMessage } = useGlobalToastContext();

  const sortItem = sortList.find(
    (item) => item.state === SiteCatalogSortListItemStateEnum.Selected,
  );

  const {
    handleUpdateResults,
    setIsAdvancedView,
    isAdvancedView,
    siteCatalogProducts,
  } = useCatalogProductsContext();

  const onToggleView = async () => {
    const newParams = isAdvancedView
      ? { skipGroups: 'false' }
      : { skipGroups: 'true' };
    const shouldSetToLocalStorage =
      window && window.localStorage
        ? (hasAdvancedView: boolean) => {
            window.localStorage.setItem(
              LOCAL_STORAGE[PROPERTIES.ADVANCED_VIEW],
              `${hasAdvancedView}`,
            );
          }
        : () => null;
    setIsAdvancedView(!isAdvancedView);
    shouldSetToLocalStorage(!isAdvancedView);
    handleUpdateResults(newParams as Record<string, string>).catch((e) => {
      setIsAdvancedView(isAdvancedView);
      shouldSetToLocalStorage(false);
      setGlobalToastMessage(e.message);
    });
  };

  const isOpen = selectingFilter === SORT_ID;
  const isPlural = resultsCount > 1;

  const isGroupedProducts =
    !isAdvancedView &&
    siteCatalogProducts?.siteCatalogProductsResultList[0]?.type ===
      SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem;

  const copyKey = isGroupedProducts
    ? `catalog.filters.curationResult${isPlural ? 's' : ''}`
    : `catalog.filters.listResult${isPlural ? 's' : ''}`;
  const resultCopy = isGroupedProducts
    ? ui(copyKey, {
        current: showingResult,
        total: resultsCount,
        tireSize: sizeList[0],
      })
    : ui(copyKey, { number: resultsCount, tireSize: sizeList[0] });

  return (
    <div css={styles.root}>
      <div css={styles.wrapper}>
        <div css={styles.results}>
          <h2 css={[styles.result, priceFilter && styles.decorator]}>
            {resultCopy}
          </h2>
          {isGroupedProducts && (
            <Link
              theme={THEME.LIGHT}
              css={styles.borderless}
              icon="chevron-right"
              onClick={onToggleView}
            >
              {ui('catalog.filters.viewAllResults')}
            </Link>
          )}
        </div>
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
    </div>
  );
}
//
