import { ReactChild } from 'react';
import NextLink from 'next/link';

import { typography } from '~/styles/global/typography.styles';
import { colors } from '~/styles/global/colors.styles';
import { link } from './Link.styles';

export enum LinkSizes {
  small = 'small',
  standard = 'standard',
}

export enum LinkThemes {
  orange = 'orange',
  black = 'black',
}

export type TLinkThemes = LinkThemes.orange | LinkThemes.black;
export type TLinkSizes = LinkSizes.small | LinkSizes.standard;

export interface Props {
  href: string;
  children: ReactChild;
  size?: TLinkSizes;
  theme?: TLinkThemes;
}

function Link(props: Props) {
  const { children, theme, href, size } = props;

  const textStyle = size === 'small' ? typography.ctaSmall : typography.cta;
  const themeStyle = theme === 'orange' ? colors.global.orange : '';

  return (
    <NextLink href={href}>
      <a css={[link, textStyle, themeStyle]} {...props}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
