import { ReactChild } from 'react';
import ReactModal from 'react-modal';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import styles from './SubNav.styles';

if (typeof document !== 'undefined') {
  const appElId = document.getElementById('__next') ? '#__next' : '#root';
  ReactModal.setAppElement(appElId);
}

interface Props {
  children: ReactChild;
  contentLabel?: string;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
}

function SubNavModal({
  children,
  contentLabel,
  isOpen,
  onBack,
  onClose,
}: Props) {
  return (
    <ReactModal
      contentLabel={contentLabel}
      style={{ content: styles.modal, overlay: styles.overlay }}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldReturnFocusAfterClose
      shouldCloseOnEsc
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
      {children}
    </ReactModal>
  );
}

export default SubNavModal;
