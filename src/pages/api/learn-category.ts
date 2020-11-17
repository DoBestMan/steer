import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetLearnByCategory } from '~/lib/backend/learn-category';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { category, ...rest } = getStringifiedParams(request.query);

  const params: Record<string, string> = {};
  Object.entries(rest).map(([key, value]) => {
    if (typeof value === 'string') {
      params[key] = value;
    }
  });

  const siteLearnByCategoryResponse = await backendGetLearnByCategory({
    category,
    query: rest,
  });

  if (siteLearnByCategoryResponse.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    response.json(siteLearnByCategoryResponse.data);
    return;
  }

  response.status(siteLearnByCategoryResponse.error.statusCode).end();
};
