import { ReactChild, useEffect } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { ARIA_LIVE, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Toast.styles';

interface Props {
  autoDismiss?: boolean; // There should be no use cases with auto dismiss disabled, this prop is for testing
  children: ReactChild;
  isOpen?: boolean;
  onDismiss: () => void;
}

function Toast({
  children,
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
    <div
      aria-live={isOpen ? ARIA_LIVE.ASSERTIVE : ARIA_LIVE.OFF}
      css={[styles.root, !isOpen && styles.isDismissed]}
      role="alert"
    >
      <span>{children}</span>
      <Link
        as="button"
        aria-hidden
        aria-label={ui('common.toast.close')}
        type="button"
        css={styles.icon}
        icon={ICONS.CLOSE}
        onClick={onDismiss}
      />
    </div>
  );
}

export default Toast;
