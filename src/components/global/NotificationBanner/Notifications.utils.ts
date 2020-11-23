import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
export interface StorageItem {
  expiry: number;
  value: string;
}
export function setNotificationIdWithExpiryInLocalStorage(
  id: string,
  minutes: number,
) {
  const now = new Date();
  const item = {
    value: id,
    expiry: now.getTime() + minutes * 60 * 1000,
  };
  const key = window.localStorage.getItem(
    LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
  );
  let notificationStorageIds: StorageItem[] = [];
  if (key) {
    notificationStorageIds = JSON.parse(key);
    notificationStorageIds.push(item);
    window.localStorage.setItem(
      LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
      JSON.stringify(notificationStorageIds),
    );
  } else {
    notificationStorageIds.push(item);
    window.localStorage.setItem(
      LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
      JSON.stringify(notificationStorageIds),
    );
  }
}

export function getUnExpiredLocalStorageIds(key: string) {
  const now = new Date();
  let items = key ? JSON.parse(key) : null;
  items = items.filter((item: StorageItem) => item.expiry > now.getTime());
  window.localStorage.setItem(
    LOCAL_STORAGE[PROPERTIES.CLOSED_NOTIFICATION_BANNER_IDS],
    JSON.stringify(items),
  );
  return items.map((item: StorageItem) => item.value);
}
