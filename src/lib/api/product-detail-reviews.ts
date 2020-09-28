import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetProductDetailReviews(
  query: Record<string, string>,
) {
  return await fetchWithErrorHandling<SiteProductReviews>({
    endpoint: '/product-detail-reviews',
    includeAuthorization: true,
    query,
    method: 'get',
  });
}
