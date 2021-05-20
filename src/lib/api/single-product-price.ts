import { SitePrice } from '~/data/models/SitePrice';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetSiteProductPrice(id: string) {
  const response = await fetchWithErrorHandling<{ sitePrice: SitePrice }>({
    endpoint: '/single-product-price',
    includeAuthorization: true,
    includeUserRegion: true,
    method: 'get',
    query: { id },
  });

  return response;
}
