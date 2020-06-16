import { CSSObject } from '@emotion/core';
import { ReactNode } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
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
  hasIcon = true,
  isButtonDisabled = false,
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

  const icon = isIntercept
    ? ICONS.QUANTITY_SELECTOR_CAR_TILTED
    : ICONS.QUANTITY_SELECTOR_CAR;

  return (
    <BottomCardModal
      contentLabel={ui('pdp.quantitySelector.modalLabel')}
      customContentStyles={styles.modalContentStyles as CSSObject}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={styles.container}>
        {hasIcon && <Icon name={icon} css={styles.icon} />}
        <h2 css={styles.title}>{ui('pdp.quantitySelector.title')}</h2>

        <h3 css={styles.subtitle}>
          <Markdown renderers={{ paragraph: 'span' }}>{cta}</Markdown>
        </h3>
        <div css={[styles.copy, isIntercept && styles.copyConfirmation]}>
          <Markdown>{copy}</Markdown>
        </div>

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
