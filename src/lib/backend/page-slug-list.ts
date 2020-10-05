import { SitePageListResponse } from '~/data/models/SitePageListResponse';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetPageSlugList(basePath = '') {
  const response = await fetchWithErrorHandling<SitePageListResponse>({
    endpoint: '/v1/site/open-template-pages',
    includeAuthorization: true,
    method: 'get',
    query: {
      basePath,
    },
  });
  return response;
}
