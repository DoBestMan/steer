import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteProductReviewsListing>,
) => {
  backendBootstrap({ request });

  const siteProductReviews = await backendGetReviewListing({
    query: getStringifiedParams(request.query),
  });

  response.json(siteProductReviews);
};
