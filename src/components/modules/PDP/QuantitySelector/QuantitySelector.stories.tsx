import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import HorizontalNumberPicker from '~/components/global/HorizontalNumberPicker/HorizontalNumberPicker';
import { SPACING } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelector from './QuantitySelector';
import QuantitySelectorContainer, {
  CONSTANTS as QUANTITY_SELECTOR_CONSTANTS,
} from './QuantitySelector.container';
import styles from './QuantitySelector.styles';

export default {
  component: QuantitySelectorContainer,
  title: 'PDP/Quantity Selector',
};

interface SubtitleProps {
  price?: string;
}

function Subtitle({ price }: SubtitleProps) {
  return (
    <p>
      {ui('pdp.quantitySelector.totalPrice')} <span css={styles.decorator} />{' '}
      {price}
    </p>
  );
}

export function QuantitySelectorDefault() {
  const [isOpen, setIsOpen] = useState(true);
  const [primaryPrice, setPrimaryPrice] = useState('0');
  const [secondaryPrice, setSecondaryPrice] = useState('0');
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const isFrontAndRear = boolean('Display Front and Rear', false);

  const [primaryQuantity, setPrimaryQuantity] = useState(2);
  const [secondaryQuantity, setSecondaryQuantity] = useState(2);

  const hasIcon = boolean('Display Icon', true);
  const handleInterceptAction = action('number-picker-selection');
  const shouldIntercept = boolean('Display Intercept', false);
  const quantityToIntercep = number('Quantity to Intercept', 3);

  const handleSelectSecondaryPicker = (value: number, index: number) => {
    setSecondaryPrice(String(value * 100));
    setSecondaryQuantity(index);
  };
  const handleSelectPrimaryPicker = (value: number, index: number) => {
    setPrimaryPrice(String(value * 100));
    setPrimaryQuantity(index);
  };

  const shouldDisableButton = primaryQuantity === 0 && secondaryQuantity === 0;

  useEffect(() => {
    setDefaultSelectedIndex(isFrontAndRear ? 2 : 4);
  }, [isFrontAndRear]);

  const [defaultSelectedIndex, setDefaultSelectedIndex] = useState(2);

  return (
    <>
      <Button onClick={toggleModal}>Open Modal</Button>

      <QuantitySelector
        hasIcon={hasIcon}
        isButtonDisabled={shouldDisableButton}
        isIntercept={shouldIntercept}
        isOpen={isOpen}
        onClose={toggleModal}
        onConfirm={toggleModal}
        onInterceptAction={handleInterceptAction}
        quantityToIntercept={quantityToIntercep}
      >
        <HorizontalNumberPicker
          selectedIndex={defaultSelectedIndex}
          customCarouselStyles={styles.carouselStyles}
          {...(isFrontAndRear && {
            customContainerStyles: { marginBottom: SPACING.SIZE_30 },
          })}
          numbers={QUANTITY_SELECTOR_CONSTANTS.PICKER_NUMBERS}
          onSelect={handleSelectPrimaryPicker}
          subTitle={
            primaryPrice && primaryPrice !== '0' ? (
              <Subtitle price={`$${primaryPrice}`} />
            ) : undefined
          }
          title={ui('pdp.quantitySelector.singleTireQtyTitle')}
        />

        {isFrontAndRear && (
          <HorizontalNumberPicker
            selectedIndex={defaultSelectedIndex}
            customCarouselStyles={styles.carouselStyles}
            numbers={QUANTITY_SELECTOR_CONSTANTS.PICKER_NUMBERS}
            onSelect={handleSelectSecondaryPicker}
            subTitle={
              secondaryPrice && secondaryPrice !== '0' ? (
                <Subtitle price={`$${secondaryPrice}`} />
              ) : undefined
            }
            title={ui('pdp.quantitySelector.singleTireQtyTitle')}
          />
        )}
      </QuantitySelector>
    </>
  );
}
