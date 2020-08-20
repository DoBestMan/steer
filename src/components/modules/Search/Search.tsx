import { useRouter } from 'next/router';
import { RefObject, useCallback, useEffect } from 'react';

import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { SearchDataParams } from '~/lib/api/search';
import { CATALOG_ROUTES_REGEX, TIME } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { scrollTo } from '~/lib/helpers/scroll';
import debounce from '~/lib/utils/debounce';
import { isInRouteRegexList, isSamePath } from '~/lib/utils/routes';

import InitialSearch from './InitialSearch';
import { useInputQuery } from './Search.hooks';
import styles from './Search.styles';
import {
  Results,
  SearchActionType,
  SearchInputEnum,
  SearchResult,
  SearchStateEnum,
  SearchStateQueryType,
} from './Search.types';
import SearchAutocomplete from './SearchAutocomplete/SearchAutocomplete';
import SearchSupport from './SearchSupport';

export interface InputQuery {
  queryText: string;
  queryType: string;
}

interface Props {
  addPastSearch: (
    item: SiteSearchResultTextItem | SiteSearchResultImageItem,
  ) => void;
  clearSearchResults: () => void;
  customerServiceNumber: { display: string; value: string };
  deletePastSearches: () => void;
  forwardedRef?: RefObject<HTMLDivElement>;
  hasLockedSearchState: boolean;
  hasSearchResultsError: boolean;
  isLoadingResults: boolean;
  onCloseSearchClick: () => void;
  onSearchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  onSetSearchState: (searchState: string) => void;
  pastSearches: SiteSearchResultGroup;
  results: Results;
  searchState: string;
  shouldPreventLinkNavigation: boolean;
}

const CONSTANTS = {
  DEBOUNCE_DELAY: 400,
};

