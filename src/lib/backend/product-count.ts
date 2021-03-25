import { ProductCount } from '~/data/ProductCount';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function backendGetSiteBrandProductCount(brandName: string) {
  const response = await fetchWithErrorHandling<ProductCount>({
    endpoint: `/v1/site/brands/${brandName}/product-count`,
    includeAuthorization: true,
    method: 'get',
  });
  return response;
}
