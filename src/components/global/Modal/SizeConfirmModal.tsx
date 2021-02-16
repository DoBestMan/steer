import { ReactNode } from 'react';
import ReactModal from 'react-modal';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import {
  COLORS,
  CSSStylesProp,
  MODAL_THEME,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { bindAppElement } from '~/lib/utils/modal';

import styles, { overlayBkStyles } from './SizeConfirmModal.styles';

bindAppElement();

interface Props {
  children: ReactNode;
  contentLabel: string;
  customContentStyles?: CSSStylesProp;
  isOpen: boolean;
  theme?: MODAL_THEME;
}

function SizeConfirmModal({
  children,
  contentLabel,
  customContentStyles,
  isOpen,
  theme = MODAL_THEME.ORANGE,
}: Props) {
  const { bk } = useBreakpoints();
  return (
    <ReactModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      closeTimeoutMS={TIME.MS350}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={{
        overlay: {
          // react-modal library can't take serialized styles
          backgroundColor: COLORS.LIGHT.GRAY_70,
          opacity: isOpen ? 1 : 0,
          transition: `opacity ${TIME.MS350}ms ease-in-out ${TIME.MS100}ms`,
          zIndex: Z_INDEX.MODAL,
        },
      }}
      css={[
        styles.root,
        styles[theme],
        overlayBkStyles[bk].default,
        isOpen && overlayBkStyles[bk].open,
      ]}
    >
      <div css={[styles.content, customContentStyles]}>{children}</div>
    </ReactModal>
  );
}

export default SizeConfirmModal;
