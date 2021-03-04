import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Results,
  SearchInputEnum,
  SearchStateEnum,
} from '~/components/modules/Search/Search.types';
import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { fromUserHistorySearchToSiteSearchResultGroup } from '~/data/models/UserHistorySearch';
import { fromSiteSearchResultTextItemToUserHistorySearchItem } from '~/data/models/UserHistorySearchItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { apiBootstrap } from '~/lib/api/bootstrap';
import { apiGetSearchTypeahead, SearchDataParams } from '~/lib/api/search';
import {
  apiAddUserSearchHistory,
  apiDeleteUserSearchHistory,
  apiGetUserSearchHistory,
} from '~/lib/api/users';
import { COLORS } from '~/lib/constants';
import { FetchErrorCodes } from '~/lib/fetch/FetchError';
import GA from '~/lib/helpers/analytics';
import { scrollIntoViewIfNeeded } from '~/lib/utils/accessibility';

import { InputQuery } from './Search';
import {
  emptyResultData,
  emptySiteSearchResultGroupData,
  initialSearchBrandData,
  initialSearchTireSizeData,
  initialSearchVehicleData,
} from './Search.data';
import { SearchResult } from './Search.types';

const DEFAULT_CLEARANCE = {
  bottom: 0,
  top: 145, // height of search input bar
};

/**
 * This hook takes care of the selection logic for selecting search
 * results via keyboard when the input is focused.
 */
export function useAutocompleteSelectedItem(results: SiteSearchResultGroup[]) {
  // The first item in the array is a SiteSearchResultList
  // The second item is the SiteSerachResultTextItem
  const [selectedItemIndex, setSelectedItemIndex] = useState<[number, number]>([
    0,
    -1,
  ]);

  const selectNextItemIndex = () => {
    if (results.length === 0) {
      return;
    }

    let newSelectedItemIndex = selectedItemIndex;
    const [currentResultIndex, currentResultItemIndex] = selectedItemIndex;
    const isLastResult = currentResultIndex === results.length - 1;
    const isLastItem =
      currentResultItemIndex ===
      results[currentResultIndex].siteSearchResultList.length - 1;

    if (isLastItem && !isLastResult) {
      newSelectedItemIndex = [currentResultIndex + 1, 0];
    } else if (!isLastItem) {
      newSelectedItemIndex = [currentResultIndex, currentResultItemIndex + 1];
    }

    setSelectedItemIndex(newSelectedItemIndex);
  };

  const selectPrevItemIndex = () => {
    if (results.length === 0) {
      return;
    }

    let newSelectedItemIndex = selectedItemIndex;
    const [currentResultIndex, currentResultItemIndex] = selectedItemIndex;
    const isFirstResult = currentResultIndex === 0;
    const isFirstItem = currentResultItemIndex === 0;

    if (isFirstItem && !isFirstResult) {
      newSelectedItemIndex = [
        currentResultIndex - 1,
        results[currentResultIndex - 1].siteSearchResultList.length - 1,
      ];
    } else if (!isFirstItem) {
      newSelectedItemIndex = [currentResultIndex, currentResultItemIndex - 1];
    }

    setSelectedItemIndex(newSelectedItemIndex);
  };

  return {
    selectNextItemIndex,
    selectPrevItemIndex,
    selectedItemIndex,
    setSelectedItemIndex,
  };
}

/**
 * Provides methods that will force the search modal to scroll
 * to a focused element that is hidden or offscreen.
 */
export function useFocusScrollIntoView({
  clearance = DEFAULT_CLEARANCE,
}: {
  clearance?: { bottom: number; top: number };
}) {
  const itemRefs = useRef<HTMLLIElement[] & HTMLDivElement[]>([]);
  const pushRefToArray = (index: number) => (
    ref: HTMLLIElement & HTMLDivElement,
  ) => {
    itemRefs.current[index] = ref;
  };

  const onFocus = (index: number) => () => {
    if (itemRefs.current[index]) {
      scrollIntoViewIfNeeded(itemRefs.current[index], clearance);
    }
  };

  return {
    onFocus,
    pushRefToArray,
  };
}

