import { ReactNode } from 'react';
import NextLink from 'next/link';

import styles from './Link.styles';

import { typography } from '~/styles/global/typography.styles';
import { colors } from '~/styles/global/colors.styles';

export enum LinkSizes {
  SMALL = 'small',
  STANDARD = 'standard',
}

export enum LinkThemes {
  BLACK = 'black',
  ORANGE = 'orange',
}

export interface Props {
  children: ReactNode;
  href: string;
  size?: LinkSizes;
  theme?: LinkThemes;
}

function Link(props: Props) {
  const { children, theme, href, size } = props;

  const textStyle =
    size === LinkSizes.SMALL ? typography.ctaSmall : typography.cta;
  const themeStyle = theme === LinkThemes.ORANGE ? colors.GLOBAL.ORANGE : '';

  return (
    <NextLink href={href}>
      <a css={[styles.root, textStyle, themeStyle]} {...props}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
