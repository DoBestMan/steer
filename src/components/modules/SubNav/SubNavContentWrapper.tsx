import { ReactNode } from 'react';

import { Animation } from './SubNav.styles';
import SubNavModal from './SubNavModal';

interface Props {
  children: ReactNode;
  contentLabel?: string;
  isMobile?: boolean;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
}

function SubNavContentWrapper({
  children,
  contentLabel,
  isMobile,
  isOpen,
  onBack,
  onClose,
}: Props) {
  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <SubNavModal
      animation={Animation.SLIDE_LEFT}
      contentLabel={contentLabel}
      onBack={onBack}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </SubNavModal>
  );
}

export default SubNavContentWrapper;
