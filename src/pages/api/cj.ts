import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { backendBootstrap } from '~/lib/backend/bootstrap';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { cjevent } = request.query;
  //Set CJ Affiliate cookie. FND-600
  const CJ_CONSTANT = {
    COOKIE_NAME: 'cje',
    DOMAIN: '.simpletire.com',
  };
  if (cjevent) {
    response.setHeader(
      'Set-Cookie',
      serialize(CJ_CONSTANT.COOKIE_NAME, cjevent.toString(), {
        maxAge: 86400 * 395,
        path: '/',
        secure: true,
        domain: CJ_CONSTANT.DOMAIN,
      }),
    );
    response.status(204).end();
  }
  response.status(500).end();
};
