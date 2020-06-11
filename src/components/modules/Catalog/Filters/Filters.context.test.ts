import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useFiltersContextSetup } from './Filters.context';

const mockArgs = {
  onApplyFilters: jest.fn(),
};

describe('useFiltersContextSetup', () => {
  // TODO: test once query params are implemented
  // test('initial state with active filters', () => {
  //   const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

  //   expect(result.current.activeFilters).toHaveProperty('filter', 'value');
  // });

  test('applying a filter', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createOpenFilterHandler('filter');
      result.current.createApplyFiltersHandler({ filter: { id: 'value' } })();
    });

    expect(result.current.activeFilters).toHaveProperty('filter', {
      id: 'value',
    });
    expect(result.current.selectingFilter).toBeFalsy();
  });

  test('merging an applied filter with current filters', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createOpenFilterHandler('filter');
      result.current.createApplyFiltersHandler({ filter: { id: 'value' } })();
    });

    act(() => {
      result.current.createOpenFilterHandler('filter2');
      result.current.createApplyFiltersHandler({ filter2: { id: 'value' } })();
    });

    expect(result.current.activeFilters).toHaveProperty('filter', {
      id: 'value',
    });
    expect(result.current.activeFilters).toHaveProperty('filter2', {
      id: 'value',
    });
    expect(result.current.selectingFilter).toBeFalsy();
  });

  test('clearing filter dropdown', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createOpenFilterHandler('filter')();
      result.current.clearSelectingFilter();
    });

    expect(result.current.selectingFilter).toBeFalsy();
  });

  test('selecting a filter with a dropdown', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => result.current.createOpenFilterHandler('filter')());

    expect(result.current.selectingFilter).toEqual('filter');
  });

  test('toggling a filter with no dropdown', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createToggleFilterHandler('toggle', true)();
    });

    expect(result.current.activeFilters).toHaveProperty('toggle', true);
  });
});
