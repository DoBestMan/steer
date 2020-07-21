import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { fetch } from '~/lib/fetch';

export async function apiGetProductDetailReviews(
  query: Record<string, string>,
) {
  return await fetch<SiteProductReviews>({
    endpoint: '/product-detail-reviews',
    includeAuthorization: true,
    query,
    method: 'get',
  });
}
