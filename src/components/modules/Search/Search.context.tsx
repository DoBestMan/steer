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
} from './Search.mocks';

interface Props {
  children: ReactNode;
}

interface SearchContextProps {
  addPastSearch: (
    item: SiteSearchResultTextItem | SiteSearchResultImageItem,
  ) => void;
  clearSearchResults: () => void;
  deletePastSearches: () => void;
  getPastSearches: () => void;
  hasLockedSearchState: boolean;
  isSearchOpen: boolean;
  lockSearchStateToVehicle: () => void;
  pastSearches: SiteSearchResultGroup;
  searchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  searchResults: Results;
  searchState: string;
  setHasLockedSearchState: (hasLockedSearchState: boolean) => void;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  setSearchState: (searchState: string) => void;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchContext = createContext<SearchContextProps>();

function useContextSetup() {
  /* Past Searches */
  const [pastSearches, setPastSearches] = useState<SiteSearchResultGroup>(
    emptySiteSearchResultGroup,
  );
  const getPastSearches = useCallback(async function () {
    const apiPastSearches = await apiGetUserSearchHistory();

    const transformedResults = fromUserHistorySearchToSiteSearchResultGroup(
      apiPastSearches,
    );

    setPastSearches(transformedResults);
  }, []);

  const deletePastSearches = useCallback(async function () {
    await apiDeleteUserSearchHistory();

    setPastSearches(emptySiteSearchResultGroup);
  }, []);

  const addPastSearch = useCallback(async function (
    item: SiteSearchResultTextItem | SiteSearchResultImageItem,
  ) {
    const pastSearchItem = fromSiteSearchResultTextItemToUserHistorySearchItem(
      item,
    );

    if (pastSearchItem) {
      await apiAddUserSearchHistory(pastSearchItem);
    }
  },
  []);

  /* Search results and query */
  const [searchResults, setSearchResults] = useState<Results>(emptyResult);
  const isLoadingResults = useRef(false);
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
      if (isLoadingResults.current) {
        abortController.current?.abort();
        abortController.current = new AbortController();
        isLoadingResults.current = false;
      }

      isLoadingResults.current = true;

      const apiSearchResults = await apiGetSearchTypeahead({
        additionalQueryText,
        queryText,
        queryType,
        signal: abortController.current?.signal,
      });

      setSearchResults(apiSearchResults);
      isLoadingResults.current = false;
    },
    [isLoadingResults],
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
    isSearchOpen,
    lockSearchStateToVehicle,
    pastSearches,
    searchQuery,
    searchResults,
    searchState,
    setHasLockedSearchState,
    setIsSearchOpen,
    setSearchState,
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
