import { useModalContext } from '~/context/Modal.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import ContentModal from './ContentModal';

function ContentModalContainer() {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();
  const {
    currentContentModalData,
    resetModal,
    isModalOpen,
    closeModal,
  } = useModalContext();

  if (!currentContentModalData) {
    return null;
  }

  return (
    <ContentModal
      customerServiceNumber={customerServiceNumber}
      isOpen={isModalOpen}
      onAfterClose={resetModal}
      onClose={closeModal}
      isCustomerServiceEnabled={customerServiceEnabled}
      {...currentContentModalData}
    />
  );
}

export default ContentModalContainer;
