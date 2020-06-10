import { Results } from '~/components/modules/Search/Search.types';
import { fetch } from '~/lib/fetch';

export interface SearchDataParams {
  queryText: string;
  queryType: string;
}

export async function apiGetSearchTypeahead({
  queryText,
  queryType,
}: SearchDataParams) {
  const searchData = await fetch<Results>({
    endpoint: '/search-typeahead',
    query: { queryText, queryType },
    method: 'get',
  });

  return searchData;
}
