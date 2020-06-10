import { ReactNode, useState } from 'react';

import { Results } from '~/components/modules/Search/Search.types';
import { apiGetSearchTypeahead, SearchDataParams } from '~/lib/api/search';
import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

interface SearchContextProps {
  isSearchOpen: boolean;
  searchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  searchResults: Results;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchContext = createContext<SearchContextProps>();

function useContextSetup() {
  const [searchResults, setSearchResults] = useState<Results>({
    resultMetadata: {},
    siteSearchResultGroupList: [],
  });

  async function searchQuery({ queryText, queryType }: SearchDataParams) {
    const apiSearchResults = await apiGetSearchTypeahead({
      queryText,
      queryType,
    });

    setSearchResults(apiSearchResults);
  }

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleIsSearchOpen = (callback?: () => void) => {
    setIsSearchOpen(!isSearchOpen);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  return {
    isSearchOpen,
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
