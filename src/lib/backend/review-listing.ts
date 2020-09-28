import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetReviewListing({
  query,
}: {
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<SiteProductReviewsListing>({
    endpoint: '/v1/site/tire-reviews',
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
