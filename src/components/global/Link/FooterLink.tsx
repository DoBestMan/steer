import Link, { LinkProps } from './Link';

import { footerLink } from './Link.styles';

import { LTheme } from '~/lib/constants';

function FooterLink({ children, ...rest }: LinkProps) {
  return (
    <Link {...rest} theme={LTheme.LIGHT} css={footerLink}>
      {children}
    </Link>
  );
}

export default FooterLink;
