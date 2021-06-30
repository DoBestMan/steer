import { NextApiRequest, NextApiResponse } from 'next';

import { backendGetMyVehicle } from '~/lib/backend/account/my-vehicle';
import {
  backendGetCustomerId,
  extractTokenFromCookie,
} from '~/lib/backend/account/verify-user';
import { backendBootstrap } from '~/lib/backend/bootstrap';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  const cookie = request.headers.cookie;
  const ssoToken = await extractTokenFromCookie(String(cookie));

  if (ssoToken) {
    const userId = await backendGetCustomerId(String(ssoToken));
    if (userId) {
      const res = await backendGetMyVehicle(String(userId));
      if (res.isSuccess) {
        response.json(res.data);
        return;
      }

      response.status(res.error.statusCode).end();
    }
  }
  response.status(404).end();
};
