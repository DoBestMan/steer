import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReturnReasons } from '~/lib/backend/return-reasons';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const res = await backendGetReturnReasons();

  if (res.isSuccess) {
    response.json(res.data);
    return;
  }

  response.status(res.error.statusCode).end();
};
