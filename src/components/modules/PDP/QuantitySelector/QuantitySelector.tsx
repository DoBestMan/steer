import { ReactNode } from 'react';

import Button from '~/components/global/Button/Button';
import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { modalContainerStyles } from '~/components/global/Modal/BottomCardModal.styles';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './QuantitySelector.styles';

interface Props {
  children: ReactNode;
  hasIcon?: boolean;
  isButtonDisabled?: boolean;
  isIntercept?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onInterceptAction: (value: number) => void;
  quantity?: number;
  recommendedQuantity?: number;
}

function QuantitySelector({
  children,
  isButtonDisabled = false,
  isIntercept = false,
  isOpen,
  onClose,
  onInterceptAction,
  onConfirm,
  quantity,
  recommendedQuantity = 0,
}: Props) {
  const title = isIntercept
    ? ui('pdp.quantitySelector.confirmationTitle', {
        quantity: recommendedQuantity,
      })
    : ui('pdp.quantitySelector.title');
  const copy = isIntercept
    ? ui('pdp.quantitySelector.copyConfirmation')
    : ui('pdp.quantitySelector.copy');

  const handleInterceptAction = (value: number) => () => {
    onInterceptAction(value);
  };

  return (
    <BottomCardModal
      contentLabel={ui('pdp.quantitySelector.modalLabel')}
      customContentStyles={styles.modalContent}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={[modalContainerStyles.container, styles.container]}>
        <FeaturedInfoModule
          copy={copy}
          customCopyStyles={isIntercept ? styles.copyConfirmation : undefined}
          icon={ICONS.TIP_MECHANIC}
          featureDescription={ui('pdp.quantitySelector.featureDescription')}
          title={title}
        />

        {!isIntercept && <div css={styles.pickerContainer}>{children}</div>}

        <div css={modalContainerStyles.ctaGroup}>
          {isIntercept ? (
            <>
              <Button
                css={styles.button}
                onClick={handleInterceptAction(recommendedQuantity)}
                theme={THEME.LIGHT}
              >
                {ui(
                  recommendedQuantity === 1
                    ? 'pdp.quantitySelector.changeQuantity'
                    : 'pdp.quantitySelector.changeQuantityPlural',
                  {
                    quantity: recommendedQuantity,
                  },
                )}
              </Button>
              <Button
                css={styles.button}
                onClick={handleInterceptAction(quantity || 0)}
                style={BUTTON_STYLE.OUTLINED}
                theme={THEME.LIGHT}
              >
                {ui(
                  quantity === 1
                    ? 'pdp.quantitySelector.keepQuantity'
                    : 'pdp.quantitySelector.keepQuantityPlural',
                  {
                    quantity: quantity || '',
                  },
                )}
              </Button>
            </>
          ) : (
            <Button
              isDisabled={isButtonDisabled}
              css={styles.button}
              onClick={onConfirm}
              theme={THEME.LIGHT}
            >
              {ui('pdp.quantitySelector.confirmButtonLabel')}
            </Button>
          )}
        </div>
      </div>
    </BottomCardModal>
  );
}

export default QuantitySelector;
