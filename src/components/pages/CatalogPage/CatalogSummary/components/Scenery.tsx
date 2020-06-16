import styled from '@emotion/styled';

import Scenery from '~/components/global/Scenery/Scenery';
import { CSSStyles, MQ, TIME } from '~/lib/constants';

import { STAGES } from '../CatalogSummary.constants';
import { CONSTANTS } from '../CatalogSummary.styles';

type Props = {
  stage: STAGES;
};

function styledSceneryContainer({ stage }: Props) {
  const base: CSSStyles = {
    backgroundPosition: '0 100%',
    height: CONSTANTS[stage].CONTENT_TOP.S,
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    width: '100%',

    [MQ.M]: {
      height: CONSTANTS[stage].CONTENT_TOP.M,
    },

    [MQ.L]: {
      height: CONSTANTS[stage].CONTENT_TOP.L,
    },
  };

  const stageStyles: CSSStyles = {
    [STAGES.LOADING]: {
      display: 'none',
    },
    [STAGES.BUILD_IN]: {
      opacity: 1,
    },
    [STAGES.DATA_MOMENT]: {
      transition: `opacity ${TIME.MS300}ms ease`,
    },
    [STAGES.TOP_PICKS]: {
      // There is no transition from a stage with scenery background
      // to Top Picks
      display: 'none',
    },
    [STAGES.NO_RESULTS]: {
      opacity: 1,
      position: 'relative',
    },
  };

  return [base, stageStyles[stage]];
}

export default styled(Scenery)<Props>(styledSceneryContainer);
