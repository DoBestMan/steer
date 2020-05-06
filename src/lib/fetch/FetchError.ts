export const FetchErrorCodes = {
  BadRequest: 'BadRequest',
  Forbidden: 'Forbidden',
  InvalidJson: 'InvalidJson',
  NetworkError: 'NetworkError',
  NotFound: 'NotFound',
  ServerError: 'ServerError',
  Unauthorized: 'Unauthorized',
  UrlBaseNotConfigured: 'UrlBaseNotConfigured',
};

export class FetchError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }

  data: unknown;
}
