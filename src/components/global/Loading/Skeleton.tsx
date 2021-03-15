import { CSSStylesProp, RADIUS, THEME } from '~/lib/constants';

import styles from './Skeleton.styles';

const DEFAULT_SKELETON_HEIGHT = '17px';
const DEFAULT_SKELETON_WIDTH = '100%';

interface Props {
  customContainerStyles?: CSSStylesProp;
  height?: string | number;
  radius?: string | number;
  theme?: THEME.LIGHT | THEME.DARK;
  width?: string | number;
}

function Skeleton({
  customContainerStyles,
  height = DEFAULT_SKELETON_HEIGHT,
  radius = RADIUS.RADIUS_5,
  theme = THEME.LIGHT,
  width = DEFAULT_SKELETON_WIDTH,
}: Props) {
  const style: CSSStylesProp = {};

  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div css={[styles.container, { ...style }, customContainerStyles]}>
      <div
        css={[
          styles.loading,
          styles[theme],
          { borderRadius: typeof radius === 'number' ? `${radius}px` : radius },
        ]}
      />
    </div>
  );
}

export default Skeleton;
