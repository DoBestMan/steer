import styled from '@emotion/styled';

import { COLORS, CSSStyles, EASING, MQ } from '~/lib/constants';

import { MEASUREMENTS, STAGES, TIMINGS } from '../CatalogSummary.constants';

type Props = {
  stage: STAGES;
};

function styledOverlay(props: Props) {
  const { stage } = props;

  const base: CSSStyles = {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transform: `translate3d(0, ${MEASUREMENTS[stage].CONTENT_TOP.S}, 0)`,
    // TODO: different speeds for stage transition?
    transition: `transform ${TIMINGS.OVERLAY_IN}ms ${EASING.CUBIC_EASE_IN_OUT}`,
    width: '100%',

    [MQ.M]: {
      transform: `translate3d(0, ${MEASUREMENTS[stage].CONTENT_TOP.M}, 0)`,
    },

    [MQ.L]: {
      transform: `translate3d(0, ${MEASUREMENTS[stage].CONTENT_TOP.L}, 0)`,
    },
  };

  return base;
}

export default styled('div')<Props>(styledOverlay);
