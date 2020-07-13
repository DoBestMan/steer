import { ReactNode } from 'react';

import { MODAL_THEME } from '~/lib/constants';

export interface Props {
  children: ReactNode;
  contentLabel: string;
  hasCloseButton?: boolean;
  hasDefaultPadding?: boolean;
  isFullscreen?: boolean;
  isHalfscreen?: boolean;
  isOpen: boolean;
  onAfterClose?: () => void;
  onBack?: () => void;
  onClose: () => void;
  theme?: MODAL_THEME;
}
