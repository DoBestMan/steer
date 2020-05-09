import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';

import { fetch } from '../fetch';

export async function backendCreateUserSession({ userIp }: { userIp: string }) {
  const response = await fetch<
    {
      userPersonalization: UserPersonalization;
      userSessionId: string;
    },
    { userIp: string }
  >({
    body: {
      userIp,
    },
    endpoint: '/v1/users/session',
    includeAuthorization: true,
    method: 'post',
  });

  return response;
}

export async function backendGetUserPersonalization({
  userId,
}: {
  userId: string;
}) {
  const response = await fetch<UserPersonalization>({
    endpoint: '/v1/users/{userId}/personalization',
    includeAuthorization: true,
    method: 'get',
    params: {
      userId,
    },
  });

  return response;
}

export async function backendSetUserPersonalization({
  gaClientId,
  userId,
  userLocationZip,
}: {
  gaClientId: string | null;
  userId: string;
  userLocationZip: string | null;
}) {
  const response = await fetch<UserPersonalization, UserPersonalizationUpdate>({
    body: {
      gaClientId,
      userLocationZip,
    },
    endpoint: '/v1/users/{userId}/personalization',
    includeAuthorization: true,
    method: 'post',
    params: {
      userId,
    },
  });

  return response;
}
