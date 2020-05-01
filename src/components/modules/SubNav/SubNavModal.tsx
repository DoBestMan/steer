import { ReactChild } from 'react';
import ReactModal from 'react-modal';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import styles from './SubNav.styles';

ReactModal.setAppElement('#root');

interface Props {
  children: ReactChild;
  isOpen: boolean;
  onClose: () => void;
}

function SubNavModal({ children, isOpen, onClose }: Props) {
  return (
    <ReactModal
      style={{ content: styles.modal }}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <Button onClick={onClose} css={[styles.back, styles.action]}>
        <Icon name={ICONS.CHEVRON_LEFT} />
      </Button>
      <div css={styles.close}>
        <Button onClick={onClose} css={styles.action}>
          <Icon name={ICONS.CLOSE} />
        </Button>
      </div>
      {children}
    </ReactModal>
  );
}

export default SubNavModal;
