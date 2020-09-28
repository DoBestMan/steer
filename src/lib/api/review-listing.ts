import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetReviewListing(query: Record<string, string>) {
  return await fetchWithErrorHandling<SiteProductReviewsListing>({
    endpoint: '/review-listing',
    includeAuthorization: true,
    query,
    method: 'get',
  });
}
