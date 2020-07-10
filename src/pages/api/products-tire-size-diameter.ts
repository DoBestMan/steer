import { NextApiRequest, NextApiResponse } from 'next';

import { getDiameterCategory } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTireSizeDiameterProducts } from '~/lib/backend/catalog/size-diameter';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogProducts: SiteCatalogProducts;
  }>,
) => {
  backendBootstrap({ request });

  const { size, ...rest } = request.query;
  const { category, diameter } = getDiameterCategory(size);

  if (!category || !diameter) {
    console.warn('Category and diameter are required');
    return;
  }

  const productsRes = await backendGetTireSizeDiameterProducts({
    query: getStringifiedParams(rest),
    category,
    diameter,
  });
  response.json(productsRes);
};
