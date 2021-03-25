import { ProductCount } from '~/data/ProductCount';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetSiteBrandProductCount(brandName: string) {
  const response = await fetchWithErrorHandling<ProductCount>({
    endpoint: '/products-count',
    includeAuthorization: true,
    method: 'get',
    query: { brand: brandName },
  });

  return response;
}
