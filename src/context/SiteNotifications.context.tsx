import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { getUnExpiredLocalStorageIds } from '~/components/global/NotificationBanner/Notifications.utils';
import { SiteNotifications } from '~/data/models/SiteNotifications';
import { SiteNotificationList } from '~/data/models/SiteNotificationsList';
import { SiteNotificationTypes } from '~/data/models/SiteNotificationTypes';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { createContext } from '~/lib/utils/context';
import { fixHomepageRoute } from '~/lib/utils/routes';
import { removeUrlParams } from '~/lib/utils/string';

export interface NotificationContextProps {
  addNotification: (notification: SiteNotifications) => void;
  handleNotificationClick: () => void;
  notifications: SiteNotificationList;
}

const SiteNotificationsContext = createContext<NotificationContextProps>();

function useContextSetup(
  defaultData?: SiteNotificationList,
): NotificationContextProps {
  const [notifications, setNotifications] = useState(
    defaultData || { notifications: [] },
  );
  const ignoreRouterChange = useRef(false);
  const router = useRouter();
  const prevMessage = useRef(notifications);
  const route = removeUrlParams(fixHomepageRoute(router.asPath));

  const isHomepage = route === ROUTE_MAP[ROUTES.HOME];
  function handleNotificationClick() {
    updateNotificationFromStorage();
  }

  const addNotification = (notification: SiteNotifications) => {
    const disabledToAdd =
      (notification.type === SiteNotificationTypes.Shop &&
        !!(notifications.notifications || []).find(
          (item) => item.type === SiteNotificationTypes.Shop,
        )) ||
      (notification.type === SiteNotificationTypes.Filter &&
        !!(notifications.notifications || []).find(
          (item) => item.type === SiteNotificationTypes.Filter,
        ));
    if (disabledToAdd) {
      return;
    }

    if (notification.type === SiteNotificationTypes.Shop) {
      ignoreRouterChange.current = true;
    }
    setNotifications(({ notifications }) => ({
      notifications: [...(notifications || []), notification],
    }));
  };

  const updateNotificationFromStorage = useCallback(() => {
    if (ignoreRouterChange.current) {
      ignoreRouterChange.current = false;
      return;
    }

    let notificationStorageIds: string[] = [];
    let filteredNotificationData: SiteNotifications[] =
      prevMessage.current.notifications;
    filteredNotificationData = filteredNotificationData.filter(
      (notificationItem) =>
        (!isHomepage || !notificationItem.suppressFromHomePage) &&
        notificationItem.type !== SiteNotificationTypes.Shop &&
        notificationItem.type !== SiteNotificationTypes.Filter,
    );
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

  return {
    notifications,
    addNotification,
    handleNotificationClick,
  };
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