function Search({
  addPastSearch,
  clearSearchResults,
  customerServiceNumber,
  deletePastSearches,
  forwardedRef,
  hasLockedSearchState,
  hasSearchResultsError,
  isLoadingResults,
  onCloseSearchClick,
  onSearchQuery,
  onSetSearchState,
  pastSearches,
  results,
  searchState,
  shouldPreventLinkNavigation,
}: Props) {
  const router = useRouter();

  const delayedSearch = useCallback(
    debounce(({ queryText, queryType }) => {
      onSearchQuery({ queryText, queryType });
    }, CONSTANTS.DEBOUNCE_DELAY),
    [],
  );
  const { selectVehicle } = useUserPersonalizationContext();
  const {
    activeInputType,
    getCurrentInputQuery,
    primaryQuery,
    secondaryQuery,
    setActiveInputType,
    setCurrentInputQuery,
    setInputQuery,
    setPrimaryQuery,
    setSecondaryQuery,
  } = useInputQuery();

  const { resultMetadata, siteSearchResultGroupList } = results;

  useEffect(() => {
    forwardedRef?.current?.scrollTo(0, 0);
  }, [forwardedRef, siteSearchResultGroupList]);

  const handleClearPastSearchesClick = () => {
    deletePastSearches();

    setTimeout(() => {
      scrollTo(0, TIME.MS400 / 1000);
    }, TIME.MS200);
  };

  const onInputChange = (input: string) => {
    const { queryType } = getCurrentInputQuery();
    let currentInputQueryType = queryType;

    // Reset queryType if input is empty
    if (input.length === 0) {
      if (searchState === SearchStateEnum.REAR_TIRE) {
        currentInputQueryType =
          activeInputType === SearchInputEnum.PRIMARY
            ? SearchStateQueryType[SearchStateEnum.FRONT_TIRE]
            : SearchStateQueryType[SearchStateEnum.REAR_TIRE];
      } else if (searchState) {
        currentInputQueryType = SearchStateQueryType[searchState];
      } else {
        currentInputQueryType = '';
      }
    }

    setCurrentInputQuery({
      queryText: input,
      queryType: currentInputQueryType,
    });

    if ((queryType && searchState) || input) {
      delayedSearch({ queryText: input, queryType: currentInputQueryType });
    } else {
      // No need to hit the API when there's no queryType or queryText
      // Delay it so that the timing aligns with delayedSearch
      setTimeout(() => {
        clearSearchResults();
      }, CONSTANTS.DEBOUNCE_DELAY);
    }
  };

  const onCancelSelection = () => {
    const { queryText, queryType } = getCurrentInputQuery();

    const resetQuery = {
      queryText: '',
      queryType: '',
    };

    if (hasLockedSearchState) {
      if (queryText) {
        onSearchQuery({ queryText: '', queryType });
      }
      setCurrentInputQuery(resetQuery);
      return;
    }

    clearSearchResults();
    onSetSearchState('');
    setCurrentInputQuery(resetQuery);
  };

  const onToggleRearTire = (isShowing: boolean) => {
    if (isShowing) {
      onSetSearchState(SearchStateEnum.REAR_TIRE);

      // Switch from tireSize to frontTireSize when rear tire input is visible
      setPrimaryQuery({
        ...primaryQuery,
        queryType: SearchStateEnum.FRONT_TIRE,
      });

      onSearchQuery({
        queryText: primaryQuery.queryText,
        queryType: SearchStateEnum.FRONT_TIRE,
      });
    } else {
      onSetSearchState(SearchStateEnum.TIRE_SIZE);
      setActiveInputType(SearchInputEnum.PRIMARY);
      setPrimaryQuery({
        ...primaryQuery,
        queryType: SearchStateEnum.TIRE_SIZE,
      });
      setSecondaryQuery({ ...secondaryQuery, queryText: '' });

      onSearchQuery({
        queryText: primaryQuery.queryText,
        queryType: SearchStateEnum.TIRE_SIZE,
      });
    }
  };

  const handleValueSelection = (searchResult: SearchResult) => {
    const { action } = searchResult;

    if (action.type === SearchActionType.QUERY) {
      const isInitialRearTireState =
        !action.queryText &&
        !!action.additionalQueryText &&
        action.queryType === SearchStateEnum.REAR_TIRE;
      const isCurrentRearTireSearch =
        action.queryType === SearchStateEnum.REAR_TIRE ||
        action.queryType === SearchStateEnum.REAR_TIRE_WIDTH;

      let additionalQueryText = isCurrentRearTireSearch
        ? action.additionalQueryText
        : '';

      if (isInitialRearTireState) {
        setPrimaryQuery({
          ...primaryQuery,
          queryText: action.additionalQueryText || '',
        });
        additionalQueryText = action.additionalQueryText || '';
      } else {
        setCurrentInputQuery({
          queryType: action.queryType,
          queryText: action.queryText,
        });
      }

      onSearchQuery({
        additionalQueryText: additionalQueryText || '',
        queryText: action.queryText,
        queryType: action.queryType,
      });
    } else if (action.type === SearchActionType.LINK) {
      if (action.vehicleMetadata) {
        selectVehicle(action.vehicleMetadata);
      }

      addPastSearch(searchResult);

      if (shouldPreventLinkNavigation) {
        onCloseSearchClick();
      }

      // If user clicks on the same search query, just close the modal
      const isNewSearchQuery = !isSamePath(action.link.href, router.asPath);
      if (isNewSearchQuery) {
        const isCatalogSearchQuery = isInRouteRegexList(
          action.link.href,
          CATALOG_ROUTES_REGEX,
        );
        if (isCatalogSearchQuery) {
          // Resets the catalog when creating a new search from a catalog page
          eventEmitters.newCatalogSearchQuery.emit({ comesFromSearch: true });
        }
      } else {
        onCloseSearchClick();
      }
    }
  };

  const handleSearchCategoryClick = (searchResult: SearchResult) => {
    const { action } = searchResult;

    const category =
      action.type === SearchActionType.QUERY ? action.queryType : '';
    onSetSearchState(category);

    if (action.type === SearchActionType.QUERY) {
      setCurrentInputQuery({
        queryText: action.queryText,
        queryType: action.queryType,
      });

      onSearchQuery({
        queryText: action.queryText,
        queryType: action.queryType,
      });
    }
  };

  const handleSupportClick = () => {};

  const handleInputFocus = (inputType: SearchInputEnum) => {
    setActiveInputType(inputType);

    // Only make an additional search query in front/rear tire state
    if (
      searchState === SearchStateEnum.REAR_TIRE &&
      inputType !== activeInputType
    ) {
      const query =
        inputType === SearchInputEnum.PRIMARY
          ? {
              additionalQueryText: secondaryQuery.queryText,
              queryText: primaryQuery.queryText,
              queryType: primaryQuery.queryType,
            }
          : {
              additionalQueryText: primaryQuery.queryText,
              queryText: secondaryQuery.queryText,
              queryType: secondaryQuery.queryType,
            };

      onSearchQuery(query);
    }
  };

  const { queryText } = getCurrentInputQuery();
  const isInputEmpty = queryText.length < 1;
  const hasResults = siteSearchResultGroupList?.length > 0;
  const shouldShowSearchSupport =
    resultMetadata?.noExactMatch && !hasResults && !isInputEmpty;
  const shouldShowInitialSearch =
    (shouldShowSearchSupport || isInputEmpty) &&
    !searchState &&
    !hasSearchResultsError;
  const shouldShowError = hasSearchResultsError && !isInputEmpty;
  const shouldShowPastSearches =
    pastSearches.siteSearchResultList.length > 0 && !shouldShowSearchSupport;

  return (
    <div css={styles.container} ref={forwardedRef}>
      <SearchAutocomplete
        activeInputType={activeInputType}
        focusOnMount
        hasSearchResultsError={shouldShowError}
        isLoadingResults={isLoadingResults}
        noExactMatch={resultMetadata?.noExactMatch}
        onCancelSelection={onCancelSelection}
        onInputChange={onInputChange}
        onCloseSearchClick={onCloseSearchClick}
        onInputFocus={handleInputFocus}
        onSetInputQuery={setInputQuery}
        onToggleRearTire={onToggleRearTire}
        onValueSelection={handleValueSelection}
        results={siteSearchResultGroupList}
        queryText={primaryQuery.queryText}
        searchState={searchState}
        secondaryQueryText={secondaryQuery.queryText}
      />
      {shouldShowInitialSearch && (
        <InitialSearch
          onClearPastSearchesClick={handleClearPastSearchesClick}
          onPastSearchClick={handleValueSelection}
          onSearchCategoryClick={handleSearchCategoryClick}
          pastSearches={pastSearches}
          shouldShowPastSearches={shouldShowPastSearches}
        />
      )}
      {shouldShowSearchSupport && (
        <SearchSupport
          customerServiceNumber={customerServiceNumber}
          onClick={handleSupportClick}
        />
      )}
    </div>
  );
}

export default Search;
