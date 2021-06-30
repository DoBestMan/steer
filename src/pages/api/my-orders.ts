import { NextApiRequest, NextApiResponse } from 'next';

import { backendGetMyOrders } from '~/lib/backend/account/my-orders';
import {
  backendGetCustomerId,
  extractTokenFromCookie,
} from '~/lib/backend/account/verify-user';
import { backendBootstrap } from '~/lib/backend/bootstrap';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { page } = request.query;
  const cookie = request.headers.cookie;
  const ssoToken = await extractTokenFromCookie(String(cookie));

  if (ssoToken) {
    const userId = await backendGetCustomerId(String(ssoToken));
    if (userId) {
      const inputParams = {
        userId: String(userId),
        page: String(page),
      };
      const res = await backendGetMyOrders(inputParams);
      if (res.isSuccess) {
        response.json(res.data);
        return;
      }
      response.status(res.error.statusCode).end();
    }
  }

  response.status(404).end();
};
