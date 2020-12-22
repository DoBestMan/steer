import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { ReactNode, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ENTERED, EXITED } from 'react-transition-group/Transition';

import FocusTrap from '~/components/global/FocusTrap/FocusTrap';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Animation, KEYCODES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, {
  fade,
  slideLeft,
  SUBNAV_TIME_CLOSE,
  visibility,
} from './SubNav.styles';

export const SUBNAV_TIMEOUT = { enter: 0, exit: SUBNAV_TIME_CLOSE };

interface Props {
  animation?: Animation;
  children: ReactNode;
  contentLabel: string;
  isOpen: boolean;
  mountOnEnter?: boolean;
  onBack?: () => void;
  onClose: () => void;
  onExited?: () => void;
  unlockOnClose?: boolean;
  unmountOnExit?: boolean;
}

function SubNavModal({
  animation = Animation.SLIDE_LEFT,
  children,
  contentLabel,
  isOpen,
  mountOnEnter = false,
  onBack,
  onClose,
  onExited,
  unlockOnClose,
  unmountOnExit = false,
}: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationStyles = animation === Animation.SLIDE_LEFT ? slideLeft : fade;
  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    function onKeypress(e: KeyboardEvent) {
      if (e.keyCode === KEYCODES.ESCAPE) {
        onClose();
      }
    }

    if (isOpen && onClose) {
      document.addEventListener('keydown', onKeypress);
      if (contentRef.current) {
        disableBodyScroll(contentRef.current);
      }
    }

    if (!isOpen && prevIsOpen.current && unlockOnClose) {
      clearAllBodyScrollLocks();
    }
    prevIsOpen.current = isOpen;

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [isOpen, onClose, unlockOnClose]);
  return (
    <CSSTransition
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}
      in={isOpen}
      timeout={SUBNAV_TIMEOUT}
      onExited={onExited}
    >
      {(state) => (
        <FocusTrap
          shouldFocusOnOpen={false}
          shouldReturnFocus={false}
          css={state === EXITED && styles.focusHide}
          active={isOpen && state === ENTERED}
          ref={navRef}
        >
          <nav
            ref={navRef}
            css={[
              styles.navModalContainer,
              animationStyles[state],
              visibility[state],
            ]}
          >
            <div
              ref={contentRef}
              css={[styles.navContent, animationStyles[state]]}
            >
              {onBack && (
                <div css={styles.actions}>
                  <button
                    aria-label={ui('modal.back', {
                      moduleName: ui('nav.contentLabel'),
                    })}
                    onClick={onBack}
                    css={styles.action}
                  >
                    <Icon name={ICONS.CHEVRON_LEFT} />
                  </button>
                  <button
                    aria-label={ui('common.modal.close', { contentLabel })}
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
      )}
    </CSSTransition>
  );
}

export default SubNavModal;
