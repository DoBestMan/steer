import { CSSObject } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import HorizontalNumberPicker from '~/components/global/HorizontalNumberPicker/HorizontalNumberPicker';
import { SPACING } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelector from './QuantitySelector';
import QuantitySelectorContainer from './QuantitySelector.container';
import styles from './QuantitySelector.styles';

const CONSTANTS = {
  PICKER_NUMBERS: Array.from(Array(7).keys()),
  QUANTITIES_TO_INTERCEPT: [1, 3],
};

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
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const hasIcon = boolean('Display Icon', true);
  const isFrontAndRear = boolean('Display Front and Rear', false);
  const primaryPrice = text('Primary Price', '$205.38');
  const secondaryPrice = text('Secondary Price', '$205.38');
  const handleInterceptAction = action('number-picker-selection');
  const handleSelectSecondaryPicker = action('number-picker-selection');
  const handleSelectPrimaryPicker = action('number-picker-selection');
  const shouldIntercept = boolean('Display Intercept', false);
  const quantityToIntercep = number('Quantity to Intercept', 3);

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
          selectedIndex={3}
          customCarouselStyles={styles.carouselStyles as CSSObject}
          {...(isFrontAndRear && {
            customContainerStyles: { marginBottom: SPACING.SIZE_30 },
          })}
          numbers={CONSTANTS.PICKER_NUMBERS}
          onSelect={handleSelectPrimaryPicker}
          subTitle={primaryPrice && <Subtitle price={primaryPrice} />}
          title={ui('pdp.quantitySelector.singleTireQtyTitle')}
        />

        {isFrontAndRear && (
          <HorizontalNumberPicker
            customCarouselStyles={styles.carouselStyles as CSSObject}
            numbers={CONSTANTS.PICKER_NUMBERS}
            onSelect={handleSelectSecondaryPicker}
            subTitle={secondaryPrice && <Subtitle price={secondaryPrice} />}
            title={ui('pdp.quantitySelector.singleTireQtyTitle')}
          />
        )}
      </QuantitySelector>
    </>
  );
}
