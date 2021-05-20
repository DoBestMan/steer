import { NextApiRequest, NextApiResponse } from 'next';

import { SitePrice } from '~/data/models/SitePrice';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteProductPrice } from '~/lib/backend/single-product-pirce';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{ sitePrice: SitePrice }>,
) => {
  backendBootstrap({ request });

  const { id } = getStringifiedParams(request.query);
  const siteProductCountResponse = await backendGetSiteProductPrice(id);
  if (siteProductCountResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    response.json(siteProductCountResponse.data);
    return;
  }

  response.status(siteProductCountResponse.error.statusCode).end();
};
