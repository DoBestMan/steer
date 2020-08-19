import { NextApiRequest, NextApiResponse } from 'next';

import { getDiameterCategory } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTireSizeDiameterSummary } from '~/lib/backend/catalog/size-diameter';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';
import {
  removeInchFromQueryParam,
  removeTireFromQueryParam,
} from '~/lib/utils/string';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogSummary: SiteCatalogSummary;
  }>,
) => {
  backendBootstrap({ request });

  const { size, ...rest } = request.query;
  const { category, diameter } = getDiameterCategory(size);

  if (!category || !diameter) {
    console.warn('Category and diameter are required');
    return;
  }

  const summaryRes = await backendGetTireSizeDiameterSummary({
    category: removeTireFromQueryParam(category),
    diameter: removeInchFromQueryParam(diameter),
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
