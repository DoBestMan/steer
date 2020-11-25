import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { apiSendCustomerSupportForm } from '~/lib/backend/customer-support';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  const res = await apiSendCustomerSupportForm(request.body);
  if (res.isSuccess) {
    response.status(204).end();
    return;
  }

  response.status(res.error.statusCode).end();
};
