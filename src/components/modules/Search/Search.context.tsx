import { ReactNode, useState } from 'react';

import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

interface SearchContextProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchContext = createContext<SearchContextProps>();

function useContextSetup() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleIsSearchOpen = (callback?: () => void) => {
    setIsSearchOpen(!isSearchOpen);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  return {
    isSearchOpen,
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
