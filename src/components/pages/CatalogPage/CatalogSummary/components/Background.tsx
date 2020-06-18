import styled from '@emotion/styled';

import { COLORS, CSSStyles } from '~/lib/constants';

function styledBackgroundContainer() {
  const base: CSSStyles = {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    height: '100vh',
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
  };

  return [base];
}

export default styled('div')(styledBackgroundContainer);
