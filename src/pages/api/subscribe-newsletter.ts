import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendSubscribeNewsletter } from '~/lib/backend/subscribe-newsletter';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  const res = await backendSubscribeNewsletter(request.body);

  if (res.isSuccess) {
    response.status(204).end();
    return;
  }

  response.status(res.error.statusCode).end();
};
