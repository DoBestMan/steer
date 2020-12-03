import { ReactNode, useEffect, useState } from 'react';

import { createContext } from '~/lib/utils/context';

import { InputQuery } from './Search';
import { useInputQuery } from './Search.hooks';
import { SearchInputEnum } from './Search.types';

interface Props {
  children: ReactNode;
}

export interface SearchModalContextProps {
  activeInputType: SearchInputEnum;
  getCurrentInputQuery: () => InputQuery;
  isSearchOpen: boolean;
  primaryQuery: InputQuery;
  secondaryQuery: InputQuery;
  setActiveInputType: (value: SearchInputEnum) => void;
  setCurrentInputQuery: (query: {
    queryText?: string;
    queryType?: string;
  }) => void;
  setInputQuery: (inputType: SearchInputEnum, query: InputQuery) => void;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  setPrimaryQuery: (value: InputQuery) => void;
  setSecondaryQuery: (value: InputQuery) => void;
  toggleIsSearchOpen: (callback?: () => void) => void;
}

const SearchModalContext = createContext<SearchModalContextProps>();

function useContextSetup(): SearchModalContextProps {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    activeInputType,
    getCurrentInputQuery,
    primaryQuery,
    secondaryQuery,
    setActiveInputType,
    setCurrentInputQuery,
    setInputQuery,
    setPrimaryQuery,
    setSecondaryQuery,
  } = useInputQuery();

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
    activeInputType,
    getCurrentInputQuery,
    isSearchOpen,
    primaryQuery,
    secondaryQuery,
    setActiveInputType,
    setCurrentInputQuery,
    setInputQuery,
    setIsSearchOpen,
    setPrimaryQuery,
    setSecondaryQuery,
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
