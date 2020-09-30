import Link from '~/components/global/Link/Link';
import Toggle from '~/components/global/Toggle/Toggle';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import {
  SiteCatalogSortListItem,
  SiteCatalogSortListItemStateEnum,
} from '~/data/models/SiteCatalogSortListItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, THEME } from '~/lib/constants';
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
    createUpdateFilterGroup,
  } = useFiltersContext();

  const { bk } = useBreakpoints();
  const { setGlobalToastMessage } = useGlobalToastContext();

  const sortItem = sortList.find(
    (item) => item.state === SiteCatalogSortListItemStateEnum.Selected,
  );

  const {
    handleUpdateResults,
    setIsAdvancedView,
    isAdvancedView,
  } = useCatalogProductsContext();

  const onToggleView = async () => {
    const newParams = isAdvancedView ? {} : { skipGroups: 'true' };
    setIsAdvancedView(!isAdvancedView);
    handleUpdateResults(newParams as Record<string, string>).catch((e) => {
      setIsAdvancedView(isAdvancedView);
      setGlobalToastMessage(e.message);
    });
  };

  const isOpen = selectingFilter === SORT_ID;

  const copyKey =
    resultsCount === 1 ? 'catalog.filters.result' : 'catalog.filters.results';
  const resultCopy = ui(copyKey, { number: resultsCount });

  const toggleTitle =
    bk === BREAKPOINT_SIZES.S
      ? 'catalog.header.showTechSpecsOnS'
      : 'catalog.header.showTechSpecsOnM';

  return (
    <div css={styles.root}>
      <p css={[styles.results, priceFilter && styles.decorator]}>
        {resultCopy}
      </p>
      <div css={styles.toggle}>
        <span css={[styles.label]}>{ui(toggleTitle)}</span>
        <Toggle
          testId="advanced-view-toggle"
          name={ui(toggleTitle)}
          onToggle={onToggleView}
          defaultChecked={isAdvancedView}
        />
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
  );
}
//
