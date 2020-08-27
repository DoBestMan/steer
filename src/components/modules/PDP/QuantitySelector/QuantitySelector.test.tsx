/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render, screen, within } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import ReactModal from 'react-modal';

import * as ProductDetailContext from '~/components/pages/ProductDetail/ProductDetail.context';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelectorContainer from './QuantitySelector.container';

ReactModal.setAppElement('*');

// Mock icons since jest-next-dynamic does not support svgx
jest.mock('~/components/global/Icon/Icon', () => () => 'Icon');

const toggleModal = jest.fn();
const changeQuantity = jest.fn();
const defaultFrontOnlyQuantity = {
  front: 4,
  rear: 0,
};
const defaultFrontAndRearQuantity = {
  front: 2,
  rear: 2,
};

describe('modules/PDP/QuantitySelector', () => {
  beforeEach(async () => {
    await preloadAll();
    (ProductDetailContext as any).useProductDetailContext = jest.fn(() => ({
      quantity: defaultFrontOnlyQuantity,
    }));
  });

  afterEach(() => {
    changeQuantity.mockClear();
  });

  it('confirms default quantity', () => {
    render(
      <QuantitySelectorContainer
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
      />,
    );

    const confirmButton = screen.getByTestId('confirm-button');

    fireEvent.click(confirmButton);

    expect(changeQuantity).toBeCalledWith(defaultFrontOnlyQuantity);
  });

  it('changes quantity and confirm', () => {
    render(
      <QuantitySelectorContainer
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
      />,
    );

    const confirmButton = screen.getByTestId('confirm-button');

    const buttons = screen.getByTestId('front-picker');
    const buttonFive = within(buttons).getByText('5');

    fireEvent.click(buttonFive);
    fireEvent.click(confirmButton);

    expect(changeQuantity).toBeCalledWith({ front: 5, rear: 0 });
  });

  it('intercepts 1 unit and confirms', () => {
    render(
      <QuantitySelectorContainer
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
      />,
    );

    const confirmButton = screen.getByTestId('confirm-button');

    const buttons = screen.getByTestId('front-picker');
    const buttonOne = within(buttons).getByText('1');

    fireEvent.click(buttonOne);
    fireEvent.click(confirmButton);

    expect(changeQuantity).toBeCalledTimes(0);

    // Intercept
    const keepQuantityButton = screen.getByTestId('keep-quantity-button');

    expect(
      screen.getByText(
        ui('pdp.quantitySelector.confirmationTitle', {
          quantity: 2,
        }).replace('<br />', ''),
      ),
    ).toBeInTheDocument();

    expect(keepQuantityButton).toBeInTheDocument();
    expect(keepQuantityButton).toHaveTextContent(
      ui('pdp.quantitySelector.keepQuantity', {
        quantity: 1,
      }),
    );

    fireEvent.click(keepQuantityButton);

    expect(changeQuantity).toBeCalledWith({ front: 1, rear: 0 });
  });

  it('intercepts 1 unit and accept suggestion', async () => {
    render(
      <QuantitySelectorContainer
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
      />,
    );

    const confirmButton = screen.getByTestId('confirm-button');

    const buttons = screen.getByTestId('front-picker');
    const buttonOne = within(buttons).getByText('1');

    fireEvent.click(buttonOne);
    fireEvent.click(confirmButton);

    expect(changeQuantity).toBeCalledTimes(0);

    // Intercept
    expect(
      screen.getByText(
        ui('pdp.quantitySelector.confirmationTitle', {
          quantity: 2,
        }).replace('<br />', ''),
      ),
    ).toBeInTheDocument();

    const acceptSuggestionButton = screen.getByTestId('change-quantity-button');

    expect(acceptSuggestionButton).toBeInTheDocument();
    expect(acceptSuggestionButton).toHaveTextContent(
      ui('pdp.quantitySelector.changeQuantityPlural', {
        quantity: 2,
      }),
    );

    fireEvent.click(acceptSuggestionButton);

    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(confirmButton);

    expect(changeQuantity).toBeCalledWith({ front: 2, rear: 0 });
  });

  it('confirms front and rear default quantities', async () => {
    (ProductDetailContext as any).useProductDetailContext = jest.fn(() => ({
      quantity: defaultFrontAndRearQuantity,
    }));

    render(
      <QuantitySelectorContainer
        isFrontAndRear
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
        rearPrice="6000"
      />,
    );

    const confirmButton = screen.getByTestId('confirm-button');

    fireEvent.click(confirmButton);

    expect(changeQuantity).toBeCalledWith(defaultFrontAndRearQuantity);
  });

  it('changes front and rear quantities and confirm', async () => {
    (ProductDetailContext as any).useProductDetailContext = jest.fn(() => ({
      quantity: defaultFrontAndRearQuantity,
    }));

    render(
      <QuantitySelectorContainer
        isFrontAndRear
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
        rearPrice="6999"
      />,
    );

    const confirmButton = screen.getByTestId('confirm-button');

    const buttonsFront = screen.getByTestId('front-picker');
    const buttonFrontOne = within(buttonsFront).getByText('1');

    const buttonsRear = screen.getByTestId('rear-picker');
    const buttonRearThree = within(buttonsRear).getByText('3');

    fireEvent.click(buttonFrontOne);
    fireEvent.click(buttonRearThree);
    fireEvent.click(confirmButton);

    expect(changeQuantity).toBeCalledWith({ front: 1, rear: 3 });
  });

  it('calculates front only total', async () => {
    render(
      <QuantitySelectorContainer
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
      />,
    );

    const price = screen.getByTestId('total-price');
    const buttons = screen.getByTestId('front-picker');
    const buttonOne = within(buttons).getByText('1');
    const buttonFive = within(buttons).getByText('5');

    fireEvent.click(buttonOne);

    expect(price).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $50.00`,
    );

    fireEvent.click(buttonFive);

    expect(price).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $250.00`,
    );
  });

  it('calculates front and rear total', async () => {
    render(
      <QuantitySelectorContainer
        isFrontAndRear
        isOpen
        onChangeQuantity={changeQuantity}
        toggleModal={toggleModal}
        tirePrice="5000"
        rearPrice="6000"
      />,
    );

    const prices = screen.getAllByTestId('total-price');

    const buttonsFront = screen.getByTestId('front-picker');
    const buttonFrontOne = within(buttonsFront).getByText('1');
    const buttonFrontTwo = within(buttonsFront).getByText('2');

    const buttonsRear = screen.getByTestId('rear-picker');
    const buttonRearOne = within(buttonsRear).getByText('1');
    const buttonRearTwo = within(buttonsRear).getByText('2');

    fireEvent.click(buttonFrontOne);
    fireEvent.click(buttonRearOne);

    expect(prices[0]).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $50.00`,
    );
    expect(prices[1]).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $60.00`,
    );

    fireEvent.click(buttonFrontTwo);

    expect(prices[0]).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $100.00`,
    );
    expect(prices[1]).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $60.00`,
    );

    fireEvent.click(buttonRearTwo);

    expect(prices[0]).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $100.00`,
    );
    expect(prices[1]).toHaveTextContent(
      `${ui('pdp.quantitySelector.totalPrice')} $120.00`,
    );
  });
});
