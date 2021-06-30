import { SSOTokenResponse } from '~/lib/constants/sso.types';
import { fetchFromSSO } from '~/lib/fetch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function backendGetSSOToken(body: any) {
  const response = await fetchFromSSO<null, SSOTokenResponse>({
    endpoint: '/token',
    method: 'post',
    includeAuthorization: false,
    formBody: body,
  });
  return response;
}
