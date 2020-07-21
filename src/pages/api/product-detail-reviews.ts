import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductReviews } from '~/lib/backend/product-detail';
import { getStringifiedParams } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteProductReviews>,
) => {
  backendBootstrap({ request });

  const { brand, productLine, ...rest } = request.query;
  const brandName = removeTireFromQueryParam(brand);

  const siteProductReviews = await backendGetProductReviews({
    brand: brandName,
    query: getStringifiedParams(rest),
    productLine,
  });

  response.json(siteProductReviews);
};
