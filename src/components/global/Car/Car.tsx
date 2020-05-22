import styled from '@emotion/styled';

import { MQ } from '~/lib/constants';

import { CAR_DETAILS, DEFAULT_CAR, VEHICLE_SCALE_SMALL } from './Car.constants';
import { renderCar } from './Car.renders';
import { styles } from './Car.styles';
import { Cars, CarSizes, instanceOfCars } from './Car.types';

type Props = {
  // supports string in case wrong id is given, still renders a default car
  carId: Cars | string;
  size?: CarSizes;
};

function styledCarContainer(props: Props) {
  const { carId, size } = props;

  if (size !== 'small') {
    return {};
  }

  const carDetail = CAR_DETAILS[carId as Cars];

  return {
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

function Car({ carId, size, ...rest }: Props) {
  // renders DEFAULT_CAR if "id" is not a known Car
  if (!instanceOfCars(carId)) {
    carId = DEFAULT_CAR;
  }

  return (
    <CarContainer carId={carId} size={size} {...rest} css={styles.container}>
      {renderCar(carId)}
    </CarContainer>
  );
}

export default Car;
