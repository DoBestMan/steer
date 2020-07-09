import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';

import { fetch } from '../fetch';

export async function backendGetReviewListing() {
  const response = await fetch<SiteProductReviewsListing>({
    endpoint: '/v1/site/tire-reviews',
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
