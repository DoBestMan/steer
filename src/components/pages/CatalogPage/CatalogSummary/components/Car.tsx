import styled from '@emotion/styled';

import Car from '~/components/global/Car/Car';
import {
  DEFAULT_SCALE_VECTOR,
  WHEEL_WIDTH,
} from '~/components/global/Car/Car.constants';
import { Cars } from '~/components/global/Car/Car.enums';
import { getScaleVector } from '~/components/global/Car/Car.utils';
import { CAR_DETAILS } from '~/components/global/Car/CarDetails.constants';
import { Breakpoint, CSSStyles, EASING, MQ } from '~/lib/constants';

import { STAGES, TIMINGS } from '../CatalogSummary.constants';

type Props = {
  bk: Breakpoint;
  carId: Cars;
  showLoadingInterstitial: boolean;
  stage: STAGES;
};

function styledCarContainer({
  bk,
  carId,
  showLoadingInterstitial,
  stage,
}: Props) {
  const carDetails = CAR_DETAILS[carId];
  const distanceFrontToRearWheel =
    carDetails.width -
    carDetails.distanceBackToRearWheel -
    carDetails.wheelWidth;

  const scaleUpVector = getScaleVector(carId, bk);
  const scaleUpTransform = `scale3d(${scaleUpVector}, ${scaleUpVector}, ${scaleUpVector})`;

  // Note: If not part of the loading interstitial (e.g. only when
  // transitioning from Search), all transitions are set to 'none'.
  const base: CSSStyles = {
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

    // By default, the "small" Car scales up on MD + LG brakpoints
    transform: `scale3d(${DEFAULT_SCALE_VECTOR[bk]}, ${DEFAULT_SCALE_VECTOR[bk]}, ${DEFAULT_SCALE_VECTOR[bk]})`,
    transformOrigin: '100% 100%',
    transition: showLoadingInterstitial
      ? `transform ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}`
      : 'none',
    willChange: 'transform',
  };

  const stageStyles: CSSStyles = {
    [STAGES.DATA_MOMENT]: {
      '~ .back-wheel-img': {
        opacity: 1,
        transition: showLoadingInterstitial
          ? `opacity ${TIMINGS.WHEEL_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT} ${TIMINGS.STAGE_TRANSITION}ms`
          : 'none',
      },
      'svg .back-wheel': {
        opacity: 0,
        transition: showLoadingInterstitial
          ? `opacity ${TIMINGS.WHEEL_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT}`
          : 'none',
      },
      'svg .body-car': {
        opacity: 0.13,
        transition: showLoadingInterstitial
          ? `opacity ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}`
          : 'none',
      },
      'svg .front-wheel': {
        opacity: 0,
        transition: showLoadingInterstitial
          ? `opacity ${TIMINGS.WHEEL_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT}`
          : 'none',
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
        transition: showLoadingInterstitial
          ? `transform ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}`
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
