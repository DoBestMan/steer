import styled from '@emotion/styled';

import { CSSStyles } from '~/lib/constants';

function styledBackgroundContainer() {
  const base: CSSStyles = {
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
