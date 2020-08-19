import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetVehicleSummary } from '~/lib/backend/catalog/vehicle';
import { isProductionDeploy } from '~/lib/utils/deploy';
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

  const summaryRes = await backendGetVehicleSummary({
    make,
    model,
    year,
    query: getStringifiedParams(rest),
  });

  if (!summaryRes.isSuccess) {
    response.status(summaryRes.error.statusCode).end();
    return;
  }
  if (isProductionDeploy()) {
    response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  }
  response.json(summaryRes.data);
};
