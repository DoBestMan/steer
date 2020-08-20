import { render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import ReactModal from 'react-modal';

import { emptyCatalogProductsMock } from '~/components/pages/CatalogPage/CatalogPage.mock';
import * as CatalogProductsContext from '~/context/CatalogProducts.context';
import * as GlobalToastContext from '~/context/GlobalToast.context';
import * as ModalContext from '~/context/Modal.context';
import * as SiteGlobalsContext from '~/context/SiteGlobals.context';
import { SiteCatalogFilterListPresentationStyleEnum } from '~/data/models/SiteCatalogFilterList';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import * as windowHook from '~/hooks/useWindowSize';

import { FiltersContextProvider } from '../Filters.context';
import { listMock, siteCatalogFiltersMock } from '../Filters.mock';
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
    filtersList: siteCatalogFiltersMock,
  } as SiteCatalogFilters,
  onPreviewFilters: jest.fn(),
  previewFiltersData: {
    filters: emptyCatalogProductsMock.siteCatalogFilters as SiteCatalogFilters,
    totalMatches: 0,
  },
};

const tree = (
  <FiltersContextProvider {...mockArgs}>
    <FilterPopup hasActionBar isOpen onClose={jest.fn} filter={listMock} />
  </FiltersContextProvider>
);

describe('FilterPopup', () => {
  beforeAll(async () => {
    await preloadAll();
    (GlobalToastContext as any).useGlobalToastContext = jest.fn(() => ({}));
    (SiteGlobalsContext as any).useSiteGlobalsContext = jest.fn(() => ({}));
    (CatalogProductsContext as any).useCatalogProductsContext = jest.fn(
      () => ({}),
    );
    (ModalContext as any).useModalContext = jest.fn(() => ({}));
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
      <FiltersContextProvider {...mockArgs}>
        <FilterPopup
          hasActionBar
          isOpen
          onClose={jest.fn}
          filter={{
            ...listMock,
            presentationStyle: SiteCatalogFilterListPresentationStyleEnum.Large,
          }}
        />
      </FiltersContextProvider>,
    );
    const modal = screen.getByRole('dialog', { hidden: true });

    expect(modal).toBeInTheDocument();
  });
});
