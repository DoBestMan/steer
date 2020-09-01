import styled from '@emotion/styled';

import Car from '~/components/global/Car/Car';
import {
  CAR_DETAILS_TYPES,
  CAR_TYPES,
  DEFAULT_SCALE_VECTOR,
  WHEEL_WIDTH,
} from '~/components/global/Car/Car.constants';
import { Cars } from '~/components/global/Car/Car.enums';
import {
  getScaleVector,
  instanceOfCars,
} from '~/components/global/Car/Car.utils';
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
  const isValidCarId = instanceOfCars(carId);

  // No need to try to return all those CSS rules
  // The car ID is no valid, therefore there's no car to display
  if (!isValidCarId) {
    return {
      display: 'none',
    };
  }

  const carDetails = CAR_DETAILS[carId];
  const distanceFrontToRearWheel =
    carDetails.width -
    carDetails.distanceBackToRearWheel -
    carDetails.wheelWidth;

  const carType = CAR_DETAILS_TYPES[carId];
  const hideCarBody = carType === CAR_TYPES.VEHICLE_TYPE;
  // If the body is hidden, fade out immediately, else delay until the
  // vehicle has transformed it's position
  const backWheelTPTransitionDelay = hideCarBody ? 0 : TIMINGS.STAGE_TRANSITION;

  const scaleUpVector = getScaleVector(carId, bk);
  const scaleUpTransform = `scale(${scaleUpVector})`;

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
    svg: {
      // By default, the "small" Car scales up on MD + LG brakpoints
      transform: `scale(${DEFAULT_SCALE_VECTOR[bk]})`,
      transformOrigin: '100% 100%',
      transition: showLoadingInterstitial
        ? `transform ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}`
        : 'none',
    },
  };

  const stageStyles: CSSStyles = {
    [STAGES.DATA_MOMENT]: {
      '~ .back-wheel-img': {
        opacity: 1,
        transition: showLoadingInterstitial
          ? `opacity ${TIMINGS.WHEEL_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT} ${TIMINGS.STAGE_TRANSITION}ms`
          : 'none',
      },
      svg: {
        transform: `${scaleUpTransform}`,
      },
      'svg .back-wheel': {
        opacity: 0,
        transition: showLoadingInterstitial
          ? `opacity ${TIMINGS.WHEEL_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT}`
          : 'none',
      },
      'svg .body-car': {
        opacity: hideCarBody ? 0 : 0.13,
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
      transform: `translateX(${distanceFrontToRearWheel * scaleUpVector}px)`,
      transition: showLoadingInterstitial
        ? `transform ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}`
        : 'none',
    },
    [STAGES.RESULTS]: {
      '~ .back-wheel-img': {
        opacity: 0,
        transform: `translateX(-${
          scaleUpVector *
          (distanceFrontToRearWheel - carDetails.distanceFrontToFrontWheel)
        }px)`,
        transition: showLoadingInterstitial
          ? `transform ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}, opacity ${TIMINGS.WHEEL_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT} ${backWheelTPTransitionDelay}ms`
          : 'none',
      },
      svg: {
        transform: `${scaleUpTransform}`,
      },
      'svg .back-wheel': {
        opacity: 0,
      },
      'svg .body-car': {
        opacity: hideCarBody ? 0 : 0.13,
      },
      'svg .front-wheel': {
        opacity: 0,
      },
      transform: `translateX(${
        carDetails.distanceFrontToFrontWheel * scaleUpVector
      }px)`,
      transition: showLoadingInterstitial
        ? `transform ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}`
        : 'none',
    },
  };

  return [base, stageStyles[stage]];
}

export default styled(Car)<Props>(styledCarContainer);
