import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetVehicleProducts } from '~/lib/backend/catalog/vehicle';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogProducts: any;
  }>,
) => {
  backendBootstrap({ request });

  const { make, model, year, ...rest } = request.query;

  const params: Record<string, string> = {};
  Object.entries(rest).map(([key, value]) => {
    if (typeof value === 'string') {
      params[key] = value;
    }
  });

  const productsRes = await backendGetVehicleProducts({
    make,
    model,
    year,
    query: params,
  });
  response.json(productsRes);
};
