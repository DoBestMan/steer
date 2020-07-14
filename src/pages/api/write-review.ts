import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendPostProductReview } from '~/lib/backend/write-review';
import { removeTireFromQueryParam } from '~/lib/utils/string';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  const { brand, productLine } = request.query;
  const brandName = removeTireFromQueryParam(brand);

  await backendPostProductReview({
    brand: brandName,
    productLine,
    input: request.body,
  });
  response.status(204).end();
};
