import HorizontalNumberPicker from '~/components/global/HorizontalNumberPicker/HorizontalNumberPicker';
import { SPACING } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelector from './QuantitySelector';
import useQuantitySelectorContainer from './QuantitySelector.hooks';
import styles from './QuantitySelector.styles';

interface Props {
  isFrontAndRear?: boolean;
  isOpen: boolean;
  onChangeQuantity: (values: { front: number; rear?: number }) => void;
  rearPrice?: string;
  tirePrice: string;
  toggleModal: () => void;
}

interface SubtitleProps {
  price?: string;
}

function Subtitle({ price }: SubtitleProps) {
  return (
    <p css={styles.subtitle}>
      {ui('pdp.quantitySelector.totalPrice')} <span css={styles.decorator} />{' '}
      {price}
    </p>
  );
}

function QuantitySelectorContainer({
  isFrontAndRear,
  isOpen,
  onChangeQuantity,
  rearPrice,
  tirePrice,
  toggleModal,
}: Props) {
  const {
    finalPrice,
    numbers,
    onConfirm,
    onInterceptAction,
    onSelectFrontPicker,
    onSelectRearPicker,
    quantity,
    recommendedQuantity,
    selectedFrontIndex,
    selectedRearIndex,
  } = useQuantitySelectorContainer({
    isFrontAndRear,
    onChangeQuantity,
    rearPrice,
    tirePrice,
    toggleModal,
  });

  return (
    <QuantitySelector
      isIntercept={!!recommendedQuantity}
      isOpen={isOpen}
      quantity={quantity}
      onClose={toggleModal}
      onConfirm={onConfirm}
      onInterceptAction={onInterceptAction}
      recommendedQuantity={recommendedQuantity}
    >
      <HorizontalNumberPicker
        initialIndex={selectedFrontIndex}
        customCarouselStyles={styles.carouselStyles}
        {...(isFrontAndRear && {
          customContainerStyles: { marginBottom: SPACING.SIZE_30 },
        })}
        numbers={numbers}
        onSelect={onSelectFrontPicker}
        subTitle={finalPrice.front && <Subtitle price={finalPrice.front} />}
        title={ui('pdp.quantitySelector.singleTireQtyTitle')}
      />

      {isFrontAndRear && (
        <HorizontalNumberPicker
          initialIndex={selectedRearIndex}
          customCarouselStyles={styles.carouselStyles}
          numbers={numbers}
          onSelect={onSelectRearPicker}
          subTitle={finalPrice.rear && <Subtitle price={finalPrice.rear} />}
          title={ui('pdp.quantitySelector.singleTireQtyTitle')}
        />
      )}
    </QuantitySelector>
  );
}

export default QuantitySelectorContainer;
