import { ReactNode, useState } from 'react';

import ModalContainer from '~/components/global/Modal/Modal.container';
import {
  ContentModalProps,
  ModalData,
} from '~/components/global/Modal/Modal.types';
import { MODAL_DATA_TYPES } from '~/lib/constants';
import STATIC_MODALS from '~/lib/constants/staticModals';
import { createContext } from '~/lib/utils/context';

/*
  This context supports a modal system that accepts two types of modals:

  - Static Modals: Content hardcoded in the UI, identified with an ID
  - Dynamic Modals: Content provided by the API

  Only one such modal can be open at a time.

  Modals in this system can use one of two components:
  - ContentModal - Simple structure used for Static and Dynamic
  - HowToModal - More sophisticated structure for some instructional Static modals

  Note: The app contains some other uses of React Modal
  that are separate from this system because of their added complexity.
*/

export interface ModalContextProps {
  closeModal: () => void;
  currentModalData: ModalData | null;
  isModalOpen: boolean;
  openDynamicModal: (data: ContentModalProps) => void;
  openStaticModal: (id: string) => void;
  resetModal: () => void;
}

const ModalContext = createContext<ModalContextProps>();

export function useModalContextSetup() {
  const [currentModalData, setCurrentModalData] = useState<
    ModalContextProps['currentModalData']
  >(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update current modal data and set status to open
  function openModal(modalData: ModalData) {
    setCurrentModalData(modalData);
    setIsModalOpen(true);
  }

  // Fetch modal content from ID and open it
  function openStaticModal(modalId: string) {
    openModal(STATIC_MODALS[modalId]);
  }

  // Open a Content modal with dynamic content from the API
  function openDynamicModal(props: ContentModalProps) {
    openModal({
      props,
      type: MODAL_DATA_TYPES.CONTENT,
    });
  }

  // Set modal to closed
  function closeModal() {
    setIsModalOpen(false);
  }

  // Remove current modal data
  // (Called after close,
  // so data is still visible during closing transition)
  function resetModal() {
    setCurrentModalData(null);
  }
  return {
    closeModal,
    currentModalData,
    isModalOpen,
    openDynamicModal,
    openStaticModal,
    resetModal,
  };
}

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const value = useModalContextSetup();
  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
}

export const useModalContext = ModalContext.useContext;
