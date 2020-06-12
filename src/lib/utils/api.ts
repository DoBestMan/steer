import { NextApiRequest, NextApiResponse } from 'next';

const BearerAuthorizationHeader = /^bearer (.+)$/i;

export function hasAuthorizationHeader(request: NextApiRequest) {
  return (
    request.headers.authorization &&
    BearerAuthorizationHeader.test(request.headers.authorization)
  );
}

export function getUserSessionId(request: NextApiRequest) {
  return request.headers.authorization?.replace(
    BearerAuthorizationHeader,
    '$1',
  );
}

export function getAndCheckUserSessionId(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const userSessionId = getUserSessionId(request);
  if (!userSessionId) {
    console.error('Invalid authentication');
    response.status(500).end();
  }
  return userSessionId;
}
