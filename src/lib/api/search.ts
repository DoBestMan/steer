import { Results } from '~/components/modules/Search/Search.types';
import { fetch } from '~/lib/fetch';

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
  const searchData = await fetch<Results>({
    endpoint: '/search-typeahead',
    query: { additionalQueryText, queryText, queryType },
    method: 'get',
    signal,
  });

  return searchData;
}
