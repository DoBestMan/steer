jest.mock('isomorphic-unfetch');

import nativeFetch from 'isomorphic-unfetch';
import { FetchError } from 'node-fetch';
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
    fetchSetUrlBase('http://test/');
    fetchSetUserPersonalization({
      gaClientId: null,
      userLocation: null,
    });
  });

  afterEach(() => {
    mocked(nativeFetch).mockRestore();
  });

  it('fetches using GET and gets a successful response', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

    const result = await fetch<{ test: boolean }>({
      endpoint: '/v1/test-get',
      method: 'get',
    });

    expect(nativeFetch).toHaveBeenCalledWith(
      expect.stringContaining('test-get'),
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
    mocked(nativeFetch).mockResolvedValue(response);

    const result = await fetch<{ test: boolean }, { testBody: string }>({
      body: {
        testBody: '1',
      },
      endpoint: '/v1/test-post',
      method: 'post',
    });

    expect(nativeFetch).toHaveBeenCalledWith(
      expect.stringContaining('test-post'),
      expect.objectContaining({
        body: '{"testBody":"1"}',
        method: 'post',
      }),
    );

    expect(result).toBeTruthy();
    expect(result.test).toEqual(true);
  });

  it('calls authorization function', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

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

    const headers = mocked(nativeFetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${token}`);
  });

  it('calls authorization function when token is expired', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

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

    const headers = mocked(nativeFetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${newToken}`);
  });

  it("doesn't call authorization function when token is not expired", async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

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

    const headers = mocked(nativeFetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${currentToken}`);
  });

  it('includes authorization header', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

    const authorization = 'test 1234';
    fetchSetAuthorizationHeader(authorization);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      includeAuthorization: true,
      method: 'get',
    });

    expect(nativeFetch).toHaveBeenCalled();

    const headers = mocked(nativeFetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(authorization);
  });

  it('includes authorization token', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

    const token = '1234';
    fetchSetAuthorizationToken(token, null);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      includeAuthorization: true,
      method: 'get',
    });

    expect(nativeFetch).toHaveBeenCalled();

    const headers = mocked(nativeFetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toEqual(`Bearer ${token}`);
  });

  it('skips authorization token', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

    const token = '1234';
    fetchSetAuthorizationToken(token, null);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/v1/test-get-authorized',
      method: 'get',
    });

    expect(nativeFetch).toHaveBeenCalled();

    const headers = mocked(nativeFetch).mock.calls[0][1]?.headers;

    expect(
      headers && 'Authorization' in headers && headers.Authorization,
    ).toBeFalsy();
  });

  it('includes personalization data', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

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

    expect(mocked(nativeFetch).mock.calls[0][0]).toContain('99999');
    expect(mocked(nativeFetch).mock.calls[0][0]).toContain('12345');
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
    mocked(nativeFetch).mockRejectedValue(
      new FetchError(
        'request to http://test/test-get failed, reason: getaddrinfo ENOTFOUND test',
        'system',
      ),
    );

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
    mocked(nativeFetch).mockResolvedValue(response);

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
    [FetchErrorCodes.NotFound, 404],
    [FetchErrorCodes.ServerError, 500],
  ])(
    'rejects with %s for response status code %s',
    async (errorCode, statusCode) => {
      jest.spyOn(console, 'error').mockImplementation();

      const response = new Response('{"test":true}', {
        status: statusCode,
      });
      mocked(nativeFetch).mockResolvedValue(response);

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
