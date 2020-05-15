import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { LINK_SIZE, LINK_THEME, LINK_TYPES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Search.styles';
import SearchSection, { SearchItem } from './SearchSection';

const SEARCH_CATEGORIES = [
  {
    id: 'vehicle',
    text: ui('search.searchCategories.vehicle'),
  },
  {
    id: 'tire-size',
    text: ui('search.searchCategories.tireSize'),
  },
  {
    id: 'brand',
    text: ui('search.searchCategories.brand'),
  },
  {
    id: 'popular-tires',
    text: ui('search.searchCategories.popularTires'),
  },
];

interface Props {
  onClearSearchesClick: () => void;
  onSearchClick: () => void;
  pastSearches: SearchItem[];
}

function InitialSearch({
  onClearSearchesClick,
  onSearchClick,
  pastSearches,
}: Props) {
  const pastSearchesEyebrow = (
    <div css={styles.clearPastSearchesWrapper}>
      <span>{ui('search.pastSearches')}</span>
      <span css={styles.pastSearchBullet}>&bull;</span>
      <Link
        as={LINK_TYPES.BUTTON}
        css={styles.clearPastSearchesButton}
        onClick={onClearSearchesClick}
        size={LINK_SIZE.SM}
        theme={LINK_THEME.LIGHT}
      >
        {ui('search.clearPastSearchesButtonLabel')}
      </Link>
    </div>
  );

  return (
    <>
      <GridItem
        css={styles.initialSearchGridItem}
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="3/14"
        gridColumnXL="3/14"
      >
        <SearchSection
          eyebrow={ui('search.searchBy')}
          onClick={onSearchClick}
          searchItems={SEARCH_CATEGORIES}
        />
      </GridItem>
      {pastSearches.length > 0 && (
        <GridItem
          css={styles.initialSearchGridItem}
          gridColumnS="2/6"
          gridColumnM="2/8"
          gridColumnL="3/14"
          gridColumnXL="3/14"
        >
          <SearchSection
            eyebrow={pastSearchesEyebrow}
            onClick={onSearchClick}
            searchItems={pastSearches}
          />
        </GridItem>
      )}
    </>
  );
}

export default InitialSearch;
