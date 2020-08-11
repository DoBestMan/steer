import { IncomingMessage } from 'http';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import { URLS } from '~/lib/constants/urls';
import { isIntegrationDeploy, isProductionDeploy } from '~/lib/utils/deploy';

import {
  fetchSetAuthorizationFunction,
  fetchSetAuthorizationToken,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from '../fetch';
import { backendOauthToken } from './oauth';

export function getBackendEnvVariables(): {
  backendEndpoint: string;
  clientId?: string;
  clientSecret?: string;
} {
  if (isProductionDeploy()) {
    return {
      backendEndpoint: URLS.MAIN_API_PRODUCTION,
      clientId: process.env.STEER_CLIENT_ID,
      clientSecret: process.env.STEER_CLIENT_SECRET,
    };
  }

  let backend = process.env.STEER_BACKEND;
  if (!backend) {
    backend = isIntegrationDeploy() ? 'integration' : 'mock';
  }

  if (backend === 'local') {
    return {
      backendEndpoint: URLS.MAIN_API_LOCAL,
      clientId: process.env.STEER_CLIENT_ID_MOCK,
      clientSecret: process.env.STEER_CLIENT_SECRET_MOCK,
    };
  } else if (backend === 'mock') {
    return {
      backendEndpoint: URLS.MAIN_API_MOCK,
      clientId: process.env.STEER_CLIENT_ID_MOCK,
      clientSecret: process.env.STEER_CLIENT_SECRET_MOCK,
    };
  }

  return {
    backendEndpoint: URLS.MAIN_API_STAGING,
    clientId: process.env.STEER_CLIENT_ID_INTEGRATION,
    clientSecret: process.env.STEER_CLIENT_SECRET_INTEGRATION,
  };
}

const { clientId, clientSecret, backendEndpoint } = getBackendEnvVariables();

async function authorizationFunction() {
  if (!clientId || !clientSecret) {
    throw new Error('Missing clientId or clientSecret');
  }

  const { clientToken, expiresOn } = await backendOauthToken({
    clientId,
    clientSecret,
  });

  fetchSetAuthorizationToken(clientToken, expiresOn);
}

export function backendBootstrap({
  request,
}: {
  request?: IncomingMessage & { query?: Record<string, string | string[]> };
} = {}) {
  fetchSetAuthorizationFunction(authorizationFunction);
  fetchSetUrlBase(backendEndpoint);

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
