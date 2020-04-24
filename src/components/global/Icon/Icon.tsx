import { Icon as IconType, IconSize } from './Icon.types';
import { ICONS, ICON_SIZES } from './Icon.constants';

import { COLORS } from '~/lib/constants';

import { layout } from '~/styles/layout.styles';

interface Props {
  fill?: string;
  name: IconType;
}

function getIconSize(name: IconType): IconSize | null {
  const key = Object.keys(ICONS).find((key) => ICONS[key] === name);

  if (key) {
    return ICON_SIZES[key];
  }

  return null;
}

function Icon({ fill, name, ...rest }: Props) {
  const size = getIconSize(name);

  if (!size) {
    console.info(`<Icon />: no sizes found with ${name}`);
    return null;
  }

  return (
    <span css={[layout.container, layout.centeredVertical]} {...rest}>
      <svg
        fill={fill || COLORS.GLOBAL.BLACK}
        viewBox={`0 0 ${size.w} ${size.h}`}
        width={size.w}
        height={size.h}
      >
        <use xlinkHref={`#steer--${name}`}></use>
      </svg>
    </span>
  );
}

export default Icon;
