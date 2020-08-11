import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import { emptyCatalogProducts } from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { ModalContextProvider } from '~/context/Modal.context';
import { SiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';

import FilterButtonsCarousel from './FilterButtonsCarousel';
import { FiltersContextProvider } from './Filters.context';
import {
  mockList,
  mockListSelected,
  mockSiteCatalogFilters,
} from './Filters.mocks';

jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

jest.mock('emotion-theming', () => ({
  useTheme: () => ({ header: {} }),
}));

const mockArgs = {
  siteCatalogFilters: {
    filtersList: mockSiteCatalogFilters,
  } as SiteCatalogFilters,
  onPreviewFilters: jest.fn(() => Promise.resolve()),
  previewFiltersData: {
    filters: emptyCatalogProducts.siteCatalogFilters as SiteCatalogFilters,
    totalMatches: 0,
  },
};

const catalogMockArgs = {
  handleUpdateFilters: jest.fn(),
};

const tree = (
  <SiteGlobalsContext.Provider
    value={{
      customerServiceEnabled: true,
      customerServiceNumber: { display: '123', value: '123' },
      siteTheme: null,
    }}
  >
    <ModalContextProvider>
      <CatalogPageContextProvider {...catalogMockArgs}>
        <FiltersContextProvider {...mockArgs}>
          <FilterButtonsCarousel popularFilters={[]} filters={[mockList]} />
        </FiltersContextProvider>
      </CatalogPageContextProvider>
    </ModalContextProvider>
  </SiteGlobalsContext.Provider>
);

describe('FilterButtonsCarousel', () => {
  beforeAll(async () => {
    await preloadAll();
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

    expect(catalogMockArgs.handleUpdateFilters).toBeCalledTimes(1);

    await waitFor(() =>
      expect(screen.queryByTestId('dropdown-test-id')).toHaveAttribute(
        'aria-hidden',
        'true',
      ),
    );
  });

  it('resets filters', async () => {
    render(
      <SiteGlobalsContext.Provider
        value={{
          customerServiceEnabled: true,
          customerServiceNumber: { display: '123', value: '123' },
          siteTheme: null,
        }}
      >
        <ModalContextProvider>
          <CatalogPageContextProvider {...catalogMockArgs}>
            <FiltersContextProvider
              {...mockArgs}
              siteCatalogFilters={{
                filtersList: [mockListSelected],
                sortList: [],
              }}
            >
              <FilterButtonsCarousel
                popularFilters={[]}
                filters={[mockListSelected]}
              />
            </FiltersContextProvider>
          </CatalogPageContextProvider>
        </ModalContextProvider>
      </SiteGlobalsContext.Provider>,
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
