import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProduct } from '~/data/models/SiteProduct';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductDetail } from '~/lib/backend/product-detail';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteProduct>,
) => {
  backendBootstrap({ request });

  const { brandName, productLine, ...rest } = request.query;
  const brand = brandName.toString().replace(/-tire/g, '');

  const params: Record<string, string> = {};
  Object.entries(rest).map(([key, value]) => {
    if (typeof value === 'string') {
      params[key] = value;
    }
  });

  const siteProduct = await backendGetProductDetail({
    brand,
    productLine,
    query: params,
  });
  response.json(siteProduct);
};