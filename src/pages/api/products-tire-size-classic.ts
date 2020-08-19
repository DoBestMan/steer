import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTireSizeClassicProducts } from '~/lib/backend/catalog/size-classic';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogProducts: SiteCatalogProducts;
  }>,
) => {
  backendBootstrap({ request });

  const { size, ...rest } = request.query;

  if (!size) {
    console.warn('Tire size is required');
    return;
  }

  const productsResponse = await backendGetTireSizeClassicProducts({
    query: getStringifiedParams(rest),
    size,
  });

  if (productsResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }
    response.json(productsResponse.data);
    return;
  }
  response.status(productsResponse.error.statusCode).end();
};
