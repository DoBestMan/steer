import { ReactNode } from 'react';

import { SiteDynamicModal } from '~/data/models/SiteDynamicModal';
import { MODAL_DATA_TYPES, MODAL_THEME } from '~/lib/constants';

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

export type ContentModalProps = Omit<SiteDynamicModal, 'type'>;

export interface HowToModalProps {
  alternateSearch?: { copy: string; title: string };
  eyebrow: string;
  imageAlt: string;
  imageSrc: string;
  modalLabel: string;
  steps: Array<JSX.Element | string>;
  title: string;
}

export type ModalData =
  | {
      props: ContentModalProps;
      type: MODAL_DATA_TYPES.CONTENT;
    }
  | {
      props: HowToModalProps;
      type: MODAL_DATA_TYPES.HOW_TO;
    };
