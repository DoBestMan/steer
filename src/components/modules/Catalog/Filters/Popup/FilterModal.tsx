import { ReactNode } from 'react';

import BottomCardModal from '~/components/global/Modal/BottomCardModal';

import { PopupProps } from './FilterPopup';

interface Props extends PopupProps {
  children: ReactNode;
  contentLabel: string;
}

function FilterModal({ children, contentLabel, isOpen, onClose }: Props) {
  return (
    <BottomCardModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </BottomCardModal>
  );
}

export default FilterModal;
