import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductReviews } from '~/lib/backend/product-detail';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteProductReviews>,
) => {
  backendBootstrap({ request });

  const { brand, productLine, ...rest } = getStringifiedParams(request.query);
  const brandName = removeTireFromQueryParam(brand);

  const siteProductReviewsResponse = await backendGetProductReviews({
    brand: brandName,
    query: rest,
    productLine,
  });

  if (siteProductReviewsResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    response.json(siteProductReviewsResponse.data);
    return;
  }

  response.status(siteProductReviewsResponse.error.statusCode).end();
};
