import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendPostProductReview } from '~/lib/backend/write-review';
import { removeTireFromQueryParam } from '~/lib/utils/string';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  const { brand, productLine } = request.query;
  const brandName = removeTireFromQueryParam(brand);

  const res = await backendPostProductReview({
    brand: brandName,
    productLine,
    input: request.body,
  });

  if (res.isSuccess) {
    response.status(204).end();
    return;
  }

  response.status(res.error.statusCode).end();
};
