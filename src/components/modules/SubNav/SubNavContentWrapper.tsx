import React, { ReactNode } from 'react';

import { Animation } from '~/lib/constants';

import SubNavModal from './SubNavModal';

interface Props {
  children: ReactNode;
  contentLabel: string;
  isLocation?: boolean;
  isMobile?: boolean;
  isOpen: boolean;
  mountOnEnter?: boolean;
  onBack?: () => void;
  onClose: () => void;
  unmountOnExit?: boolean;
}

function SubNavContentWrapper({
  children,
  contentLabel,
  isLocation,
  isMobile,
  isOpen,
  mountOnEnter = false,
  onBack,
  onClose,
  unmountOnExit = false,
}: Props) {
  if (isMobile) {
    // in most cases we want to keep first and second level nav content mounted for SEO
    return (
      <SubNavModal
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        animation={Animation.SLIDE_LEFT}
        contentLabel={contentLabel}
        onBack={onBack}
        isLocation={isLocation}
        isOpen={isOpen}
        onClose={onClose}
      >
        {children}
      </SubNavModal>
    );
  }
  if (!isOpen) {
    return null;
  }

  return <>{children}</>;
}

export default SubNavContentWrapper;
