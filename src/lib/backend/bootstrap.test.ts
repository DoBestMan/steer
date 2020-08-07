import { IncomingMessage } from 'http';
import { Socket } from 'net';

import { URLS } from '~/lib/constants/urls';

import * as FetchModule from '../fetch';
import { backendBootstrap, getBackendEnvVariables } from './bootstrap';

function createFakeRequest() {
  const fakeIncomingMessage = new IncomingMessage(new Socket());
  const fakeRequest = Object.assign(fakeIncomingMessage, {
    query: {},
  });
  return fakeRequest;
}

describe('backendBootstrap', () => {
  beforeEach(() => {
    jest
      .spyOn(FetchModule, 'fetchSetAuthorizationFunction')
      .mockImplementation();
    jest.spyOn(FetchModule, 'fetchSetUrlBase').mockImplementation();
  });

  it('works without a request object', () => {
    backendBootstrap();

    expect(FetchModule.fetchSetUrlBase).toHaveBeenCalled();
  });

  it('configures authentication header', () => {
    const request = createFakeRequest();
    backendBootstrap({ request });

    expect(FetchModule.fetchSetAuthorizationFunction).toHaveBeenCalled();
  });

  it('configures the server', () => {
    const request = createFakeRequest();
    backendBootstrap({ request });

    expect(FetchModule.fetchSetUrlBase).toHaveBeenCalled();
  });
});

describe('getBackendEnvVariables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    /* eslint-disable sort-keys */
    process.env = {
      ...OLD_ENV,
      STEER_CLIENT_ID_MOCK: 'mockId',
      STEER_CLIENT_SECRET_MOCK: 'mockSecret',
      STEER_CLIENT_ID_INTEGRATION: 'integrationId',
      STEER_CLIENT_SECRET_INTEGRATION: 'integrationSecret',
      STEER_CLIENT_ID: 'prodId',
      STEER_CLIENT_SECRET: 'prodSecret',
    };
    /* eslint-enable sort-keys */
  });

  afterEach(() => {
    process.env = { ...OLD_ENV };
  });

  test('production deploy', () => {
    process.env.NOW_GITHUB_COMMIT_REF = 'master';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_PRODUCTION,
      clientId: 'prodId',
      clientSecret: 'prodSecret',
    });
  });

  test.each(['dev', 'qa', 'int-my-branch'])(
    'integration deploy - %s',
    (branch) => {
      process.env.NOW_GITHUB_COMMIT_REF = branch;

      expect(getBackendEnvVariables()).toEqual({
        backendEndpoint: URLS.MAIN_API_STAGING,
        clientId: 'integrationId',
        clientSecret: 'integrationSecret',
      });
    },
  );

  test.each(['mock-dev', 'mock-qa', 'my-branch'])(
    'mock deploy - %s',
    (branch) => {
      process.env.NOW_GITHUB_COMMIT_REF = branch;

      expect(getBackendEnvVariables()).toEqual({
        backendEndpoint: URLS.MAIN_API_MOCK,
        clientId: 'mockId',
        clientSecret: 'mockSecret',
      });
    },
  );

  test('local development - local backend', () => {
    process.env.STEER_BACKEND = 'local';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_LOCAL,
      clientId: 'mockId',
      clientSecret: 'mockSecret',
    });
  });

  test('local development - integration backend', () => {
    process.env.STEER_BACKEND = 'integration';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_STAGING,
      clientId: 'integrationId',
      clientSecret: 'integrationSecret',
    });
  });

  test('local development - mock backend', () => {
    process.env.STEER_BACKEND = 'mock';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_MOCK,
      clientId: 'mockId',
      clientSecret: 'mockSecret',
    });
  });

  test('local development - undefined backend', () => {
    process.env.STEER_BACKEND = undefined;

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_MOCK,
      clientId: 'mockId',
      clientSecret: 'mockSecret',
    });
  });
});
