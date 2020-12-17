import { SiteSession } from '~/data/models/SiteSession';
import { UserPersonalization } from '~/data/models/UserPersonalization';

import { FetchError, FetchErrorCodes } from './FetchError';
import { AsyncResponse } from './index.types';

let authorizationExpiration: Date | null = null;
let authorizationHeader: string | null = null;
let authorizationFunction: (() => Promise<void>) | null = null;
let urlBase = '';

let currentUserPersonalization: UserPersonalization = {
  gaClientId: null,
  userLocation: null,
};

const ErrorByStatus: Record<number, string> = {
  400: FetchErrorCodes.BadRequest,
  401: FetchErrorCodes.Unauthorized,
  403: FetchErrorCodes.Forbidden,
  404: FetchErrorCodes.NotFound,
};

function buildUrl(
  path: string,
  params: Record<string, string | string[]>,
  query: Record<string, string>,
) {
  const pathWithParams = path.replace(/\{([^}]+)\}/g, (_, key: string) => {
    return encodeURIComponent(params[key].toString());
  });

  const searchParams = new URLSearchParams(query).toString();
  return pathWithParams + (searchParams ? `?${searchParams}` : '');
}

interface FetchProps<U> {
  authorizationFunctionRetriesLeft?: number;
  endpoint: string;
  formBody?: Record<string, string>;
  includeAuthorization?: boolean;
  includeUserRegion?: boolean;
  includeUserZip?: boolean;
  jsonBody?: U;
  method: RequestInit['method'];
  params?: Record<string, string | string[]>;
  query?: Record<string, string>;
  signal?: AbortSignal;
  siteSession?: SiteSession;
}

export async function fetch<T, U = never>({
  authorizationFunctionRetriesLeft = 1,
  jsonBody,
  formBody,
  endpoint,
  includeAuthorization,
  includeUserRegion,
  includeUserZip,
  method,
  params = {},
  query = {},
  signal,
  siteSession,
}: FetchProps<U>): Promise<T> {
  const global = typeof globalThis !== undefined ? globalThis : window;
  if (urlBase === '') {
    throw new FetchError(
      FetchErrorCodes.UrlBaseNotConfigured,
      'fetch API not configured',
    );
  }

  if (includeUserRegion && currentUserPersonalization.userLocation?.region) {
    query.userRegion = String(currentUserPersonalization.userLocation.region);
  }

  if (includeUserZip && currentUserPersonalization.userLocation?.zip) {
    query.userZip = currentUserPersonalization.userLocation.zip;
  }
  if (siteSession) {
    authorizationHeader = 'Bearer ' + siteSession.access_token;
    authorizationExpiration = new Date(
      Date.now() + siteSession.expires_in * 1000,
    );
  }
  const hasAuthorizationHeader = Boolean(authorizationHeader);
  const isAuthorizationExpired =
    authorizationExpiration !== null && Date.now() >= +authorizationExpiration;
  if (
    includeAuthorization &&
    authorizationFunction &&
    (!hasAuthorizationHeader || isAuthorizationExpired)
  ) {
    await authorizationFunction();
  }

  const headers: Record<string, string> = {};
  if (includeAuthorization && authorizationHeader) {
    headers.Authorization = authorizationHeader;
  }

  let body;

  if (jsonBody) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(jsonBody);
  } else if (formBody) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    body = new URLSearchParams(formBody).toString();
  }

  let response: Response;
  try {
    const url = buildUrl(`${urlBase}${endpoint}`, params, query);
    response = await global.fetch(url, {
      body,
      headers,
      method,
      signal,
    });
  } catch (error) {
    console.error(error);

    throw new FetchError(
      FetchErrorCodes[error.name] || FetchErrorCodes.NetworkError,
      error,
    );
  }

  let data: T | null = null;
  try {
    data = (await response.json()) as T;
  } catch (error) {
    if (response.status !== 204 && response.status !== 404) {
      console.error(error);
      throw new FetchError(FetchErrorCodes.InvalidJson, error);
    }
  }

  if (response.status < 200 || response.status >= 300) {
    if (
      response.status === 401 &&
      includeAuthorization &&
      authorizationFunction &&
      authorizationFunctionRetriesLeft > 0
    ) {
      await authorizationFunction();

      return fetch<T, U>({
        authorizationFunctionRetriesLeft: authorizationFunctionRetriesLeft - 1,
        endpoint,
        formBody,
        includeAuthorization,
        includeUserRegion,
        includeUserZip,
        jsonBody,
        method,
        params,
        query,
        signal,
      });
    }

    const error = new FetchError(
      ErrorByStatus[response.status] ?? FetchErrorCodes.ServerError,
      `Invalid response status ${response.status}`,
    );
    error.data = data;
    error.statusCode = response.status;

    // avoid logging 404s to keep logs clean
    if (response.status !== 404) {
      console.error(error);
    }

    throw error;
  }

  return data as T;
}

export async function fetchWithErrorHandling<T, U = never>(
  props: FetchProps<U>,
): Promise<AsyncResponse<T>> {
  try {
    const data = await fetch<T, U>(props);
    return {
      data,
      isSuccess: true,
    };
  } catch (e) {
    return {
      error: {
        code: e.code,
        message: e.message,
        statusCode: e.statusCode || 500,
      },
      isSuccess: false,
    };
  }
}

export function fetchGetUserPersonalization() {
  return currentUserPersonalization;
}

export function fetchSetAuthorizationHeader(
  newAuthorizationHeader: string | null,
) {
  authorizationHeader = newAuthorizationHeader;
}

export function fetchSetAuthorizationExpiration(
  newAuthorizationExpiration: Date | null,
) {
  authorizationExpiration = newAuthorizationExpiration;
}

export function fetchSetAuthorizationFunction(
  newAuthorizationFunction: (() => Promise<void>) | null,
) {
  authorizationFunction = newAuthorizationFunction;
}

export function fetchSetAuthorizationToken(
  newAuthorizationToken: string | null,
  expiresOn: Date | null,
) {
  fetchSetAuthorizationHeader(`Bearer ${newAuthorizationToken}`);
  fetchSetAuthorizationExpiration(expiresOn);
}

export function fetchSetUrlBase(newUrlBase: string) {
  urlBase = newUrlBase;
}

export function fetchSetUserPersonalization(
  userPersonalization: UserPersonalization,
) {
  currentUserPersonalization = userPersonalization;
}
