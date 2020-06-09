import { CSSObject } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import { useState } from 'react';

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

  const hasIcon = boolean('Display Icon', true);
  const isFrontAndRear = boolean('Display Front and Rear', false);
  const handleInterceptAction = action('number-picker-selection');
  const shouldIntercept = boolean('Display Intercept', false);
  const quantityToIntercep = number('Quantity to Intercept', 3);

  const handleSelectSecondaryPicker = (value: number) => {
    setSecondaryPrice(String(value * 100));
  };
  const handleSelectPrimaryPicker = (value: number) => {
    setPrimaryPrice(String(value * 100));
  };

  const primarySelection = number('Primary Selection', 2);
  const secondarySelection = number('Secondary Selection', 1);

  return (
    <>
      <Button onClick={toggleModal}>Open Modal</Button>

      <QuantitySelector
        hasIcon={hasIcon}
        isIntercept={shouldIntercept}
        isOpen={isOpen}
        onClose={toggleModal}
        onConfirm={toggleModal}
        onInterceptAction={handleInterceptAction}
        quantityToIntercept={quantityToIntercep}
      >
        <HorizontalNumberPicker
          selectedIndex={primarySelection}
          customCarouselStyles={styles.carouselStyles as CSSObject}
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
            selectedIndex={secondarySelection}
            customCarouselStyles={styles.carouselStyles as CSSObject}
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
