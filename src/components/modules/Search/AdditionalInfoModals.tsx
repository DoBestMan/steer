import AdditionalInfoModal from './AdditionalInfoModal/AdditionalInfoModal';
import {
  TIRE_SEARCH_MODAL_DATA,
  VEHICLE_TRIM_MODAL_DATA,
} from './AdditionalInfoModal/AdditionalInfoModal.constants';
import { SearchModalEnum } from './Search.types';

interface Props {
  activeModal: SearchModalEnum | null;
  isCustomerServiceEnabled: boolean;
  onClose: () => void;
}

function AdditionalInfoModals({
  activeModal,
  isCustomerServiceEnabled,
  onClose,
}: Props) {
  return (
    <>
      <AdditionalInfoModal
        isCustomerServiceEnabled={isCustomerServiceEnabled}
        isOpen={activeModal === SearchModalEnum.TIRE_SIZE}
        onClose={onClose}
        {...TIRE_SEARCH_MODAL_DATA}
      />
      <AdditionalInfoModal
        isCustomerServiceEnabled={isCustomerServiceEnabled}
        isOpen={activeModal === SearchModalEnum.VEHICLE_TRIM}
        onClose={onClose}
        {...VEHICLE_TRIM_MODAL_DATA}
      />
    </>
  );
}

export default AdditionalInfoModals;
