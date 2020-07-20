import { renderHook } from '@testing-library/react-hooks';

import { UserPersonalization } from '~/data/models/UserPersonalization';
import * as BootstrapUtils from '~/lib/api/bootstrap';
import * as FetchUtils from '~/lib/fetch';

import { useContextSetup } from './UserPersonalization.context';

describe('useContextSetup', () => {
  beforeEach(() => {
    jest.spyOn(BootstrapUtils, 'apiBootstrap').mockResolvedValue();
    jest.spyOn(FetchUtils, 'fetchGetUserPersonalization');
  });

  test('useContextSetup', async () => {
    const testUserPersonalization: UserPersonalization = {
      gaClientId: '123',
      userLocation: {
        cityName: 'Portland',
        region: 1,
        stateAbbr: 'OR',
        zip: '12345',
      },
    };

    jest.spyOn(BootstrapUtils, 'apiBootstrap').mockResolvedValue();
    jest
      .spyOn(FetchUtils, 'fetchGetUserPersonalization')
      .mockReturnValue(testUserPersonalization);

    const { result, waitForNextUpdate } = renderHook(() => useContextSetup());

    // it has expected initial state
    expect(result.current.locationString).toBe('');
    expect(result.current.userPersonalizationData).toBe(null);

    await waitForNextUpdate();

    // it stores userPersonalization results
    expect(result.current.userPersonalizationData).toEqual(
      testUserPersonalization,
    );
    // it combines city and state after data is available
    expect(result.current.locationString).toBe('Portland, OR');
  });

  test('unknown location', async () => {
    const testUserPersonalization: UserPersonalization = {
      gaClientId: '123',
      userLocation: {
        cityName: null,
        region: null,
        stateAbbr: null,
        zip: null,
      },
    };

    jest.spyOn(BootstrapUtils, 'apiBootstrap').mockResolvedValue();
    jest
      .spyOn(FetchUtils, 'fetchGetUserPersonalization')
      .mockReturnValue(testUserPersonalization);

    const { result, waitForNextUpdate } = renderHook(() => useContextSetup());

    // it has expected initial state
    expect(result.current.locationString).toBe('');
    expect(result.current.userPersonalizationData).toBe(null);

    await waitForNextUpdate();

    // it stores userPersonalization results
    expect(result.current.userPersonalizationData).toEqual(
      testUserPersonalization,
    );
    // it returns empty string for unknown location
    expect(result.current.locationString).toBe('');
  });
});
