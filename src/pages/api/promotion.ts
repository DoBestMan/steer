import { NextApiRequest, NextApiResponse } from 'next';

import { backendGetSitePromotionName } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    promotionName: string;
  }>,
) => {
  backendBootstrap({ request });

  const { promotion } = getStringifiedParams(request.query);

  if (isProductionDeploy()) {
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  }

  const sitePromotion = await backendGetSitePromotionName(Number(promotion));
  if (sitePromotion.isSuccess) {
    response.json(sitePromotion.data);
    return;
  }
  response.status(sitePromotion.error.statusCode).end();
};
