import * as NodeFetchModule from 'node-fetch';
import { mocked } from 'ts-jest/utils';

import {
  backendSetApiUrlBase,
  backendSetUserRegion,
  backendSetUserZip,
  backendFetch,
} from './fetch';
import { BackendErrorCodes } from './constants/errors';

const { FetchError, Response } = NodeFetchModule;

describe('backendFetch', () => {
  beforeEach(() => {
    jest.spyOn(NodeFetchModule, 'default').mockImplementation();

    backendSetApiUrlBase('http://test/');
    backendSetUserRegion(null);
    backendSetUserZip(null);
  });

  it('fetches using GET and gets a successful response', async () => {
    const response = new Response('{"test":true}');
    jest.spyOn(response, 'json');
    jest.spyOn(NodeFetchModule, 'default').mockResolvedValue(response);

    const result = await backendFetch<{ test: boolean }>({
      endpoint: './test-get',
      method: 'get',
    });

    expect(NodeFetchModule.default).toHaveBeenCalledWith(
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
    jest.spyOn(response, 'json');
    jest.spyOn(NodeFetchModule, 'default').mockResolvedValue(response);

    const result = await backendFetch<{ test: boolean }, { testBody: string }>({
      body: {
        testBody: '1',
      },
      endpoint: './test-post',
      method: 'post',
    });

    expect(NodeFetchModule.default).toHaveBeenCalledWith(
      expect.stringContaining('test-post'),
      expect.objectContaining({
        body: '{"testBody":"1"}',
        method: 'post',
      }),
    );

    expect(result).toBeTruthy();
    expect(result.test).toEqual(true);
  });

  it('includes personalization data', async () => {
    const response = new Response('{"test":true}');
    jest.spyOn(response, 'json');
    jest.spyOn(NodeFetchModule, 'default').mockResolvedValue(response);

    backendSetUserRegion(99);
    backendSetUserZip('12345');

    await backendFetch<{ test: boolean }, { testBody: string }>({
      endpoint: './test-get-personalized',
      includeUserRegion: true,
      includeUserZip: true,
      method: 'get',
    });

    expect(mocked(NodeFetchModule.default).mock.calls[0][0]).toContain('99');
    expect(mocked(NodeFetchModule.default).mock.calls[0][0]).toContain('12345');
  });

  it('rejects when apiBaseUrl is not initialized', async () => {
    backendSetApiUrlBase('');

    const promise = backendFetch<{ test: boolean }, { testBody: string }>({
      endpoint: './test-get-personalized',
      method: 'get',
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        code: BackendErrorCodes.ApiUrlBaseNotConfigured,
      }),
    );
  });

  it('rejects when there is a network issue', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    jest
      .spyOn(NodeFetchModule, 'default')
      .mockRejectedValue(
        new FetchError(
          'request to http://test/test-get failed, reason: getaddrinfo ENOTFOUND test',
          'system',
        ),
      );

    const promise = backendFetch<{ test: boolean }, { testBody: string }>({
      endpoint: './test-get',
      method: 'get',
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        code: BackendErrorCodes.NetworkError,
      }),
    );

    expect(mocked(console.error)).toHaveBeenCalled();
  });

  it('rejects when there is an issue decoding JSON', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    const response = new Response('Invalid JSON :(');
    jest.spyOn(response, 'json');
    jest.spyOn(NodeFetchModule, 'default').mockResolvedValue(response);

    const promise = backendFetch<{ test: boolean }, { testBody: string }>({
      endpoint: './test-get',
      method: 'get',
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        code: BackendErrorCodes.InvalidJson,
      }),
    );

    expect(mocked(console.error)).toHaveBeenCalled();
  });

  it.each([
    [BackendErrorCodes.BadRequest, 400],
    [BackendErrorCodes.Unauthorized, 401],
    [BackendErrorCodes.Forbidden, 403],
    [BackendErrorCodes.NotFound, 404],
    [BackendErrorCodes.ServerError, 500],
  ])(
    'rejects with %s for response status code %s',
    async (errorCode, statusCode) => {
      jest.spyOn(console, 'error').mockImplementation();

      const response = new Response('{"test":true}', {
        status: statusCode,
      });
      jest.spyOn(response, 'json');
      jest.spyOn(NodeFetchModule, 'default').mockResolvedValue(response);

      const promise = backendFetch<{ test: boolean }, { testBody: string }>({
        endpoint: './test-get',
        includeUserRegion: true,
        includeUserZip: true,
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
