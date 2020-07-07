import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Results } from '~/components/modules/Search/Search.types';
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

import { emptyResult, emptySiteSearchResultGroup } from './Search.mocks';

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
  isSearchOpen: boolean;
  pastSearches: SiteSearchResultGroup;
  searchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  searchResults: Results;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchContext = createContext<SearchContextProps>();

function useContextSetup() {
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

  return {
    addPastSearch,
    clearSearchResults,
    deletePastSearches,
    getPastSearches,
    isSearchOpen,
    pastSearches,
    searchQuery,
    searchResults,
    setIsSearchOpen,
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
