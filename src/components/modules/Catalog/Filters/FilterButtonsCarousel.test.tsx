import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import { emptyCatalogProductsMock } from '~/components/pages/CatalogPage/CatalogPage.mock';
import * as CatalogProductsContext from '~/context/CatalogProducts.context';
import * as GlobalToastContext from '~/context/GlobalToast.context';
import * as ModalContext from '~/context/Modal.context';
import * as SiteGlobalsContext from '~/context/SiteGlobals.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';

import FilterButtonsCarousel from './FilterButtonsCarousel';
import { FiltersContextProvider } from './Filters.context';
import {
  listMock,
  listSelectedMock,
  siteCatalogFiltersMock,
} from './Filters.mock';

jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {},
  })),
}));

jest.mock('emotion-theming', () => ({
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
  <FiltersContextProvider {...mockArgs}>
    <FilterButtonsCarousel popularFilters={[]} filters={[listMock]} />
  </FiltersContextProvider>
);

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

describe('FilterButtonsCarousel', () => {
  beforeAll(async () => {
    await preloadAll();
    (GlobalToastContext as any).useGlobalToastContext = jest.fn(() => ({}));
    (ModalContext as any).useModalContext = jest.fn(() => ({}));
    (SiteGlobalsContext as any).useSiteGlobalsContext = jest.fn(() => ({}));
    (CatalogProductsContext as any).useCatalogProductsContext = jest.fn(
      () => mockCatalogContext,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('opens filter popup', () => {
    render(tree);
    const filterButton = screen.queryByRole('button') as HTMLElement;
    fireEvent.click(filterButton);

    expect(screen.queryByTestId('dropdown-test-id')).toBeInTheDocument();
  });

  it('does not preview filters upon opening popup', async () => {
    render(tree);
    const filterButton = screen.queryByRole('button') as HTMLElement;
    fireEvent.click(filterButton);

    expect(mockArgs.onPreviewFilters).not.toHaveBeenCalled();
  });

  it('previews filters', async () => {
    render(tree);
    const filterButton = screen.queryByRole('button') as HTMLElement;
    fireEvent.click(filterButton);

    const checkbox = screen.queryByRole('checkbox', {
      hidden: true,
    }) as HTMLElement;
    fireEvent.click(checkbox);

    expect(checkbox).toBeDisabled();

    await waitFor(() =>
      expect(mockArgs.onPreviewFilters).toHaveBeenCalledTimes(1),
    );

    expect(checkbox).not.toBeDisabled();
    expect(screen.queryByTestId('dropdown-test-id')).toBeInTheDocument();
  });

  it('applies filters', async () => {
    render(tree);
    const filterButton = screen.queryByRole('button') as HTMLElement;
    fireEvent.click(filterButton);

    const checkbox = screen.queryByRole('checkbox', {
      hidden: true,
    }) as HTMLElement;
    fireEvent.click(checkbox);

    expect(checkbox).toBeDisabled();

    await waitFor(() =>
      expect(mockArgs.onPreviewFilters).toHaveBeenCalledTimes(1),
    );

    expect(checkbox).not.toBeDisabled();

    const applyButton = screen.queryByTestId('primary-button') as HTMLElement;
    fireEvent.click(applyButton);

    expect(mockCatalogContext.handleUpdateResults).toBeCalledTimes(1);

    await waitFor(() =>
      expect(screen.queryByTestId('dropdown-test-id')).toHaveAttribute(
        'aria-hidden',
        'true',
      ),
    );
  });

  it('resets filters', async () => {
    render(
      <FiltersContextProvider
        {...mockArgs}
        siteCatalogFilters={{
          filtersList: [listSelectedMock],
          sortList: [],
        }}
      >
        <FilterButtonsCarousel
          popularFilters={[]}
          filters={[listSelectedMock]}
        />
      </FiltersContextProvider>,
    );
    const filterButton = screen.queryByRole('button') as HTMLElement;
    fireEvent.click(filterButton);

    const checkbox = screen.queryByRole('checkbox', { hidden: true });

    expect(checkbox).toBeChecked();

    const resetButton = screen.queryByTestId('secondary-button') as HTMLElement;
    fireEvent.click(resetButton);

    await waitFor(() => expect(checkbox).not.toBeChecked());
  });
});
