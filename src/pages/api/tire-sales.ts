import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { apiTireSalesForm } from '~/lib/backend/tire-sales';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  await apiTireSalesForm(request.body);
  response.status(204).end();
};
