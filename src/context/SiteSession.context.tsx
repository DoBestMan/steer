import { ReactNode, useState } from 'react';

import { SiteSession } from '~/data/models/SiteSession';
import { createContext } from '~/lib/utils/context';

export interface SiteSessionContextProps {
  setSiteSession: (siteSession: SiteSession) => void;
  siteSession?: SiteSession;
}
const UserSessionContext = createContext<SiteSessionContextProps>();

export function useSiteSessionContextSetup(
  defaultData?: SiteSession,
): SiteSessionContextProps {
  const [siteSession, setSiteSession] = useState<SiteSession | undefined>(
    defaultData,
  );

  return {
    siteSession,
    setSiteSession,
  };
}
interface Props {
  children: ReactNode;
  value?: SiteSession;
}

export function SiteSessionContextProvider({ children, value }: Props) {
  const providerValue = useSiteSessionContextSetup(value);
  return (
    <UserSessionContext.Provider value={providerValue}>
      {children}
    </UserSessionContext.Provider>
  );
}

export const useSiteSessionContext = UserSessionContext.useContext;
