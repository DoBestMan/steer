import styled from '@emotion/styled';

import Scenery from '~/components/global/Scenery/Scenery';
import { CSSStyles, EASING, MQ } from '~/lib/constants';

import { MEASUREMENTS, STAGES, TIMINGS } from '../CatalogSummary.constants';

type Props = {
  stage: STAGES;
};

function styledSceneryContainer({ stage }: Props) {
  const base: CSSStyles = {
    backgroundPosition: '0 100%',
    height: MEASUREMENTS[stage].CONTENT_TOP.S,
    left: 0,
    opacity: 1,
    position: 'absolute',
    top: 0,
    width: '100%',

    [MQ.M]: {
      height: MEASUREMENTS[stage].CONTENT_TOP.M,
    },

    [MQ.L]: {
      height: MEASUREMENTS[stage].CONTENT_TOP.L,
    },
  };

  const stageStyles: CSSStyles = {
    [STAGES.LOADING]: {
      opacity: 0,
    },
    [STAGES.BUILD_IN]: {
      transition: `opacity ${TIMINGS.OVERLAY_IN}ms ${EASING.CUBIC_EASE_IN_OUT}`,
    },
    [STAGES.DATA_MOMENT]: {
      transition: `opacity ${TIMINGS.STAGE_TRANSITION / 2}ms ${
        EASING.CUBIC_EASE_IN_OUT
      }`,
      opacity: 0,
    },
    [STAGES.RESULTS]: {
      // There is no transition from a stage with scenery background
      // to Top Picks
      display: 'none',
    },
    [STAGES.NO_RESULTS]: {
      position: 'relative',
      transition: `opacity ${TIMINGS.OVERLAY_IN}ms ${EASING.CUBIC_EASE_IN_OUT}`,
    },
  };

  return [base, stageStyles[stage]];
}

export default styled(Scenery)<Props>(styledSceneryContainer);
