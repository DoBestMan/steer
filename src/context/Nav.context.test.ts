import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { NAV_TARGETS } from '~/components/global/Nav/Nav.data';

import { useContextSetup } from './Nav.context';

describe('useContextSetup', () => {
  test('updating active link', () => {
    const { result } = renderHook(() => useContextSetup());

    act(() => {
      result.current.createSelectLinkHandler('link')();
    });

    expect(result.current.activeLink).toEqual('link');
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
      result.current.createSelectLinkHandler('link')();
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
});
