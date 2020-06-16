import styled from '@emotion/styled';

import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import { CSSStyles, GRID_MARGIN, MQ } from '~/lib/constants';
import { fadeIn } from '~/styles/animations.styles';

import { STAGES } from '../CatalogSummary.constants';
import { CONSTANTS } from '../CatalogSummary.styles';

type Props = {
  stage: STAGES;
  useTransitions: boolean;
};

function styledVehicleContainer({ useTransitions, stage }: Props) {
  const base: CSSStyles = {
    bottom: '100%',
    fontSize: 0, // fix for bottom space under image
    position: 'absolute',
    right: GRID_MARGIN.S,

    [MQ.M]: {
      right: GRID_MARGIN.M,
    },

    [MQ.L]: {
      right: GRID_MARGIN.L,
    },
  };

  const stageStyles: CSSStyles = {
    [STAGES.BUILD_IN]: {
      // Fade in vehicle as build-in screen slides down
      animation: `${fadeIn} ${
        CONSTANTS[STAGES.BUILD_IN].VEHICLE_IN_DURATION
      }ms ${CONSTANTS.EASING}`,
      opacity: 1,
    },
    [STAGES.TOP_PICKS]: {
      // TODO: integrate into Car component transition
      // Centers the front wheel
      transform: `translate3d(calc(${GRID_MARGIN.S}px - 50vw + ${
        WHEEL_WIDTH.S / 2
      }px), 0, 0)`,
      transition: useTransitions
        ? 'transform 1200ms cubic-bezier(0.645,0.045,0.355,1.000)'
        : 'none',

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
      animation: `${fadeIn} ${
        CONSTANTS[STAGES.NO_RESULTS].VEHICLE_IN_DURATION
      }ms ${CONSTANTS.EASING}`,
      opacity: 1,
    },
  };

  return [base, stageStyles[stage]];
}

export default styled('div')<Props>(styledVehicleContainer);
