import { useState } from 'react';

import Dropdown from '~/components/global/Dropdown/Dropdown';
import FilterSort from '~/components/global/FilterSort/FilterSort';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import {
  SiteCatalogSortListItem,
  SiteCatalogSortListItemStateEnum,
} from '~/data/models/SiteCatalogSortListItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './RatingsTableSort.styles';

interface Props {
  onSortResults?: (value: Record<string, string>) => () => void;
  resultsCount: number;
  sortList: SiteCatalogSortListItem[];
}

export default function RatingsTableSort({
  onSortResults,
  resultsCount,
  sortList,
}: Props) {
  const currentSortItem =
    sortList.find(
      (item) => item.state === SiteCatalogSortListItemStateEnum.Selected,
    ) || sortList[0];

  const [isOpen, setIsOpen] = useState(false);
  const [activeSort, setActiveSort] = useState(currentSortItem.value);

  const { greaterThan } = useBreakpoints();
  const isLarge = greaterThan.M;

  const openFilterDropdown = () => {
    setIsOpen(true);
  };

  const closeFilterDropdown = () => {
    setIsOpen(false);
  };

  const sortData = (value: Record<string, string>) => () => {
    onSortResults && onSortResults(value)();
    setActiveSort(value);
    closeFilterDropdown();
  };

  const copyKey = resultsCount === 1 ? 'reviews.result' : 'reviews.results';
  const resultCopy = ui(copyKey, { number: resultsCount });

  return (
    <Grid>
      <GridItem css={styles.root}>
        <p css={styles.results}>{resultCopy}</p>
        {sortList && (
          <>
            <p css={styles.sortLabel}>{ui('catalog.filters.sortBy')} </p>
            <Link
              className="dropdown-button"
              theme={THEME.LIGHT}
              as="button"
              onClick={openFilterDropdown}
              aria-expanded={isOpen}
              css={[styles.button, isOpen && styles.disableEvents]}
            >
              {currentSortItem.title}
            </Link>
            <Dropdown
              contentLabel={ui('catalog.filters.sortBy')}
              isOpen={isOpen}
              insideCarousel
              onClose={closeFilterDropdown}
            >
              <FilterSort
                items={sortList}
                isLarge={isLarge}
                filtersToApply={activeSort}
                onUpdate={sortData}
              />
            </Dropdown>
          </>
        )}
      </GridItem>
    </Grid>
  );
}
