import fetch, { Response } from 'node-fetch';

import { BackendError } from './classes/BackendError';
import { BackendErrorCodes } from './constants/errors';

let apiUrlBase = '';

const currentUserDetails: { region: number | null; zip: string | null } = {
  region: null,
  zip: null,
};

const ErrorByStatus: Record<number, string> = {
  400: BackendErrorCodes.BadRequest,
  401: BackendErrorCodes.Unauthorized,
  403: BackendErrorCodes.Forbidden,
  404: BackendErrorCodes.NotFound,
};

export async function backendFetch<T, U = never>({
  body,
  endpoint,
  includeUserRegion,
  includeUserZip,
  method,
}: {
  body?: U;
  endpoint: string;
  includeUserRegion?: boolean;
  includeUserZip?: boolean;
  method: RequestInit['method'];
}) {
  if (apiUrlBase === '') {
    throw new BackendError(
      BackendErrorCodes.ApiUrlBaseNotConfigured,
      'Backend API not configured',
    );
  }

  const url = new URL(endpoint, apiUrlBase);

  if (includeUserRegion && currentUserDetails.region !== null) {
    url.searchParams.set('userRegion', String(currentUserDetails.region));
  }

  if (includeUserZip && currentUserDetails.zip !== null) {
    url.searchParams.set('userZip', String(currentUserDetails.zip));
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      body: body ? JSON.stringify(body) : undefined,
      method,
    });
  } catch (error) {
    console.error(error);
    throw new BackendError(BackendErrorCodes.NetworkError, error);
  }

  let data: T | null = null;
  try {
    data = (await response.json()) as T;
  } catch (error) {
    console.error(error);
    throw new BackendError(BackendErrorCodes.InvalidJson, error);
  }

  if (response.status < 200 || response.status >= 300) {
    const error = new BackendError(
      ErrorByStatus[response.status] ?? BackendErrorCodes.ServerError,
      `Invalid response status ${response.status}`,
    );
    error.data = data;
    console.error(error);
    throw error;
  }

  return data;
}

export function backendSetApiUrlBase(newApiUrlBase: string) {
  apiUrlBase = newApiUrlBase;
}

export function backendSetUserRegion(region: number | null) {
  currentUserDetails.region = region;
}

export function backendSetUserZip(zip: string | null) {
  currentUserDetails.zip = zip;
}
