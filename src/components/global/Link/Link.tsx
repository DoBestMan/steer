import { ReactNode } from 'react';

import styles from './Link.styles';

import BaseLink from './BaseLink';

import { LSize, LTheme, LWeight } from '~/lib/constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Icon from '~/components/global/Icon/Icon';

export interface LinkProps {
  children: ReactNode;
  href: string;
  icon?: IconType;
  size?: LSize;
  theme?: LTheme;
  weight?: LWeight;
}

function Link({
  children,
  href,
  icon,
  size = LSize.REG,
  theme = LTheme.DARK,
  weight = LWeight.NORMAL,
  ...rest
}: LinkProps) {
  return (
    <BaseLink
      href={href}
      css={[styles.root, styles[theme], styles[size], styles[weight]]}
      {...rest}
    >
      <span css={styles.link}>{children}</span>
      {icon && <Icon fill="currentColor" name={icon} css={styles.icon} />}
    </BaseLink>
  );
}

export default Link;
