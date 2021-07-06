import React, { ReactNode, useRef } from 'react';
import ReactModal from 'react-modal';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS, CSSStylesProp, THEME, TIME, Z_INDEX } from '~/lib/constants';
import { bindAppElement } from '~/lib/utils/modal';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { overlayBkStyles } from './BottomCardModal.styles';

bindAppElement();

const SLIDER_MOVE_OFFSET = 20;

interface Position {
  x: number;
  y: number;
}

interface Props {
  children: ReactNode;
  contentLabel: string;
  customContentStyles?: CSSStylesProp;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
  useSliderToClose?: boolean;
}

function BottomCardModal({
  children,
  contentLabel,
  customContentStyles,
  isOpen,
  useSliderToClose = false,
  onBack,
  onClose,
}: Props) {
  const { bk, isMobile } = useBreakpoints();

  const position = useRef<Position | null>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    position.current = {
      x: event.clientX,
      y: event.clientY,
    };
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (
      position?.current &&
      event.clientY - position.current.y >= SLIDER_MOVE_OFFSET
    ) {
      onClose();
    }
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <ReactModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={TIME.MS350}
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
        overlayBkStyles[bk].default,
        isOpen && overlayBkStyles[bk].open,
      ]}
    >
      <div css={[styles.content, customContentStyles]}>
        <div css={styles.actions}>
          {onBack && (
            <Link
              as="button"
              aria-label={ui('common.modal.back')}
              onClick={onBack}
              icon={ICONS.CHEVRON_LEFT}
              theme={THEME.LIGHT}
            />
          )}

          <Link
            as="button"
            icon={ICONS.CLOSE}
            aria-label={ui('common.modal.close', { contentLabel })}
            onClick={onClose}
            theme={THEME.LIGHT}
            // this will allow modal content to start where padding begins rather than pushed down from actions bar
            css={!onBack && styles.close}
          />
        </div>
        {useSliderToClose && isMobile && (
          <div css={styles.closeSlider} onMouseDown={handleMouseDown} />
        )}
        {children}
      </div>
    </ReactModal>
  );
}

export default BottomCardModal;
