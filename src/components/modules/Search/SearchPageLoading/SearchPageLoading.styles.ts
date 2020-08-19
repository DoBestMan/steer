import { ENTERED, ENTERING } from 'react-transition-group/Transition';

import {
  COLORS,
  CSSObjectType,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';

const animationStyles: CSSObjectType = {
  [`container_${ENTERING}`]: {
    opacity: 0,
  },
  [`container_${ENTERED}`]: {
    opacity: 1,
  },
};

const styles: StylesMap = {
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    transition: `opacity ${TIME.MS300}ms ease`,
    width: '100%',
    zIndex: Z_INDEX.TOP,
  },
  ...animationStyles,
};

export default styles;
