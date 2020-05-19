import { NextApiRequest, NextApiResponse } from 'next';

import { SiteMenu } from '~/data/models/SiteMenu';
import { backendGetSiteMenu } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteMenu>,
) => {
  backendBootstrap({ request });

  response.setHeader(
    'Cache-control',
    's-maxage=3600, stale-while-revalidate=60',
  );

  const siteMenu = await backendGetSiteMenu();
  response.json(siteMenu);
};
