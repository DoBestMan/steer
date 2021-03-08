import { ReactNode, useEffect, useState } from 'react';

import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

export interface TireSnapModalContextProps {
  isTireSnapOpen: boolean;
  setIsTireSnapOpen: (isTireSnapOpen: boolean) => void;

  toggleIsTireSnapOpen: (callback?: () => void) => void;
}

const TireSnapModalContext = createContext<TireSnapModalContextProps>();

function useContextSetup(): TireSnapModalContextProps {
  const [isTireSnapOpen, setIsTireSnapOpen] = useState(false);

  useEffect(() => {
    window.onpopstate = () => {
      setIsTireSnapOpen(false);
    };

    return () => {
      window.onpopstate = null;
    };
  }, [setIsTireSnapOpen]);

  const toggleIsTireSnapOpen = (callback?: () => void) => {
    if (!isTireSnapOpen) {
      history.pushState(null, '', '');
    }
    setIsTireSnapOpen(!isTireSnapOpen);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };
  return {
    isTireSnapOpen,
    setIsTireSnapOpen,
    toggleIsTireSnapOpen,
  };
}

export function TireSnapModalContextProvider({ children }: Props) {
  const value = useContextSetup();

  return (
    <TireSnapModalContext.Provider value={value}>
      {children}
    </TireSnapModalContext.Provider>
  );
}

export const useTireSnapModalContext = TireSnapModalContext.useContext;
