jest.mock('isomorphic-unfetch');

import nativeFetch from 'isomorphic-unfetch';
import { FetchError } from 'node-fetch';
import { mocked } from 'ts-jest/utils';

import { FetchErrorCodes } from './FetchError';
import {
  fetch,
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
      endpoint: '/test-get',
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
      endpoint: '/test-post',
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

  it('includes authorization header', async () => {
    const response = new Response('{"test":true}');
    mocked(nativeFetch).mockResolvedValue(response);

    const authorization = 'test 1234';
    fetchSetAuthorizationHeader(authorization);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/test-get-authorized',
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
    fetchSetAuthorizationToken(token);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/test-get-authorized',
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
    fetchSetAuthorizationToken(token);

    await fetch<{ test: boolean }, { testBody: string }>({
      endpoint: '/test-get-authorized',
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
      endpoint: '/test-get-personalized',
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
      endpoint: '/test-get-personalized',
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
      endpoint: '/test-get',
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
      endpoint: '/test-get',
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
        endpoint: '/test-get',
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
