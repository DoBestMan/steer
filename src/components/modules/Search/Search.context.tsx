import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

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
import { createContext } from '~/lib/utils/context';

import {
  emptyResult,
  emptySiteSearchResultGroup,
  initialSearchVehicle,
} from './Search.data';

interface Props {
  children: ReactNode;
}

export interface SearchContextProps {
  addPastSearch: (
    item: SiteSearchResultTextItem | SiteSearchResultImageItem,
  ) => void;
  clearSearchResults: () => void;
  deletePastSearches: () => void;
  getPastSearches: () => void;
  hasLockedSearchState: boolean;
  hasSearchResultsError: boolean;
  isLoadingResults: boolean;
  isSearchOpen: boolean;
  lockSearchStateToVehicle: () => void;
  pastSearches: SiteSearchResultGroup;
  searchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  searchResults: Results;
  searchState: string;
  setHasLockedSearchState: (hasLockedSearchState: boolean) => void;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  setSearchState: (searchState: string) => void;
  setShouldPreventLinkNavigation: (value: boolean) => void;
  shouldPreventLinkNavigation: boolean;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchContext = createContext<SearchContextProps>();

function useContextSetup() {
  /* Past Searches */
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

  /* Search results and query */
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
      } catch (err) {
        console.error(err);
        setHasSearchResultsError(true);
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleIsSearchOpen = (callback?: () => void) => {
    setIsSearchOpen(!isSearchOpen);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  /* Search state */
  const [searchState, setSearchState] = useState('');
  const [hasLockedSearchState, setHasLockedSearchState] = useState(false);
  const [
    shouldPreventLinkNavigation,
    setShouldPreventLinkNavigation,
  ] = useState(false);

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

  return {
    addPastSearch,
    clearSearchResults,
    deletePastSearches,
    getPastSearches,
    hasLockedSearchState,
    hasSearchResultsError,
    isLoadingResults,
    isSearchOpen,
    lockSearchStateToVehicle,
    pastSearches,
    searchQuery,
    searchResults,
    searchState,
    setHasLockedSearchState,
    setIsSearchOpen,
    setSearchState,
    setShouldPreventLinkNavigation,
    shouldPreventLinkNavigation,
    toggleIsSearchOpen,
  };
}

export function SearchContextProvider({ children }: Props) {
  const value = useContextSetup();

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export const useSearchContext = SearchContext.useContext;
