import { NextApiRequest, NextApiResponse } from 'next';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendUpdateUserPersonalization } from '~/lib/backend/users';
import { getUserSessionId } from '~/lib/utils/api';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<UserPersonalization | string>,
) => {
  backendBootstrap({ request });

  switch (request.method?.toLowerCase()) {
    case 'put': {
      const userSessionId = getUserSessionId(request);
      if (!userSessionId) {
        console.error('Invalid authentication');
        response.status(500).end();
        return;
      }

      const { userLocationGooglePlacesId, userLocationZip } = request.body;

      const res = await backendUpdateUserPersonalization({
        userLocationGooglePlacesId: String(userLocationGooglePlacesId),
        userLocationZip: String(userLocationZip),
        userSessionId,
      });

      if (res.isSuccess) {
        response.json(res.data.userPersonalization);
        return;
      }

      response.status(res.error.statusCode).end();
      return;
    }
  }

  response.status(400).send('Bad Request');
};
