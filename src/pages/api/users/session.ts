import { NextApiRequest, NextApiResponse } from 'next';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendCreateUserSession,
  backendGetUserPersonalization,
  backendUpdateUserPersonalization,
} from '~/lib/backend/users';
import { getUserSessionId, hasAuthorizationHeader } from '~/lib/utils/api';

type UserSessionResponse = NextApiResponse<{
  userPersonalization: UserPersonalization;
  userSessionId: string;
}>;

function getRegionIdFromRequest(request: NextApiRequest) {
  const regionId =
    request.query.regionId && typeof request.query.regionId === 'string'
      ? request.query.regionId
      : undefined;

  return regionId;
}

async function createUserSession(
  request: NextApiRequest,
  response: UserSessionResponse,
) {
  let userIp = request.connection.remoteAddress;
  if (typeof request.headers['x-forwarded-for'] === 'string') {
    userIp = request.headers['x-forwarded-for'];
  }

  if (!userIp) {
    console.error('No IP found on request');
    response.status(500).end();
    return;
  }

  const forcedRegionId = getRegionIdFromRequest(request);

  const res = await backendCreateUserSession({
    userIp,
    regionId: forcedRegionId,
  });

  if (res.isSuccess) {
    response.json(res.data);
    return;
  }

  response.status(res.error.statusCode).end();
}

async function getUserSession(
  request: NextApiRequest,
  response: UserSessionResponse,
) {
  const userSessionId = getUserSessionId(request);
  if (!userSessionId) {
    console.error('Invalid authentication');
    response.status(500).end();
    return;
  }

  const forcedRegionId = getRegionIdFromRequest(request);

  let res = undefined;
  if (forcedRegionId) {
    res = await backendUpdateUserPersonalization({
      userSessionId,
      regionId: forcedRegionId,
    });
  } else {
    res = await backendGetUserPersonalization({
      userSessionId,
    });
  }

  if (res.isSuccess) {
    response.json({
      userPersonalization: res.data.userPersonalization,
      userSessionId,
    });
    return;
  }

  response.status(res.error.statusCode).end();
}

export default async (
  request: NextApiRequest,
  response: UserSessionResponse,
) => {
  backendBootstrap({ request });

  response.setHeader('Cache-control', 'no-cache');

  if (hasAuthorizationHeader(request)) {
    try {
      await getUserSession(request, response);
    } catch (e) {
      await createUserSession(request, response);
    }
  } else {
    await createUserSession(request, response);
  }
};
