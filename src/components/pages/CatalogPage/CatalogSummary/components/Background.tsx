import styled from '@emotion/styled';

import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { EXPLORE_BUTTON_HEIGHT } from '~/components/pages/CatalogPage/TopPicks/TopPicks.styles';
import { CSSStyles, MQ } from '~/lib/constants';

interface Props {
  stage?: STAGES;
}

function styledBackgroundContainer({ stage }: Props) {
  const base: CSSStyles = {
    height:
      stage === STAGES.RESULTS
        ? `calc(100% - ${EXPLORE_BUTTON_HEIGHT.S}px)`
        : '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',

    [MQ.M]: {
      height:
        stage === STAGES.RESULTS
          ? `calc(100% - ${EXPLORE_BUTTON_HEIGHT.M}px)`
          : '100%',
    },

    [MQ.L]: {
      height:
        stage === STAGES.RESULTS
          ? `calc(100% - ${EXPLORE_BUTTON_HEIGHT.L}px)`
          : '100%',
    },
  };

  return [base];
}

export default styled('div')<Props>(styledBackgroundContainer);
