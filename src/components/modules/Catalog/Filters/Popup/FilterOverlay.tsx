import styled from '@emotion/styled';

import { COLORS, CSSStyles, SPACING, Z_INDEX } from '~/lib/constants';

type Props = {
  isOpen: boolean;
};

function fiterOverlay(props: Props) {
  const { isOpen } = props;

  const base: CSSStyles = {
    background: COLORS.GLOBAL.BLACK,
    display: 'block',
    height: '100vh',
    left: 0,
    marginTop: SPACING.SIZE_30,
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    zIndex: Z_INDEX.BEHIND,
  };

  return isOpen && base;
}

export default styled('div')<Props>(fiterOverlay);
