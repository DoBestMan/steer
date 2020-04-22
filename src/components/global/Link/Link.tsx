import { ReactNode } from 'react';

import styles from './Link.styles';

import BaseLink from './BaseLink';

import {
  LINK_ICON_POSITION,
  LINK_SIZE,
  LINK_THEME,
  LINK_WEIGHT,
} from '~/lib/constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Icon from '~/components/global/Icon/Icon';

export interface LinkProps {
  children?: ReactNode;
  href: string;
  icon?: IconType;
  iconPosition?: LINK_ICON_POSITION;
  size?: LINK_SIZE;
  theme?: LINK_THEME;
  weight?: LINK_WEIGHT;
}

function Link({
  children,
  href,
  icon,
  iconPosition = LINK_ICON_POSITION.RIGHT,
  size = LINK_SIZE.REG,
  theme = LINK_THEME.DARK,
  weight = LINK_WEIGHT.NORMAL,
  ...rest
}: LinkProps) {
  const inlineIcon = icon && (
    <Icon
      aria-hidden={!!children}
      fill="currentColor"
      name={icon}
      css={children && styles[iconPosition]}
    />
  );
  return (
    <BaseLink
      href={href}
      css={[styles.root, styles[theme], styles[size], styles[weight]]}
      {...rest}
    >
      {iconPosition === LINK_ICON_POSITION.LEFT && inlineIcon}
      {children && <span css={styles.link}>{children}</span>}
      {iconPosition === LINK_ICON_POSITION.RIGHT && inlineIcon}
    </BaseLink>
  );
}

export default Link;
