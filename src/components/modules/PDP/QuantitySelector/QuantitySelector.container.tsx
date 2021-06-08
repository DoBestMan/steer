import HorizontalNumberPickerWithControls from '~/components/global/HorizontalNumberPicker/HorizontalNumberPickerWithControls';
import { SPACING } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelector from './QuantitySelector';
import useQuantitySelectorContainer from './QuantitySelector.hooks';
import styles from './QuantitySelector.styles';

interface Quantity {
  front: number;
  rear?: number;
}
interface Props {
  initialQuantity: Quantity;
  isFrontAndRear?: boolean;
  isOpen: boolean;
  onChangeQuantity: (values: { front: number; rear?: number }) => void;
  onClose?: () => void;
  rearPrice?: string;
  tirePrice: string;
  toggleModal: () => void;
}

interface SubtitleProps {
  price?: string;
}
function Subtitle({ price }: SubtitleProps) {
  return (
    <p css={styles.subtitle} data-testid="total-price">
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
  initialQuantity,
  onClose,
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
    initialQuantity,
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
      onClose={onClose || toggleModal}
      onConfirm={onConfirm}
      onInterceptAction={onInterceptAction}
      recommendedQuantity={recommendedQuantity}
    >
      <HorizontalNumberPickerWithControls
        data-testid="front-picker"
        initialIndex={selectedFrontIndex}
        customCarouselStyles={styles.numberControlsWrapper}
        {...(isFrontAndRear && {
          customContainerStyles: { marginBottom: SPACING.SIZE_30 },
        })}
        numbers={numbers}
        onSelect={onSelectFrontPicker}
        subTitle={finalPrice.front && <Subtitle price={finalPrice.front} />}
        title={ui(
          isFrontAndRear
            ? 'pdp.quantitySelector.frontTireQtyTitle'
            : 'pdp.quantitySelector.singleTireQtyTitle',
        )}
      />

      {isFrontAndRear && (
        <HorizontalNumberPickerWithControls
          data-testid="rear-picker"
          initialIndex={selectedRearIndex}
          customCarouselStyles={styles.numberControlsWrapper}
          numbers={numbers}
          onSelect={onSelectRearPicker}
          subTitle={finalPrice.rear && <Subtitle price={finalPrice.rear} />}
          title={ui('pdp.quantitySelector.rearTireQtyTitle')}
        />
      )}
    </QuantitySelector>
  );
}

export default QuantitySelectorContainer;
