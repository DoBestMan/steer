import { mocked } from 'ts-jest/utils';

import { FetchErrorCodes } from './FetchError';
import {
  fetch,
  fetchSetAuthorizationFunction,
  fetchSetAuthorizationHeader,
  fetchSetAuthorizationToken,
  fetchSetUrlBase,
  fetchSetUserPersonalization,
} from './index';

describe('fetch', () => {
  beforeEach(() => {
    jest.spyOn(globalThis, 'fetch');

    fetchSetUrlBase('http://test/');
    fetchSetUserPersonalization({
      gaClientId: null,
      userLocation: null,
    });
  });

  afterEach(() => {
    mocked(globalThis.fetch).mockRestore();
  });

  it('fetches using GET and gets a successful response', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const result = await fetch<{ test: boolean }>({
      endpoint: '/v1/test-get',
      method: 'get',
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('test-get'),
      expect.objectContaining({
        body: undefined,
        method: 'get',
      }),
    );

    expect(result).toBeTruthy();
    expect(result.test).toEqual(true);
  });

  it('interpolates URL params into a URL template', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const result = await fetch<{ test: boolean }>({
      endpoint: '/v1/test-get/{paramKey}',
      method: 'get',
      params: {
        paramKey: 'paramValue',
      },
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('test-get/paramValue'),
      expect.objectContaining({
        body: undefined,
        method: 'get',
      }),
    );

    expect(result).toBeTruthy();
    expect(result.test).toEqual(true);
  });

  it('encodes params when interpolating in a URL template', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const result = await fetch<{ test: boolean }>({
      endpoint: '/v1/test-get/{paramKey}',
      method: 'get',
      params: {
        paramKey: 'encode this/please',
      },
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('test-get/encode%20this%2Fplease'),
      expect.objectContaining({
        body: undefined,
        method: 'get',
      }),
    );

    expect(result).toBeTruthy();
    expect(result.test).toEqual(true);
  });

  it('fetches using POST and gets a successful response', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const result = await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-post',
      jsonBody: {
        testBody: '1',
      },
      method: 'post',
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('test-post'),
      expect.objectContaining({
        body: '{"testBody":"1"}',
        method: 'post',
      }),
    );

    expect(result).toBeTruthy();
    expect(result.test).toEqual(true);
  });

  it('fetches using DELETE and gets a successful empty response (204)', async () => {
    const response = new Response(null, {
      status: 204,
    });
    mocked(globalThis.fetch).mockResolvedValue(response);

    const result = await fetch<null>({
      endpoint: '/v1/test-delete',
      method: 'delete',
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('test-delete'),
      expect.objectContaining({
        method: 'delete',
      }),
    );

    expect(result).toBeNull();
  });

  it('calls authorization function', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const token = '1234';
    const authorizationFunction = jest.fn().mockImplementation(() => {
      fetchSetAuthorizationToken(token, null);
    });
    fetchSetAuthorizationFunction(authorizationFunction);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      includeAuthorization: true,
      method: 'get',
    });

    expect(authorizationFunction).toHaveBeenCalled();

    const headers = mocked(globalThis.fetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${token}`);
  });

  it('calls authorization function when token is expired', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const authorizationHeader = 'test 5678';
    fetchSetAuthorizationHeader(authorizationHeader);

    const oldToken = '1234';
    const oldExpiresOn = new Date(2010, 0, 1, 0, 0, 0);
    const newToken = '5678';
    const newExpiresOn = new Date(Date.now() + 60000);

    fetchSetAuthorizationToken(oldToken, oldExpiresOn);

    const authorizationFunction = jest.fn().mockImplementation(() => {
      fetchSetAuthorizationToken(newToken, newExpiresOn);
    });
    fetchSetAuthorizationFunction(authorizationFunction);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      includeAuthorization: true,
      method: 'get',
    });

    expect(authorizationFunction).toHaveBeenCalled();

    const headers = mocked(globalThis.fetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${newToken}`);
  });

  it("doesn't call authorization function when token is not expired", async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const authorizationHeader = 'test 5678';
    fetchSetAuthorizationHeader(authorizationHeader);

    const currentToken = '1234';
    const currentExpiresOn = new Date(Date.now() + 60000);
    const newToken = '5678';
    const newExpiresOn = new Date(Date.now() + 120000);

    fetchSetAuthorizationToken(currentToken, currentExpiresOn);

    const authorizationFunction = jest.fn().mockImplementation(() => {
      fetchSetAuthorizationToken(newToken, newExpiresOn);
    });
    fetchSetAuthorizationFunction(authorizationFunction);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      includeAuthorization: true,
      method: 'get',
    });

    expect(authorizationFunction).not.toHaveBeenCalled();

    const headers = mocked(globalThis.fetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${currentToken}`);
  });

  it('includes authorization header', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const authorization = 'test 1234';
    fetchSetAuthorizationHeader(authorization);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      includeAuthorization: true,
      method: 'get',
    });

    expect(globalThis.fetch).toHaveBeenCalled();

    const headers = mocked(globalThis.fetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(authorization);
  });

  it('includes authorization token', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const token = '1234';
    fetchSetAuthorizationToken(token, null);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      includeAuthorization: true,
      method: 'get',
    });

    expect(globalThis.fetch).toHaveBeenCalled();

    const headers = mocked(globalThis.fetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${token}`);
  });

  it('skips authorization token', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const token = '1234';
    fetchSetAuthorizationToken(token, null);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      method: 'get',
    });

    expect(globalThis.fetch).toHaveBeenCalled();

    const headers = mocked(globalThis.fetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toBeFalsy();
  });

  it('includes personalization data', async () => {
    const response = new Response('{"test":true}');
    mocked(globalThis.fetch).mockResolvedValue(response);

    fetchSetUserPersonalization({
      gaClientId: null,
      userLocation: {
        cityName: null,
        region: 99999,
        stateAbbr: null,
        zip: '12345',
      },
    });

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-personalized',
      includeUserRegion: true,
      includeUserZip: true,
      method: 'get',
    });

    expect(mocked(globalThis.fetch).mock.calls[0][0]).toContain('99999');
    expect(mocked(globalThis.fetch).mock.calls[0][0]).toContain('12345');
  });

  it('rejects when apiBaseUrl is not initialized', async () => {
    fetchSetUrlBase('');

    const promise = fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-personalized',
      method: 'get',
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        code: FetchErrorCodes.UrlBaseNotConfigured,
      }),
    );
  });

  it('rejects when there is a network issue', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    mocked(globalThis.fetch).mockRejectedValue(new Error());

    const promise = fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get',
      method: 'get',
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        code: FetchErrorCodes.NetworkError,
      }),
    );

    expect(mocked(console.error)).toHaveBeenCalled();
  });

  it('rejects when there is an issue decoding JSON', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    const response = new Response('Invalid JSON :(');
    mocked(globalThis.fetch).mockResolvedValue(response);

    const promise = fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get',
      method: 'get',
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        code: FetchErrorCodes.InvalidJson,
      }),
    );

    expect(mocked(console.error)).toHaveBeenCalled();
  });

  it.each([
    [FetchErrorCodes.BadRequest, 400],
    [FetchErrorCodes.Unauthorized, 401],
    [FetchErrorCodes.Forbidden, 403],
    [FetchErrorCodes.ServerError, 500],
  ])(
    'rejects with %s for response status code %s',
    async (errorCode, statusCode) => {
      jest.spyOn(console, 'error').mockImplementation();

      const response = new Response('{"test":true}', {
        status: statusCode,
      });
      mocked(globalThis.fetch).mockResolvedValue(response);

      const promise = fetch<{ test: boolean }, { testBody: string }>({
        endpoint: '/v1/test-get',
        includeUserRegion: true,
        method: 'get',
      });

      await expect(promise).rejects.toEqual(
        expect.objectContaining({
          code: errorCode,
        }),
      );

      expect(mocked(console.error)).toHaveBeenCalled();
    },
  );
});
