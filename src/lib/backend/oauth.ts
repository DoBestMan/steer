/* eslint-disable @typescript-eslint/camelcase */
import { fetch } from '../fetch';

export async function backendOauthToken({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  const response = await fetch<
    {
      access_token: string;
      expires_in: number;
      token_type: string;
    },
    {
      client_id: string;
      client_secret: string;
      grant_type: 'client_credentials';
    }
  >({
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    },
    endpoint: '/token',
    method: 'post',
  });

  return {
    clientToken: response.access_token,
    expiresOn: new Date(Date.now() + response.expires_in * 1000),
  };
}