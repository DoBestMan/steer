/* eslint-disable @typescript-eslint/camelcase */
jest.mock('lscache');
jest.mock('../fetch');
jest.mock('./session');

import lscache from 'lscache';
import { mocked } from 'ts-jest/utils';

import * as Fetch from '../fetch';
import { apiBootstrap, TEST_apiBootstrapPromiseReset } from './bootstrap';
import * as Session from './session';

describe('apiBootstrap', () => {
  const userPersonalization = {
    gaClientId: null,
    userLocation: {
      cityName: null,
      region: 999999,
      stateAbbr: null,
      zip: '123456',
    },
  };
  const userSessionId = 'SessionId';

  beforeEach(() => {
    mocked(lscache.flushExpired).mockReset().mockImplementation();
    mocked(lscache.get).mockReset().mockImplementation();
    mocked(lscache.set).mockReset().mockImplementation();
    mocked(Fetch.fetchSetAuthorizationToken).mockReset().mockImplementation();
    mocked(Fetch.fetchSetUrlBase).mockReset().mockImplementation();
    mocked(Fetch.fetchSetUserPersonalization).mockReset().mockImplementation();

    mocked(Session.apiGetUserSession).mockReset().mockResolvedValue({
      userPersonalization,
      userSessionId,
    });

    TEST_apiBootstrapPromiseReset();
  });

  it('configures the API correctly for new users', async () => {
    mocked(lscache.get).mockReturnValue(null);

    await apiBootstrap();

    expect(Fetch.fetchSetUserPersonalization).toHaveBeenCalledWith(
      userPersonalization,
    );
    expect(Fetch.fetchSetAuthorizationToken).toHaveBeenCalledWith(
      userSessionId,
      null,
    );
    expect(Fetch.fetchSetAuthorizationToken).toHaveBeenCalledTimes(1);
    expect(lscache.set).toHaveBeenCalledWith('ST_SESSION', userSessionId, 60);
  });

  it('configures the API correctly for existing users', async () => {
    mocked(lscache.get).mockReturnValue('OldSessionId');

    await apiBootstrap();

    expect(Fetch.fetchSetUserPersonalization).toHaveBeenCalledWith(
      userPersonalization,
    );
    expect(Fetch.fetchSetAuthorizationToken).toHaveBeenCalledWith(
      'OldSessionId',
      null,
    );
    expect(Fetch.fetchSetAuthorizationToken).toHaveBeenCalledWith(
      userSessionId,
      null,
    );
    expect(Fetch.fetchSetAuthorizationToken).toHaveBeenCalledTimes(2);
    expect(lscache.set).toHaveBeenCalledWith('ST_SESSION', userSessionId, 60);
  });

  it('returns the same promise when called the second time', async () => {
    const promise1 = apiBootstrap();
    const promise2 = apiBootstrap();
    const promise3 = apiBootstrap();
    await Promise.all([promise1, promise2, promise3]);

    expect(promise1).toBe(promise2);
    expect(promise2).toBe(promise3);
  });
});
