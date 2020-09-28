import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetSiteSearch({
  additionalQueryText,
  queryText,
  queryType,
}: {
  additionalQueryText: string;
  queryText: string;
  queryType: string;
}) {
  const response = await fetchWithErrorHandling<{
    resultMetadata: ListResultMetadata;
    siteSearchResultGroupList: SiteSearchResultGroup[];
  }>({
    endpoint: '/v1/site/search',
    query: {
      additionalQueryText,
      queryText,
      queryType,
    },
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
