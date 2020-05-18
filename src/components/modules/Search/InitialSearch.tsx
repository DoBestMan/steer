import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { LINK_SIZE, LINK_THEME, LINK_TYPES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { SearchResult } from './Search';
import { initialSearchCategories } from './Search.mocks';
import styles from './Search.styles';
import SearchSection from './SearchSection';

interface Props {
  onClearSearchesClick: () => void;
  onSearchClick: () => void;
  pastSearches: SearchResult[];
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
          label={ui('search.searchBy')}
          onClick={onSearchClick}
          searchResults={initialSearchCategories}
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
            label={pastSearchesEyebrow}
            onClick={onSearchClick}
            searchResults={pastSearches}
          />
        </GridItem>
      )}
    </>
  );
}

export default InitialSearch;
