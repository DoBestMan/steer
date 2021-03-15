import styled from '@emotion/styled';

import { COLORS, CSSStyles, MQ, SPACING, Z_INDEX } from '~/lib/constants';

type Props = {
  isOpen: boolean;
};

function fiterOverlay(props: Props) {
  const { isOpen } = props;

  const base: CSSStyles = {
    display: 'block',
    height: '100vh',
    left: 0,
    marginTop: SPACING.SIZE_30,
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    zIndex: Z_INDEX.BEHIND,

    [MQ.L]: {
      background: COLORS.GLOBAL.BLACK,
    },
  };

  return isOpen && base;
}

export default styled('div')<Props>(fiterOverlay);
