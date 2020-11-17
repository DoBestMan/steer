import { ReactNode } from 'react';

import { SiteNotificationList } from '~/data/models/SiteNotificationsList';
import { createContext } from '~/lib/utils/context';

const SiteNotificationsContext = createContext<SiteNotificationList>();

function useContextSetup(defaultData?: SiteNotificationList) {
  return (
    defaultData || {
      notifications: [],
    }
  );
}

interface Props {
  children: ReactNode;
  value?: SiteNotificationList;
}

export function SiteNotificationsContextProvider({ children, value }: Props) {
  const providerValue = useContextSetup(value);
  return (
    <SiteNotificationsContext.Provider value={providerValue}>
      {children}
    </SiteNotificationsContext.Provider>
  );
}
export const useSiteNotificationsContext = SiteNotificationsContext.useContext;
