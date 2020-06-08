import { ReactNode } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { BUTTON_STYLE, BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './QuantitySelector.styles';

interface Props {
  children: ReactNode;
  isIntercept?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onInterceptAction: (value: number) => void;
  quantityToIntercept?: number;
}

function QuantitySelector({
  children,
  isIntercept = false,
  isOpen,
  onClose,
  onInterceptAction,
  onConfirm,
  quantityToIntercept,
}: Props) {
  const cta = isIntercept
    ? ui('pdp.quantitySelector.confirmationSubtitle')
    : ui('pdp.quantitySelector.subtitle');
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
      <div css={styles.container}>
        <Icon name={ICONS.QUANTITY_SELECTOR_CAR} css={styles.icon} />
        <h2 css={styles.title}>{ui('pdp.quantitySelector.title')}</h2>

        <h3 css={styles.subtitle}>
          <Markdown>{cta}</Markdown>
        </h3>
        <div css={[styles.copy, isIntercept && styles.copyConfirmation]}>
          <Markdown>{copy}</Markdown>
        </div>

        {!isIntercept && <div css={styles.pickerContainer}>{children}</div>}

        <div css={styles.cta}>
          {isIntercept && quantityToIntercept ? (
            <>
              <Button
                onClick={handleInterceptAction(quantityToIntercept + 1)}
                theme={BUTTON_THEME.LIGHT}
              >
                {ui('pdp.quantitySelector.changeQuantity', {
                  quantity: quantityToIntercept + 1,
                })}
              </Button>
              <Button
                onClick={handleInterceptAction(quantityToIntercept)}
                style={BUTTON_STYLE.OUTLINED}
                theme={BUTTON_THEME.LIGHT}
              >
                {ui('pdp.quantitySelector.keepQuantity', {
                  quantity: quantityToIntercept,
                })}
              </Button>
            </>
          ) : (
            <Button onClick={onConfirm} theme={BUTTON_THEME.LIGHT}>
              {ui('pdp.quantitySelector.confirmButtonLabel')}
            </Button>
          )}
        </div>
      </div>
    </BottomCardModal>
  );
}

export default QuantitySelector;
