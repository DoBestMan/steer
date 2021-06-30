import { ReactChild, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { ARIA_LIVE, CSSStylesProp, LINK_TYPES, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Toast.styles';

export enum TOAST_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
}

interface Props {
  autoDismiss?: boolean; // There should be no use cases with auto dismiss disabled, this prop is for testing
  children: ReactChild;
  customContainerStyles?: CSSStylesProp;
  handleClearMessage?: () => void;
  isOpen?: boolean;
  onDismiss?: () => void;
}

function ToastOnScreen({
  children,
  customContainerStyles,
  autoDismiss = true,
  handleClearMessage,
  isOpen = false,
  onDismiss,
}: Props) {
  useEffect(() => {
    if (autoDismiss && isOpen) {
      const timer = setTimeout(() => onDismiss && onDismiss(), TIME.MS3000);
      return () => clearTimeout(timer);
    }
    return;
  }, [autoDismiss, isOpen, onDismiss]);

  return (
    <CSSTransition
      unmountOnExit
      onExited={handleClearMessage}
      in={isOpen}
      timeout={{ enter: 0, exit: TIME.MS400 }}
    >
      <div
        aria-live={ARIA_LIVE.ASSERTIVE}
        css={[
          styles.rootWithoutModal,
          !isOpen && styles.isDismissed,
          customContainerStyles,
        ]}
        role="alert"
      >
        <span>{children}</span>
        {onDismiss && (
          <Link
            as={LINK_TYPES.BUTTON}
            aria-hidden
            aria-label={ui('common.toast.close')}
            type="button"
            css={styles.iconwithoutModal}
            icon={ICONS.CLOSE}
            onClick={onDismiss}
          />
        )}
      </div>
    </CSSTransition>
  );
}

export default ToastOnScreen;
