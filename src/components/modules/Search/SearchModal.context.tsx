import { ReactNode, useEffect, useState } from 'react';

import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

export interface SearchModalContextProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchModalContext = createContext<SearchModalContextProps>();

function useContextSetup(): SearchModalContextProps {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => {
    window.onpopstate = () => {
      setIsSearchOpen(false);
    };

    return () => {
      window.onpopstate = null;
    };
  }, [setIsSearchOpen]);

  const toggleIsSearchOpen = (callback?: () => void) => {
    if (!isSearchOpen) {
      history.pushState(null, '', '');
    }
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

export function SearchModalContextProvider({ children }: Props) {
  const value = useContextSetup();

  return (
    <SearchModalContext.Provider value={value}>
      {children}
    </SearchModalContext.Provider>
  );
}

export const useSearchModalContext = SearchModalContext.useContext;
