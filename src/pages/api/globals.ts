import { NextApiRequest, NextApiResponse } from 'next';

import { SiteGlobals } from '~/data/models/SiteGlobals';
import { backendGetSiteGlobals } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteGlobals: SiteGlobals;
  }>,
) => {
  backendBootstrap({ request });

  response.setHeader(
    'Cache-control',
    's-maxage=3600, stale-while-revalidate=60',
  );

  const siteGlobals = await backendGetSiteGlobals();
  response.json(siteGlobals);
};
