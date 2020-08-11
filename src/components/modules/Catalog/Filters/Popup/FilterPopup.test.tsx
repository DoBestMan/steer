import { render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import ReactModal from 'react-modal';

import { emptyCatalogProducts } from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { ModalContextProvider } from '~/context/Modal.context';
import { SiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteCatalogFilterListPresentationStyleEnum } from '~/data/models/SiteCatalogFilterList';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import * as windowHook from '~/hooks/useWindowSize';

import { FiltersContextProvider } from '../Filters.context';
import { mockList, mockSiteCatalogFilters } from '../Filters.mocks';
import FilterPopup from './FilterPopup';

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
const mockArgs = {
  siteCatalogFilters: {
    filtersList: mockSiteCatalogFilters,
  } as SiteCatalogFilters,
  onPreviewFilters: jest.fn(),
  previewFiltersData: {
    filters: emptyCatalogProducts.siteCatalogFilters as SiteCatalogFilters,
    totalMatches: 0,
  },
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
      <CatalogPageContextProvider handleUpdateFilters={jest.fn}>
        <FiltersContextProvider {...mockArgs}>
          <FilterPopup
            hasActionBar
            isOpen
            onClose={jest.fn}
            filter={mockList}
          />
        </FiltersContextProvider>
      </CatalogPageContextProvider>
    </ModalContextProvider>
  </SiteGlobalsContext.Provider>
);

describe('FilterPopup', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays correct filter type', () => {
    const dom = render(tree);
    const filterContent = dom.queryByRole('checkbox', { hidden: true });

    expect(filterContent).toBeInTheDocument();
  });

  it('displays a modal if breakpoint is < L', () => {
    jest.spyOn(windowHook, 'useWindowSize').mockReturnValue({
      width: 360,
      height: 640,
    });

    render(tree);
    const modal = screen.getByRole('dialog', { hidden: true });

    expect(modal).toBeInTheDocument();
  });

  it('displays a dropdown if breakpoint is > L', () => {
    render(tree);
    const dropdown = screen.getByTestId('dropdown-test-id');

    expect(dropdown).toBeInTheDocument();
  });

  it('displays a modal for large presentation checklist filters', () => {
    render(
      <SiteGlobalsContext.Provider
        value={{
          customerServiceEnabled: true,
          customerServiceNumber: { display: '123', value: '123' },
          siteTheme: null,
        }}
      >
        <ModalContextProvider>
          <CatalogPageContextProvider handleUpdateFilters={jest.fn}>
            <FiltersContextProvider {...mockArgs}>
              <FilterPopup
                hasActionBar
                isOpen
                onClose={jest.fn}
                filter={{
                  ...mockList,
                  presentationStyle:
                    SiteCatalogFilterListPresentationStyleEnum.Large,
                }}
              />
            </FiltersContextProvider>
          </CatalogPageContextProvider>
        </ModalContextProvider>
      </SiteGlobalsContext.Provider>,
    );
    const modal = screen.getByRole('dialog', { hidden: true });

    expect(modal).toBeInTheDocument();
  });
});
