import { NextApiRequest, NextApiResponse } from 'next';

import { backendDeleteMyVehicle } from '~/lib/backend/account/my-vehicle';
import {
  backendGetCustomerId,
  extractTokenFromCookie,
} from '~/lib/backend/account/verify-user';
import { backendBootstrap } from '~/lib/backend/bootstrap';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { vehicleId } = request.query;

  const cookie = request.headers.cookie;
  const ssoToken = await extractTokenFromCookie(String(cookie));

  if (ssoToken) {
    const userId = await backendGetCustomerId(String(ssoToken));
    if (userId) {
      const params = {
        userId: String(userId),
        vehicleId: String(vehicleId),
      };
      const res = await backendDeleteMyVehicle(params);
      if (res.isSuccess) {
        response.json(res.data);
        return;
      }

      response.status(res.error.statusCode).end();
    }
  }
};
