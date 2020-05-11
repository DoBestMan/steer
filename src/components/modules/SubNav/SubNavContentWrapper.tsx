import { ReactChild } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';

import SubNavModal from './SubNavModal';

interface Props {
  children: ReactChild;
  contentLabel?: string;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
}

function SubNavContentWrapper({
  children,
  contentLabel,
  isOpen,
  onBack,
  onClose,
}: Props) {
  const { isMobile } = useBreakpoints();
  if (!isMobile) {
    return <>{children}</>;
  }
  return (
    <SubNavModal
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
