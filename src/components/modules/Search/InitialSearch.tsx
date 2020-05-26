import { useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { LINK_THEME, LINK_TYPES, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { SearchResult } from './Search';
import { initialSearchCategories } from './Search.mocks';
import styles from './Search.styles';
import SearchSection from './SearchSection';

interface Props {
  onClearSearchesClick: () => void;
  onPastSearchClick: () => void;
  onSearchCategoryClick: (searchResult: SearchResult) => void;
  pastSearches: SearchResult[];
}

function InitialSearch({
  onClearSearchesClick,
  onPastSearchClick,
  onSearchCategoryClick,
  pastSearches,
}: Props) {
  const [visiblePastSearches] = useState(pastSearches);

  const pastSearchesEyebrow = (
    <div css={styles.clearPastSearchesWrapper}>
      <span>{ui('search.pastSearches')}</span>
      <span css={styles.pastSearchBullet}>&bull;</span>
      <Link
        as={LINK_TYPES.BUTTON}
        css={[typography.smallCopy, styles.clearPastSearchesButton]}
        onClick={onClearSearchesClick}
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
          onClick={onSearchCategoryClick}
          searchResults={initialSearchCategories}
        />
      </GridItem>
      <Transition
        appear
        mountOnEnter
        unmountOnExit
        in={pastSearches.length > 0}
        timeout={TIME.MS300}
      >
        {(searchTransitionState: TransitionStatus) => {
          const animationStyles = [
            styles.initialSearchGridItem,
            styles[`initialSearchGridItem_${searchTransitionState}`],
          ];

          return (
            <GridItem
              css={animationStyles}
              gridColumnS="2/6"
              gridColumnM="2/8"
              gridColumnL="3/14"
              gridColumnXL="3/14"
            >
              <SearchSection
                label={pastSearchesEyebrow}
                onClick={onPastSearchClick}
                searchResults={visiblePastSearches}
              />
            </GridItem>
          );
        }}
      </Transition>
    </>
  );
}

export default InitialSearch;
