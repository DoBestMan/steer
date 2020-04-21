import Link, { LinkProps } from './Link';
import { navLink } from './Link.styles';

import { LINK_THEME, LINK_WEIGHT } from '~/lib/constants';

function NavLink({ children, ...rest }: LinkProps) {
  return (
    <Link
      {...rest}
      weight={LINK_WEIGHT.BOLD}
      theme={LINK_THEME.LIGHT}
      css={navLink}
    >
      {children}
    </Link>
  );
}

export default NavLink;
