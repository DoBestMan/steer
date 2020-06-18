import styled from '@emotion/styled';

import { CSSStyles, MQ, Z_INDEX } from '~/lib/constants';

import { MEASUREMENTS, STAGES } from '../CatalogSummary.constants';

type Props = {
  stage: STAGES;
};

function styledContent(props: Props) {
  const { stage } = props;

  const base: CSSStyles = {
    backgroundColor: 'transparent',
    minHeight: MEASUREMENTS[stage].CONTENT_MIN_HEIGHT.S,
    paddingTop: MEASUREMENTS[stage].CONTENT_TOP.S,
    position: 'relative',
    zIndex: Z_INDEX.FRONT,

    [MQ.M]: {
      minHeight: MEASUREMENTS[stage].CONTENT_MIN_HEIGHT.M,
      paddingTop: MEASUREMENTS[stage].CONTENT_TOP.M,
    },

    [MQ.L]: {
      minHeight: MEASUREMENTS[stage].CONTENT_MIN_HEIGHT.L,
      paddingTop: MEASUREMENTS[stage].CONTENT_TOP.L,
    },
  };

  return base;
}

export default styled('div')<Props>(styledContent);
