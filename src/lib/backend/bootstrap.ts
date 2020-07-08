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

export function getBackendEnvVariables() {
  const deployRef = process.env.NOW_GITHUB_COMMIT_REF;
  const isProductionDeploy = deployRef === 'master';

  if (isProductionDeploy) {
    return {
      backendEndpoint: BackendEndpoints.mainApiProduction,
      clientId: process.env.STEER_CLIENT_ID,
      clientSecret: process.env.STEER_CLIENT_SECRET,
    };
  }

  let backend = process.env.STEER_BACKEND;
  if (!backend) {
    const isIntegrationDeploy =
      deployRef &&
      /^dev$|^qa$|^staging$|^uat$|^dev-st$|^qa-st|^int-/.test(deployRef);
    backend = isIntegrationDeploy ? 'integration' : 'mock';
  }

  if (backend === 'local') {
    return {
      backendEndpoint: BackendEndpoints.mainApiLocal,
      clientId: process.env.STEER_CLIENT_ID_MOCK,
      clientSecret: process.env.STEER_CLIENT_SECRET_MOCK,
    };
  } else if (backend === 'mock') {
    return {
      backendEndpoint: BackendEndpoints.mainApiMock,
      clientId: process.env.STEER_CLIENT_ID_MOCK,
      clientSecret: process.env.STEER_CLIENT_SECRET_MOCK,
    };
  }

  return {
    backendEndpoint: BackendEndpoints.mainApiIntegration,
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
  fetchSetUrlBase(backendEndpoint.apiBaseUrl);

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
