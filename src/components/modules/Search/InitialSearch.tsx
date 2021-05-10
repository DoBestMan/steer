import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import NotificationList from '~/components/global/NotificationBanner/NotificationList';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSiteNotificationsContext } from '~/context/SiteNotifications.context';
import { SiteNotificationTypes } from '~/data/models/SiteNotificationTypes';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { LINK_TYPES, THEME, TIME } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { ui } from '~/lib/utils/ui-dictionary';

import { initialSearchCategoriesData } from './Search.data';
import { useAutocompleteSelectedItem } from './Search.hooks';
import styles from './Search.styles';
import { SearchResult, SearchResultEnum, SearchTypeEnum } from './Search.types';
import SearchCTA from './SearchCTA/SearchCTA';
import SearchResults from './SearchResults/SearchResults';
import SearchSection from './SearchSection/SearchSection';

interface Props {
  isLoadingResults?: boolean;
  onClearPastSearchesClick: () => void;
  onPastSearchClick: (value: SearchResult) => void;
  onSearchCategoryClick: (searchResult: SiteSearchResultTextItem) => void;
  onValueSelection: (value: SearchResult) => void;
  pastSearches: SiteSearchResultGroup;
  queryText: string;
  results: SiteSearchResultGroup[];
  searchState: string;
  shouldShowPastSearches: boolean;
}

function InitialSearch({
  onClearPastSearchesClick,
  onPastSearchClick,
  onSearchCategoryClick,
  onValueSelection,
  isLoadingResults,
  pastSearches,
  searchState,
  shouldShowPastSearches,
  queryText,
  results,
}: Props) {
  const [visiblePastSearches, setVisiblePastSearches] = useState(pastSearches);
  const [shouldShowListbox, setShouldShowListbox] = useState(false);
  const [shouldShowLoading, setShouldShowLoading] = useState(true);
  const loadingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { greaterThan } = useBreakpoints();

  const {
    routeQueryParamOptions,
    queryParamLabel,
    clearSearchResults,
    searchQuery,
  } = useSearchContext();
  const {
    addNotification,
    handleNotificationClick,
  } = useSiteNotificationsContext();
  const {
    selectedItemIndex,
    setSelectedItemIndex,
  } = useAutocompleteSelectedItem(results);

  useEffect(() => {
    setVisiblePastSearches(pastSearches);
  }, [pastSearches]);

  useEffect(() => {
    if (!searchState) {
      const { params } = routeQueryParamOptions || {};
      if (params?.brand) {
        searchQuery({ queryText: params.brand, queryType: 'brand' });
      }
    }
  }, [searchState, routeQueryParamOptions, searchQuery]);

  useEffect(() => {
    setShouldShowListbox(
      results.length > 0 && !searchState && !shouldShowLoading,
    );
  }, [results, searchState, shouldShowLoading]);

  useEffect(() => {
    if (!loadingTimeout.current) {
      loadingTimeout.current = setTimeout(() => {
        setShouldShowLoading(true);
      }, TIME.MS800);
    }

    if (!isLoadingResults) {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
        loadingTimeout.current = null;
      }
      setShouldShowLoading(false);
    }
  }, [isLoadingResults]);

  useEffect(() => {
    const isFilterNotificationAdded = window.localStorage.getItem(
      LOCAL_STORAGE[PROPERTIES.ADD_FILTER_NOTIFICATION],
    );
    if (!isFilterNotificationAdded && queryParamLabel) {
      addNotification({
        handleNotificationClick: () => {},
        icon: {
          svgId: 'notification',
          type: ICON_IMAGE_TYPE.ICON,
        },
        id: new Date().getTime().toString(),
        subtext: 'Enter your vehicle or tire size to continue',
        suppressFromHomePage: false,
        theme: THEME.ORANGE,
        title: 'Filter applied',
        type: SiteNotificationTypes.Filter,
      });
      window.localStorage.setItem(
        LOCAL_STORAGE[PROPERTIES.ADD_FILTER_NOTIFICATION],
        new Boolean(true).toString(),
      );
    }
  }, [queryParamLabel, addNotification]);

  const handleValueSelection = useCallback(
    (searchResult: SearchResult) => {
      onValueSelection(searchResult);
      setSelectedItemIndex([0, -1]);
    },
    [onValueSelection, setSelectedItemIndex],
  );

  const handleClickCTA = (searchResult: SiteSearchResultTextItem) => {
    handleNotificationClick();
    clearSearchResults();
    onSearchCategoryClick(searchResult);
  };

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
          <div css={styles.notificationList}>
            <NotificationList types={[SiteNotificationTypes.Filter]} />
          </div>
        </GridItem>
        <GridItem gridColumnL="3/13" css={isLarge && styles.searchCTA}>
          <SearchCTA
            type={SearchTypeEnum.FUNNEL}
            label={ui('search.shopTiresBy')}
            onClick={handleClickCTA}
            siteSearchResultList={[
              initialSearchCategoriesData[0],
              initialSearchCategoriesData[1],
            ]}
          />
          {!queryParamLabel && (
            <SearchCTA
              type={SearchTypeEnum.FILTER}
              label={ui('search.filterBy')}
              onClick={handleClickCTA}
              siteSearchResultList={[
                initialSearchCategoriesData[2],
                initialSearchCategoriesData[3],
              ]}
            />
          )}
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

      {!searchState && (
        <SearchResults
          handleValueSelection={handleValueSelection}
          hasActiveSearchState={false}
          queryText={queryText}
          results={results}
          selectedItemIndex={selectedItemIndex}
          shouldShowListbox={shouldShowListbox}
        />
      )}
    </>
  );
}

export default InitialSearch;
