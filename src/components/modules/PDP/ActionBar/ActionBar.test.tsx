/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import ReactModal from 'react-modal';

import * as ProductDetailContext from '~/components/pages/ProductDetail/ProductDetail.context';
import * as ModalContext from '~/context/Modal.context';
import * as UserPersonalizationContext from '~/context/UserPersonalization.context';
import { THEME } from '~/lib/constants';

import ActionBar from './ActionBar';

ReactModal.setAppElement('*');

const roadHazard = { durationLabel: '3 years', price: '5208' };
const emptyRoadHazard = null;
const mockActionBar = {
  rearPrice: null,
  rearSize: null,
  startingPrice: '5999',
  theme: THEME.ORANGE,
  tirePrice: '13296',
  tireSize: '235/40 R15 91H',
};
const addToCart = jest.fn();

// Mock icons since jest-next-dynamic does not support svgx
jest.mock('~/components/global/Icon/Icon', () => () => 'Icon');

describe('modules/PDP/ActionBar', () => {
  beforeAll(async () => {
    await preloadAll();
    (UserPersonalizationContext as any).useUserPersonalizationContext = jest.fn(
      () => ({}),
    );
    (ProductDetailContext as any).useProductDetailContext = jest.fn(() => ({
      addToCart,
      quantity: { front: 4 },
    }));
    (ModalContext as any).useModalContext = jest.fn(() => ({}));
  });

  it('if road hazard coverage is available, open modal', () => {
    render(<ActionBar {...mockActionBar} roadHazard={roadHazard} />);
    const addToCartButton = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartButton);

    const modal = screen.getByTestId('road-hazard-modal');

    expect(modal).toBeInTheDocument();
  });

  it('if road hazard coverage is not available, add to cart with no modal', () => {
    render(<ActionBar {...mockActionBar} roadHazard={emptyRoadHazard} />);
    const addToCartButton = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartButton);

    expect(addToCart).toBeCalled();
  });

  it('if road hazard coverage is available, add to cart in modal', () => {
    render(<ActionBar {...mockActionBar} roadHazard={roadHazard} />);
    const addToCartButton = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartButton);

    // Accept road hazard coverage
    const roadHazardContinue = screen.getByTestId('road-hazard-continue');
    const addCoverageRadio = screen.getByDisplayValue('coverage');

    fireEvent.click(addCoverageRadio);
    fireEvent.click(roadHazardContinue);

    expect(addToCart).toBeCalled();
  });

  it('if road hazard is available and declined, alert user they can change their mind', () => {
    render(<ActionBar {...mockActionBar} roadHazard={roadHazard} />);
    const addToCartButton = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartButton);

    // Decline road hazard coverage
    const roadHazardContinue = screen.getByTestId('road-hazard-continue');
    const removeCoverageRadio = screen.getByDisplayValue('no-coverage');

    fireEvent.click(removeCoverageRadio);
    fireEvent.click(roadHazardContinue);

    // Continue modal content has been shown if it has alert buttons
    const addCoverageButton = screen.getByTestId('add-coverage');
    const noCoverageButton = screen.getByTestId('no-coverage');

    expect(addCoverageButton).toBeInTheDocument();
    expect(noCoverageButton).toBeInTheDocument();
  });

  it('user can add to cart with road hazard coverage after initially declining', () => {
    render(<ActionBar {...mockActionBar} roadHazard={roadHazard} />);
    const addToCartButton = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartButton);

    // Decline road hazard coverage
    const roadHazardContinue = screen.getByTestId('road-hazard-continue');
    const removeCoverageRadio = screen.getByDisplayValue('no-coverage');

    fireEvent.click(removeCoverageRadio);
    fireEvent.click(roadHazardContinue);

    // Opt to add road hazard coverage
    const addCoverageButton = screen.getByTestId('add-coverage');
    fireEvent.click(addCoverageButton);

    expect(addToCart).toBeCalled();
  });

  it('user can add to cart without road hazard coverage', () => {
    render(<ActionBar {...mockActionBar} roadHazard={roadHazard} />);
    const addToCartButton = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartButton);

    // Decline road hazard coverage
    const roadHazardContinue = screen.getByTestId('road-hazard-continue');
    const removeCoverageRadio = screen.getByDisplayValue('no-coverage');

    fireEvent.click(removeCoverageRadio);
    fireEvent.click(roadHazardContinue);

    // Accept the road hazard alert
    const noCoverageButton = screen.getByTestId('no-coverage');
    fireEvent.click(noCoverageButton);

    expect(addToCart).toBeCalled();
  });
});
