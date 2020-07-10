import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';

import { fetch } from '../fetch';

export async function backendGetReviewListing({
  query,
}: {
  query?: Record<string, string>;
}) {
  const response = await fetch<SiteProductReviewsListing>({
    endpoint: '/v1/site/tire-reviews',
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
