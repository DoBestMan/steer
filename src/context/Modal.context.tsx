import { ReactNode, useState } from 'react';

import { ModalContentProps } from '~/components/global/ContentModal/ContentModal';
import ContentModalContainer from '~/components/global/ContentModal/ContentModal.container';
import STATIC_MODALS, { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';
import { createContext } from '~/lib/utils/context';

/*
  This context supports a modal system that accepts two types of modals:

  - Static Modals: Content hardcoded in the UI, identified with an ID
  - Dynamic Modals: Content provided by the API

  Only one such modal can be open at a time.

  Note: The app contains some other uses of React Modal
  that are separate from this system because of their added complexity.
*/

export interface ModalContextProps {
  closeModal: () => void;
  currentContentModalData: ModalContentProps | null;
  isModalOpen: boolean;
  openDynamicModal: (data: ModalContentProps) => void;
  openStaticModal: (id: STATIC_MODAL_IDS) => void;
  resetModal: () => void;
}

const ModalContext = createContext<ModalContextProps>();

export function useModalContextSetup() {
  const [currentContentModalData, setCurrentContentModalData] = useState<
    ModalContextProps['currentContentModalData']
  >(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update current modal data and set status to open
  function openModal(data: ModalContentProps) {
    setCurrentContentModalData(data);
    setIsModalOpen(true);
  }

  // Fetch modal content from ID and open it
  function openStaticModal(modalId: STATIC_MODAL_IDS) {
    openModal(STATIC_MODALS[modalId]);
  }

  // Set modal to closed
  function closeModal() {
    setIsModalOpen(false);
  }

  // Remove current modal data
  // (Called after close,
  // so data is still visible during closing transition)
  function resetModal() {
    setCurrentContentModalData(null);
  }
  return {
    closeModal,
    currentContentModalData,
    isModalOpen,
    openDynamicModal: openModal,
    openStaticModal,
    resetModal,
  };
}

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const value = useModalContextSetup();
  return (
    <ModalContext.Provider value={value}>
      {children}
      <ContentModalContainer />
    </ModalContext.Provider>
  );
}

export const useModalContext = ModalContext.useContext;
