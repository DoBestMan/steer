import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';

import { useContextSetup } from './Nav.context';
import { UserPersonalizationProps } from './UserPersonalization.context';

const defaultContextProps: UserPersonalizationProps = {
  locationString: '',
  updateLocation: () => {},
  userPersonalizationData: null,
};

describe('useContextSetup', () => {
  test('updating active link', () => {
    const { result } = renderHook(() => useContextSetup(defaultContextProps));

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
    const { result } = renderHook(() => useContextSetup(defaultContextProps));

    act(() => {
      result.current.createSelectCategoryHandler('category')();
    });

    expect(result.current.activeCategory).toEqual('category');
  });

  test('closing subnav clears link and category', () => {
    const { result } = renderHook(() => useContextSetup(defaultContextProps));

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
    const { result } = renderHook(() => useContextSetup(defaultContextProps));

    act(() => {
      result.current.toggleSubNav();
    });

    expect(result.current.activeLink).toEqual(NAV_TARGETS.BROWSE_TIRES);
  });

  test('navigating back from a link should set the active link to the default', () => {
    const { result } = renderHook(() => useContextSetup(defaultContextProps));

    act(() => {
      result.current.toggleSubNav();
    });

    expect(result.current.activeLink).toEqual(NAV_TARGETS.BROWSE_TIRES);
  });

  test('creating links - no personalization data', () => {
    const { result } = renderHook(() => useContextSetup(defaultContextProps));

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
    const { result } = renderHook(() =>
      useContextSetup({
        ...defaultContextProps,
        locationString: 'Portland, OR',
      }),
    );

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
