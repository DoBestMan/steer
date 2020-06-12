import styled, { CSSObject } from '@emotion/styled';

function styledBackgroundContainer() {
  const base: CSSObject = {
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
