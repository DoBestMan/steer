import { ReactChild } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { ARIA_LIVE, LINK_TYPES, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './ServiceNote.styles';

interface Props {
  children: ReactChild;
  isOpen: boolean;
  onDismiss: () => void;
}

function ServiceNote({ children, isOpen, onDismiss }: Props) {
  return (
    <CSSTransition
      unmountOnExit
      onExit={onDismiss}
      in={isOpen}
      timeout={{ enter: 0, exit: TIME.MS3000 }}
    >
      <div
        aria-live={ARIA_LIVE.ASSERTIVE}
        css={[styles.root, !isOpen && styles.isDismissed]}
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

export default ServiceNote;
