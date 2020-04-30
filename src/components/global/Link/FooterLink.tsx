import Link, { LinkProps } from './Link';

import { footerLink } from './Link.styles';

import { LINK_THEME } from '~/lib/constants';

function FooterLink({ children, ...rest }: LinkProps) {
  return (
    <Link {...rest} theme={LINK_THEME.LIGHT} css={footerLink}>
      {children}
    </Link>
  );
}

export default FooterLink;