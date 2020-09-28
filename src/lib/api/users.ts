import { UserHistorySearch } from '~/data/models/UserHistorySearch';
import { UserHistorySearchItem } from '~/data/models/UserHistorySearchItem';
import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';
import {
  fetchSetUserPersonalization,
  fetchWithErrorHandling,
} from '~/lib/fetch';

import { eventEmitters } from '../events/emitters';

export async function apiUpdateUserPersonalization(
  body: UserPersonalizationUpdate,
) {
  const res = await fetchWithErrorHandling<
    UserPersonalization,
    UserPersonalizationUpdate
  >({
    endpoint: '/users/me/personalization',
    includeAuthorization: true,
    jsonBody: body,
    method: 'put',
  });

  if (res.isSuccess) {
    fetchSetUserPersonalization(res.data);
    eventEmitters.userPersonalizationLocationUpdate.emit(null);
  }

  return res;
}

export async function apiGetUserSearchHistory() {
  return await fetchWithErrorHandling<UserHistorySearch>({
    endpoint: '/users/me/history/search',
    includeAuthorization: true,
    method: 'get',
  });
}

export async function apiAddUserSearchHistory(item: UserHistorySearchItem) {
  return await fetchWithErrorHandling<UserHistorySearch, UserHistorySearchItem>(
    {
      endpoint: '/users/me/history/search',
      includeAuthorization: true,
      jsonBody: item,
      method: 'post',
    },
  );
}

export async function apiDeleteUserSearchHistory() {
  return await fetchWithErrorHandling<null>({
    endpoint: '/users/me/history/search',
    includeAuthorization: true,
    method: 'delete',
  });
}
