import { IncomingMessage } from 'http';

import { UserPersonalization } from '~/data/models/UserPersonalization';

import {
  fetchSetAuthorizationFunction,
  fetchSetAuthorizationToken,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from '../fetch';
import { BackendEndpoints } from './constants';
import { backendOauthToken } from './oauth';

async function authorizationFunction() {
  if (!process.env.STEER_CLIENT_ID || !process.env.STEER_CLIENT_SECRET) {
    throw new Error('Missing STEER_CLIENT_ID or STEER_CLIENT_SECRET');
  }

  const { clientToken, expiresOn } = await backendOauthToken({
    clientId: process.env.STEER_CLIENT_ID,
    clientSecret: process.env.STEER_CLIENT_SECRET,
  });

  fetchSetAuthorizationToken(clientToken, expiresOn);
}

export function backendBootstrap({
  request,
}: {
  request?: IncomingMessage & { query?: Record<string, string | string[]> };
} = {}) {
  fetchSetAuthorizationFunction(authorizationFunction);

  if (process.env.STEER_BACKEND === 'local') {
    fetchSetUrlBase(BackendEndpoints.mainApiLocal.apiBaseUrl);
  } else {
    fetchSetUrlBase(BackendEndpoints.mainApiMock.apiBaseUrl);
  }

  if (request && request.query) {
    const userRegion = request.query.userRegion
      ? Number(request.query.userRegion)
      : null;
    const userZip =
      typeof request.query.userZip === 'string' ? request.query.userZip : null;

    if (userRegion || userZip) {
      const userPersonalization: UserPersonalization = {
        gaClientId: null,
        userLocation: {
          cityName: null,
          region: userRegion,
          stateAbbr: null,
          zip: userZip,
        },
      };

      fetchSetUserPersonalization(userPersonalization);
    }
  }
}
