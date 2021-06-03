import React from 'react';

import { ConfirmFitInsightData } from '~/data/models/ConfirmFitInsightData';

import ConfirmFitInsight from './ConfirmFitInsight';

interface Props extends ConfirmFitInsightData {
  isLoading?: boolean;
  tireSize?: string | null;
}

export default function ConfirmFitInsightContainer({
  icon,
  label,
  type,
  decisionModal,
  vehicleSelectionModalLabel,
  vehicleType,
}: Props) {
  return (
    <ConfirmFitInsight
      icon={icon}
      label={label}
      type={type}
      decisionModal={decisionModal}
      vehicleSelectionModalLabel={vehicleSelectionModalLabel}
      vehicleType={vehicleType}
    />
  );
}
