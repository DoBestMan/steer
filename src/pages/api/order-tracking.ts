import { NextApiRequest, NextApiResponse } from 'next';

import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetOrderTracking } from '~/lib/backend/order-tracking';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { orderId, zip } = request.query;

  const order = await backendGetOrderTracking({
    orderId,
    zip,
  } as OrderTrackingInput);

  response.json(order);
};
