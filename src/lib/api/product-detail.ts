import { SiteProduct } from '~/data/models/SiteProduct';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetProductDetail({
  brand,
  productLine,
  query,
}: {
  brand: string;
  productLine: string;
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<SiteProduct>({
    endpoint: '/product-detail',
    includeAuthorization: true,
    method: 'get',
    params: {
      brand,
      productLine,
    },
    query: {
      ...query,
      brand,
      productLine,
    },
  });

  return response;
}
