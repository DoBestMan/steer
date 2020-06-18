import { ReactNode } from 'react';

import Button from '~/components/global/Button/Button';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import PDPModalHeader from '../PDPModalHeader/PDPModalHeader';
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
  const subtitle = isIntercept
    ? ui('pdp.quantitySelector.confirmationSubtitle')
    : ui('pdp.quantitySelector.subtitle');
  const copy = isIntercept
    ? ui('pdp.quantitySelector.copyConfirmation')
    : ui('pdp.quantitySelector.copy');

  const handleInterceptAction = (value: number) => () => {
    onInterceptAction(value);
  };

  const icon = isIntercept
    ? ICONS.QUANTITY_SELECTOR_CAR_TILTED
    : ICONS.QUANTITY_SELECTOR_CAR;

  return (
    <BottomCardModal
      contentLabel={ui('pdp.quantitySelector.modalLabel')}
      customContentStyles={styles.modalContentStyles}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={styles.container}>
        <PDPModalHeader
          copy={copy}
          customCopyStyles={isIntercept ? styles.copyConfirmation : undefined}
          icon={icon}
          title={ui('pdp.quantitySelector.title')}
          subtitle={subtitle}
        />

        {!isIntercept && <div css={styles.pickerContainer}>{children}</div>}

        <div css={styles.cta}>
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
