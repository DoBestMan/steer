import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { apiSendCustomerSupportForm } from '~/lib/backend/customer-support';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  await apiSendCustomerSupportForm(request.body);
  response.status(204).end();
};
