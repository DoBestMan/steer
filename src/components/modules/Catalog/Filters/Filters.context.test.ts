import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { SiteCatalogFilterTypeEnum } from '~/data/models/SiteCatalogFilters';

import { CatalogFilterTypes } from './Filter.types';
import { useFiltersContextSetup } from './Filters.context';
import { mockSiteCatalogFilters } from './Filters.mocks';

const mockArgs = {
  onApplyFilters: jest.fn(),
  siteCatalogFilters: { filtersList: mockSiteCatalogFilters },
};

describe('useFiltersContextSetup', () => {
  test('initial state with active filters', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    expect(result.current.filtersToApply).toHaveProperty('brand', 'goodyear');
  });

  test('applying a group of filters', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'bar',
        },
      })();
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'baz',
        },
      })();
    });

    expect(result.current.filtersToApply).toHaveProperty('foo', 'bar,baz');
    expect(result.current.filtersToApply).toHaveProperty('brand', 'goodyear');
  });

  test('applying a filter with multiple values', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() =>
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'bar',
          bar: 'baz',
        },
      })(),
    );

    expect(result.current.filtersToApply).toHaveProperty('foo', 'bar');
    expect(result.current.filtersToApply).toHaveProperty('bar', 'baz');
  });

  test('overwriting a value', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() =>
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'bar',
        },
      })(),
    );
    act(() =>
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'baz',
        },
        overwrite: true,
      })(),
    );

    expect(result.current.filtersToApply).toHaveProperty('foo', 'baz');
  });

  test('unchecking the last item in a group removes it from state', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() =>
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'bar',
        },
      })(),
    );
    act(() =>
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'bar',
        },
      })(),
    );

    expect(result.current.filtersToApply).not.toHaveProperty('foo');
  });

  //  TODO: throwing error about update not being wrapped with `act()`
  test.skip('toggling filters with no dropdown', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() =>
      result.current.createToggleFilterHandler({
        value: {
          foo: 'bar',
        },
      })(),
    );

    expect(result.current.filtersToApply).toHaveProperty('foo', 'bar');
    expect(mockArgs.onApplyFilters).toHaveBeenCalledTimes(1);
  });

  test('clearing filter dropdown', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createOpenFilterHandler(0)();
      result.current.clearSelectingFilter();
    });

    expect(result.current.selectingFilter).toBeNull();
  });

  test('selecting a filter with a dropdown', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => result.current.createOpenFilterHandler(0)());

    expect(result.current.selectingFilter).toEqual(0);
  });

  test('resetting a group of filters', () => {
    const { result } = renderHook(() => useFiltersContextSetup(mockArgs));

    act(() => {
      result.current.createUpdateFilterGroup({
        value: { foo: 'bar' },
      })();
      result.current.createUpdateFilterGroup({
        value: { bar: 'baz' },
      })();
    });

    act(() =>
      result.current.createResetFiltersHandler(({
        filterGroups: [
          { items: [{ value: { foo: 'bar' } }] },
          { items: [{ value: { bar: 'baz' } }] },
        ],
        type: SiteCatalogFilterTypeEnum.SiteCatalogFilterList,
      } as unknown) as CatalogFilterTypes)(),
    );

    expect(result.current.filtersToApply).not.toHaveProperty('foo');
    expect(result.current.filtersToApply).not.toHaveProperty('bar');
  });
});
