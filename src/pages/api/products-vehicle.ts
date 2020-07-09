import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetVehicleProducts } from '~/lib/backend/catalog/vehicle';
import { getParam, getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogProducts: SiteCatalogProducts;
  }>,
) => {
  backendBootstrap({ request });
  const { make, model, year, ...rest } = request.query;

  if (!make || !model || !year) {
    console.warn('Make, model, and year are required');
  }

  const productsRes = await backendGetVehicleProducts({
    make: getParam(make).replace('-tires', ''),
    model,
    year,
    query: getStringifiedParams(rest),
  });
  response.json(productsRes);
};
