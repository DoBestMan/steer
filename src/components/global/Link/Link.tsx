import { ReactChild } from 'react';
import NextLink from 'next/link';

import { link } from './Link.styles';

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
  children: ReactChild;
  href: string;
  size?: LinkSizes;
  theme?: LinkThemes;
}

function Link(props: Props) {
  const { children, theme, href, size } = props;

  const textStyle =
    size === LinkSizes.SMALL ? typography.ctaSmall : typography.cta;
  const themeStyle = theme === LinkThemes.ORANGE ? colors.global.orange : '';

  return (
    <NextLink href={href}>
      <a css={[link, textStyle, themeStyle]} {...props}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
