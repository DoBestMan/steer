import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetVehicleSummary } from '~/lib/backend/catalog/vehicle';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogSummary: SiteCatalogSummary;
  }>,
) => {
  backendBootstrap({ request });

  const { make, model, year, ...rest } = request.query;

  if (!make || !model || !year) {
    console.warn('Make, model, and year are required');
  }

  const siteCatalogSummary = await backendGetVehicleSummary({
    make,
    model,
    year,
    query: getStringifiedParams(rest),
  });
  response.json(siteCatalogSummary);
};
