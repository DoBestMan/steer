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
        response.json(await backendGetUserSearchHistory(userSessionId));
      }
      break;
    }
    case 'post': {
      const userSessionId = getAndCheckUserSessionId(request, response);
      if (userSessionId) {
        response.json(
          await backendAddUserSearchHistory(userSessionId, request.body),
        );
      }
      break;
    }
    case 'delete': {
      const userSessionId = getAndCheckUserSessionId(request, response);
      if (userSessionId) {
        await backendDeleteUserSearchHistory(userSessionId);
        response.status(204).end();
      }
      break;
    }
    default:
      response.status(400).end();
      break;
  }
};
