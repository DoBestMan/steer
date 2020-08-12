import { NextApiRequest, NextApiResponse } from 'next';

import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { backendGetSiteHome } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { isProductionDeploy } from '~/lib/utils/deploy';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteHero: SiteHero;
    siteInsights: SiteInsights;
  }>,
) => {
  backendBootstrap({ request });

  if (isProductionDeploy()) {
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  }

  const siteHome = await backendGetSiteHome();
  response.json(siteHome);
};
