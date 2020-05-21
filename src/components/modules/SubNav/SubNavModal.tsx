import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { ReactNode, useEffect, useRef } from 'react';

import FocusTrap from '~/components/global/FocusTrap/FocusTrap';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { KEYCODES } from '~/lib/constants';

import styles, { Animation } from './SubNav.styles';

interface Props {
  animation?: Animation;
  children: ReactNode;
  contentLabel?: string;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
}

function SubNavModal({
  animation = Animation.SLIDE_LEFT,
  children,
  contentLabel,
  isOpen,
  onBack,
  onClose,
}: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // escape button
  useEffect(() => {
    function onKeypress(e: KeyboardEvent) {
      if (e.keyCode === KEYCODES.ESCAPE) {
        onClose();
      }
    }

    if (isOpen && onClose && contentRef.current) {
      document.addEventListener('keydown', onKeypress);
      disableBodyScroll(contentRef.current);
    }

    return () => {
      document.removeEventListener('keydown', onKeypress);
      clearAllBodyScrollLocks();
    };
  }, [isOpen, onClose]);
  return (
    // FocusTrap will need to know if another modal is open on top
    // so active should be forced to false here
    <FocusTrap active={isOpen} ref={navRef}>
      <nav
        ref={navRef}
        css={[styles.navModalContainer, isOpen && styles.navModalContainerOpen]}
      >
        {!onBack && <span css={styles.overlay} onClick={onClose}></span>}
        <div
          ref={contentRef}
          css={[
            styles.navContent,
            styles[animation].default,
            isOpen && styles[animation].open,
          ]}
        >
          {onBack && (
            <div css={styles.actions}>
              <button
                aria-label="Return to main navigation"
                onClick={onBack}
                css={styles.action}
              >
                <Icon name={ICONS.CHEVRON_LEFT} />
              </button>
              <button
                aria-label={`Close ${contentLabel}`}
                onClick={onClose}
                css={styles.action}
              >
                <Icon name={ICONS.CLOSE} />
              </button>
            </div>
          )}
          {onBack ? (
            <div css={styles.navContentNested}>{children}</div>
          ) : (
            children
          )}
        </div>
      </nav>
    </FocusTrap>
  );
}

export default SubNavModal;
