import React from 'react';

import Button from '~/components/global/Button/Button';
import Car from '~/components/global/Car/Car';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { MyVehicle } from '~/data/models/MyVehicle';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS, LINK_TYPES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { createCarDescription } from './CarDetail.utils';
import styles from './CarDetails.styles';

interface Props extends MyVehicle {
  deleteCar: (vehicleData: MyVehicle) => void;
}

export default function CarDetails({
  make,
  model,
  option,
  vehicleId,
  vehicleType,
  year,
  deleteCar,
  vehicleLink,
}: Props) {
  const { isMobile } = useBreakpoints();
  function renderCarDetails() {
    const carName = createCarDescription({ make, model, option, year });
    return (
      <div css={[styles.header, isMobile && styles.mobileHeaderContainer]}>
        <h1 css={styles.carTitle}>{carName}</h1>
      </div>
    );
  }

  function renderSearchTiresButton() {
    return (
      <Button
        css={[
          styles.searchTiresButton,
          isMobile && styles.searchTiresButtonForMobile,
        ]}
        isDisabled={false}
        theme={THEME.LIGHT}
        type="submit"
        href={vehicleLink.href}
        isExternal={vehicleLink.isExternal}
        as={LINK_TYPES.A}
      >
        {ui('account.searchTires')}
      </Button>
    );
  }

  function renderCarContainer() {
    return (
      <div css={styles.carContainer}>
        <Car
          css={styles.car}
          carId={vehicleType}
          solid
          solidColor={COLORS.GLOBAL.WHITE}
        />
        {!isMobile && renderSearchTiresButton()}
      </div>
    );
  }

  function renderDeleteCarIcon() {
    return (
      <button
        onClick={() =>
          deleteCar({
            make,
            model,
            option,
            vehicleId,
            vehicleLink,
            vehicleType,
            year,
          })
        }
        css={styles.closeIconContainer}
      >
        <Icon name={ICONS.CLOSE} css={styles.closeIcon} />
      </button>
    );
  }

  return (
    <div css={styles.shadowContainer}>
      {renderDeleteCarIcon()}
      {renderCarDetails()}
      {renderCarContainer()}
      <div css={styles.seperator} />
      {isMobile && renderSearchTiresButton()}
    </div>
  );
}
