import { NextApiRequest, NextApiResponse } from 'next';

import { UserHistorySearch } from '~/data/models/UserHistorySearch';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendAddUserSearchHistory,
  backendDeleteUserSearchHistory,
  backendGetUserSearchHistory,
} from '~/lib/backend/users';
import { getAndCheckUserSessionId } from '~/lib/utils/api';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<UserHistorySearch>,
) => {
  backendBootstrap({ request });

  switch (request.method?.toLowerCase()) {
    case 'get': {
      const userSessionId = getAndCheckUserSessionId(request, response);
      if (userSessionId) {
        const res = await backendGetUserSearchHistory(userSessionId);
        if (res.isSuccess) {
          response.json(res.data);
          return;
        }

        response.status(res.error.statusCode).end();
      }
      break;
    }
    case 'post': {
      const userSessionId = getAndCheckUserSessionId(request, response);
      if (userSessionId) {
        const res = await backendAddUserSearchHistory(
          userSessionId,
          request.body,
        );

        if (res.isSuccess) {
          response.json(res.data);
          return;
        }

        response.status(res.error.statusCode).end();
      }
      break;
    }
    case 'delete': {
      const userSessionId = getAndCheckUserSessionId(request, response);
      if (userSessionId) {
        const res = await backendDeleteUserSearchHistory(userSessionId);

        if (res.isSuccess) {
          response.status(204).end();
          return;
        }

        response.status(res.error.statusCode).end();
      }
      break;
    }
    default:
      response.status(400).end();
      break;
  }
};
