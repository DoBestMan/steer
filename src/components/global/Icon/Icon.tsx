import { Icon as IconType, IconSize } from './Icon.types';
import { ICONS, ICON_SIZES } from './Icon.constants';

interface Props {
  name: IconType;
}

function getIconSize(name: string): IconSize | null {
  const key = Object.keys(ICONS).find((key) => ICONS[key as IconType] === name);

  if (key) {
    return ICON_SIZES[key as IconType];
  }

  return null;
}

function Icon({ name, ...rest }: Props) {
  const size = getIconSize(name);

  if (!size) {
    console.info(`<Icon />: no sizes found with ${name}`);
    return null;
  }

  return (
    <span {...rest}>
      <svg viewBox={`0 0 ${size.w} ${size.h}`} width={size.w} height={size.h}>
        <use xlinkHref={`#steer--${name}`}></use>
      </svg>
    </span>
  );
}

export default Icon;
