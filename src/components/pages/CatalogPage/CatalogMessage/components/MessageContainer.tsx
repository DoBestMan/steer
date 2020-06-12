import styled, { CSSObject } from '@emotion/styled';
import { TransitionStatus } from 'react-transition-group/Transition';

import { COLORS, MQ } from '~/lib/constants';

import { STAGES } from '../../CatalogSummary/CatalogSummary.constants';
import { CONSTANTS } from '../../CatalogSummary/CatalogSummary.styles';

type Props = {
  stage: STAGES;
  transitionStatus: TransitionStatus;
};

function styledMessageContainer(props: Props) {
  const { stage, transitionStatus } = props;

  const isEntering = transitionStatus === 'entering';
  const isEntered = transitionStatus === 'entered';
  const isExiting = transitionStatus === 'exiting';

  const baseStyles: CSSObject = {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    minHeight: CONSTANTS[stage].CONTENT_MIN_HEIGHT.S,

    [MQ.M]: {
      minHeight: CONSTANTS[stage].CONTENT_MIN_HEIGHT.M,
    },

    [MQ.L]: {
      minHeight: CONSTANTS[stage].CONTENT_MIN_HEIGHT.L,
    },
  };

  switch (stage) {
    case STAGES.LOADING:
      return [
        baseStyles,
        {
          opacity: 1,
        },
      ];
    case STAGES.BUILD_IN:
      return [
        baseStyles,
        {
          opacity: 0,
          // transition in and out
          transition: `opacity ${
            CONSTANTS[STAGES.BUILD_IN].MESSAGE_IN_DURATION
          }ms ${CONSTANTS.EASING}`,
        },
        isEntering && {
          // prevent flash of transition on appear
          transition: 'none',
        },
        isEntered && {
          opacity: 1,
          // delay transition in
          transitionDelay: '300ms', // TODO: constant
        },
      ];
    case STAGES.DATA_MOMENT:
      return [
        baseStyles,
        {
          transition: `opacity ${
            CONSTANTS[STAGES.DATA_MOMENT].MESSAGE_IN_DURATION
          }ms ${CONSTANTS.EASING}`,
        },
        isEntering && {
          opacity: 1,
          transitionDelay: `${
            CONSTANTS[STAGES.DATA_MOMENT].MESSAGE_IN_DELAY
          }ms`,
        },
        isExiting && {
          opacity: 0,
        },
      ];
    case STAGES.TOP_PICKS:
      return [
        baseStyles,
        {
          transition: `opacity ${
            CONSTANTS[STAGES.TOP_PICKS].MESSAGE_IN_DURATION
          }ms ${CONSTANTS.EASING}`,
        },
        isEntering && {
          opacity: 1,
          transitionDelay: `${CONSTANTS[STAGES.TOP_PICKS].MESSAGE_IN_DELAY}ms`,
        },
        isExiting && {
          opacity: 0,
        },
      ];
    case STAGES.NO_RESULTS:
      return [
        baseStyles,
        {
          opacity: 1,
        },
        isEntering && {
          // hide during slide down
          opacity: 0,
        },
        isEntered && {
          // fade in after slide down
          transition: `opacity ${
            CONSTANTS[STAGES.NO_RESULTS].MESSAGE_IN_DURATION
          }ms ${CONSTANTS.EASING}`,
        },
      ];
    default:
      return {};
  }
}

export default styled('div')<Props>(styledMessageContainer);
