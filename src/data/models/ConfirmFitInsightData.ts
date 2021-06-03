import { Cars } from '~/components/global/Car/Car.enums';
import { ConfirmFitType } from '~/components/modules/PDP/ConfirmFitInsight/ConfirmFitInsight.utils';
import { IconOrImage as IconOrImageProps } from '~/data/models/IconOrImage';

import { ConfirmFitDecisionModalData } from './ConfirmFitDecisionModalData';

export interface ConfirmFitInsightData {
  decisionModal: ConfirmFitDecisionModalData | null;
  icon: IconOrImageProps;
  label: string;
  type: ConfirmFitType;
  vehicleSelectionModalLabel: string | null;
  vehicleType: Cars | null;
}
