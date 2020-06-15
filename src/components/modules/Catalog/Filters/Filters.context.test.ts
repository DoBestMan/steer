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

  test('applying a group of filters', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createUpdateFilterGroup({
        group: 'filter',
        id: 'id',
        value: 'value',
      })();
      result.current.createUpdateFilterGroup({
        group: 'filter',
        id: 'anotherId',
        value: 'val',
      })();
    });

    expect(result.current.filtersToApply).toHaveProperty('filter', {
      id: 'value',
      anotherId: 'val',
    });
    expect(result.current.activeFilters).toEqual({});

    act(() => result.current.applyFilters());

    expect(result.current.activeFilters).toHaveProperty('filter', {
      anotherId: 'val',
      id: 'value',
    });
  });

  test('toggling filters with no dropdown', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() =>
      result.current.createToggleFilterHandler({
        group: 'group1',
        id: 'id',
        value: true,
      })(),
    );
    act(() =>
      result.current.createToggleFilterHandler({
        group: 'group1',
        id: 'id2',
        value: true,
      })(),
    );
    act(() =>
      result.current.createToggleFilterHandler({
        group: 'group2',
        id: 'id',
        value: true,
      })(),
    );

    expect(result.current.activeFilters).toHaveProperty('group1', {
      id: true,
      id2: true,
    });
    expect(result.current.activeFilters).toHaveProperty('group2', {
      id: true,
    });
  });

  test('overwriting a toggle filter', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createToggleFilterHandler({
        group: 'toggle',
        id: 'id',
        value: true,
        overwrite: true,
      })();
      result.current.createToggleFilterHandler({
        group: 'filter',
        id: 'id',
        value: true,
        overwrite: true,
      })();
    });

    expect(result.current.activeFilters).toHaveProperty('filter', { id: true });
    expect(result.current.activeFilters).not.toHaveProperty('toggle', {
      id: true,
    });
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

  test('resetting a group of filters', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createUpdateFilterGroup({
        group: 'group',
        id: 'id',
        value: 'value',
      })();
      result.current.createUpdateFilterGroup({
        group: 'group',
        id: 'anotherId',
        value: 'val',
      })();
      result.current.createUpdateFilterGroup({
        group: 'group2',
        id: 'id',
        value: 'val',
      })();
    });

    act(() => result.current.createResetFiltersHandler('group')());

    expect(result.current.filtersToApply).toHaveProperty('group2', {
      id: 'val',
    });
    expect(result.current.filtersToApply.group).toEqual({});
  });
});
