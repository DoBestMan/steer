import { ReactChild, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { ARIA_LIVE, CSSStyles, LINK_TYPES, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Toast.styles';

export enum TOAST_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
}

interface Props {
  autoDismiss?: boolean; // There should be no use cases with auto dismiss disabled, this prop is for testing
  children: ReactChild;
  customStyles?: CSSStyles;
  isOpen?: boolean;
  onDismiss: () => void;
}

function Toast({
  children,
  customStyles,
  autoDismiss = true,
  isOpen = false,
  onDismiss,
}: Props) {
  useEffect(() => {
    if (autoDismiss && isOpen) {
      const timer = setTimeout(() => onDismiss(), TIME.MS3000);
      return () => clearTimeout(timer);
    }
    return;
  }, [autoDismiss, isOpen, onDismiss]);

  return (
    <CSSTransition
      unmountOnExit
      in={isOpen}
      timeout={{ enter: 0, exit: TIME.MS400 }}
    >
      <div
        aria-live={ARIA_LIVE.ASSERTIVE}
        css={[styles.root, !isOpen && styles.isDismissed, customStyles]}
        role="alert"
      >
        <span>{children}</span>
        <Link
          as={LINK_TYPES.BUTTON}
          aria-hidden
          aria-label={ui('common.toast.close')}
          type="button"
          css={styles.icon}
          icon={ICONS.CLOSE}
          onClick={onDismiss}
        />
      </div>
    </CSSTransition>
  );
}

export default Toast;
