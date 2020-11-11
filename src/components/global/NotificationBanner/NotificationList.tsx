import { useEffect, useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import { CSSStylesProp } from '~/lib/constants';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';

import Notification, { NotificationProps } from './Notification';
import styles from './Notification.styles';

export interface NotificationListProps {
  customItemStyles?: CSSStylesProp;
  notificationData: Array<NotificationProps>;
}

function NotificationList({
  customItemStyles,
  notificationData,
}: NotificationListProps) {
  const [notifications, setNotifications] = useState(notificationData);

  useEffect(() => {
    let notificationStorageIds: string[] = [];
    const filteredNotificationData: NotificationProps[] = [];
    const notificationStorageItem =
      window.localStorage &&
      window.localStorage.getItem(
        LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
      );
    if (notificationStorageItem) {
      notificationStorageIds = JSON.parse(notificationStorageItem);
      if (notificationData) {
        notificationData.map((notificationItem) => {
          if (!notificationStorageIds.includes(notificationItem.id)) {
            filteredNotificationData.push(notificationItem);
          }
        });
        setNotifications(filteredNotificationData);
      }
    }
  }, [notificationData]);

  return (
    <>
      <div css={styles.wrapper}>
        <Carousel
          wrapperClass="notification-carousel"
          params={{ mousewheel: { forceToAxis: true } }}
          shortSwipes
        >
          {notifications
            .sort((a, b) => (a.type > b.type ? -1 : 1))
            .map((sortedNotificationsData, index) => (
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
