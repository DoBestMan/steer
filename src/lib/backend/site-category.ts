import { SiteLearnByCategory } from '~/data/models/SiteLearnByCategory';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetSiteByCategory({
  query,
}: {
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<SiteLearnByCategory>({
    endpoint: '/v1/site/open-page-category-list',
    includeAuthorization: true,
    method: 'get',
    query,
  });

  return response;
}
