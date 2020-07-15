import HowToModal from '~/components/global/Modal/HowToModal';
import { useModalContext } from '~/context/Modal.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { MODAL_DATA_TYPES } from '~/lib/constants';

import ContentModal from './ContentModal';

// Container for modals powered by the ModalContext

function ModalContainer() {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();
  const {
    currentModalData,
    resetModal,
    isModalOpen,
    closeModal,
  } = useModalContext();

  if (!currentModalData) {
    return null;
  }

  if (currentModalData.type === MODAL_DATA_TYPES.HOW_TO) {
    return (
      <HowToModal
        customerServiceNumber={customerServiceNumber}
        isOpen={isModalOpen}
        onAfterClose={resetModal}
        onClose={closeModal}
        isCustomerServiceEnabled={customerServiceEnabled}
        {...currentModalData.props}
      />
    );
  }

  return (
    <ContentModal
      customerServiceNumber={customerServiceNumber}
      isOpen={isModalOpen}
      onAfterClose={resetModal}
      onClose={closeModal}
      isCustomerServiceEnabled={customerServiceEnabled}
      {...currentModalData.props}
    />
  );
}

export default ModalContainer;
