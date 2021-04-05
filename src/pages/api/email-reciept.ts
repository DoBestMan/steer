import { NextApiRequest, NextApiResponse } from 'next';

import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendSendEmailReciept } from '~/lib/backend/email-reciept';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { orderId, zip } = request.query;
  const res = await backendSendEmailReciept({
    orderId,
    zip,
  } as OrderTrackingInput);

  if (res.isSuccess) {
    response.status(204).end();
    return;
  }

  response.status(res.error.statusCode).end();
};
