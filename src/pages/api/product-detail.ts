import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProduct } from '~/data/models/SiteProduct';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductDetail } from '~/lib/backend/product-detail';
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

  const siteProduct = await backendGetProductDetail({
    brand: brandName,
    productLine,
    query: rest,
  });

  response.json(siteProduct);
};
