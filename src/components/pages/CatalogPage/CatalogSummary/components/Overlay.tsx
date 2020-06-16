import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import { COLORS, CSSStyles, MQ } from '~/lib/constants';

import { STAGES } from '../CatalogSummary.constants';
import { CONSTANTS } from '../CatalogSummary.styles';

const getTransformKeyframes = (start: string | number, end: string | number) =>
  keyframes({
    '0%': {
      transform: `translate3d(0, ${start}, 0)`,
    },
    '100%': {
      transform: `translate3d(0, ${end}, 0)`,
    },
  });

type Props = {
  stage: STAGES;
};

// TODO: the readjustment in size of he overlay versus the underlying background
// orange area is not super smooth, as the height of the content changes.
// This is apparent when the height of the content > 100vh
function styledOverlay(props: Props) {
  const { stage } = props;

  const base: CSSStyles = {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  };

  const stageStyles: CSSStyles = {
    [STAGES.LOADING]: {
      transform: `translate3d(0, ${
        CONSTANTS[STAGES.LOADING].CONTENT_TOP.S
      }, 0)`,
    },
    [STAGES.BUILD_IN]: {
      animation: `${getTransformKeyframes(
        0,
        CONSTANTS[STAGES.BUILD_IN].CONTENT_TOP.S,
      )} ${CONSTANTS[STAGES.BUILD_IN].DURATION}ms ${CONSTANTS.EASING}`,
      transform: `translate3d(0, ${
        CONSTANTS[STAGES.BUILD_IN].CONTENT_TOP.S
      }, 0)`,

      [MQ.M]: {
        animation: `${getTransformKeyframes(
          0,
          CONSTANTS[STAGES.BUILD_IN].CONTENT_TOP.M,
        )} ${CONSTANTS[STAGES.BUILD_IN].DURATION}ms ${CONSTANTS.EASING}`,
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.BUILD_IN].CONTENT_TOP.M
        }, 0)`,
      },

      [MQ.L]: {
        animation: `${getTransformKeyframes(
          0,
          CONSTANTS[STAGES.BUILD_IN].CONTENT_TOP.L,
        )} ${CONSTANTS[STAGES.BUILD_IN].DURATION}ms ${CONSTANTS.EASING}`,
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.BUILD_IN].CONTENT_TOP.L
        }, 0)`,
      },
    },
    [STAGES.DATA_MOMENT]: {
      transform: `translate3d(0, ${
        CONSTANTS[STAGES.DATA_MOMENT].CONTENT_TOP.S
      }, 0)`,
      transition: `transform ${CONSTANTS[STAGES.DATA_MOMENT].DURATION}ms ${
        CONSTANTS.EASING
      }`,

      [MQ.M]: {
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.DATA_MOMENT].CONTENT_TOP.M
        }, 0)`,
      },

      [MQ.L]: {
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.DATA_MOMENT].CONTENT_TOP.L
        }, 0)`,
      },
    },
    [STAGES.TOP_PICKS]: {
      transform: `translate3d(0, ${
        CONSTANTS[STAGES.TOP_PICKS].CONTENT_TOP.S
      }, 0)`,
      transition: `transform ${CONSTANTS[STAGES.TOP_PICKS].DURATION}ms ${
        CONSTANTS.EASING
      }`,

      [MQ.M]: {
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.TOP_PICKS].CONTENT_TOP.M
        }, 0)`,
      },

      [MQ.L]: {
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.TOP_PICKS].CONTENT_TOP.L
        }, 0)`,
      },
    },
    [STAGES.NO_RESULTS]: {
      animation: `${getTransformKeyframes(
        0,
        CONSTANTS[STAGES.NO_RESULTS].CONTENT_TOP.S,
      )} ${CONSTANTS[STAGES.NO_RESULTS].DURATION}ms ${CONSTANTS.EASING}`,
      transform: `translate3d(0, ${
        CONSTANTS[STAGES.NO_RESULTS].CONTENT_TOP.S
      }, 0)`,

      [MQ.M]: {
        animation: `${getTransformKeyframes(
          0,
          CONSTANTS[STAGES.NO_RESULTS].CONTENT_TOP.M,
        )} ${CONSTANTS[STAGES.NO_RESULTS].DURATION}ms ${CONSTANTS.EASING}`,
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.NO_RESULTS].CONTENT_TOP.M
        }, 0)`,
      },

      [MQ.L]: {
        animation: `${getTransformKeyframes(
          0,
          CONSTANTS[STAGES.NO_RESULTS].CONTENT_TOP.L,
        )} ${CONSTANTS[STAGES.NO_RESULTS].DURATION}ms ${CONSTANTS.EASING}`,
        transform: `translate3d(0, ${
          CONSTANTS[STAGES.NO_RESULTS].CONTENT_TOP.L
        }, 0)`,
      },
    },
  };

  return [base, stageStyles[stage]];
}

export default styled('div')<Props>(styledOverlay);
