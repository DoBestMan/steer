import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ReactModal from 'react-modal';

import { emptyCatalogProducts } from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { ModalContextProvider } from '~/context/Modal.context';
import { SiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import * as windowHook from '~/hooks/useWindowSize';

import { FiltersContextProvider } from '../Filters.context';
import {
  filterSort,
  mockPriceFilter,
  mockSiteCatalogFilters,
} from '../Filters.mocks';
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
          <SubFilters
            resultsCount={0}
            priceFilter={mockPriceFilter}
            sortList={filterSort}
          />
        </FiltersContextProvider>
      </CatalogPageContextProvider>
    </ModalContextProvider>
  </SiteGlobalsContext.Provider>
);

describe('SubFilters', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('opens sort popup', () => {
    render(tree);
    const filterButton = screen.queryByTestId(
      'sort-filter-button',
    ) as HTMLElement;
    fireEvent.click(filterButton);

    expect(screen.queryByTestId('dropdown-test-id')).toBeInTheDocument();
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
      expect(catalogMockArgs.handleUpdateFilters).toHaveBeenCalledTimes(1),
    );
  });
});
