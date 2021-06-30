import { NextApiRequest, NextApiResponse } from 'next';

import {
  backendDeleteMyOrder,
  backendGetMyOrders,
} from '~/lib/backend/account/my-orders';
import {
  backendGetCustomerId,
  extractTokenFromCookie,
} from '~/lib/backend/account/verify-user';
import { backendBootstrap } from '~/lib/backend/bootstrap';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { orderId } = request.query;

  const cookie = request.headers.cookie;
  const ssoToken = await extractTokenFromCookie(String(cookie));

  if (ssoToken) {
    const userId = await backendGetCustomerId(String(ssoToken));
    if (userId) {
      const params = {
        userId: String(userId),
        orderId: String(orderId),
      };
      const orderDeleted = await backendDeleteMyOrder(params);
      if (orderDeleted.isSuccess) {
        const updatedOrders = await backendGetMyOrders({
          userId: String(userId),
          page: '1',
        });
        if (updatedOrders.isSuccess) {
          response.json(updatedOrders.data);
          return;
        }
        response.status(updatedOrders.error.statusCode).end();
      } else {
        response.send(orderDeleted.error);
        return;
      }
    }
  }
};
