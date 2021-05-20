import { SitePrice } from '~/data/models/SitePrice';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function backendGetSiteProductPrice(id: string) {
  const response = await fetchWithErrorHandling<{ sitePrice: SitePrice }>({
    endpoint: `/v2/site/products/${id}`,
    includeAuthorization: true,
    includeUserRegion: true,
    method: 'get',
  });
  return response;
}
