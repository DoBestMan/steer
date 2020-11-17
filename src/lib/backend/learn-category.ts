import { SiteLearnByCategory } from '~/data/models/SiteLearnByCategory';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetLearnByCategory({
  category,
  query,
}: {
  category: string;
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<SiteLearnByCategory>({
    endpoint: '/v1/site/learn/{category}',
    includeAuthorization: true,
    method: 'get',
    params: {
      category,
    },
    query,
  });

  return response;
}
