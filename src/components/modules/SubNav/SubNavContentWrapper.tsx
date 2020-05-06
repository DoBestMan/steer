import { ReactChild } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import SubNavModal from './SubNavModal';

interface Props {
  category?: string;
  children: ReactChild;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
}

function SubNavContentWrapper({ children, isOpen, onBack, onClose }: Props) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  if (!isMobile) {
    return <span>{children}</span>;
  }

  return (
    <SubNavModal onBack={onBack} isOpen={isOpen} onClose={onClose}>
      {children}
    </SubNavModal>
  );
}

export default SubNavContentWrapper;
