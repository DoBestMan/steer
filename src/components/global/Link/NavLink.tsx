import Link, { LinkProps } from './Link';
import { navLink } from './Link.styles';

import { LTheme, LWeight } from '~/lib/constants';

function NavLink({ children, ...rest }: LinkProps) {
  return (
    <Link {...rest} weight={LWeight.BOLD} theme={LTheme.LIGHT} css={navLink}>
      {children}
    </Link>
  );
}

export default NavLink;
