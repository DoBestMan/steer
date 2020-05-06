import lscache from 'lscache';

import {
  fetchSetAuthorizationToken,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from '../fetch';
import { apiGetUserSession } from './session';

let apiBootstrapPromise: Promise<void> | null = null;

const SimpleTireSessionKey = 'ST_SESSION';
const SimpleTireSessionKeyExpireInMinutes = 60;

async function asyncApiBootstrap() {
  lscache.flushExpired();

  const cachedAuthorizationToken = lscache.get(SimpleTireSessionKey);
  const isCachedAuthorizationTokenValid =
    typeof cachedAuthorizationToken === 'string';
  if (isCachedAuthorizationTokenValid) {
    fetchSetAuthorizationToken(cachedAuthorizationToken);
  }

  fetchSetUrlBase('/api');

  const { userPersonalization, userSessionId } = await apiGetUserSession();
  fetchSetAuthorizationToken(userSessionId);

  lscache.set(
    SimpleTireSessionKey,
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
