import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';

import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';

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
    expect(result.current.activeLink).toEqual(NAV_TARGETS.BROWSE_TIRES);
  });

  test('clearing tire category', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      result.current.handleClearCategory();
    });

    expect(result.current.activeCategory).toBeFalsy();
    expect(result.current.activeLink).toBeFalsy();
  });

  test('clearing active link', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      result.current.handleClearLink();
    });

    expect(result.current.activeLink).toBeFalsy();
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

  test('navigating back from a link should clear the active link', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      result.current.toggleSubNav();
    });

    expect(result.current.activeLink).toBeFalsy();
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
