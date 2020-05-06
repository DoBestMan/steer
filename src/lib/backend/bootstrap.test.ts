import { IncomingMessage } from 'http';
import { Socket } from 'net';

import * as FetchModule from '../fetch';
import { backendBootstrap } from './bootstrap';
import { BackendEndpoints } from './constants';

function createFakeRequest() {
  const fakeIncomingMessage = new IncomingMessage(new Socket());
  const fakeRequest = Object.assign(fakeIncomingMessage, {
    query: {},
  });
  return fakeRequest;
}

describe('backendBootstrap', () => {
  beforeEach(() => {
    jest.spyOn(FetchModule, 'fetchSetAuthorizationHeader').mockImplementation();
    jest.spyOn(FetchModule, 'fetchSetUrlBase').mockImplementation();
  });

  it('works without a request object', () => {
    backendBootstrap();

    expect(FetchModule.fetchSetUrlBase).toHaveBeenCalled();
  });

  it('configures authentication header', () => {
    const request = createFakeRequest();
    request.headers.authorization = 'Bearer Test123';
    backendBootstrap({ request });

    expect(FetchModule.fetchSetAuthorizationHeader).toHaveBeenCalledWith(
      request.headers.authorization,
    );
  });

  it('configures the mock server by default', () => {
    const request = createFakeRequest();
    backendBootstrap({ request });

    const expectedEnvironment = BackendEndpoints['mainApiMock'].apiBaseUrl;

    expect(FetchModule.fetchSetUrlBase).toHaveBeenCalledWith(
      expectedEnvironment,
    );
  });

  it("configures the local server if environment STEER_BACKEND is 'local'", () => {
    const originalValue = process.env.STEER_BACKEND;

    process.env.STEER_BACKEND = 'local';

    const request = createFakeRequest();
    backendBootstrap({ request });

    const expectedEnvironment = BackendEndpoints['mainApiLocal'].apiBaseUrl;

    expect(FetchModule.fetchSetUrlBase).toHaveBeenCalledWith(
      expectedEnvironment,
    );

    process.env.STEER_BACKEND = originalValue;
  });
});
