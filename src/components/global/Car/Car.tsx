import styled from '@emotion/styled';

import { MQ } from '~/lib/constants';

import { DEFAULT_CAR, VEHICLE_SCALE_SMALL } from './Car.constants';
import { renderCar } from './Car.renders';
import { styles } from './Car.styles';
import { Cars, CarSizes, instanceOfCars } from './Car.types';
import { CAR_DETAILS } from './CarDetails.constants';

type Props = {
  // supports string in case wrong id is given, still renders a default car
  animateWheel?: boolean;
  carId: Cars | string;
  size?: CarSizes;
  solid?: boolean;
};

function styledCarContainer(props: Props) {
  const { carId, size } = props;

  const carDetail = CAR_DETAILS[carId as Cars];

  const base = {
    svg: {
      '.back-wheel': {
        transformOrigin: `${carDetail.backWheelCenterPos.x}px ${carDetail.backWheelCenterPos.y}px`,
      },

      '.front-wheel': {
        transformOrigin: `${carDetail.frontWheelCenterPos.x}px ${carDetail.frontWheelCenterPos.y}px`,
      },
    },
  };

  if (size !== 'small') {
    return base;
  }

  return {
    ...base,

    width: VEHICLE_SCALE_SMALL.S * carDetail.width,

    [MQ.M]: {
      width: VEHICLE_SCALE_SMALL.M * carDetail.width,
    },

    [MQ.L]: {
      width: VEHICLE_SCALE_SMALL.L * carDetail.width,
    },
  };
}

const CarContainer = styled('span')<Props>(styledCarContainer);

function Car({ carId, size, solid, animateWheel, ...rest }: Props) {
  // renders DEFAULT_CAR if "id" is not a known Car
  if (!instanceOfCars(carId)) {
    carId = DEFAULT_CAR;
  }

  return (
    <CarContainer
      carId={carId}
      size={size}
      css={[
        styles.container,
        solid && styles.solid,
        animateWheel && styles.animateWheel,
      ]}
      {...rest}
    >
      {renderCar(carId)}
    </CarContainer>
  );
}

export default Car;
