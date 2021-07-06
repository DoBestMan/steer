import { NextApiRequest, NextApiResponse } from 'next';

import { SiteBrandDetails } from '~/data/models/SiteBrandDetails';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteBrandDetails } from '~/lib/backend/brand-details';
import { isProductionDeploy } from '~/lib/utils/deploy';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteBrandDetails>,
) => {
  backendBootstrap({ request });

  const { brandName } = request.query;

  const siteBrandDetails = await backendGetSiteBrandDetails(
    brandName as string,
  );

  if (siteBrandDetails.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }

    response.json(siteBrandDetails.data);
    return;
  }

  response.status(siteBrandDetails.error.statusCode).end();
};
