import { NextApiRequest, NextApiResponse } from 'next';

import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendSendCancelRequest } from '~/lib/backend/cancel-request';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { orderId, zip, productId } = request.query;

  const res = await backendSendCancelRequest({
    orderId,
    zip,
    productId,
    body: request.body,
  } as ReturnRequestInput);

  if (res.isSuccess) {
    response.status(204).end();
    return;
  }

  response.status(res.error.statusCode).end();
};
