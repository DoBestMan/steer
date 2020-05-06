import { NextApiRequest, NextApiResponse } from 'next';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendCreateUserSession,
  backendGetUserPersonalization,
} from '~/lib/backend/users';

const BearerAuthorizationHeader = /^bearer (.+)$/i;

type UserSessionResponse = NextApiResponse<{
  userPersonalization: UserPersonalization;
  userSessionId: string;
}>;

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

  const data = await backendCreateUserSession({
    userIp,
  });

  response.json(data);
}

async function getUserSession(
  request: NextApiRequest,
  response: UserSessionResponse,
) {
  const userSessionId = request.headers.authorization?.replace(
    BearerAuthorizationHeader,
    '$1',
  );

  if (!userSessionId) {
    console.error('Invalid authentication');
    response.status(500).end();
    return;
  }

  const userPersonalization = await backendGetUserPersonalization({
    userId: 'me',
  });

  response.json({
    userPersonalization,
    userSessionId,
  });
}

export default async (
  request: NextApiRequest,
  response: UserSessionResponse,
) => {
  backendBootstrap({ request });

  response.setHeader('Cache-control', 'no-cache');

  if (
    !request.headers.authorization ||
    !BearerAuthorizationHeader.test(request.headers.authorization)
  ) {
    await createUserSession(request, response);
  } else {
    await getUserSession(request, response);
  }
};
