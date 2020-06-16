import { THEME } from '~/lib/constants';

import Link, { LinkProps } from './Link';
import { footerLink } from './Link.styles';

function FooterLink({ children, ...rest }: LinkProps) {
  return (
    <Link {...rest} theme={THEME.LIGHT} css={footerLink}>
      {children}
    </Link>
  );
}

export default FooterLink;
