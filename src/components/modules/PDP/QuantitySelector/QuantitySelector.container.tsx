import { useState } from 'react';

import HorizontalNumberPicker from '~/components/global/HorizontalNumberPicker/HorizontalNumberPicker';
import { SPACING } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelector from './QuantitySelector';
import styles from './QuantitySelector.styles';

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
}

export const CONSTANTS = {
  PICKER_NUMBERS: Array.from(Array(17).keys()),
  QUANTITIES_TO_INTERCEPT: [1, 3],
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

function QuantitySelectorContainer({ isOpen, toggleModal }: Props) {
  const [shouldIntercept, setShouldIntercept] = useState(false);
  const [selectedPrimaryIndex, setSelectedPrimaryIndex] = useState(-1);

  // TODO wire up to API
  function handleSelectPrimaryPicker(value: number) {
    setSelectedPrimaryIndex(value);
    if (!CONSTANTS.QUANTITIES_TO_INTERCEPT.includes(value)) {
      return;
    }

    setShouldIntercept(true);
  }

  // TODO wire up to API
  function handleSelectSecondaryPicker() {
    console.info('Handle select');
  }

  // TODO wire up to API
  function handleInterceptAction(value: number) {
    setShouldIntercept(false);

    setSelectedPrimaryIndex(value);
  }

  // TODO wire up to API
  const isFrontAndRear = false;
  const primaryPrice = '$205.38';
  const secondaryPrice = '$205.38';

  return (
    <QuantitySelector
      isIntercept={shouldIntercept}
      isOpen={isOpen}
      onClose={toggleModal}
      onConfirm={toggleModal}
      onInterceptAction={handleInterceptAction}
      quantityToIntercept={selectedPrimaryIndex}
    >
      <HorizontalNumberPicker
        selectedIndex={selectedPrimaryIndex}
        customCarouselStyles={styles.carouselStyles}
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
          customCarouselStyles={styles.carouselStyles}
          numbers={CONSTANTS.PICKER_NUMBERS}
          onSelect={handleSelectSecondaryPicker}
          subTitle={secondaryPrice && <Subtitle price={secondaryPrice} />}
          title={ui('pdp.quantitySelector.singleTireQtyTitle')}
        />
      )}
    </QuantitySelector>
  );
}

export default QuantitySelectorContainer;
