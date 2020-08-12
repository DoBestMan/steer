import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTireSizeClassicProducts } from '~/lib/backend/catalog/size-classic';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  const { size, ...rest } = request.query;

  if (!size) {
    console.warn('Tire size is required');
    return;
  }

  const productsRes = await backendGetTireSizeClassicProducts({
    query: getStringifiedParams(rest),
    size,
  });

  if (isProductionDeploy()) {
    response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  }

  response.json(productsRes);
};
