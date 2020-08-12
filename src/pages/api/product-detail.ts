import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProduct } from '~/data/models/SiteProduct';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductDetail } from '~/lib/backend/product-detail';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteProduct>,
) => {
  backendBootstrap({ request });

  const { brand, productLine, ...rest } = getStringifiedParams(request.query);
  const brandName = removeTireFromQueryParam(brand);

  const params: Record<string, string> = {};
  Object.entries(rest).map(([key, value]) => {
    if (typeof value === 'string') {
      params[key] = value;
    }
  });

  const siteProductResponse = await backendGetProductDetail({
    brand: brandName,
    productLine,
    query: rest,
  });

  if (siteProductResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    response.json(siteProductResponse.data);
    return;
  }

  response.status(siteProductResponse.error.statusCode).end();
};
