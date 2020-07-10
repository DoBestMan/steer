import { NextApiRequest, NextApiResponse } from 'next';

import { getDiameterCategory } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTireSizeDiameterSummary } from '~/lib/backend/catalog/size-diameter';
import { getStringifiedParams } from '~/lib/utils/routes';

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
    query: getStringifiedParams(rest),
    category,
    diameter,
  });
  response.json(summaryRes);
};
