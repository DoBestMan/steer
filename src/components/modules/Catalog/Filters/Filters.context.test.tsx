import { renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { act } from 'react-test-renderer';

import { emptyCatalogProductsMock } from '~/components/pages/CatalogPage/CatalogPage.mock';
import * as CatalogProductsContext from '~/context/CatalogProducts.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import { useFiltersContextSetup } from './Filters.context';
import { siteCatalogFiltersMock } from './Filters.mock';

const mockArgs = {
  siteCatalogFilters: {
    filtersList: siteCatalogFiltersMock,
  } as SiteCatalogFilters,
  onPreviewFilters: jest.fn(() => Promise.resolve()),
  previewFiltersData: {
    filters: emptyCatalogProductsMock.siteCatalogFilters as SiteCatalogFilters,
    totalMatches: 0,
  },
};

interface WrapperProps {
  children?: ReactNode;
}

const mockCatalogContext = {
  displayedProducts: [],
  fetchNewProducts: jest.fn(),
  handleUpdateResults: jest.fn(),
  isAdvancedView: false,
  isLoading: false,
  onPreviewFilters: jest.fn(),
  previewFiltersData: {},
  scrollToGrid: false,
  setDisplayedProducts: jest.fn(),
  setIsAdvancedView: jest.fn(),
  setIsLoading: jest.fn(),
  siteCatalogProducts: {},
};

function wrapper({ children }: WrapperProps) {
  return <>{children}</>;
}

const renderFiltersContextSetupHook = () =>
  renderHook(() => useFiltersContextSetup(mockArgs), {
    wrapper,
  });

describe('useFiltersContextSetup', () => {
  beforeAll(() => {
    (CatalogProductsContext as any).useCatalogProductsContext = jest.fn(
      () => mockCatalogContext,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initial state with active filters', () => {
    const { result } = renderFiltersContextSetupHook();

    expect(result.current.filtersToApply).toHaveProperty(
      'brand',
      'goodyear,pirelli',
    );
  });

  test('does not preview filters upon opening', () => {
    const { result } = renderFiltersContextSetupHook();

    act(() => result.current.createOpenFilterHandler(1)());

    expect(mockArgs.onPreviewFilters).not.toBeCalled();
  });

  test('previews filters if filters state changes after opening', async () => {
    const { result } = renderFiltersContextSetupHook();
    act(() => result.current.createOpenFilterHandler(1)());
    await act(async () =>
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'bar',
        },
      })(),
    );

    expect(mockArgs.onPreviewFilters).toBeCalledWith({
      brand: 'goodyear,pirelli',
      foo: 'bar',
    });
  });

  test('toggling dropdown closed after previewing should not preview on next open', async () => {
    const { result } = renderFiltersContextSetupHook();
    act(() => result.current.createOpenFilterHandler(1)());
    await act(async () =>
      result.current.createUpdateFilterGroup({
        value: {
          foo: 'bar',
        },
      })(),
    );
    act(() => result.current.createOpenFilterHandler(1)());

    expect(mockArgs.onPreviewFilters).toBeCalledTimes(1);
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

  test('unchecking the last item in a group sets empty value in state', () => {
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

    expect(result.current.filtersToApply.foo).toEqual('');
  });

  test('immediately revalidates when toggling a filter', async () => {
    const { result } = renderFiltersContextSetupHook();

    await act(async () =>
      result.current.createToggleFilterHandler({ foo: 'bar' })(),
    );

    // immediately fetches
    expect(mockCatalogContext.handleUpdateResults).toHaveBeenCalledTimes(1);
    expect(mockCatalogContext.handleUpdateResults).toHaveBeenCalledWith({
      brand: 'goodyear,pirelli',
      foo: 'bar',
    });
  });

  test('toggle filter', async () => {
    const { result } = renderFiltersContextSetupHook();

    await act(async () =>
      result.current.createToggleFilterHandler({
        foo: 'true',
      })(),
    );

    expect(mockCatalogContext.handleUpdateResults).toHaveBeenCalledWith({
      brand: 'goodyear,pirelli',
      foo: 'true',
    });

    await act(async () =>
      result.current.createToggleFilterHandler({
        foo: '',
      })(),
    );

    expect(mockCatalogContext.handleUpdateResults).toHaveBeenCalledWith({
      brand: 'goodyear,pirelli',
      foo: '',
    });
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
        type: FilterContentTypes.SiteCatalogFilterList,
      } as unknown) as CatalogFilterTypes)(),
    );

    expect(result.current.filtersToApply).toHaveProperty('foo', '');
    expect(result.current.filtersToApply).toHaveProperty('bar', '');
  });

  test('clearing filters to apply should reset data', () => {
    const { result } = renderFiltersContextSetupHook();

    act(() => {
      result.current.createUpdateFilterGroup({
        value: { bar: 'baz' },
      })();
    });

    expect(result.current.filtersToApply).toHaveProperty('bar', 'baz');

    act(() => result.current.clearFiltersToApply());

    expect(result.current.filtersToApply).not.toHaveProperty('bar');
    expect(mockArgs.onPreviewFilters).toBeCalledTimes(1);
  });
});
