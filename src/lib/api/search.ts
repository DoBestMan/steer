import { Results } from '~/components/modules/Search/Search.types';
import { fetchWithErrorHandling } from '~/lib/fetch';

import { FetchError, FetchErrorCodes } from '../fetch/FetchError';

export interface SearchDataParams {
  additionalQueryText?: string;
  queryText: string;
  queryType: string;
  signal?: AbortSignal;
}

export async function apiGetSearchTypeahead({
  additionalQueryText = '',
  queryText,
  queryType,
  signal,
}: SearchDataParams) {
  const res = await fetchWithErrorHandling<Results>({
    endpoint: '/search-typeahead',
    query: { additionalQueryText, queryText, queryType },
    method: 'get',
    signal,
  });

  if (!res.isSuccess) {
    throw new FetchError(
      FetchErrorCodes[res.error.code] || FetchErrorCodes.NetworkError,
      res.error.message || '',
    );
  }

  return res.data;
}
