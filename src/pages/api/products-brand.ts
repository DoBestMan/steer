import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetBrandProducts } from '~/lib/backend/catalog/brand';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogProducts: SiteCatalogProducts;
  }>,
) => {
  backendBootstrap({ request });
  const { brand, categoryOrType, ...rest } = request.query;

  if (!brand || !categoryOrType) {
    console.warn('Brand name and category or type are required');
  }

  const productsRes = await backendGetBrandProducts({
    brand,
    category: categoryOrType,
    query: getStringifiedParams(rest),
  });
  response.json(productsRes);
};