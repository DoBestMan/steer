import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetVehicleProducts } from '~/lib/backend/catalog/vehicle';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{ siteCatalogProducts: SiteCatalogProducts }>,
) => {
  backendBootstrap({ request });
  const { make, model, year, ...rest } = request.query;

  if (!make || !model || !year) {
    console.warn('Make, model, and year are required');
  }

  const productsResponse = await backendGetVehicleProducts({
    make,
    model,
    year,
    query: getStringifiedParams(rest),
  });

  if (productsResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    if (!productsResponse.data) {
      response.status(204).end();
      return;
    }
    response.json(productsResponse.data);
    return;
  }
  response.status(productsResponse.error.statusCode).end();
};
