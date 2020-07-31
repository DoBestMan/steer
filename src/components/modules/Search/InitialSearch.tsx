import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Link from '~/components/global/Link/Link';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { LINK_TYPES, THEME, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { initialSearchCategories } from './Search.data';
import styles from './Search.styles';
import { SearchResult, SearchResultEnum } from './Search.types';
import SearchSection from './SearchSection/SearchSection';

interface Props {
  onClearPastSearchesClick: () => void;
  onPastSearchClick: (value: SearchResult) => void;
  onSearchCategoryClick: (searchResult: SiteSearchResultTextItem) => void;
  pastSearches: SiteSearchResultGroup;
  shouldShowPastSearches: boolean;
}

function InitialSearch({
  onClearPastSearchesClick,
  onPastSearchClick,
  onSearchCategoryClick,
  pastSearches,
  shouldShowPastSearches,
}: Props) {
  const [visiblePastSearches, setVisiblePastSearches] = useState(pastSearches);

  useEffect(() => {
    setVisiblePastSearches(pastSearches);
  }, [pastSearches]);

  const pastSearchesEyebrow = (
    <div css={styles.clearPastSearchesWrapper}>
      <span>{ui('search.pastSearches')}</span>
      <span css={styles.pastSearchBullet}>&bull;</span>
      <Link
        as={LINK_TYPES.BUTTON}
        css={styles.clearPastSearchesButton}
        onClick={onClearPastSearchesClick}
        theme={THEME.LIGHT}
      >
        {ui('search.clearPastSearchesButtonLabel')}
      </Link>
    </div>
  );

  const siteSearchResultTextList: SiteSearchResultTextItem[] = [];
  visiblePastSearches.siteSearchResultList.forEach((siteSearchResult) => {
    if (siteSearchResult.type === SearchResultEnum.TEXT) {
      siteSearchResultTextList.push(siteSearchResult);
    }
  });

  return (
    <>
      <div css={styles.searchSectionWrapper}>
        <SearchSection
          label={ui('search.searchBy')}
          onClick={onSearchCategoryClick}
          siteSearchResultList={initialSearchCategories}
        />
      </div>
      <Transition
        appear
        mountOnEnter
        unmountOnExit
        in={shouldShowPastSearches}
        timeout={TIME.MS300}
      >
        {(searchTransitionState: TransitionStatus) => {
          const animationStyles = [
            styles.searchSectionWrapper,
            styles[`searchSectionWrapper_${searchTransitionState}`],
          ];

          return (
            <div css={animationStyles}>
              <SearchSection
                label={pastSearchesEyebrow}
                onClick={onPastSearchClick}
                siteSearchResultList={siteSearchResultTextList}
              />
            </div>
          );
        }}
      </Transition>
    </>
  );
}

export default InitialSearch;
