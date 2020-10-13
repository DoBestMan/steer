import lscache from 'lscache';

import { getQueryParams } from '~/hooks/useQueryParams';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import GA from '~/lib/helpers/analytics';

import {
  fetchSetAuthorizationToken,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from '../fetch';
import { apiGetUserSession } from './session';

let apiBootstrapPromise: Promise<void> | null = null;

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

  /* eslint-disable  @typescript-eslint/naming-convention*/
  // region_id is a possible query params passed by Google
  // We want to forward it to the users/session API call
  // so the BE can force a certain region instead of relying on Ip detection
  const { region_id } = getQueryParams();
  let getUserSessionParams = undefined;

  // We want to make sure we pass only a number converted to string
  if (
    typeof region_id !== 'undefined' &&
    typeof region_id !== 'boolean' &&
    !Number.isNaN(+region_id)
  ) {
    getUserSessionParams = {
      regionId: String(region_id),
    };
  }
  /* eslint-enable  @typescript-eslint/naming-convention*/

  const res = await apiGetUserSession(getUserSessionParams);
  if (!res.isSuccess) {
    return;
  }

  const { userPersonalization, userSessionId } = res.data;
  fetchSetAuthorizationToken(userSessionId, null);

  // Store UserSessionId in GTM
  GA.addToDataLayer({ userSessionId });
  // TODO: add email, first_name, last_name and traffic_source for refer a friend
  // API would provide the values

  lscache.set(LOCAL_STORAGE[PROPERTIES.SESSION], userSessionId);

  fetchSetUserPersonalization(userPersonalization);
}

export function apiBootstrap() {
  if (apiBootstrapPromise) {
    return apiBootstrapPromise;
  }

  apiBootstrapPromise = asyncApiBootstrap();
  return apiBootstrapPromise;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function TEST_apiBootstrapPromiseReset() {
  apiBootstrapPromise = null;
}
