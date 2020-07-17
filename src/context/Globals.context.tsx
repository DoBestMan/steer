import { ReactNode } from 'react';

import { createContext } from '~/lib/utils/context';

interface GlobalsContextProps {
  hostUrl?: string | null;
}

const GlobalsContext = createContext<GlobalsContextProps>();

interface Props {
  children: ReactNode;
  value: GlobalsContextProps;
}

export function GlobalsContextProvider({
  children,
  value: { hostUrl },
}: Props) {
  return (
    <GlobalsContext.Provider value={{ hostUrl }}>
      {children}
    </GlobalsContext.Provider>
  );
}

export const useGlobalsContext = GlobalsContext.useContext;
