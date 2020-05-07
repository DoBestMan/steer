import { ReactChild } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

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
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
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
