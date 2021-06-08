import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteCompareProductsResult } from '~/lib/backend/catalog/products/compare';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  const { productId, compareProductIds } = getStringifiedParams(request.query);

  const params: Record<string, string> = { compareProductIds };
  const siteCompareProductsResultResponse = await backendGetSiteCompareProductsResult(
    {
      productId,
      query: params,
    },
  );

  if (siteCompareProductsResultResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    response.json(siteCompareProductsResultResponse.data);
    return;
  }

  response.status(siteCompareProductsResultResponse.error.statusCode).end();
};
