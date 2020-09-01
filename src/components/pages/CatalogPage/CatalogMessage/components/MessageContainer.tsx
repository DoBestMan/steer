import styled from '@emotion/styled';
import { TransitionStatus } from 'react-transition-group/Transition';

import { COLORS, CSSStyles, EASING, MQ, SAFARI_ONLY } from '~/lib/constants';

import {
  MEASUREMENTS,
  STAGES,
  TIMINGS,
} from '../../CatalogSummary/CatalogSummary.constants';

type Props = {
  showLoadingInterstitial: boolean;
  stage: STAGES;
  transitionStatus: TransitionStatus;
};

function styledMessageContainer({
  showLoadingInterstitial,
  stage,
  transitionStatus,
}: Props) {
  const isEntering = transitionStatus === 'entering';
  const isEntered = transitionStatus === 'entered';

  const baseStyles: CSSStyles = {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    minHeight: MEASUREMENTS[stage].CONTENT_MIN_HEIGHT.S,

    [MQ.M]: {
      minHeight: MEASUREMENTS[stage].CONTENT_MIN_HEIGHT.M,
    },

    [MQ.L]: {
      minHeight: MEASUREMENTS[stage].CONTENT_MIN_HEIGHT.L,
    },
  };

  /**
   * NOTE: Opacity transition is performed on the child element ('> *')
   * so that the background color remains opaque which smooths the
   * transition between stages.
   */
  switch (stage) {
    case STAGES.LOADING:
      return [
        baseStyles,
        {
          '> *': {
            opacity: 1,
          },
        },
      ];
    case STAGES.BUILD_IN:
      return [
        baseStyles,
        {
          '> *': {
            opacity: 0,
            // transition in and out
            transition: `opacity ${TIMINGS.CONTENT_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT}`,
          },
        },
        isEntering && {
          '> *': {
            // prevent flash of transition on appear
            transition: 'none',
          },
        },
        isEntered && {
          '> *': {
            opacity: 1,
          },
        },
      ];
    case STAGES.DATA_MOMENT:
      return [
        baseStyles,
        {
          '> *': {
            opacity: 0,
            // transition in and out
            transition: `opacity ${TIMINGS.CONTENT_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT}`,
          },
        },
        isEntering && {
          '> *': {
            // prevent flash of transition on appear
            transition: 'none',
          },
        },
        isEntered && {
          '> *': {
            opacity: 1,
            transitionDelay: showLoadingInterstitial
              ? 0
              : TIMINGS.STAGE_TRANSITION / 2,
          },
        },
      ];
    case STAGES.RESULTS:
      return [
        baseStyles,
        {
          backgroundColor: 'transparent',
          // Make sure the Content component fills the screen while
          // the TopPicks component loads dynamically
          minHeight: '100vh !important',

          [SAFARI_ONLY]: {
            minHeight: '-webkit-fill-available !important',
          },
        },
      ];
    case STAGES.NO_RESULTS:
      return [
        baseStyles,
        {
          '> *': {
            opacity: 0,
            // transition in and out
            transition: `opacity ${TIMINGS.CONTENT_IN_OUT}ms ${EASING.CUBIC_EASE_IN_OUT}`,
          },
        },
        isEntering && {
          '> *': {
            // prevent flash of transition on appear
            transition: 'none',
          },
        },
        isEntered && {
          '> *': {
            opacity: 1,
          },
        },
      ];
    default:
      return {};
  }
}

export default styled('div')<Props>(styledMessageContainer);
