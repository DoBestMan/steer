import differenceInDays from 'date-fns/differenceInDays';
import lscache from 'lscache';

import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';

import { isBrowser } from '../utils/browser';

export interface LatLng {
  isDenied?: boolean;
  latitude: number;
  longitude: number;
}

export interface NavigatorSuccessCallbackProps {
  coords: LatLng;
}

export interface NavigatorErroCallbackProps {
  code: number;
  message: string;
}

const setCustomEventForLocationPopup = (allowed: boolean, denied: boolean) => {
  if (isBrowser() && window.FS) {
    window.FS.event('ST Location Popup', {
      Allow: allowed,
      'Dont Allow': denied,
    });
  }
};
const LOCATION_PERMISSION_EXPIRATION = 90;

export const browserLocationCheck = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return;
    }

    const browserLocationStorageData = lscache.get(
      LOCAL_STORAGE[PROPERTIES.BROWSER_LOCATION_PERMISSION],
    );
    const currentTime = new Date();
    const defaultTime = {
      miliseconds: currentTime.getTime(),
      timeAsString: currentTime.toUTCString(),
    };
    const browserResponseMap: Record<string, (timestamp?: number) => void> = {
      allow: () => ({
        formattedTimestamp: defaultTime.timeAsString,
        response: 'allow',
        timestamp: defaultTime.miliseconds,
      }),
      declined: (timestamp) => ({
        formattedTimestamp: timestamp
          ? new Date(timestamp).toUTCString()
          : defaultTime.timeAsString,
        response: 'denied',
        timestamp: timestamp || defaultTime.miliseconds,
        isExpired: false,
      }),
    };
    const geoSuccess = function ({
      coords: { latitude, longitude },
    }: NavigatorSuccessCallbackProps) {
      const browserLocation = {
        latitude,
        longitude,
      };

      if (browserLocationStorageData) {
        resolve(browserLocation);
        return;
      }
      setCustomEventForLocationPopup(true, false);
      lscache.set(
        LOCAL_STORAGE[PROPERTIES.BROWSER_LOCATION_PERMISSION],
        browserResponseMap['allow'](),
      );

      resolve(browserLocation);
    };
    const geoError = function (error: NavigatorErroCallbackProps) {
      if (error.code == 1) {
        const lscacheData =
          browserLocationStorageData &&
          differenceInDays(
            new Date(browserLocationStorageData.timestamp),
            new Date(),
          ) > LOCATION_PERMISSION_EXPIRATION
            ? {
                ...browserLocationStorageData,
                isExpired: true,
              }
            : browserResponseMap['declined'](
                browserLocationStorageData
                  ? browserLocationStorageData.timestamp
                  : null,
              );
        setCustomEventForLocationPopup(false, true);
        lscache.set(
          LOCAL_STORAGE[PROPERTIES.BROWSER_LOCATION_PERMISSION],
          lscacheData,
        );

        reject({ ...error, isDenied: true });
      }
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  });
