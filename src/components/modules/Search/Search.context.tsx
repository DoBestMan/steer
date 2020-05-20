import { ReactNode, useState } from 'react';

import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

interface SearchContextProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  toggleIsSearchOpen: () => void;
}

const SearchContext = createContext<SearchContextProps>();

function useContextSetup() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleIsSearchOpen = () => setIsSearchOpen(!isSearchOpen);

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
