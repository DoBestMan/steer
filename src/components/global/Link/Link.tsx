import { ReactChild } from 'react';
import NextLink from 'next/link';

import { typography } from '~/styles/global/typography.styles';
import { colors } from '~/styles/global/colors.styles';
import { link } from './Link.styles';

interface Props {
  href: string;
  children: ReactChild;
  size?: string;
  theme?: string;
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
