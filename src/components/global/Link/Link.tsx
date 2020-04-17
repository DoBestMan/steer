import { ReactNode } from 'react';
import NextLink from 'next/link';

import styles from './Link.styles';

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
    <NextLink href={href} passHref>
      <a
        css={[styles.root, styles[theme], styles[size], styles[weight]]}
        {...rest}
      >
        <span css={styles.link}>{children}</span>
        {icon && <Icon fill="currentColor" name={icon} css={styles.icon} />}
      </a>
    </NextLink>
  );
}

export default Link;
