import { ReactNode } from 'react';

import styles from './Link.styles';

import BaseLink from './BaseLink';

import {
  LinkIconPosition,
  LinkSize,
  LinkTheme,
  LinkWeight,
} from '~/lib/constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Icon from '~/components/global/Icon/Icon';

export interface LinkProps {
  children: ReactNode;
  href: string;
  icon?: IconType;
  iconPosition?: LinkIconPosition;
  size?: LinkSize;
  theme?: LinkTheme;
  weight?: LinkWeight;
}

function Link({
  children,
  href,
  icon,
  iconPosition = LinkIconPosition.RIGHT,
  size = LinkSize.REG,
  theme = LinkTheme.DARK,
  weight = LinkWeight.NORMAL,
  ...rest
}: LinkProps) {
  const inlineIcon = icon && (
    <Icon fill="currentColor" name={icon} css={styles[iconPosition]} />
  );
  return (
    <BaseLink
      href={href}
      css={[styles.root, styles[theme], styles[size], styles[weight]]}
      {...rest}
    >
      {iconPosition === LinkIconPosition.LEFT && inlineIcon}
      <span css={styles.link}>{children}</span>
      {iconPosition === LinkIconPosition.RIGHT && inlineIcon}
    </BaseLink>
  );
}

export default Link;
