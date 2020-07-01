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
  quantityToIntercept?: number;
}

function QuantitySelector({
  children,
  isButtonDisabled = false,
  isIntercept = false,
  isOpen,
  onClose,
  onInterceptAction,
  onConfirm,
  quantityToIntercept,
}: Props) {
  const title = isIntercept
    ? ui('pdp.quantitySelector.confirmationTitle')
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
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={modalContainerStyles.container}>
        <FeaturedInfoModule
          copy={copy}
          customCopyStyles={isIntercept ? styles.copyConfirmation : undefined}
          icon={ICONS.TIP_MECHANIC}
          featureDescription={ui('pdp.quantitySelector.featureDescription')}
          title={title}
        />

        {!isIntercept && <div css={styles.pickerContainer}>{children}</div>}

        <div css={modalContainerStyles.ctaGroup}>
          {isIntercept && quantityToIntercept ? (
            <>
              <Button
                css={styles.button}
                onClick={handleInterceptAction(quantityToIntercept + 1)}
                theme={THEME.LIGHT}
              >
                {ui('pdp.quantitySelector.changeQuantity', {
                  quantity: quantityToIntercept + 1,
                })}
              </Button>
              <Button
                css={styles.button}
                onClick={handleInterceptAction(quantityToIntercept)}
                style={BUTTON_STYLE.OUTLINED}
                theme={THEME.LIGHT}
              >
                {ui('pdp.quantitySelector.keepQuantity', {
                  quantity: quantityToIntercept,
                })}
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
