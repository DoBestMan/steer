import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendSubscribeNewsletter } from '~/lib/backend/subscribe-newsletter';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  await backendSubscribeNewsletter(request.body);
  response.status(204).end();
};
