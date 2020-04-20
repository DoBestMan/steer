import Link, { LinkProps } from './Link';

import { footerLink } from './Link.styles';

import { LinkTheme } from '~/lib/constants';

function FooterLink({ children, ...rest }: LinkProps) {
  return (
    <Link {...rest} theme={LinkTheme.LIGHT} css={footerLink}>
      {children}
    </Link>
  );
}

export default FooterLink;
