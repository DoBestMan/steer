import React from 'react';

import { SearchContextProvider } from '~/components/modules/Search/Search.context';
import { SearchModalContextProvider } from '~/components/modules/Search/SearchModal.context';
import { ModalContextProvider } from '~/context/Modal.context';
import { ConfirmFitInsightData } from '~/data/models/ConfirmFitInsightData';

import ConfirmFitInsight from './ConfirmFitInsight';

export default function ConfirmFitInsightContainer({
  icon,
  label,
  type,
  decisionModal,
  vehicleSelectionModalLabel,
}: ConfirmFitInsightData) {
  return (
    <ModalContextProvider>
      <SearchContextProvider>
        <SearchModalContextProvider>
          <ConfirmFitInsight
            icon={icon}
            label={label}
            type={type}
            decisionModal={decisionModal}
            vehicleSelectionModalLabel={vehicleSelectionModalLabel}
          />
        </SearchModalContextProvider>
      </SearchContextProvider>
    </ModalContextProvider>
  );
}
