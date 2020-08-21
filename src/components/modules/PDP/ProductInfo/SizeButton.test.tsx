/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import * as NextRouter from 'next/router';
import ReactModal from 'react-modal';

import * as SearchContext from '~/components/modules/Search/Search.context';
import { siteProductMock } from '~/components/pages/ProductDetail/mappers/ProductDetail.mock';
import * as ProductDetailContext from '~/components/pages/ProductDetail/ProductDetail.context';
import * as GlobalsContext from '~/context/Globals.context';
import * as ModalContext from '~/context/Modal.context';
import * as SiteGlobalsContext from '~/context/SiteGlobals.context';
import * as UserPersonalizationContext from '~/context/UserPersonalization.context';
import { ui } from '~/lib/utils/ui-dictionary';

import SizeButton from './SizeButton';

(NextRouter as any).useRouter = jest.fn(() => ({ route: '/' }));
ReactModal.setAppElement('*');
jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

const CONSTANTS = {
  AVAILABLE_SIZES: 12,
};

const changeSize = jest.fn();
const openStaticModal = jest.fn();

describe('modules/PDP/SizeButton', () => {
  beforeAll(async () => {
    await preloadAll();
    (SiteGlobalsContext as any).useSiteGlobalsContext = jest.fn(() => ({}));
    (UserPersonalizationContext as any).useUserPersonalizationContext = jest.fn(
      () => ({}),
    );
    (ProductDetailContext as any).useProductDetailContext = jest.fn(() => ({
      changeSize,
    }));
    (GlobalsContext as any).useGlobalsContext = jest.fn(() => ({}));
    (ModalContext as any).useModalContext = jest.fn(() => ({
      openStaticModal,
    }));
    (SearchContext as any).useSearchContext = jest.fn(() => ({}));
  });

  it('starts with no size selected and then select the first', () => {
    render(
      <SizeButton
        availableSizes={CONSTANTS.AVAILABLE_SIZES}
        sizeFinder={{
          currentIndex: -1,
          sizes: siteProductMock.siteProductLineAvailableSizeList,
        }}
      />,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveTextContent(
      ui('pdp.productInfo.selectSizeButton', {
        availableSizes: CONSTANTS.AVAILABLE_SIZES,
      }),
    );

    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');

    const options = screen.getAllByRole('radio');

    fireEvent.click(options[0]);

    expect(changeSize).toBeCalled();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('starts with no size selected and then select the only one available', () => {
    render(
      <SizeButton
        availableSizes={1}
        sizeFinder={{
          currentIndex: -1,
          sizes: siteProductMock.siteProductLineAvailableSizeList.slice(0, 1),
        }}
      />,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveTextContent(
      ui('pdp.productInfo.selectSingleSizeButton'),
    );

    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');

    const options = screen.getAllByRole('radio');

    fireEvent.click(options[0]);

    expect(changeSize).toBeCalled();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it("doesn't trigger any action if there's only one available size and it's set", () => {
    render(
      <SizeButton
        availableSizes={1}
        size="100/40R15"
        loadSpeedRating="89H"
        sizeFinder={{
          currentIndex: -1,
          sizes: siteProductMock.siteProductLineAvailableSizeList,
        }}
      />,
    );

    const button = screen.queryByRole('button');

    expect(button).toBeNull();
  });

  it('shows how to find tire size modal when clicked', () => {
    render(
      <SizeButton
        availableSizes={CONSTANTS.AVAILABLE_SIZES}
        size="100/40R15"
        loadSpeedRating="89H"
        sizeFinder={{
          currentIndex: -1,
          sizes: siteProductMock.siteProductLineAvailableSizeList,
        }}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const modalLink = screen.getByTestId('find-my-tire-size');

    fireEvent.click(modalLink);

    expect(openStaticModal).toHaveBeenCalledWith('findYourTireSize');
  });
});
