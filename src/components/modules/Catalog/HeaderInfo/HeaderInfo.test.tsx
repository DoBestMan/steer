import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { UserPersonalizationContextProvider } from '~/context/UserPersonalization.context';
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

const catalogMockArgs = {
  handleUpdateFilters: jest.fn(() => Promise.resolve()),
};

const tree = (
  <UserPersonalizationContextProvider>
    <CatalogPageContextProvider {...catalogMockArgs}>
      <HeaderInfo
        isInternal={false}
        hasTopPicks={false}
        location="Portland, OR"
        title="Test title"
      />
    </CatalogPageContextProvider>
  </UserPersonalizationContextProvider>
);

describe('HeaderInfo', () => {
  beforeEach(() => {
    jest.spyOn(bootstrap, 'apiBootstrap').mockResolvedValue();
    jest.spyOn(fetch, 'fetchGetUserPersonalization');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates results when toggling', async () => {
    render(tree);
    const advancedViewButton = screen.queryByRole('switch') as HTMLElement;
    fireEvent.click(advancedViewButton);

    jest
      .spyOn(fetch, 'fetchGetUserPersonalization')
      .mockReturnValue({} as UserPersonalization);
    await waitFor(() =>
      expect(catalogMockArgs.handleUpdateFilters).toHaveBeenCalledWith(
        {
          skipGroups: 'true',
        },
        undefined,
      ),
    );

    fireEvent.click(advancedViewButton);
    await waitFor(() =>
      expect(catalogMockArgs.handleUpdateFilters).toHaveBeenCalledWith(
        {},
        undefined,
      ),
    );
  });
});
