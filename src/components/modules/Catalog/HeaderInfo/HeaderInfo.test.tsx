import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import * as CatalogProductsContext from '~/context/CatalogProducts.context';
import * as CatalogSummaryContext from '~/context/CatalogSummary.context';
import * as PersonalizationContext from '~/context/UserPersonalization.context';
import { UserPersonalization } from '~/data/models/UserPersonalization';
import * as bootstrap from '~/lib/api/bootstrap';
import * as fetch from '~/lib/fetch';

import HeaderInfo from './HeaderInfo';

jest.mock('emotion-theming', () => ({
  useTheme: () => ({ header: {} }),
}));
jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

const tree = (
  <HeaderInfo
    isInternal={false}
    hasTopPicks={false}
    location="Portland, OR"
    title="Test title"
  />
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

describe('HeaderInfo', () => {
  beforeAll(async () => {
    await preloadAll();
    (PersonalizationContext as any).useUserPersonalizationContext = jest.fn(
      () => ({}),
    );
    (CatalogSummaryContext as any).useCatalogSummaryContext = jest.fn(
      () => ({}),
    );
  });

  beforeEach(() => {
    jest.spyOn(bootstrap, 'apiBootstrap').mockResolvedValue();
    jest.spyOn(fetch, 'fetchGetUserPersonalization');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('changes advanced view to true and calls with correct args', async () => {
    (CatalogProductsContext as any).useCatalogProductsContext = jest.fn(
      () => mockCatalogContext,
    );
    const mockUpdateResults = jest.spyOn(
      CatalogProductsContext.useCatalogProductsContext(),
      'handleUpdateResults',
    );
    render(tree);
    const advancedViewButton = screen.queryByRole('switch') as HTMLElement;
    fireEvent.click(advancedViewButton);

    jest
      .spyOn(fetch, 'fetchGetUserPersonalization')
      .mockReturnValue({} as UserPersonalization);
    await waitFor(() =>
      expect(mockUpdateResults).toHaveBeenCalledWith({
        skipGroups: 'true',
      }),
    );
  });

  it('changes advanced view to true and calls with no args', async () => {
    (CatalogProductsContext as any).useCatalogProductsContext = jest.fn(() => ({
      ...mockCatalogContext,
      isAdvancedView: true,
    }));
    const mockUpdateResults = jest.spyOn(
      CatalogProductsContext.useCatalogProductsContext(),
      'handleUpdateResults',
    );
    render(tree);
    const advancedViewButton = screen.queryByRole('switch') as HTMLElement;
    fireEvent.click(advancedViewButton);

    jest
      .spyOn(fetch, 'fetchGetUserPersonalization')
      .mockReturnValue({} as UserPersonalization);
    fireEvent.click(advancedViewButton);
    await waitFor(() => expect(mockUpdateResults).toHaveBeenCalledWith({}));
  });
});
