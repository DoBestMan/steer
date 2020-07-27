import { ReactNode, useState } from 'react';

import { RouteQueryParamOptions } from '~/components/global/Link/BaseLink.hooks';
import { Results } from '~/components/modules/Search/Search.types';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { SearchDataParams } from '~/lib/api/search';
import { createContext } from '~/lib/utils/context';

import {
  usePastSearches,
  useSearchResults,
  useSearchState,
} from './Search.hooks';

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
  lockSearchStateToBrand: () => void;
  lockSearchStateToTireSize: () => void;
  lockSearchStateToVehicle: () => void;
  pastSearches: SiteSearchResultGroup;
  routeQueryParamOptions?: RouteQueryParamOptions;
  searchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  searchResults: Results;
  searchState: string;
  setHasLockedSearchState: (hasLockedSearchState: boolean) => void;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  setRouteQueryParamOptions: (
    routeQueryParamOptions?: RouteQueryParamOptions,
  ) => void;
  setSearchState: (searchState: string) => void;
  setShouldPreventLinkNavigation: (value: boolean) => void;
  shouldPreventLinkNavigation: boolean;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchContext = createContext<SearchContextProps>();

function useContextSetup(): SearchContextProps {
  const {
    addPastSearch,
    deletePastSearches,
    getPastSearches,
    pastSearches,
  } = usePastSearches();

  const {
    clearSearchResults,
    hasSearchResultsError,
    isLoadingResults,
    searchQuery,
    searchResults,
  } = useSearchResults();

  const {
    hasLockedSearchState,
    lockSearchStateToBrand,
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    searchState,
    setHasLockedSearchState,
    setSearchState,
  } = useSearchState({ searchQuery });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleIsSearchOpen = (callback?: () => void) => {
    setIsSearchOpen(!isSearchOpen);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  const [
    shouldPreventLinkNavigation,
    setShouldPreventLinkNavigation,
  ] = useState(false);
  const [routeQueryParamOptions, setRouteQueryParamOptions] = useState<
    RouteQueryParamOptions | undefined
  >();

  return {
    addPastSearch,
    clearSearchResults,
    deletePastSearches,
    getPastSearches,
    hasLockedSearchState,
    hasSearchResultsError,
    isLoadingResults,
    isSearchOpen,
    lockSearchStateToBrand,
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    pastSearches,
    routeQueryParamOptions,
    searchQuery,
    searchResults,
    searchState,
    setHasLockedSearchState,
    setIsSearchOpen,
    setRouteQueryParamOptions,
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
