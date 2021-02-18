import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_TYPES, THEME, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { initialSearchCategoriesData } from './Search.data';
import styles from './Search.styles';
import { SearchResult, SearchResultEnum, SearchTypeEnum } from './Search.types';
import SearchCTA from './SearchCTA/SearchCTA';
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
  const { greaterThan } = useBreakpoints();

  useEffect(() => {
    setVisiblePastSearches(pastSearches);
  }, [pastSearches]);

  const isLarge = greaterThan.L;

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

  let siteSearchResultTextList: SiteSearchResultTextItem[] = [];
  visiblePastSearches.siteSearchResultList.forEach((siteSearchResult) => {
    if (siteSearchResult.type === SearchResultEnum.TEXT) {
      siteSearchResultTextList.push(siteSearchResult);
    }
  });
  siteSearchResultTextList = siteSearchResultTextList.slice(0, 5); // we only want the first 5 results

  return (
    <>
      <Grid css={styles.searchSectionWrapper}>
        <GridItem gridColumnL="3/13" css={isLarge && styles.searchCTA}>
          <SearchCTA
            type={SearchTypeEnum.FUNNEL}
            label={ui('search.shopTiresBy')}
            onClick={onSearchCategoryClick}
            siteSearchResultList={[
              initialSearchCategoriesData[0],
              initialSearchCategoriesData[1],
            ]}
          />
          <SearchCTA
            type={SearchTypeEnum.FILTER}
            label={ui('search.filterBy')}
            onClick={onSearchCategoryClick}
            siteSearchResultList={[
              initialSearchCategoriesData[2],
              initialSearchCategoriesData[3],
            ]}
          />
        </GridItem>
      </Grid>
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
