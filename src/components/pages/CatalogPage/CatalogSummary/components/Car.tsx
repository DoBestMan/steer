import styled, { CSSObject } from '@emotion/styled';

import Car from '~/components/global/Car/Car';
import {
  DEFAULT_SCALE_VECTOR,
  WHEEL_WIDTH,
} from '~/components/global/Car/Car.constants';
import { Cars } from '~/components/global/Car/Car.enums';
import { getScaleVector } from '~/components/global/Car/Car.utils';
import { CAR_DETAILS } from '~/components/global/Car/CarDetails.constants';
import { Breakpoint, MQ } from '~/lib/constants';

import { STAGES } from '../CatalogSummary.constants';
import { CONSTANTS } from '../CatalogSummary.styles';

type Props = {
  bk: Breakpoint;
  carId: Cars;
  isSearch: boolean;
  stage: STAGES;
};

function styledCarContainer({ bk, carId, isSearch, stage }: Props) {
  const carDetails = CAR_DETAILS[carId];
  const distanceFrontToRearWheel =
    carDetails.width -
    carDetails.distanceBackToRearWheel -
    carDetails.wheelWidth;

  const scaleUpVector = getScaleVector(carId, bk);
  const scaleUpTransform = `scale3d(${scaleUpVector}, ${scaleUpVector}, ${scaleUpVector})`;

  // Note: If not part of the loading interstitial (e.g. only when
  // transitioning from Search), all transitions are set to 'none'.
  const base: CSSObject = {
    '~ .back-wheel-img': {
      bottom: 0,
      opacity: 0,
      position: 'absolute',
      right: 0,
      width: WHEEL_WIDTH.S,

      [MQ.M]: {
        width: WHEEL_WIDTH.M,
      },

      [MQ.L]: {
        width: WHEEL_WIDTH.L,
      },
    },

    svg: {
      '.solid-body-background *': {
        fill: '#FFF',
      },
    },

    // By default, the "small" Car scales up on MD + LG brakpoints
    transform: `scale3d(${DEFAULT_SCALE_VECTOR[bk]}, ${DEFAULT_SCALE_VECTOR[bk]}, ${DEFAULT_SCALE_VECTOR[bk]})`,
    transformOrigin: '100% 100%',
    transition: isSearch
      ? 'transform 1200ms cubic-bezier(0.645,0.045,0.355,1.000)'
      : 'none',
    willChange: 'transform',
  };

  const stageStyles: CSSObject = {
    [STAGES.DATA_MOMENT]: {
      '~ .back-wheel-img': {
        opacity: 1,
        transition: isSearch
          ? `opacity 300ms ${CONSTANTS.EASING} 1200ms`
          : 'none',
      },
      'svg .back-wheel': {
        opacity: 0,
        transition: isSearch ? `opacity 300ms ${CONSTANTS.EASING}` : 'none',
      },
      'svg .body-car': {
        opacity: 0.13,
        transition: isSearch
          ? `opacity ${CONSTANTS[STAGES.DATA_MOMENT].DURATION}ms ${
              CONSTANTS.EASING
            }`
          : 'none',
      },
      'svg .front-wheel': {
        opacity: 0,
        transition: isSearch ? `opacity 300ms ${CONSTANTS.EASING}` : 'none',
      },

      transform: `${scaleUpTransform} translate3d(${distanceFrontToRearWheel}px, 0, 0)`,
    },
    [STAGES.TOP_PICKS]: {
      '~ .back-wheel-img': {
        opacity: 1,
        transform: `translate3d(-${
          scaleUpVector *
          (distanceFrontToRearWheel - carDetails.distanceFrontToFrontWheel)
        }px, 0, 0)`,
        transition: isSearch
          ? 'transform 1200ms cubic-bezier(0.645,0.045,0.355,1.000)'
          : 'none',
      },
      'svg .back-wheel': {
        opacity: 0,
      },
      'svg .body-car': {
        opacity: 0.13,
      },
      'svg .front-wheel': {
        opacity: 0,
      },

      transform: `${scaleUpTransform} translate3d(${carDetails.distanceFrontToFrontWheel}px, 0, 0)`,
    },
  };

  return [base, stageStyles[stage]];
}

export default styled(Car)<Props>(styledCarContainer);
