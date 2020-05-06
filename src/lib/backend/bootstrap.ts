import { IncomingMessage } from 'http';

import { UserPersonalization } from '~/data/models/UserPersonalization';

import {
  fetchSetAuthorizationHeader,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from '../fetch';
import { BackendEndpoints } from './constants';

export function backendBootstrap({
  request,
}: {
  request?: IncomingMessage & { query?: Record<string, string | string[]> };
} = {}) {
  if ('STEER_BACKEND' in process.env && process.env.STEER_BACKEND === 'local') {
    fetchSetUrlBase(BackendEndpoints['mainApiLocal'].apiBaseUrl);
  } else {
    fetchSetUrlBase(BackendEndpoints['mainApiMock'].apiBaseUrl);
  }

  if (request && request.headers && request.headers.authorization) {
    fetchSetAuthorizationHeader(request.headers.authorization);
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
