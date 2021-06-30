import { UserData } from '~/data/models/UserData';
import { SSO_COOKIE_CONSTANTS } from '~/lib/constants/sso';
import {
  ServiceUserIdInput,
  SSOUserIdResponse,
} from '~/lib/constants/sso.types';
import { fetchFromSSO, fetchWithErrorHandling } from '~/lib/fetch';

export interface UserIdType {
  userId: string;
}

export async function extractTokenFromCookie(cookieHeader: string) {
  const cookie = SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO;
  let cookie_value;
  const i = cookieHeader.indexOf(cookie + '=');
  if (i != -1) {
    const eq = i + cookie.length + 1;
    const end = cookieHeader.indexOf(';', eq);
    cookie_value = cookieHeader.substring(eq, end == -1 ? undefined : end);
  }
  return cookie_value;
}

export async function backendGetUserIdFromSSOToken(token: string) {
  const response = await fetchFromSSO({
    endpoint: '/api/me',
    method: 'get',
    includeAuthorization: true,
    ssoToken: token,
  });
  if (response.isSuccess && response.data) {
    const data = response.data as SSOUserIdResponse;
    return data;
  }
  return null;
}

export async function backendGetCustomerId(token: string) {
  const dataFromSSO: SSOUserIdResponse | null = await backendGetUserIdFromSSOToken(
    token,
  );

  if (dataFromSSO) {
    const { uid, username, firstName, lastName } = dataFromSSO;
    let body: ServiceUserIdInput = {
      ssoUid: uid,
      email: username,
    };
    if (firstName && lastName) {
      body = { ...body, firstName, lastName };
    }

    const responseFromService = await fetchWithErrorHandling({
      endpoint: '/v2/customers',
      method: 'post',
      includeAuthorization: true,
      jsonBody: body,
    });
    if (responseFromService.isSuccess) {
      const userData = responseFromService.data as UserData;
      return userData.id;
    }
  }

  return null;
}
