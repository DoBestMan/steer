import { NextApiRequest, NextApiResponse } from 'next';

import { ProductCount } from '~/data/ProductCount';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteBrandProductCount } from '~/lib/backend/product-count';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<ProductCount>,
) => {
  backendBootstrap({ request });

  const { brand } = getStringifiedParams(request.query);
  const brandName = removeTireFromQueryParam(brand);
  const siteProductCountResponse = await backendGetSiteBrandProductCount(
    brandName,
  );
  if (siteProductCountResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    response.json(siteProductCountResponse.data);
    return;
  }

  response.status(siteProductCountResponse.error.statusCode).end();
};
