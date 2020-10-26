import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';
import { apiSendTireInstallerForm } from '~/lib/backend/tire-installer-registration';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });

  await apiSendTireInstallerForm(request.body);
  response.status(204).end();
};