/**
 * Provides API methods and results for past searches feature.
 */
export function usePastSearches() {
  const [pastSearches, setPastSearches] = useState<SiteSearchResultGroup>(
    emptySiteSearchResultGroupData,
  );
  const getPastSearches = useCallback(async function () {
    // awaiting session token before calling apiGetUserSearchHistory which needs authentication
    await apiBootstrap();
    const res = await apiGetUserSearchHistory();
    if (res.isSuccess) {
      const transformedResults = fromUserHistorySearchToSiteSearchResultGroup(
        res.data,
      );

      setPastSearches(transformedResults);
      return;
    }

    console.error(res.error.message);
  }, []);

  const deletePastSearches = useCallback(async function () {
    const res = await apiDeleteUserSearchHistory();

    setPastSearches(emptySiteSearchResultGroupData);
    if (!res.isSuccess) {
      console.error(res.error.message);
    }
  }, []);

  const addPastSearch = useCallback(async function (
    item: SiteSearchResultTextItem | SiteSearchResultImageItem,
  ) {
    const pastSearchItem = fromSiteSearchResultTextItemToUserHistorySearchItem(
      item,
    );

    if (pastSearchItem) {
      const res = await apiAddUserSearchHistory(pastSearchItem);

      if (!res.isSuccess) {
        console.error(res.error.message);
      }
    }
  },
  []);

  return {
    addPastSearch,
    deletePastSearches,
    getPastSearches,
    pastSearches,
  };
}

/**
 * Provides API methods, results, and related info for search queries.
 */
export function useSearchResults() {
  const [searchResults, setSearchResults] = useState<Results>(emptyResultData);
  const isRequestInProgress = useRef(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [hasSearchResultsError, setHasSearchResultsError] = useState(false);
  const abortController = useRef<AbortController | null>(null);
  const [searchHistory, setSearchHistory] = useState<Array<SearchResult>>([]);

  useEffect(() => {
    abortController.current = new AbortController();
  }, []);

  const abortSearchRequest = () => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    isRequestInProgress.current = false;
  };

  const searchQuery = useCallback(
    async function ({
      additionalQueryText,
      queryText,
      queryType,
    }: SearchDataParams) {
      if (isRequestInProgress.current) {
        abortSearchRequest();
      }

      setHasSearchResultsError(false);
      isRequestInProgress.current = true;
      setIsLoadingResults(true);

      try {
        const apiSearchResults = await apiGetSearchTypeahead({
          additionalQueryText,
          queryText,
          queryType,
          signal: abortController.current?.signal,
        });

        GA.addToDataLayer({
          additionalQueryText,
          event: 'isSiteSearch',
          page: document && document.location.pathname,
          queryText,
          queryType,
          resultTotal: apiSearchResults.resultMetadata.pagination?.total,
        });

        setSearchResults(apiSearchResults);
      } catch (error) {
        console.error(error);

        if (error.code !== FetchErrorCodes.AbortError) {
          setHasSearchResultsError(true);
        }
      }

      isRequestInProgress.current = false;
      setIsLoadingResults(false);
    },
    [isRequestInProgress],
  );

  const clearSearchResults = useCallback(
    function () {
      abortSearchRequest();
      setSearchResults(emptyResultData);
      setSearchHistory([]);
    },
    [setSearchResults, setSearchHistory],
  );

  const pushSearchHistory = (search: SearchResult) => {
    setSearchHistory((current) => [...current, search]);
  };

  const popSearchHistory = () => {
    if (!searchHistory.length) {
      return;
    }
    setSearchHistory((current) => {
      const temp = [...current];
      temp.pop();
      return temp;
    });

    return searchHistory[searchHistory.length - 2];
  };

  return {
    clearSearchResults,
    hasSearchResultsError,
    isLoadingResults,
    popSearchHistory,
    pushSearchHistory,
    searchQuery,
    searchResults,
  };
}

