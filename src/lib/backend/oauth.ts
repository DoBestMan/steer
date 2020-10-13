/* eslint-disable @typescript-eslint/naming-convention */
import { fetchWithErrorHandling } from '../fetch';

export async function backendOauthToken({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  return await fetchWithErrorHandling<{
    access_token: string;
    expires_in: number;
    token_type: string;
  }>({
    endpoint: '/token',
    formBody: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    },
    method: 'post',
  });
}
