import React, { useState } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
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
  | 'onFindTiresThatFit'
  | 'onSelectAvailableOption'
  | 'onUnselectVehicle'
>;

interface Action {
  action: () => void;
  label: string;
}

const mapStatusToLabel: Record<SIZE_CHECK_STATES, string> = {
  [SIZE_CHECK_STATES.UNKNOWN]: 'pdp.insights.fitting.unknown',
  [SIZE_CHECK_STATES.SIZE_FITS]: 'pdp.insights.fitting.sizeFits',
  [SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT]:
    'pdp.insights.fitting.tireLineDoesNotFit',
  [SIZE_CHECK_STATES.TIRE_LINE_FITS]: 'pdp.insights.fitting.sizeFits',
  [SIZE_CHECK_STATES.DOES_NOT_FIT]: 'pdp.insights.fitting.doesNotFit',
};

const mapStatusToIcon: Record<SIZE_CHECK_STATES, IconType> = {
  [SIZE_CHECK_STATES.UNKNOWN]: ICONS.UNKNOWN,
  [SIZE_CHECK_STATES.SIZE_FITS]: ICONS.THUMBS_UP,
  [SIZE_CHECK_STATES.TIRE_LINE_FITS]: ICONS.THUMBS_UP,
  [SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT]: ICONS.FORBIDDEN,
  [SIZE_CHECK_STATES.DOES_NOT_FIT]: ICONS.FORBIDDEN,
};

function mapStatusToActions({
  sizeCheckState,
  make,
  handleFindTiresThatFit,
  handleSearchVehicle,
  handleSelectAvailableSize,
  handleUnselectVehicle,
}: Pick<Props, 'sizeCheckState' | 'make'> & {
  handleFindTiresThatFit: () => void;
  handleSearchVehicle: () => void;
  handleSelectAvailableSize: () => void;
  handleUnselectVehicle: () => void;
}): Action[] {
  switch (sizeCheckState) {
    case SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT:
      return [
        {
          label: ui('pdp.insights.fitting.viewTiresThatFit'),
          action: handleFindTiresThatFit,
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
    case SIZE_CHECK_STATES.DOES_NOT_FIT:
      return [
        {
          label: ui('pdp.insights.fitting.selectAFittingSize', {
            make: make || '',
          }),
          action: handleSelectAvailableSize,
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
    case SIZE_CHECK_STATES.SIZE_FITS:
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
    case SIZE_CHECK_STATES.TIRE_LINE_FITS:
      return [
        {
          label: ui('pdp.insights.fitting.selectAFittingSize', {
            make: make || '',
          }),
          action: handleSelectAvailableSize,
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
    default:
      return [];
  }
}

function FitButton({
  sizeCheckState,
  make,
  vehicle,
  onFindTiresThatFit,
  onSelectAvailableOption,
  onUnselectVehicle,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchForVehicle } = useProductDetailContext();
  const isUnknown = sizeCheckState === SIZE_CHECK_STATES.UNKNOWN;
  const doesItFit =
    sizeCheckState === SIZE_CHECK_STATES.SIZE_FITS ||
    sizeCheckState === SIZE_CHECK_STATES.TIRE_LINE_FITS;

  const label = ui(mapStatusToLabel[sizeCheckState], {
    vehicle: vehicle || '',
  });

  const icon = mapStatusToIcon[sizeCheckState];

  const handleFindTiresThatFit = () => {
    onFindTiresThatFit && onFindTiresThatFit();
    setIsModalOpen(false);
  };

  const handleSearchVehicle = () => {
    searchForVehicle();
    setIsModalOpen(false);
  };

  const handleUnselectVehicle = () => {
    onUnselectVehicle && onUnselectVehicle();
    setIsModalOpen(false);
  };

  const handleSelectAvailableSize = () => {
    onSelectAvailableOption && onSelectAvailableOption();
    setIsModalOpen(false);
  };

  const actions = mapStatusToActions({
    handleFindTiresThatFit,
    handleSearchVehicle,
    handleSelectAvailableSize,
    handleUnselectVehicle,
    make,
    sizeCheckState,
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
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        sizeCheckState={sizeCheckState}
        vehicle={vehicle}
        vehicleModel={vehicle}
      />
    </>
  );
}

export default FitButton;
