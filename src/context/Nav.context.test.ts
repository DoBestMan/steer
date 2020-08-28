import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';

import { useNavContextSetup } from './Nav.context';

describe('useNavContextSetup', () => {
  test('updating active link', () => {
    const { result } = renderHook(() => useNavContextSetup());

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
    const { result } = renderHook(() => useNavContextSetup());

    act(() => {
      result.current.createSelectCategoryHandler('category')();
    });

    expect(result.current.activeCategory).toEqual('category');
    expect(result.current.activeLink).toEqual(NAV_TARGETS.BROWSE_TIRES);
  });

  test('clearing tire category', () => {
    const { result } = renderHook(() => useNavContextSetup());

    act(() => {
      result.current.handleClearCategory();
    });

    expect(result.current.activeCategory).toBeFalsy();
    expect(result.current.activeLink).toBeFalsy();
  });

  test('clearing active link', () => {
    const { result } = renderHook(() => useNavContextSetup());

    act(() => {
      result.current.handleClearLink();
    });

    expect(result.current.activeLink).toBeFalsy();
  });

  test('closing subnav clears link and category', () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNavContextSetup(),
    );

    act(() => {
      const handler = result.current.createSelectLinkHandler({
        target: NAV_TARGETS.LEARN,
        text: 'Learn',
      });
      handler && handler();
      result.current.createSelectCategoryHandler('category')();
      result.current.handleCloseSubNav();
    });
    waitForNextUpdate();

    expect(result.current.isSubNavOpen).toEqual(false);
  });

  test('navigating back from a link should clear the active link', () => {
    const { result } = renderHook(() => useNavContextSetup());

    act(() => {
      result.current.toggleSubNav();
    });

    expect(result.current.activeLink).toBeFalsy();
  });
});
