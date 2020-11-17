import { useEffect, useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import { SiteNotifications } from '~/data/models/SiteNotifications';
import { SiteNotificationList } from '~/data/models/SiteNotificationsList';
import { CSSStylesProp } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';

import Notification from './Notification';
import styles from './Notification.styles';

export interface NotificationListProps extends SiteNotificationList {
  customItemStyles?: CSSStylesProp;
}

function NotificationList({
  customItemStyles,
  notifications,
}: NotificationListProps) {
  const [notificationsList, setNotificationsList] = useState(notifications);

  useEffect(() => {
    if (notifications) {
      let notificationStorageIds: string[] = [];
      let filteredNotificationData: SiteNotifications[] = notifications;
      const notificationStorageItem =
        window.localStorage &&
        window.localStorage.getItem(
          LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
        );
      notificationStorageIds =
        notificationStorageItem && JSON.parse(notificationStorageItem);
      filteredNotificationData = notificationStorageIds
        ? filteredNotificationData.filter(
            (notificationItem) =>
              !notificationStorageIds.includes(notificationItem.id),
          )
        : filteredNotificationData;
      setNotificationsList(filteredNotificationData);
    }
    return () => {
      setNotificationsList(notifications);
    };
  }, [notifications, setNotificationsList]);

  return (
    <>
      <div css={styles.wrapper}>
        <Carousel
          wrapperClass="notification-carousel"
          params={{ mousewheel: { forceToAxis: true } }}
          shortSwipes
        >
          {notificationsList.map((sortedNotificationsData, index) => (
            <div
              key={`notification_${index}`}
              css={[styles.item, customItemStyles]}
            >
              <Notification
                data-index={index}
                key={index}
                {...sortedNotificationsData}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default NotificationList;
