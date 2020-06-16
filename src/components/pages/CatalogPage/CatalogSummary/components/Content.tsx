import styled from '@emotion/styled';

import { CSSStyles, MQ, Z_INDEX } from '~/lib/constants';

import { STAGES } from '../CatalogSummary.constants';
import { CONSTANTS } from '../CatalogSummary.styles';

type Props = {
  stage: STAGES;
};

function styledContent(props: Props) {
  const { stage } = props;

  const base: CSSStyles = {
    backgroundColor: 'transparent',
    minHeight: CONSTANTS[stage].CONTENT_MIN_HEIGHT.S,
    paddingTop: CONSTANTS[stage].CONTENT_TOP.S,
    position: 'relative',
    zIndex: Z_INDEX.FRONT,

    [MQ.M]: {
      minHeight: CONSTANTS[stage].CONTENT_MIN_HEIGHT.M,
      paddingTop: CONSTANTS[stage].CONTENT_TOP.M,
    },

    [MQ.L]: {
      minHeight: CONSTANTS[stage].CONTENT_MIN_HEIGHT.L,
      paddingTop: CONSTANTS[stage].CONTENT_TOP.L,
    },
  };

  return base;
}

export default styled('div')<Props>(styledContent);
