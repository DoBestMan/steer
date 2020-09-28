import { PageData } from '../../data/models/SiteOpenTemplate';
import { fetchWithErrorHandling } from '../fetch';

export async function backendGetPageSlug(slug: string | string[]) {
  const response = await fetchWithErrorHandling<PageData>({
    endpoint: `/v1/site/page/${slug}`,
    includeAuthorization: true,
    method: 'get',
  });
  return response;
}
