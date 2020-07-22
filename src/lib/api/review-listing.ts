import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';
import { fetch } from '~/lib/fetch';

export async function apiGetReviewListing(query: Record<string, string>) {
  return await fetch<SiteProductReviewsListing>({
    endpoint: '/review-listing',
    includeAuthorization: true,
    query,
    method: 'get',
  });
}
