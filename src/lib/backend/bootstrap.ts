import { IncomingMessage } from 'http';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import { URLS } from '~/lib/constants/urls';
import {
  isFeatureBranchDeploy,
  isLocal,
  isMockDeploy,
  isProductionDeploy,
} from '~/lib/utils/deploy';

import {
  fetchSetAuthorizationFunction,
  fetchSetAuthorizationToken,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from '../fetch';
import { backendOauthToken } from './oauth';

enum API {
  FEATURE_BRANCH = 'feature',
  INTEGRATION = 'integration',
  LOCAL = 'local',
  MOCK = 'mock',
  PRODUCTION = 'production',
}

export function getBackendEnvVariables(): {
  backendEndpoint: string;
  clientId?: string;
  clientSecret?: string;
} {
  let pointTo = API.INTEGRATION;
  let integrationBranch = undefined;

  if (isProductionDeploy()) {
    pointTo = API.PRODUCTION;
  } else if (isMockDeploy()) {
    pointTo = API.MOCK;
  } else if (isFeatureBranchDeploy()) {
    pointTo = API.FEATURE_BRANCH;
    integrationBranch = process.env.VERCEL_GITHUB_COMMIT_REF;
  } else {
    if (isLocal()) {
      const backend = process.env.STEER_BACKEND || 'mock';
      switch (backend) {
        case 'local':
          pointTo = API.LOCAL;
          break;
        case 'mock':
          pointTo = API.MOCK;
          break;
        case 'integration':
          pointTo = API.INTEGRATION;
          break;
        default:
          pointTo = API.FEATURE_BRANCH;
          integrationBranch = backend;
      }
    }
  }

  if (pointTo === API.PRODUCTION) {
    return {
      backendEndpoint: URLS.MAIN_API_PRODUCTION,
      clientId: process.env.STEER_CLIENT_ID,
      clientSecret: process.env.STEER_CLIENT_SECRET_PROD,
    };
  }

  if (pointTo === API.LOCAL) {
    return {
      backendEndpoint: URLS.MAIN_API_LOCAL,
      clientId: process.env.STEER_CLIENT_ID,
      clientSecret: process.env.STEER_CLIENT_SECRET_MOCK,
    };
  }

  if (pointTo === API.MOCK) {
    return {
      backendEndpoint: URLS.MAIN_API_MOCK,
      clientId: process.env.STEER_CLIENT_ID,
      clientSecret: process.env.STEER_CLIENT_SECRET_MOCK,
    };
  }

  if (pointTo === API.INTEGRATION) {
    return {
      backendEndpoint: URLS.MAIN_API_INTEGRATION,
      clientId: process.env.STEER_CLIENT_ID,
      clientSecret: process.env.STEER_CLIENT_SECRET_INTEGRATION,
    };
  }

  return {
    backendEndpoint: URLS.MAIN_API_FEATURE(integrationBranch),
    clientId: process.env.STEER_CLIENT_ID,
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
