import { ReactChild } from 'react';
import ReactModal from 'react-modal';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import styles from './SubNav.styles';

interface Props {
  children: ReactChild;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
}

function SubNavModal({ children, isOpen, onBack, onClose }: Props) {
  const appEl =
    // 'root' handles storybook instance
    document.getElementById('__next') || document.getElementById('root') || {};
  return (
    <ReactModal
      style={{ content: styles.modal, overlay: styles.overlay }}
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={appEl}
    >
      <div css={styles.modalContent}>
        {onBack && (
          <div css={styles.actions}>
            <Button onClick={onBack} css={styles.action}>
              <Icon name={ICONS.CHEVRON_LEFT} />
            </Button>
            <Button onClick={onClose} css={styles.action}>
              <Icon name={ICONS.CLOSE} />
            </Button>
          </div>
        )}
        {children}
      </div>
    </ReactModal>
  );
}

export default SubNavModal;
