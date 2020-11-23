import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { getUnExpiredLocalStorageIds } from '~/components/global/NotificationBanner/Notifications.utils';
import { SiteNotifications } from '~/data/models/SiteNotifications';
import { SiteNotificationList } from '~/data/models/SiteNotificationsList';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { createContext } from '~/lib/utils/context';
import { fixHomepageRoute } from '~/lib/utils/routes';
import { removeUrlParams } from '~/lib/utils/string';

export interface NotificationContextProps {
  handleNotificationClick: () => void;
  notifications: SiteNotificationList;
  setNotifications: (notificationList: SiteNotificationList) => void;
}

const SiteNotificationsContext = createContext<NotificationContextProps>();

function useContextSetup(
  defaultData?: SiteNotificationList,
): NotificationContextProps {
  const [notifications, setNotifications] = useState(
    defaultData || { notifications: [] },
  );
  const router = useRouter();
  const prevMessage = useRef(notifications);
  const route = removeUrlParams(fixHomepageRoute(router.asPath));

  const isHomepage = route === ROUTE_MAP[ROUTES.HOME];
  function handleNotificationClick() {
    updateNotificationFromStorage();
  }

  const updateNotificationFromStorage = useCallback(() => {
    let notificationStorageIds: string[] = [];
    let filteredNotificationData: SiteNotifications[] =
      prevMessage.current.notifications;
    filteredNotificationData = isHomepage
      ? filteredNotificationData.filter(
          (notificationItem) => !notificationItem.suppressFromHomePage,
        )
      : filteredNotificationData;
    const notificationStorageItem =
      window.localStorage &&
      window.localStorage.getItem(
        LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
      );
    notificationStorageIds = notificationStorageItem
      ? getUnExpiredLocalStorageIds(notificationStorageItem)
      : null;
    filteredNotificationData = notificationStorageIds
      ? filteredNotificationData.filter(
          (notificationItem) =>
            !notificationStorageIds.includes(notificationItem.id),
        )
      : filteredNotificationData;
    setNotifications({ notifications: filteredNotificationData });
  }, [setNotifications, isHomepage]);
  useEffect(() => {
    router.events.on('routeChangeComplete', updateNotificationFromStorage);
    return () => {
      router.events.off('routeChangeComplete', updateNotificationFromStorage);
    };
  }, [router.events, updateNotificationFromStorage]);
  useEffect(() => {
    updateNotificationFromStorage();
  }, [updateNotificationFromStorage]);
  return { notifications, setNotifications, handleNotificationClick };
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
