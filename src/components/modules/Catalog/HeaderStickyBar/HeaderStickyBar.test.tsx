/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import * as CatalogSummaryContext from '~/context/CatalogSummary.context';
import * as GlobalToastContext from '~/context/GlobalToast.context';
import * as PersonalizationContext from '~/context/UserPersonalization.context';
import * as bootstrap from '~/lib/api/bootstrap';
import * as fetch from '~/lib/fetch';

import HeaderStickyBar from './HeaderStickyBar';

jest.mock('emotion-theming', () => ({
  useTheme: () => ({ header: {} }),
}));

const tree = (
  <HeaderStickyBar>
    <div />
  </HeaderStickyBar>
);

describe('HeaderStickyBar', () => {
  beforeAll(async () => {
    await preloadAll();
    (PersonalizationContext as any).useUserPersonalizationContext = jest.fn(
      () => ({}),
    );
    (CatalogSummaryContext as any).useCatalogSummaryContext = jest.fn(
      () => ({}),
    );
    (GlobalToastContext as any).useGlobalToastContext = jest.fn(() => ({}));
  });

  beforeEach(() => {
    jest.spyOn(bootstrap, 'apiBootstrap').mockResolvedValue();
    jest.spyOn(fetch, 'fetchGetUserPersonalization');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a component tree', () => {
    const { container } = render(tree);

    expect(container.querySelector('div')).toBeTruthy();
  });
});
