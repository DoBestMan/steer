import lscache from 'lscache';

import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import GA from '~/lib/helpers/analytics';

import {
  fetchSetAuthorizationToken,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from '../fetch';
import { apiGetUserSession } from './session';

let apiBootstrapPromise: Promise<void> | null = null;

const SimpleTireSessionKeyExpireInMinutes = 60;

async function asyncApiBootstrap() {
  lscache.flushExpired();

  const cachedAuthorizationToken = lscache.get(
    LOCAL_STORAGE[PROPERTIES.SESSION],
  );
  const isCachedAuthorizationTokenValid =
    typeof cachedAuthorizationToken === 'string';
  if (isCachedAuthorizationTokenValid) {
    fetchSetAuthorizationToken(cachedAuthorizationToken, null);
  }

  fetchSetUrlBase('/api');

  const { userPersonalization, userSessionId } = await apiGetUserSession();
  fetchSetAuthorizationToken(userSessionId, null);

  // Store UserSessionId in GTM
  GA.addToDataLayer({ key: 'userSessionId', value: userSessionId });
  // TODO: add email, first_name, last_name and traffic_source for refer a friend
  // API would provide the values

  lscache.set(
    LOCAL_STORAGE[PROPERTIES.SESSION],
    userSessionId,
    SimpleTireSessionKeyExpireInMinutes,
  );

  fetchSetUserPersonalization(userPersonalization);
}

export function apiBootstrap() {
  if (apiBootstrapPromise) {
    return apiBootstrapPromise;
  }

  apiBootstrapPromise = asyncApiBootstrap();
  return apiBootstrapPromise;
}

// eslint-disable-next-line @typescript-eslint/camelcase
export function TEST_apiBootstrapPromiseReset() {
  apiBootstrapPromise = null;
}
