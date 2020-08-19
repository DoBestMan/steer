import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetBrandSummary } from '~/lib/backend/catalog/brand';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogSummary: SiteCatalogSummary;
  }>,
) => {
  backendBootstrap({ request });
  const { brand, categoryOrType, ...rest } = request.query;

  if (!brand || !categoryOrType) {
    console.warn('Brand name and category or type are required');
  }

  const summaryRes = await backendGetBrandSummary({
    brand,
    category: categoryOrType,
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
