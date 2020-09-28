import { NextApiRequest, NextApiResponse } from 'next';

import { SiteGlobals } from '~/data/models/SiteGlobals';
import { backendGetSiteGlobals } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { isProductionDeploy } from '~/lib/utils/deploy';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteGlobals: SiteGlobals;
  }>,
) => {
  backendBootstrap({ request });

  if (isProductionDeploy()) {
    response.setHeader('Cache-control', 's-maxage=60, stale-while-revalidate');
  }

  const res = await backendGetSiteGlobals();

  if (res.isSuccess) {
    response.json(res.data);
    return;
  }

  response.status(res.error.statusCode).end();
};
