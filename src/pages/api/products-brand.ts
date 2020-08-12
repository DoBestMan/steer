import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetBrandProducts } from '~/lib/backend/catalog/brand';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { brand, categoryOrType, ...rest } = request.query;

  if (!brand || !categoryOrType) {
    console.warn('Brand name and category or type are required');
  }

  const productsRes = await backendGetBrandProducts({
    brand,
    category: categoryOrType,
    query: getStringifiedParams(rest),
  });

  if (isProductionDeploy()) {
    response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  }

  response.json(productsRes);
};
