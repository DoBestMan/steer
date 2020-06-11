import { ReactNode } from 'react';

import BottomCardModal from '~/components/global/Modal/BottomCardModal';

import ActionBar from './ActionBar';

interface Props {
  children: ReactNode;
  contentLabel: string;
  hasActionBar: boolean;
  isOpen: boolean;
  onApplyFilters: () => void;
  onClose: () => void;
}

function FilterModal({
  children,
  contentLabel,
  hasActionBar,
  isOpen,
  onApplyFilters,
  onClose,
}: Props) {
  return (
    <BottomCardModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
      {hasActionBar && <ActionBar onApplyFilters={onApplyFilters} />}
    </BottomCardModal>
  );
}

export default FilterModal;
