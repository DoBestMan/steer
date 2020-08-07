import { SitePageListResponse } from '~/data/models/SitePageListResponse';

import { fetch } from '../fetch';

export async function backendGetPageSlugList() {
  const response = await fetch<SitePageListResponse>({
    endpoint: '/v1/site/open-template-pages',
    includeAuthorization: true,
    method: 'get',
  });
  return response;
}
