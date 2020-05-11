import { NextApiRequest } from 'next';

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
