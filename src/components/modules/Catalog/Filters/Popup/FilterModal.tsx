import { ReactNode } from 'react';

import BottomCardModal from '~/components/global/Modal/BottomCardModal';

import ActionBar from './ActionBar';
import styles from './FilterModal.styles';

interface Props {
  children: ReactNode;
  contentLabel: string;
  hasActionBar: boolean;
  isOpen: boolean;
  onApplyFilters: () => void;
  onClose: () => void;
  onResetFilters: () => void;
}

function FilterModal({
  children,
  contentLabel,
  hasActionBar,
  isOpen,
  onApplyFilters,
  onClose,
  onResetFilters,
}: Props) {
  return (
    <BottomCardModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={styles.filterContent}>{children}</div>
      {hasActionBar && (
        <ActionBar
          onResetFilters={onResetFilters}
          onApplyFilters={onApplyFilters}
        />
      )}
    </BottomCardModal>
  );
}

export default FilterModal;
