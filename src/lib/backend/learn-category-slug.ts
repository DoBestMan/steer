import { SitePageByLearnCategoryResponse } from '~/data/models/SitePageByLearnCategory';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetLearnCategory(category: string, slug: string) {
  const response = await fetchWithErrorHandling<
    SitePageByLearnCategoryResponse
  >({
    endpoint: `/v1/site/learn/${category}/${slug}`,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
