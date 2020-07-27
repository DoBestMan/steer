import styled from '@emotion/styled';

import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import { CSSStyles, EASING, GRID_MARGIN, MQ } from '~/lib/constants';

import { STAGES, TIMINGS } from '../CatalogSummary.constants';

type Props = {
  showLoadingInterstitial: boolean;
  stage: STAGES;
};

function styledVehicleContainer({ showLoadingInterstitial, stage }: Props) {
  const base: CSSStyles = {
    bottom: '100%',
    fontSize: 0, // fix for bottom space under image
    opacity: 1,
    position: 'absolute',
    right: GRID_MARGIN.S,
    transform: 'translate3d(0, 0, 0)',

    [MQ.M]: {
      right: GRID_MARGIN.M,
    },

    [MQ.L]: {
      right: GRID_MARGIN.L,
    },
  };

  const stageStyles: CSSStyles = {
    [STAGES.LOADING]: {
      opacity: 0,
    },
    [STAGES.BUILD_IN]: {
      // Fade in vehicle as build-in screen slides down
      transition: `opacity ${TIMINGS.OVERLAY_IN}ms ${EASING.CUBIC_EASE_IN_OUT}`,
    },
    [STAGES.RESULTS]: {
      // TODO: integrate into Car component transition
      // Centers the front wheel
      transform: `translate3d(calc(${GRID_MARGIN.S}px - 50vw + ${
        WHEEL_WIDTH.S / 2
      }px), 0, 0)`,
      transition: showLoadingInterstitial
        ? `transform ${TIMINGS.STAGE_TRANSITION}ms ${EASING.CUBIC_EASE_IN_OUT}`
        : `opacity ${TIMINGS.OVERLAY_IN}ms ${EASING.CUBIC_EASE_IN_OUT}`,

      [MQ.M]: {
        transform: `translate3d(calc(${GRID_MARGIN.M}px - 50vw + ${
          WHEEL_WIDTH.M / 2
        }px), 0, 0)`,
      },

      [MQ.L]: {
        transform: `translate3d(calc(${GRID_MARGIN.L}px - 50vw + ${
          WHEEL_WIDTH.L / 2
        }px), 0, 0)`,
      },
    },
    [STAGES.NO_RESULTS]: {
      // Fade in vehicle as no results screen slides down
      transition: `opacity ${TIMINGS.OVERLAY_IN}ms ${EASING.CUBIC_EASE_IN_OUT}`,
    },
  };

  return [base, stageStyles[stage]];
}

export default styled('div')<Props>(styledVehicleContainer);
