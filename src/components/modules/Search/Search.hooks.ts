import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Results,
  SearchStateEnum,
} from '~/components/modules/Search/Search.types';
import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { fromUserHistorySearchToSiteSearchResultGroup } from '~/data/models/UserHistorySearch';
import { fromSiteSearchResultTextItemToUserHistorySearchItem } from '~/data/models/UserHistorySearchItem';
import { apiGetSearchTypeahead, SearchDataParams } from '~/lib/api/search';
import {
  apiAddUserSearchHistory,
  apiDeleteUserSearchHistory,
  apiGetUserSearchHistory,
} from '~/lib/api/users';
import { FetchErrorCodes } from '~/lib/fetch/FetchError';
import { scrollIntoViewIfNeeded } from '~/lib/utils/accessibility';

import {
  emptyResult,
  emptySiteSearchResultGroup,
  initialSearchBrand,
  initialSearchTireSize,
  initialSearchVehicle,
} from './Search.data';

const DEFAULT_CLEARANCE = {
  bottom: 0,
  top: 145, // height of search input bar
};

/**
 * This hook takes care of the selection logic for selecting search
 * results via keyboard.
 */
export function useAutocompleteSelectedItem(results: SiteSearchResultGroup[]) {
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

export function usePastSearches() {
  const [pastSearches, setPastSearches] = useState<SiteSearchResultGroup>(
    emptySiteSearchResultGroup,
  );
  const getPastSearches = useCallback(async function () {
    try {
      const apiPastSearches = await apiGetUserSearchHistory();

      const transformedResults = fromUserHistorySearchToSiteSearchResultGroup(
        apiPastSearches,
      );

      setPastSearches(transformedResults);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const deletePastSearches = useCallback(async function () {
    try {
      await apiDeleteUserSearchHistory();

      setPastSearches(emptySiteSearchResultGroup);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addPastSearch = useCallback(async function (
    item: SiteSearchResultTextItem | SiteSearchResultImageItem,
  ) {
    const pastSearchItem = fromSiteSearchResultTextItemToUserHistorySearchItem(
      item,
    );

    if (pastSearchItem) {
      try {
        await apiAddUserSearchHistory(pastSearchItem);
      } catch (err) {
        console.error(err);
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

export function useSearchResults() {
  const [searchResults, setSearchResults] = useState<Results>(emptyResult);
  const isRequestInProgress = useRef(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [hasSearchResultsError, setHasSearchResultsError] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    abortController.current = new AbortController();
  }, []);

  const searchQuery = useCallback(
    async function ({
      additionalQueryText,
      queryText,
      queryType,
    }: SearchDataParams) {
      if (isRequestInProgress.current) {
        abortController.current?.abort();
        abortController.current = new AbortController();
        isRequestInProgress.current = false;
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
      setSearchResults(emptyResult);
    },
    [setSearchResults],
  );

  return {
    clearSearchResults,
    hasSearchResultsError,
    isLoadingResults,
    searchQuery,
    searchResults,
  };
}

export function useSearchState({
  searchQuery,
}: {
  searchQuery: ({ queryText, queryType }: SearchDataParams) => void;
}) {
  const [searchState, setSearchState] = useState('');
  const [hasLockedSearchState, setHasLockedSearchState] = useState(false);

  const lockSearchStateToVehicle = () => {
    const {
      queryText,
      queryType,
    } = initialSearchVehicle.action as SiteSearchResultActionQuery;
    setSearchState(SearchStateEnum.VEHICLE);
    searchQuery({
      queryText,
      queryType,
    });
    setHasLockedSearchState(true);
  };

  const lockSearchStateToTireSize = () => {
    const {
      queryText,
      queryType,
    } = initialSearchTireSize.action as SiteSearchResultActionQuery;
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
    } = initialSearchBrand.action as SiteSearchResultActionQuery;
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
