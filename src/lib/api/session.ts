import { UserPersonalization } from '~/data/models/UserPersonalization';

import { fetch } from '../fetch';

interface UserSessionParams {
  regionId?: string;
}

export async function apiGetUserSession(userSessionParams?: UserSessionParams) {
  const userSessionData = await fetch<{
    userPersonalization: UserPersonalization;
    userSessionId: string;
  }>({
    endpoint: '/users/session',
    includeAuthorization: true,
    query: userSessionParams?.regionId
      ? { regionId: userSessionParams.regionId }
      : undefined,
    method: 'get',
  });

  return userSessionData;
}
