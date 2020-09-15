import { ReactNode, useState } from 'react';

import { createContext } from '~/lib/utils/context';

export interface FooterContextProps {
  isFooterVisible: boolean;
  setIsFooterVisible: (isVisible: boolean) => void;
}

const FooterContext = createContext<FooterContextProps>();

export function useFooterContextSetup(): FooterContextProps {
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  return {
    isFooterVisible,
    setIsFooterVisible,
  };
}

export function FooterContextProvider({ children }: { children: ReactNode }) {
  const value = useFooterContextSetup();
  return (
    <FooterContext.Provider value={value}>{children}</FooterContext.Provider>
  );
}

export const useFooterContext = FooterContext.useContext;
