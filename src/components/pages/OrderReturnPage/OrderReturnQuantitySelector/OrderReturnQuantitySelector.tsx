import React from 'react';

import Button from '~/components/global/Button/Button';
import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import HorizontalNumberPickerWithControls from '~/components/global/HorizontalNumberPicker/HorizontalNumberPickerWithControls';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { modalContainerStyles } from '~/components/global/Modal/BottomCardModal.styles';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderReturnQuantity.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (quantity: number) => void;
  quantity: number;
  quantityForReturn: number;
}
function OrderReturnQuantitySelector({
  isOpen,
  onClose,
  quantity,
  onUpdateQuantity,
  quantityForReturn,
}: Props) {
  const numbers = Array.from(Array(quantity).keys()).map((item) => item + 1);
  return (
    <>
      <BottomCardModal
        contentLabel={ui('pdp.quantitySelector.modalLabel')}
        customContentStyles={styles.modalContent}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div css={[modalContainerStyles.container, styles.container]}>
          <FeaturedInfoModule
            copy={ui('tracking.quantitySelectorDescription')}
            icon={ICONS.TIRE}
            featureDescription={ui('tracking.quantitySelectorTitle')}
            title={''}
          />
          <div css={styles.pickerContainer}>
            <HorizontalNumberPickerWithControls
              initialIndex={quantityForReturn - 1}
              customCarouselStyles={styles.numberControlsWrapper}
              numbers={numbers}
              onSelect={(updatedQuantity) => onUpdateQuantity(updatedQuantity)}
              title={ui('pdp.quantitySelector.singleTireQtyTitle')}
            />
          </div>
          <div css={modalContainerStyles.ctaGroup}>
            <Button css={styles.button} onClick={onClose} theme={THEME.LIGHT}>
              {ui('pdp.quantitySelector.confirmButtonLabel')}
            </Button>
          </div>
        </div>
      </BottomCardModal>
    </>
  );
}

export default OrderReturnQuantitySelector;
