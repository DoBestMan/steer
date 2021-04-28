/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import ReactModal from 'react-modal';

import { emptyCatalogProductsMock } from '~/components/pages/CatalogPage/CatalogPage.mock';
import * as CatalogProductsContext from '~/context/CatalogProducts.context';
import * as CatalogSummaryContext from '~/context/CatalogSummary.context';
import * as GlobalToastContext from '~/context/GlobalToast.context';
import * as ModalContext from '~/context/Modal.context';
import * as SiteGlobalsContext from '~/context/SiteGlobals.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import * as windowHook from '~/hooks/useWindowSize';

import * as FiltersContext from '../Filters.context';
import {
  filterSortMock,
  priceFilterMock,
  siteCatalogFiltersMock,
} from '../Filters.mock';
import SubFilters from './SubFilters';

ReactModal.setAppElement('*'); // removes warning in tests

jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

jest.mock('@emotion/react', () => ({
  useTheme: () => ({ header: {} }),
}));

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

const tree = (
  <FiltersContext.FiltersContextProvider {...mockArgs}>
    <SubFilters
      showingResult={0}
      resultsCount={0}
      priceFilter={priceFilterMock}
      sortList={filterSortMock}
    />
  </FiltersContext.FiltersContextProvider>
);

const mockCatalogProductsContext = {
  displayedProducts: [],
  fetchNewProducts: jest.fn(),
  handleUpdateResults: jest.fn(),
  isAdvancedView: true,
  isLoading: false,
  onPreviewFilters: jest.fn(),
  previewFiltersData: {},
  scrollToGrid: false,
  setDisplayedProducts: jest.fn(),
  setIsAdvancedView: jest.fn(),
  setIsLoading: jest.fn(),
  siteCatalogProducts: {},
};

const mockCatalogSummaryContext = {
  siteCatalogSummary: {
    siteCatalogSummaryTopPicksList: [],
  },
};

describe('SubFilters', () => {
  beforeAll(async () => {
    await preloadAll();
    (CatalogProductsContext as any).useCatalogProductsContext = jest.fn(
      () => mockCatalogProductsContext,
    );
    (CatalogSummaryContext as any).useCatalogSummaryContext = jest.fn(
      () => mockCatalogSummaryContext,
    );
    (GlobalToastContext as any).useGlobalToastContext = jest.fn(() => ({}));
    (SiteGlobalsContext as any).useSiteGlobalsContext = jest.fn(() => ({}));
    (ModalContext as any).useModalContext = jest.fn(() => ({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('opens sort popup', () => {
    render(tree);
    const filterButton = screen.queryByTestId(
      'sort-filter-button',
    ) as HTMLElement;
    fireEvent.click(filterButton);

    expect(screen.queryByTestId('dropdown-test-id-open')).toBeInTheDocument();
  });

  it('does not have action buttons on breakpoints > L', () => {
    render(tree);
    const filterButton = screen.queryByTestId(
      'sort-filter-button',
    ) as HTMLElement;
    fireEvent.click(filterButton);

    expect(screen.queryByTestId('primary-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('secondary-button')).not.toBeInTheDocument();
  });

  it('has radio buttons on breakpoints < L', () => {
    jest.spyOn(windowHook, 'useWindowSize').mockReturnValue({
      width: 360,
      height: 640,
    });
    render(tree);
    const filterButton = screen.queryByTestId(
      'sort-filter-button',
    ) as HTMLElement;
    fireEvent.click(filterButton);

    expect(
      screen.queryAllByRole('radio', { hidden: true }).length,
    ).toBeTruthy();
  });

  it('applies a sort', async () => {
    render(tree);
    const filterButton = screen.queryByTestId(
      'sort-filter-button',
    ) as HTMLElement;
    fireEvent.click(filterButton);

    const sortBy = screen.queryByText('Best match') as HTMLElement;
    fireEvent.click(sortBy);

    await waitFor(() =>
      expect(
        mockCatalogProductsContext.handleUpdateResults,
      ).toHaveBeenCalledTimes(1),
    );
  });
});
