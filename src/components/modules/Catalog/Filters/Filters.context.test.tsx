import { renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { act } from 'react-test-renderer';

import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { SiteCatalogFilterListTypeEnum } from '~/data/models/SiteCatalogFilterList';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';

import { CatalogFilterTypes } from './Filter.types';
import { useFiltersContextSetup } from './Filters.context';
import { mockSiteCatalogFilters } from './Filters.mocks';

const mockArgs = {
  siteCatalogFilters: {
    filtersList: mockSiteCatalogFilters,
  } as SiteCatalogFilters,
};

interface WrapperProps {
  children?: ReactNode;
}

const handleUpdateFilters = jest.fn();

function wrapper({ children }: WrapperProps) {
  return (
    <CatalogPageContextProvider handleUpdateFilters={handleUpdateFilters}>
      {children}
    </CatalogPageContextProvider>
  );
}

const renderFiltersContextSetupHook = () =>
  renderHook(() => useFiltersContextSetup(mockArgs), {
    wrapper,
  });

describe('useFiltersContextSetup', () => {
  test('initial state with active filters', () => {
    const { result } = renderFiltersContextSetupHook();

    expect(result.current.filtersToApply).toHaveProperty(
      'brand',
      'goodyear,pirelli',
    );
  });

  test('applying a group of filters', () => {
    const { result } = renderFiltersContextSetupHook();

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
    expect(result.current.filtersToApply).toHaveProperty(
      'brand',
      'goodyear,pirelli',
    );
  });

  test('applying a filter with multiple values', () => {
    const { result } = renderFiltersContextSetupHook();

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
    const { result } = renderFiltersContextSetupHook();

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
    const { result } = renderFiltersContextSetupHook();

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

  test('immediately revalidates when toggling a filter', async () => {
    const { result } = renderFiltersContextSetupHook();

    await act(async () =>
      result.current.createToggleFilterHandler({
        value: {
          foo: 'bar',
        },
      })(),
    );

    expect(result.current.filtersToApply).toHaveProperty('foo', 'bar');
    // immediately fetches
    expect(handleUpdateFilters).toHaveBeenCalledTimes(1);
  });

  test('removes toggle filter from state if overwrite is false', async () => {
    const { result } = renderFiltersContextSetupHook();

    await act(async () =>
      result.current.createToggleFilterHandler({
        value: {
          foo: 'bar',
        },
      })(),
    );
    await act(async () =>
      result.current.createToggleFilterHandler({
        value: {
          foo: 'baz',
        },
      })(),
    );

    expect(result.current.filtersToApply).not.toHaveProperty('foo');
  });

  test('overwriting toggle filter', async () => {
    const { result } = renderFiltersContextSetupHook();

    await act(async () =>
      result.current.createToggleFilterHandler({
        value: {
          foo: 'bar',
        },
      })(),
    );
    await act(async () =>
      result.current.createToggleFilterHandler({
        value: {
          foo: 'baz',
        },
        overwrite: true,
      })(),
    );

    expect(result.current.filtersToApply).toHaveProperty('foo', 'baz');
  });

  test('clearing filter dropdown', () => {
    const { result } = renderFiltersContextSetupHook();

    act(() => {
      result.current.createOpenFilterHandler(0)();
      result.current.clearSelectingFilter();
    });

    expect(result.current.selectingFilter).toBeNull();
  });

  test('selecting a filter with a dropdown', () => {
    const { result } = renderFiltersContextSetupHook();

    act(() => result.current.createOpenFilterHandler(0)());

    expect(result.current.selectingFilter).toEqual(0);
  });

  test('resetting a group of filters', () => {
    const { result } = renderFiltersContextSetupHook();

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
        type: SiteCatalogFilterListTypeEnum.SiteCatalogFilterList,
      } as unknown) as CatalogFilterTypes)(),
    );

    expect(result.current.filtersToApply).not.toHaveProperty('foo');
    expect(result.current.filtersToApply).not.toHaveProperty('bar');
  });
});