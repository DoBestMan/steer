import { setCookie } from 'nookies';
import { Cookies } from 'react-cookie';

import { SSO_CONSTANTS, SSO_COOKIE_CONSTANTS } from '~/lib/constants/sso';

import { ROUTE_MAP, ROUTES } from '../constants';
import { URLS } from '../constants/urls';
import { isClient } from '../helpers/browser';
import { isProductionDeploy } from './deploy';

const cookies = new Cookies();

export function createRedirectURIParam(hostName: string) {
  const urlProtocol = hostName.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${urlProtocol}://${hostName}/account`;
  cookies.set(SSO_COOKIE_CONSTANTS.ACCOUNT_REDIRECT, redirectUri);
  return redirectUri;
}

export function createCSRFToken() {
  const csrfInCookie = cookies.get(SSO_COOKIE_CONSTANTS.SIMPLETIRE_CSRF);
  if (!csrfInCookie) {
    const csrfToken = Array(32)
      .fill(0)
      .map(() => Math.random().toString(36).charAt(2))
      .join('');
    cookies.set(SSO_COOKIE_CONSTANTS.SIMPLETIRE_CSRF, csrfToken);
    return csrfToken;
  }
  return csrfInCookie;
}

export function getSSOBaseURL(): string {
  return isProductionDeploy() ? URLS.SSO_PRODUCTION : URLS.SSO_INTEGRATION;
}

export function getSSOLoginURL(): string {
  const ssoTokenInCookie = cookies.get(SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO);

  if (ssoTokenInCookie) {
    return ROUTE_MAP[ROUTES.USER_ACCOUNT];
  } else {
    const hostName = isClient() ? window.location.host : '';
    if (hostName) {
      const basePath = `${getSSOBaseURL()}/authorize-client`;

      const queryParams = new URLSearchParams();
      const csrfToken = createCSRFToken();
      if (csrfToken) {
        queryParams.append('state', csrfToken);
      }
      queryParams.append('response_type', SSO_CONSTANTS.RESPONSE_TYPE);
      queryParams.append('approval_prompt', SSO_CONSTANTS.APPROVAL_PROMPT);
      queryParams.append('client_id', SSO_CONSTANTS.CLIENT_ID);
      const urlWithoutRedirectURI = [basePath, queryParams.toString()].join(
        '?',
      );
      const redirectURI = `${urlWithoutRedirectURI}&redirect_uri=${encodeURIComponent(
        createRedirectURIParam(hostName),
      )}`;
      cookies.set(SSO_COOKIE_CONSTANTS.LOGIN_SSO, redirectURI);
      setCookie(null, SSO_COOKIE_CONSTANTS.LOGIN_SSO, redirectURI.toString(), {
        maxAge: 86400 * 30,
        path: '/',
        secure: false,
        domain: SSO_COOKIE_CONSTANTS.DOMAIN,
      });
      return redirectURI;
    }
    return '';
  }
}

export function getSSORedirectURL(path: string): string {
  let hostName = '';
  if (isClient()) {
    hostName = window.location.host;
  }
  if (hostName) {
    const basePath = `${getSSOBaseURL()}/${path}`;
    let redirectParam = '';
    if (path === SSO_CONSTANTS.LOGOUT) {
      const urlProtocol = hostName.includes('localhost') ? 'http' : 'https';
      redirectParam = `${urlProtocol}://${hostName}`;
    } else {
      redirectParam = createRedirectURIParam(hostName);
    }
    const redirectUri = new URL(basePath);
    redirectUri.search = `redirectUri=${encodeURIComponent(redirectParam)}`;
    return redirectUri.href;
  }
  return '';
}

export function saveTokenInCookie(token: string) {
  if (token) {
    cookies.set(SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO, token);
  }
  return;
}

export async function deleteSSOParamsFromCookie() {
  await cookies.remove(SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO);
  await cookies.remove(SSO_COOKIE_CONSTANTS.SIMPLETIRE_CSRF);
  await cookies.remove(SSO_COOKIE_CONSTANTS.LOGIN_SSO);
  await cookies.remove(SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO, {
    path: '/',
    domain: SSO_COOKIE_CONSTANTS.DOMAIN,
  });
  await setCookie(null, SSO_COOKIE_CONSTANTS.LOGIN_SSO, '', {
    maxAge: 86400 * 30,
    path: '/',
    secure: false,
    domain: SSO_COOKIE_CONSTANTS.DOMAIN,
  });
}

export function hideParamsReturnedFromSSO() {
  if (isClient()) {
    window.history.replaceState({}, '', '/account');
  }
}

export function checkSSOTokenInCookie() {
  const ssoTokenInCookie = cookies.get(SSO_COOKIE_CONSTANTS.SIMPLETIRE_SSO);
  return ssoTokenInCookie ? true : false;
}

export function redirectForMobile() {
  window.location.href = getSSOLoginURL();
}
