import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { fetch } from '~/lib/fetch';

export async function apiUpdateUserPersonalization(
  body: UserPersonalizationUpdate,
) {
  const userSessionData = await fetch<
    UserPersonalization,
    UserPersonalizationUpdate
  >({
    body,
    endpoint: '/users/me/personalization',
    includeAuthorization: true,
    method: 'put',
  });

  return userSessionData;
}
