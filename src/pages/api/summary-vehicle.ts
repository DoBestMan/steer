import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetVehicleSummary } from '~/lib/backend/summary-vehicle';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogSummary: SiteCatalogSummary;
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

  const siteCatalogSummary = await backendGetVehicleSummary({
    make,
    model,
    year,
    query: params,
  });
  response.json(siteCatalogSummary);
};
