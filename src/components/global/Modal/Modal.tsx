import { ReactNode } from 'react';
import ReactModal from 'react-modal';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import {
  COLORS,
  LINK_THEME,
  MODAL_ANIMATION,
  MODAL_THEME,
  MODAL_TYPE,
  TIME,
} from '~/lib/constants';
import { bindAppElement } from '~/lib/utils/modal';
import { ui } from '~/lib/utils/ui-dictionary';

import { ICONS } from '../Icon/Icon.constants';
import Link from '../Link/Link';
import styles, { overlayBkStyles } from './Modal.styles';

bindAppElement();

interface Props {
  children: ReactNode;
  contentLabel: string;
  hasCloseButton?: boolean;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
  theme?: MODAL_THEME;
  type?: MODAL_TYPE;
}

function Modal({
  children,
  contentLabel,
  hasCloseButton = true,
  isOpen,
  onBack,
  theme = MODAL_THEME.LIGHT,
  type = MODAL_TYPE.FULLSCREEN,
  onClose,
}: Props) {
  const linkTheme =
    theme === MODAL_THEME.LIGHT ? LINK_THEME.LIGHT : LINK_THEME.DARK;
  const { bk } = useBreakpoints();
  const animationStyles =
    type === MODAL_TYPE.FULLSCREEN
      ? styles[MODAL_ANIMATION.FADE]
      : overlayBkStyles[bk];
  return (
    <ReactModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={TIME.MS350}
      style={{
        overlay: {
          // react-modal library can't take serialized styles
          backgroundColor:
            (type === MODAL_TYPE.OVERLAY && COLORS.LIGHT.GRAY_70) ||
            'transparent', // removes overlay flash for fullscreen
          opacity: isOpen ? 1 : 0,
          transition: `opacity ${TIME.MS350}ms ease-in-out ${TIME.MS100}ms`,
        },
      }}
      css={[
        styles[type],
        styles[theme],
        animationStyles.default,
        isOpen && animationStyles.open,
      ]}
    >
      {(onBack || hasCloseButton) && (
        <div css={styles.actions}>
          {onBack && (
            <Link
              as="button"
              aria-label={ui('modal.back')}
              onClick={onBack}
              icon={ICONS.CHEVRON_LEFT}
              theme={linkTheme}
            />
          )}
          {hasCloseButton && (
            <Link
              as="button"
              icon={ICONS.CLOSE}
              aria-label={`${ui('modal.close')} ${contentLabel}`}
              onClick={onClose}
              theme={linkTheme}
              // this will allow modal content to start where padding begins rather than pushed down from actions bar
              css={!onBack && styles.close}
            />
          )}
        </div>
      )}
      {children}
    </ReactModal>
  );
}

export default Modal;