/**
 * Manages the 'Search by' state.
 * Can also "lock" a search to a particular category ("Search by: Vehicle")
 */
export function useSearchState({
  searchQuery,
}: {
  searchQuery: ({ queryText, queryType }: SearchDataParams) => void;
}) {
  const [searchState, setSearchState] = useState('');
  const [hasLockedSearchState, setHasLockedSearchState] = useState(false);
  const lockSearchStateToVehicle = (vehicleName?: string) => {
    const {
      queryText,
      queryType,
    } = initialSearchVehicleData.action as SiteSearchResultActionQuery;
    setSearchState(SearchStateEnum.VEHICLE);
    searchQuery({
      queryText: vehicleName ? vehicleName : queryText,
      queryType,
    });
    setHasLockedSearchState(true);
  };

  const lockSearchStateToTireSize = () => {
    const {
      queryText,
      queryType,
    } = initialSearchTireSizeData.action as SiteSearchResultActionQuery;
    setSearchState(SearchStateEnum.TIRE_SIZE);
    searchQuery({
      queryText,
      queryType,
    });
    setHasLockedSearchState(true);
  };

  const lockSearchStateToBrand = () => {
    const {
      queryText,
      queryType,
    } = initialSearchBrandData.action as SiteSearchResultActionQuery;
    setSearchState(SearchStateEnum.BRAND);
    searchQuery({
      queryText,
      queryType,
    });
    setHasLockedSearchState(true);
  };

  return {
    hasLockedSearchState,
    lockSearchStateToBrand,
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    searchState,
    setHasLockedSearchState,
    setSearchState,
  };
}

/**
 * Manages SearchInput values.
 * FYI: secondaryQuery only appears in front/rear tire search
 */
export function useInputQuery() {
  const [primaryQuery, setPrimaryQuery] = useState<InputQuery>({
    queryText: '',
    queryType: '',
  });
  const [secondaryQuery, setSecondaryQuery] = useState<InputQuery>({
    queryText: '',
    queryType: SearchStateEnum.REAR_TIRE,
  });
  const [activeInputType, setActiveInputType] = useState(
    SearchInputEnum.PRIMARY,
  );

  const getCurrentInputQuery = () =>
    activeInputType === SearchInputEnum.PRIMARY ? primaryQuery : secondaryQuery;

  const setCurrentInputQuery = (query: {
    queryText?: string;
    queryType?: string;
  }) => {
    if (activeInputType === SearchInputEnum.PRIMARY) {
      setPrimaryQuery({ ...primaryQuery, ...query });
    } else if (activeInputType === SearchInputEnum.SECONDARY) {
      setSecondaryQuery({ ...secondaryQuery, ...query });
    }
  };
  const setInputQuery = (inputType: SearchInputEnum, query: InputQuery) => {
    if (inputType === SearchInputEnum.PRIMARY) {
      setPrimaryQuery({ ...primaryQuery, ...query });
    } else if (inputType === SearchInputEnum.SECONDARY) {
      setSecondaryQuery({ ...secondaryQuery, ...query });
    }
  };

  return {
    activeInputType,
    getCurrentInputQuery,
    primaryQuery,
    secondaryQuery,
    setActiveInputType,
    setCurrentInputQuery,
    setInputQuery,
    setPrimaryQuery,
    setSecondaryQuery,
  };
}

export function useHeaderScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { lessThan } = useBreakpoints();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!lessThan.L || !headerRef.current) {
          return;
        } else if (entry.intersectionRatio === 0) {
          headerRef.current.style.borderColor = COLORS.DARK.GRAY_80;
        } else if (entry.intersectionRatio === 1) {
          headerRef.current.style.borderColor = 'transparent';
        }
      });
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lessThan]);

  return {
    headerRef,
    scrollRef,
  };
}
