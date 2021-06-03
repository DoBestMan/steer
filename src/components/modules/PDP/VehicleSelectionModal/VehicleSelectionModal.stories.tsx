import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { THEME } from '~/lib/constants';

import VehicleSelectionModal from './VehicleSelectionModal';

export default {
  component: VehicleSelectionModal,
  title: 'PDP/VehicleSelectionModal',
};

export function VehicleSelectionModalWithKnobs() {
  const [modalStatus, setModalStatus] = useState<boolean>(true);
  const carLabel = text('Car Label', 'Car Label');
  return (
    <div>
      <Button theme={THEME.LIGHT} onClick={() => setModalStatus(true)}>
        {'Open Vehicle Selection Modal'}
      </Button>
      <VehicleSelectionModal
        vehicleSelectionModalLabel={carLabel}
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        openVehicleSelector={action('vehicle selected')}
      />
    </div>
  );
}
