import { UserPersonalization } from '~/data/models/UserPersonalization';

import { fetch } from '../fetch';

export async function apiGetUserSession() {
  const userSessionData = await fetch<{
    userPersonalization: UserPersonalization;
    userSessionId: string;
  }>({
    endpoint: '/v1/users/session',
    includeAuthorization: true,
    method: 'get',
  });

  return userSessionData;
}
