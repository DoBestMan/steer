import nativeFetch from 'isomorphic-unfetch';

import { UserPersonalization } from '~/data/models/UserPersonalization';

import { FetchError, FetchErrorCodes } from './FetchError';

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
  params: Record<string, string>,
  query: Record<string, string>,
) {
  const pathWithParams = path.replace(/\{([^}]+)\}/g, (_, key: string) => {
    return params[key];
  });

  const searchParams = new URLSearchParams(query).toString();
  return pathWithParams + (searchParams ? `?${searchParams}` : '');
}

export async function fetch<T, U = never>({
  authorizationFunctionRetriesLeft = 1,
  body,
  endpoint,
  includeAuthorization,
  includeUserRegion,
  includeUserZip,
  method,
  params = {},
  query = {},
}: {
  authorizationFunctionRetriesLeft?: number;
  body?: U;
  endpoint: string;
  includeAuthorization?: boolean;
  includeUserRegion?: boolean;
  includeUserZip?: boolean;
  method: RequestInit['method'];
  params?: Record<string, string>;
  query?: Record<string, string>;
}): Promise<T> {
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

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  let response: Response;
  try {
    const url = buildUrl(`${urlBase}${endpoint}`, params, query);
    response = await nativeFetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method,
    });
  } catch (error) {
    console.error(error);
    throw new FetchError(FetchErrorCodes.NetworkError, error);
  }

  let data: T | null = null;
  try {
    data = (await response.json()) as T;
  } catch (error) {
    console.error(error);
    throw new FetchError(FetchErrorCodes.InvalidJson, error);
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
        body,
        endpoint,
        includeAuthorization,
        includeUserRegion,
        includeUserZip,
        method,
        params,
        query,
      });
    }

    const error = new FetchError(
      ErrorByStatus[response.status] ?? FetchErrorCodes.ServerError,
      `Invalid response status ${response.status}`,
    );
    error.data = data;
    console.error(error);
    throw error;
  }

  return data;
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
