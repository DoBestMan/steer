import styled from '@emotion/styled';

import { DEFAULT_CAR } from './Car.constants';
import { Cars } from './Car.enums';
import RenderCar from './Car.renders';
import { styles } from './Car.styles';
import { instanceOfCars } from './Car.utils';
import { CAR_DETAILS } from './CarDetails.constants';

type Props = {
  // supports string in case wrong id is given, still renders a default car
  animateWheel?: boolean;
  carId: Cars | string;
  scale?: number;
  scaleAcrossBreakpoints?: boolean;
  solid?: boolean;
  solidColor?: string;
  strokeWidth?: number;
};

function styledCarContainer(props: Props) {
  const { carId, solidColor, strokeWidth } = props;

  const carDetail = CAR_DETAILS[carId as Cars];

  const base = {
    svg: {
      '.back-wheel': {
        transformOrigin: `${carDetail.backWheelCenterPos.x}px ${carDetail.backWheelCenterPos.y}px`,
      },

      '.front-wheel': {
        transformOrigin: `${carDetail.frontWheelCenterPos.x}px ${carDetail.frontWheelCenterPos.y}px`,
      },

      ...(strokeWidth && {
        '.body-car line, .body-car path, .body-car polyline': {
          strokeWidth,
        },
      }),

      ...(solidColor && {
        '.solid-body-background path': {
          fill: solidColor,
        },
      }),
    },
  };

  return base;
}

const CarContainer = styled('span')<Props>(styledCarContainer);

function Car({
  carId,
  solid,
  scale,
  scaleAcrossBreakpoints,
  animateWheel,
  ...rest
}: Props) {
  // renders DEFAULT_CAR if "id" is not a known Car
  if (!instanceOfCars(carId)) {
    carId = DEFAULT_CAR;
  }

  return (
    <CarContainer
      carId={carId}
      css={[
        styles.container,
        solid && styles.solid,
        animateWheel && styles.animateWheel,
        !scale && scaleAcrossBreakpoints && styles.scaleAcrossBreakpoints,
        scale && {
          transform: `scale3d(${scale}, ${scale}, ${scale})`,
        },
      ]}
      {...rest}
    >
      <RenderCar id={carId} />
    </CarContainer>
  );
}

export default Car;
