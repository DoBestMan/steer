import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTireSizeClassicProducts } from '~/lib/backend/catalog/size-classic';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogProducts: SiteCatalogProducts;
  }>,
) => {
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
  response.json(productsRes);
};
