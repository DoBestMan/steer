import React from 'react';

import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './VehicleSelectionModal.styles';

interface VehicleSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  openVehicleSelector: () => void;
  vehicleSelectionModalLabel: string | null;
}

export default function VehicleSelectionModal({
  vehicleSelectionModalLabel,
  onClose,
  isOpen,
  openVehicleSelector,
}: VehicleSelectionProps) {
  const handleVehicleSelector = () => {
    onClose();
    openVehicleSelector();
  };

  return (
    <BottomCardModal
      contentLabel={ui('pdp.insights.vehicleSelectorModal')}
      customContentStyles={styles.modalContent}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h1 css={styles.headerText}>{vehicleSelectionModalLabel}</h1>
      <h1 onClick={handleVehicleSelector} css={[styles.labelText]}>
        {ui('pdp.insights.fitting.selectAnotherVehicle')}
      </h1>
    </BottomCardModal>
  );
}
