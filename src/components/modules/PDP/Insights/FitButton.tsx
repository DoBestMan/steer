import { useState } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';

import { InsightsProps } from './Insights';
import { SIZE_CHECK_STATES } from './Insights.types';
import InsightsItem from './InsightsItem';
import SizeCheckModal from './SizeCheckModal';

type Props = Pick<
  InsightsProps,
  | 'sizeCheckState'
  | 'vehicle'
  | 'make'
  | 'onSearchVehicle'
  | 'onUnselectVehicle'
>;

interface Action {
  action: () => void;
  label: string;
}

const mapStatusToLabel: Record<SIZE_CHECK_STATES, string> = {
  [SIZE_CHECK_STATES.UNKNOWN]: 'pdp.insights.fitting.unknown',
  [SIZE_CHECK_STATES.SIZE_FITS]: 'pdp.insights.fitting.true',
  [SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT]: 'pdp.insights.fitting.false',
  [SIZE_CHECK_STATES.DOES_NOT_FIT]: 'pdp.insights.fitting.false',
};

const mapStatusToIcon: Record<SIZE_CHECK_STATES, IconType> = {
  [SIZE_CHECK_STATES.UNKNOWN]: ICONS.UNKNOWN,
  [SIZE_CHECK_STATES.SIZE_FITS]: ICONS.THUMBS_UP,
  [SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT]: ICONS.FORBIDDEN,
  [SIZE_CHECK_STATES.DOES_NOT_FIT]: ICONS.FORBIDDEN,
};

function mapStatusToActions({
  sizeCheckState,
  make,
  handleSearchVehicle,
  handleUnselectVehicle,
}: Pick<Props, 'sizeCheckState' | 'make'> & {
  handleSearchVehicle: () => void;
  handleUnselectVehicle: () => void;
}): Action[] {
  if (sizeCheckState === SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT) {
    return [
      {
        label: ui('pdp.insights.fitting.viewTiresThatFit'),
        action: () => {},
      },
      {
        label: ui('pdp.insights.fitting.selectAnotherVehicle'),
        action: handleSearchVehicle,
      },
      {
        label: ui('pdp.insights.fitting.unselectVehicle'),
        action: handleUnselectVehicle,
      },
    ];
  }

  if (sizeCheckState === SIZE_CHECK_STATES.DOES_NOT_FIT) {
    return [
      {
        label: ui('pdp.insights.fitting.selectAFittingSize', {
          make: make || '',
        }),
        action: () => {},
      },
      {
        label: ui('pdp.insights.fitting.selectAnotherVehicle'),
        action: handleSearchVehicle,
      },
      {
        label: ui('pdp.insights.fitting.unselectVehicle'),
        action: handleUnselectVehicle,
      },
    ];
  }

  return [
    {
      label: ui('pdp.insights.fitting.selectAnotherVehicle'),
      action: handleSearchVehicle,
    },
    {
      label: ui('pdp.insights.fitting.unselectVehicle'),
      action: handleUnselectVehicle,
    },
  ];
}

function FitButton({
  sizeCheckState,
  make,
  vehicle,
  onSearchVehicle,
  onUnselectVehicle,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isUnknown = sizeCheckState === SIZE_CHECK_STATES.UNKNOWN;
  const doesItFit = sizeCheckState === SIZE_CHECK_STATES.SIZE_FITS;

  const label = ui(mapStatusToLabel[sizeCheckState], {
    vehicle: vehicle || '',
  });

  const icon = mapStatusToIcon[sizeCheckState];

  const handleSearchVehicle = () => {
    setIsModalOpen(false);
    onSearchVehicle && onSearchVehicle();
  };

  const handleUnselectVehicle = () => {
    setIsModalOpen(false);
    onUnselectVehicle && onUnselectVehicle();
  };

  const actions = mapStatusToActions({
    sizeCheckState,
    make,
    handleSearchVehicle,
    handleUnselectVehicle,
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onClickButton = () => {
    if (isUnknown) {
      handleSearchVehicle();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button onClick={onClickButton}>
        <InsightsItem
          icon={{
            svgId: icon,
            type: ICON_IMAGE_TYPE.ICON,
          }}
          label={label}
          hasAction
          highlight={!doesItFit}
        />
      </button>

      <SizeCheckModal
        actions={actions}
        hasInfoModule={!doesItFit}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        vehicle={vehicle}
        vehicleModel={vehicle}
      />
    </>
  );
}

export default FitButton;
