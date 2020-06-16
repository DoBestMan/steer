import { UserHistorySearch } from '~/data/models/UserHistorySearch';
import { UserHistorySearchItem } from '~/data/models/UserHistorySearchItem';
import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import { fetch, fetchSetUserPersonalization } from '~/lib/fetch';

import { eventEmitters } from '../events/emitters';

export async function apiUpdateUserPersonalization(
  body: UserPersonalizationUpdate,
) {
  const userSessionData = await fetch<
    UserPersonalization,
    UserPersonalizationUpdate
  >({
    endpoint: '/users/me/personalization',
    includeAuthorization: true,
    jsonBody: body,
    method: 'put',
  });

  fetchSetUserPersonalization(userSessionData);
  eventEmitters.userPersonalizationLocationUpdate.emit(null);

  return userSessionData;
}

export async function apiGetUserSearchHistory() {
  return await fetch<UserHistorySearch>({
    endpoint: '/users/me/history/search',
    includeAuthorization: true,
    method: 'get',
  });
}

export async function apiAddUserSearchHistory(item: UserHistorySearchItem) {
  return await fetch<UserHistorySearch, UserHistorySearchItem>({
    endpoint: '/users/me/history/search',
    includeAuthorization: true,
    jsonBody: item,
    method: 'post',
  });
}

export async function apiDeleteUserSearchHistory() {
  return await fetch<null>({
    endpoint: '/users/me/history/search',
    includeAuthorization: true,
    method: 'delete',
  });
}
