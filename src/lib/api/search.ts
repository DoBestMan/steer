import { Results } from '~/components/modules/Search/Search.types';
import { fetch } from '~/lib/fetch';

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
  try {
    const searchData = await fetch<Results>({
      endpoint: '/search-typeahead',
      query: { additionalQueryText, queryText, queryType },
      method: 'get',
      signal,
    });

    return searchData;
  } catch (error) {
    throw new FetchError(
      FetchErrorCodes[error.code] || FetchErrorCodes.NetworkError,
      error.name,
    );
  }
}
