import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';

import { NAV_TARGETS } from '~/components/global/Nav/Nav.constants';

import { useContextSetup } from './Nav.context';
import * as UserPersonalizationContextUtils from './UserPersonalization.context';

describe('useContextSetup', () => {
  beforeEach(() => {
    jest
      .spyOn(UserPersonalizationContextUtils, 'useUserPersonalizationContext')
      .mockReturnValue({
        locationString: '',
        updateLocation() {},
        userPersonalizationData: null,
      });
  });

  test('updating active link', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      const handler = result.current.createSelectLinkHandler({
        target: NAV_TARGETS.LEARN,
        text: 'Learn',
      });
      handler && handler();
    });

    expect(result.current.activeLink).toEqual(NAV_TARGETS.LEARN);
    expect(result.current.isSubNavOpen).toEqual(true);
  });

  test('updating tire category', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      result.current.createSelectCategoryHandler('category')();
    });

    expect(result.current.activeCategory).toEqual('category');
  });

  test('closing subnav clears link and category', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      const handler = result.current.createSelectLinkHandler({
        target: NAV_TARGETS.LEARN,
        text: 'Learn',
      });
      handler && handler();
      result.current.createSelectCategoryHandler('category')();
      result.current.handleCloseSubNav();
    });

    expect(result.current.activeCategory).toEqual('');
    expect(result.current.activeLink).toEqual('');
    expect(result.current.isSubNavOpen).toEqual(false);
  });

  test('toggling sub nav should select the first link (Browse Tires) by default', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      result.current.toggleSubNav();
    });

    expect(result.current.activeLink).toEqual(NAV_TARGETS.BROWSE_TIRES);
  });

  test('navigating back from a link should set the active link to the default', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      result.current.toggleSubNav();
    });

    expect(result.current.activeLink).toEqual(NAV_TARGETS.BROWSE_TIRES);
  });

  test('creating links - no personalization data', () => {
    const { result } = renderHook(() => useContextSetup());

    expect(result.current.links).toEqual(
      expect.arrayContaining([
        {
          icon: 'location',
          label: 'Select location',
          target: NAV_TARGETS.LOCATION,
          text: '',
        },
      ]),
    );
  });

  test('creating links - personalization data', () => {
    mocked(
      UserPersonalizationContextUtils.useUserPersonalizationContext,
    ).mockReturnValue({
      locationString: 'Portland, OR',
      updateLocation() {},
      userPersonalizationData: {
        gaClientId: '123',
        userLocation: {
          cityName: 'Portland',
          region: 1,
          stateAbbr: 'OR',
          zip: '12345',
        },
      },
    });
    const { result } = renderHook(() => useContextSetup());

    expect(result.current.links).toEqual(
      expect.arrayContaining([
        {
          icon: 'location',
          label: 'Select location',
          target: NAV_TARGETS.LOCATION,
          text: 'Portland, OR',
        },
      ]),
    );
  });
});
